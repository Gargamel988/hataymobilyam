"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"
import { ProductHeader } from "@/components/panel/products/ProductHeader"
import { ProductDetails } from "@/components/panel/products/ProductDetails"
import { TechSpecs } from "@/components/panel/products/TechSpecs"
import { FeatureHighlights } from "@/components/panel/products/FeatureHighlights"
import { ProductImages } from "@/components/panel/products/ProductImages"
import { ProductPricing } from "@/components/panel/products/ProductPricing"
import { ProductClassification } from "@/components/panel/products/ProductClassification"
import { Product, productSchema } from "@/schemas/product"
import type { ProductCategory } from "@/lib/data/products"
import { useInsertProductMutation } from "@/mutation/Product"
import { uploadProductImage } from "@/services/ProductServices"
import { toast } from "sonner"
import type { ProductBadgeType } from "@/components/molecules/ProductCard"

export function ProductForm() {
    const { mutateAsync, isPending } = useInsertProductMutation()

    const {
        watch,
        setValue,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            category: "",
            price: "",
            originalPrice: "",
            image_url: [],
            techSpecs: [],
            features: [],
        },
        mode: "onChange"
    })

    const formData = watch()

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim() + "-" + Date.now()
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setValue("name", name, { shouldValidate: true })
        if (name) {
            setValue("slug", generateSlug(name), { shouldValidate: true })
        }
    }

    const handleImageUpload = async (files: File[]) => {
        const currentImages = formData.image_url || []
        const remainingSlots = 5 - currentImages.length

        if (remainingSlots <= 0) {
            toast.error("Maksimum 5 görsel yükleyebilirsiniz.")
            return
        }

        let filesToUpload = files
        if (files.length > remainingSlots) {
            toast.warning(`Sadece ${remainingSlots} görsel yüklenebildi (Limit: 5).`)
            filesToUpload = files.slice(0, remainingSlots)
        }

        try {
            const uploadPromises = filesToUpload.map(file => uploadProductImage(file))
            const urls = await Promise.all(uploadPromises)

            const validUrls = urls.filter(url => url !== null) as string[]

            if (validUrls.length > 0) {
                setValue("image_url", [...currentImages, ...validUrls], { shouldValidate: true })
                toast.success(`${validUrls.length} görsel yüklendi.`)
            }
        } catch (error) {
            console.error(error)
            toast.error("Görseller yüklenirken bir sorun oluştu.")
        }
    }

    const onSubmit = async (data: Product) => {
        try {
            await mutateAsync(data)
            toast.success("Ürün başarıyla eklendi.")
        } catch (error: any) {
            console.error("Submission error:", error)
            let errorMessage = error.message || (typeof error === 'object' ? JSON.stringify(error) : "Bilinmeyen hata")

            if (error.code === '23503') {
                errorMessage = "Ürün ekleyebilmek için önce firma profilinizi oluşturmalısınız. Lütfen profil sayfasına giderek bilgilerinizi tamamlayın."
            }

            toast.error(`Hata: ${errorMessage}`)
        }
    }

    const onInvalid = (errors: any) => {
        console.error("Validation errors:", errors)
        toast.error("Lütfen tüm zorunlu alanları doldurunuz.")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <ProductHeader isSubmitting={isPending} isFormValid={isValid} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-8">
                    <ProductDetails
                        name={formData.name || ""}
                        description={formData.description || ""}
                        onNameChange={handleNameChange}
                        onDescriptionChange={(val) => setValue("description", val, { shouldValidate: true })}
                        errors={{
                            name: errors.name?.message,
                            description: errors.description?.message
                        }}
                    />

                    <TechSpecs
                        specs={formData.techSpecs || []}
                        onAddSpec={(key, value) => {
                            const currentSpecs = formData.techSpecs || []
                            setValue("techSpecs", [...currentSpecs, { key, value }], { shouldValidate: true })
                        }}
                        onRemoveSpec={(index) => {
                            const currentSpecs = formData.techSpecs || []
                            setValue("techSpecs", currentSpecs.filter((_, i) => i !== index), { shouldValidate: true })
                        }}
                    />

                    <FeatureHighlights
                        features={formData.features || []}
                        onAddFeature={(feature) => {
                            const currentFeatures = formData.features || []
                            setValue("features", [...currentFeatures, feature], { shouldValidate: true })
                        }}
                        onRemoveFeature={(index) => {
                            const currentFeatures = formData.features || []
                            setValue("features", currentFeatures.filter((_, i) => i !== index), { shouldValidate: true })
                        }}
                    />
                </div>

                {/* Right Column (Sidebar) */}
                <div className="space-y-8">
                    <ProductImages
                        images={formData.image_url || []}
                        onAddImage={handleImageUpload}
                        onRemoveImage={(index) => {
                            const currentImages = formData.image_url || []
                            setValue("image_url", currentImages.filter((_: string, i: number) => i !== index), { shouldValidate: true })
                        }}
                    />

                    <ProductPricing
                        price={formData.price || ""}
                        originalPrice={formData.originalPrice || ""}
                        onPriceChange={(val) => setValue("price", val, { shouldValidate: true })}
                        onOriginalPriceChange={(val) => setValue("originalPrice", val, { shouldValidate: true })}
                    />

                    <ProductClassification
                        category={(formData.category as ProductCategory) || ""}
                        badge={(formData as any).badge as ProductBadgeType || ""}
                        onCategoryChange={(val) => setValue("category", val, { shouldValidate: true })}
                        onBadgeChange={(val) => {
                            // Assuming badge logic handled similarly if needed
                        }}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className=" w-full sm:w-auto font-bold shadow-lg bg-primary hover:bg-primary/90 "
                        size="lg"
                    >
                        {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Ürünü Kaydet
                    </Button>
                </div>
            </div>

        </form>
    )
}
