import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ProductBadge } from "@/components/atoms/ProductBadge"
import { PriceTag } from "@/components/atoms/PriceTag"
import { SupplierInfo } from "@/components/atoms/SupplierInfo"
import { MapPin, MessageCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ProductBadgeType = "new" | "traditional" | "handmade" | "local" | "discount"

export interface Product {
    id: string
    name: string
    slug: string
    image: string
    price: number
    authorized?: string
    originalPrice?: number
    supplier: {
        name: string
        location: string
    }
    companySlug?: string
    badge?: ProductBadgeType
    badgeText?: string
    isLocal?: boolean
    category: string
}

interface ProductCardProps {
    product: Product
    variant?: "grid" | "list"
    className?: string
}

function ProductCard({ product, variant = "grid", className }: ProductCardProps) {
    // Grid variant - default card layout
    if (variant === "grid") {
        return (
            <article className={cn(
                "group bg-card rounded-xl border overflow-hidden transition-all duration-300",
                "hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200 dark:hover:border-amber-800",
                className
            )}>
                {/* Image Container */}
                <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Badge */}
                        {product.badge && (
                            <div className="absolute top-3 left-3">
                                <ProductBadge variant={product.badge}>
                                    {product.badgeText || getBadgeText(product.badge)}
                                </ProductBadge>
                            </div>
                        )}

                        {/* Quick Actions - Visible on Hover */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="p-2 bg-white/90 dark:bg-stone-900/90 rounded-full hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-lg">
                                <Heart className="h-4 w-4 text-stone-600 dark:text-stone-300 hover:text-red-500 transition-colors" />
                            </button>
                        </div>

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Link>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Title */}
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors min-h-[2.5rem]">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Supplier */}
                    <SupplierInfo
                        name={product.supplier.name}
                        location={product.supplier.location}
                        isLocal={product.isLocal}
                    />

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-dashed">
                        <PriceTag
                            price={product.price}
                            originalPrice={product.originalPrice}
                        />
                        <Link href={`/companies/${product.companySlug}`}>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 gap-1 text-xs px-2 bg-accent"
                            >
                                <MessageCircle className="h-3.5 w-3.5" />
                                Teklif Al
                            </Button>
                        </Link>
                    </div>
                </div>
            </article>
        )
    }

    // List variant - horizontal card layout
    return (
        <article className={cn(
            "group bg-card rounded-xl border overflow-hidden transition-all duration-300",
            "hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200 dark:hover:border-amber-800",
            "flex flex-col sm:flex-row",
            className
        )}>
            {/* Image Container */}
            <div className="relative w-full sm:w-64 md:w-72 aspect-[4/3] sm:aspect-square shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 300px"
                />

                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-3 left-3">
                        <ProductBadge variant={product.badge}>
                            {product.badgeText || getBadgeText(product.badge)}
                        </ProductBadge>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-3 right-3">
                    <button className="p-2 bg-white/90 dark:bg-stone-900/90 rounded-full hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-lg">
                        <Heart className="h-4 w-4 text-stone-600 dark:text-stone-300 hover:text-red-500 transition-colors" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                <div className="space-y-3">
                    {/* Title */}
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Supplier Info - Enhanced for list view */}
                    <div className="flex items-center gap-4 text-sm">
                        <Link
                            href={`/companies/${product.supplier.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="font-medium text-foreground hover:text-amber-600 transition-colors"
                        >
                            {product.supplier.name}
                        </Link>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{product.supplier.location}</span>
                        </div>
                        {product.isLocal && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                                Yerel Üretici
                            </span>
                        )}
                    </div>

                    {/* Description placeholder for list view */}
                    <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">
                        Hatay&apos;ın geleneksel el işçiliği ile üretilen özel mobilya. Kaliteli malzeme ve usta işçilik.
                    </p>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-amber-700 dark:text-amber-500">
                                {product.price.toLocaleString("tr-TR")} ₺
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                    {product.originalPrice.toLocaleString("tr-TR")} ₺
                                </span>
                            )}
                        </div>
                        {product.originalPrice && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                %{Math.round((1 - product.price / product.originalPrice) * 100)} indirim
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/products/${product.slug}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden sm:flex"
                            >
                                Detayları Gör
                            </Button>
                        </Link>
                        <Link href={`/companies/${product.supplier.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            <Button
                                size="sm"
                                className="bg-amber-600 hover:bg-amber-700 text-white gap-1"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Teklif Al
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    )
}

// Helper function for badge text
function getBadgeText(badge: ProductBadgeType): string {
    const badgeTexts: Record<ProductBadgeType, string> = {
        new: "YENİ",
        traditional: "GELENEKSEL",
        handmade: "EL YAPIMI",
        local: "YEREL",
        discount: "İNDİRİM",
    }
    return badgeTexts[badge]
}

export { ProductCard }
