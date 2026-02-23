"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { uploadFile, uploadBackgroundFile } from "@/services/CompanyServices.client"
import {
    Upload,
    AlertCircle,
    Image as ImageIcon,
    Save,
    Loader2
} from "lucide-react"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileFormDefaults, profileFormSchema, type ProfileFormData } from "@/schemas/profile"
import { useUpsertProfile } from "@/mutation/CompanyProfile"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/services/CompanyServices.client"
import { formatPhoneNumber } from "@/utils/FormatTel"
import { translateError } from "@/utils/ErrorTranslator"


const supabase = createClient();


// Uzmanlık alanları ve açıklamaları
const expertiseAreas = [
    { name: "Oturma Odası", description: "Koltuk takımları, köşe koltuklar, TV üniteleri, sehpalar" },
    { name: "Yatak Odası", description: "Yatak odası takımları, karyola, baza, gardırop, komodin" },
    { name: "Mutfak", description: "Mutfak dolapları, tezgah, ada mutfak, ankastre dolap" },
    { name: "Ofis & Çalışma", description: "Çalışma masaları, ofis koltukları, ofis dolapları" },
    { name: "Çocuk & Genç Odası", description: "Çocuk odası, genç odası, ranza, çalışma masası" },
    { name: "Antre & Depolama", description: "Portmanto, ayakkabılık, dresuar, gömme dolap" },
    { name: "Bahçe & Balkon", description: "Bahçe masa & sandalye, balkon setleri" },
    { name: "Tamamlayıcı Ürünler", description: "Sehpalar, puf & bench, ayna, dekoratif ürünler" },
    { name: "Özel Üretim & Projeler", description: "İsteğe özel üretim, projelendirme, montaj" },
]

const hatayDistricts = [
    "Antakya", "İskenderun", "Defne", "Samandağ", "Dörtyol",
    "Kırıkhan", "Reyhanlı", "Arsuz", "Belen", "Erzin",
    "Hassa", "Altınözü", "Kumlu", "Yayladağı", "Payas",
]

