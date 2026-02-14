"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Building2, User, Phone, Mail, Lock, MapPin } from "lucide-react"
import { RegisterScheme, registerScheme } from "@/schemas/registerScheme"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

const sehirler: string[] = [
    "Antakya",
    "İskenderun",
    "Defne",
    "Samandağ",
    "Dörtyol",
    "Reyhanlı",
    "Kırıkhan",
    "Arsuz",
    "Payas",
    "Belen",
]

const hizmetler: { id: string, label: string }[] = [
    { id: "salon", label: "Salon Takımları" },
    { id: "yatak", label: "Yatak Odası" },
    { id: "yemek", label: "Yemek Odası" },
    { id: "mutfak", label: "Mutfak Mobilyası" },
    { id: "ofis", label: "Ofis Mobilyası" },
    { id: "bahce", label: "Bahçe & Dış Mekan" },
    { id: "diger", label: "Diğer" },
]

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const { registerMutation } = useAuth()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterScheme>({
        resolver: zodResolver(registerScheme),
        defaultValues: {
            firma_adi: "",
            yetkili_adi: "",
            telefon: "",
            email: "",
            sifre: "",
            sehir: "",
            hizmetler: [],
        },
    })

    const onSubmit = (data: RegisterScheme) => {
        registerMutation.mutate({
            email: data.email,
            password: data.sifre,
            firma_adi: data.firma_adi,
            yetkili_adi: data.yetkili_adi,
            telefon: data.telefon,
            sehir: data.sehir,
            hizmetler: data.hizmetler,
        })
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-1">
                    Firma Kayıt
                </h1>
                <p className="text-muted-foreground text-sm">
                    Hatay&apos;ın mobilya mirasına katılın
                </p>
            </div>

            {/* Form */}
            <form action="/api/auth/register" method="POST" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Firma Adı */}
                <div className="space-y-1.5">
                    <Label htmlFor="firma_adi" className="text-sm font-medium">
                        Firma Adı
                    </Label>
                    <Controller
                        name="firma_adi"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        {...field}
                                        id="firma_adi"
                                        type="text"
                                        placeholder="Örn: Antakya Mobilya"
                                        className="h-11 pl-10"
                                        inputMode="text"
                                        required

                                    />
                                </div>
                                {errors.firma_adi && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firma_adi.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Yetkili Kişi Adı */}
                <div className="space-y-1.5">
                    <Label htmlFor="yetkili_adi" className="text-sm font-medium">
                        Yetkili Kişi Adı
                    </Label>
                    <Controller
                        name="yetkili_adi"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        {...field}
                                        id="yetkili_adi"
                                        type="text"
                                        placeholder="Ad Soyad"
                                        className="h-11 pl-10"
                                        inputMode="text"
                                        required
                                    />
                                </div>
                                {errors.yetkili_adi && (
                                    <p className="text-red-500 text-xs mt-1">{errors.yetkili_adi.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* İki Sütunlu Alan - Telefon ve E-posta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Telefon */}
                    <div className="space-y-1.5">
                        <Label htmlFor="telefon" className="text-sm font-medium">
                            Telefon (WhatsApp)
                        </Label>
                        <Controller
                            name="telefon"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            {...field}
                                            id="telefon"
                                            type="tel"
                                            placeholder="0532 123 45 67"
                                            className="h-11 pl-10"
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '')
                                                let formattedValue = ''

                                                if (value.length > 0) {
                                                    formattedValue = value.substring(0, 4)
                                                    if (value.length > 4) {
                                                        formattedValue += ' ' + value.substring(4, 7)
                                                    }
                                                    if (value.length > 7) {
                                                        formattedValue += ' ' + value.substring(7, 9)
                                                    }
                                                    if (value.length > 9) {
                                                        formattedValue += ' ' + value.substring(9, 11)
                                                    }
                                                }

                                                field.onChange(formattedValue)
                                            }}
                                            maxLength={14}
                                            inputMode="numeric"
                                        />
                                    </div>
                                    {errors.telefon && (
                                        <p className="text-red-500 text-xs mt-1">{errors.telefon.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    {/* E-posta */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">
                            E-posta
                        </Label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="firma@example.com"
                                            className="h-11 pl-10"
                                            inputMode="email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* İki Sütunlu Alan - Şifre ve Şehir */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Şifre */}
                    <div className="space-y-1.5">
                        <Label htmlFor="sifre" className="text-sm font-medium">
                            Şifre
                        </Label>
                        <Controller
                            name="sifre"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            {...field}
                                            id="sifre"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Min. 8 karakter"
                                            className="h-11 pl-10 pr-10"
                                            inputMode="text"
                                            required

                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.sifre && (
                                        <p className="text-red-500 text-xs mt-1">{errors.sifre.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    {/* Şehir */}
                    <div className="space-y-1.5">
                        <Label htmlFor="sehir" className="text-sm font-medium">
                            İlçe
                        </Label>
                        <Controller
                            name="sehir"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                                        <select
                                            {...field}
                                            id="sehir"
                                            className="flex h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none"
                                        >
                                            <option value="">Seçin</option>
                                            {sehirler.map((sehir) => (
                                                <option key={sehir} value={sehir.toLowerCase()}>
                                                    {sehir}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.sehir && (
                                        <p className="text-red-500 text-xs mt-1">{errors.sehir.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* Hizmet Kategorileri */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">
                        Hizmet Kategorileri
                        <span className="text-muted-foreground font-normal ml-1">(En az 1 seçin)</span>
                    </Label>
                    <Controller
                        name="hizmetler"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <div className="grid grid-cols-2 gap-2">
                                    {hizmetler.map((hizmet) => (
                                        <div key={hizmet.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={hizmet.id}
                                                checked={field.value?.includes(hizmet.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...field.value, hizmet.id])
                                                    } else {
                                                        field.onChange(field.value.filter((v: string) => v !== hizmet.id))
                                                    }
                                                }}
                                                className=" bg-white border border-gray-300"
                                            />
                                            <Label
                                                htmlFor={hizmet.id}
                                                className="text-sm font-normal cursor-pointer"
                                            >
                                                {hizmet.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.hizmetler && (
                                    <p className="text-red-500 text-xs mt-1">{errors.hizmetler.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium mt-4"
                >
                    {isSubmitting ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
                </Button>

                {/* Terms */}
                <p className="text-xs text-center text-muted-foreground">
                    Kayıt olarak{" "}
                    <a href="/kullanim-sartlari" className="text-amber-700 hover:underline">
                        Kullanım Şartları
                    </a>
                    &apos;nı kabul etmiş olursunuz.
                </p>
            </form>

            {/* Switch to Login */}
            <p className="text-center mt-6 text-sm text-muted-foreground">
                Zaten bir hesabınız var mı?{" "}
                <Link
                    href="/auth?mode=login"
                    className="text-amber-700 font-semibold hover:underline"
                >
                    Giriş Yap
                </Link>
            </p>
        </div>
    )
}

export { RegisterForm }