export function ProfileForm() {
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const [backgroundUrl, setBackgroundUrl] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const backgroundInputRef = useRef<HTMLInputElement>(null)

    // React Hook Form + Zod
    const { handleSubmit, formState: { isSubmitting, errors }, control, watch, setValue } = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: profileFormDefaults,
    })

    // TanStack Query Mutation - tek upsert
    const { mutate, isPending } = useUpsertProfile()

    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["companyProfile"],
        queryFn: getProfile,
    })

    // User bilgisi ve profil verisi geldikçe formu doldur
    useEffect(() => {
        if (isProfileLoading || isDataLoaded) return

        const populateForm = async () => {
            const { data } = await supabase.auth.getUser()

            if (data.user) {
                // Öncelik: Profil verisi > User Metadata
                const fullName = profile?.full_name || data.user.user_metadata?.firma_adi || ""
                const phone = profile?.phone || data.user.user_metadata?.telefon || ""
                const email = data.user.email || ""
                const description = profile?.description || ""
                const authorized = profile?.admin || ""
                const address = profile?.adress || ""
                const districtVal = profile?.district || data.user.user_metadata?.sehir || ""


                // Form değerlerini set et (sadece boşsa veya değer varsa)
                setValue("name", fullName)
                setValue("phone", formatPhoneNumber(phone))
                setValue("email", email)
                setValue("description", description)
                setValue("authorized", authorized)
                setValue("address", address)

                if (districtVal) {
                    setDistrict(districtVal)
                    setValue("district", districtVal)
                }

                if (profile?.avatar_url) setAvatarUrl(profile.avatar_url)
                if (profile?.background_url) setBackgroundUrl(profile.background_url)
                // Expertise array olduğu için kontrol et
                if (profile?.expertise && Array.isArray(profile.expertise)) {
                    setValue("expertise", profile.expertise)
                }

                setIsDataLoaded(true)
            }
        }
        populateForm()
    }, [profile, isProfileLoading, isDataLoaded, setValue])

    // Seçili uzmanlık alanlarını izle
    const selectedExpertise = watch("expertise") || []

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = await uploadFile(e)
        if (url) {
            setAvatarUrl(url)
            setValue("avatar_url", url)
        }
    }

    const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = await uploadBackgroundFile(e)
        if (url) {
            setBackgroundUrl(url)
            setValue("background_url", url)
        }
    }

    const toggleExpertise = (name: string) => {
        if (selectedExpertise.includes(name)) {
            setValue("expertise", selectedExpertise.filter(e => e !== name))
        } else {
            setValue("expertise", [...selectedExpertise, name])
        }
    }

    const onSubmit = (data: ProfileFormData) => {
        // Dosya URL'lerini ve district'i ekle
        data.avatar_url = avatarUrl
        data.background_url = backgroundUrl
        data.district = district
        if (data.phone) data.phone = data.phone.replace(/\s/g, "")

        mutate(data, {
            onSuccess: () => {
                toast.success("Profil başarıyla kaydedildi!")
            },
            onError: (error) => {
                console.error("Profile update error:", error)
                toast.error(translateError(error))
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN: Main Info */}
            <div className="lg:col-span-2 space-y-6">

                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Firma Bilgileri</CardTitle>
                        <CardDescription>Müşterilerin göreceği temel bilgiler.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="name">Firma Adı</Label>
                                            <Input
                                                id="company-name"
                                                placeholder="Firma adınızı girin"
                                                autoComplete="organization"
                                                aria-invalid={!!fieldState.error}
                                                aria-describedby="company-name-error"
                                                {...field}
                                            />
                                            {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Controller
                                    name="authorized"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="authorized">Yetkili Kişi</Label>
                                            <Input
                                                id="authorized"
                                                placeholder="Yetkili adınız"
                                                autoComplete="name"
                                                aria-invalid={!!fieldState.error}
                                                aria-describedby={fieldState.error ? "authorized-error" : undefined}
                                                {...field}
                                            />
                                            {fieldState.error && <p id="authorized-error" className="text-sm text-red-500">{fieldState.error.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="phone">Telefon</Label>
                                            <Input
                                                id="phone"
                                                placeholder="555 555 55 55"
                                                autoComplete="tel"
                                                type="tel"
                                                maxLength={15}
                                                aria-invalid={!!fieldState.error}
                                                aria-describedby={fieldState.error ? "phone-error" : undefined}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(formatPhoneNumber(e.target.value))
                                                }}
                                            />
                                            {fieldState.error && <p id="phone-error" className="text-sm text-red-500">{fieldState.error.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="email">E-posta</Label>
                                            <Input
                                                id="email"
                                                placeholder="info@firma.com"
                                                type="email"
                                                autoComplete="email"
                                                disabled
                                                aria-invalid={!!fieldState.error}
                                                aria-describedby={fieldState.error ? "email-error" : undefined}
                                                {...field}
                                            />
                                            {fieldState.error && <p id="email-error" className="text-sm text-red-500">{fieldState.error.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Controller
                                name="address"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="address">Adres</Label>
                                        <Input
                                            id="address"
                                            placeholder="Firmanızın açık adresi..."
                                            autoComplete="street-address"
                                            aria-invalid={!!fieldState.error}
                                            aria-describedby={fieldState.error ? "address-error" : undefined}
                                            {...field}
                                        />
                                        {fieldState.error && <p id="address-error" className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>İl</Label>
                                <Select defaultValue="hatay" disabled>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent><SelectItem value="hatay">Hatay</SelectItem></SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>İlçe</Label>
                                <Select
                                    onValueChange={setDistrict}
                                    value={district}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hatayDistricts.map((d) => (
                                            <SelectItem key={d} value={d.toLowerCase()}>
                                                {d}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="description">Açıklama</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Firmanızın açıklaması..."
                                                className="h-20 resize-none"
                                                autoComplete="off"
                                                aria-invalid={!!fieldState.error}
                                                aria-describedby={fieldState.error ? "description-error" : undefined}
                                                {...field}
                                            />
                                            {fieldState.error && <p id="description-error" className="text-sm text-red-500">{fieldState.error.message}</p>}
                                        </>
                                    )}
                                />

                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Expertise Checks */}
                <Card>
                    <CardHeader>
                        <CardTitle>Uzmanlık Alanları</CardTitle>
                        <CardDescription>Hangi tür işler için talep almak istiyorsunuz?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TooltipProvider>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {expertiseAreas.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                                    >
                                        <Checkbox
                                            id={item.name}
                                            checked={selectedExpertise.includes(item.name)}
                                            onCheckedChange={() => toggleExpertise(item.name)}
                                        />
                                        <Label
                                            htmlFor={item.name}
                                            className="cursor-pointer flex-1 font-normal"
                                            onClick={() => toggleExpertise(item.name)}
                                        >
                                            {item.name}
                                        </Label>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="cursor-help" onClick={(e) => e.stopPropagation()}>
                                                    <AlertCircle className="h-4 w-4 text-muted-foreground hover:text-amber-500 transition-colors" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="max-w-[200px]">
                                                <p className="text-xs">{item.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </TooltipProvider>
                        {errors.expertise && <p className="text-sm text-red-500 mt-2">{errors.expertise.message}</p>}
                    </CardContent>
                </Card>
            </div>

            {/* RIGHT COLUMN: Media & Actions */}
            <div className="lg:col-span-1 space-y-6">

                {/* Logo Upload */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Firma Logosu</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <Avatar className="h-32 w-32 mb-4 border-2 border-dashed border-muted-foreground/30">
                            {avatarUrl ? (
                                <AvatarImage src={avatarUrl} alt="Avatar" className="object-cover" />
                            ) : (
                                <AvatarFallback className="bg-muted text-muted-foreground text-3xl font-light">HM</AvatarFallback>
                            )}
                        </Avatar>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                        />
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            type="button"
                            variant="outline"
                            className="w-full"
                        >
                            <Upload className="mr-2 h-4 w-4" /> Logo Yükle
                        </Button>
                    </CardContent>
                </Card>

                {/* Background Upload */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Arka plan görseli</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 cursor-pointer transition-colors overflow-hidden">
                            {backgroundUrl ? (
                                <img src={backgroundUrl} alt="Background" className="object-cover w-full h-full" />
                            ) : (
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                        </div>
                        <input
                            type="file"
                            ref={backgroundInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleBackgroundUpload}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => backgroundInputRef.current?.click()}
                        >
                            <ImageIcon className="mr-2 h-4 w-4" /> Fotoğraf Ekle
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                            Minimum 1200×400 piksel, tercihen 1920×600 veya üstü.
                        </p>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="sticky top-20 space-y-3">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isPending || isSubmitting}
                        className="w-full font-bold shadow-lg bg-primary hover:bg-primary/90"
                    >
                        {(isPending || isSubmitting) ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-5 w-5" />
                        )}
                        {(isPending || isSubmitting) ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                        Değişiklikler kaydedildiğinde yayınlanacaktır.
                    </p>
                </div>
            </div>
        </form >
    )
}
