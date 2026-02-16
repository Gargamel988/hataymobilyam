import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { ChevronLeft, MapPin, Star, Shield, Phone, MessageCircle, Heart, Share2, Truck, Award, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductBadge } from "@/components/atoms/ProductBadge"
import { ProductCard } from "@/components/molecules/ProductCard"
import { GetProductBySlug, GetRelatedProducts } from "@/services/ProductServices"
import Image from "next/image"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await GetProductBySlug(slug)
    if (!product) return { title: "Ürün Bulunamadı" }
    return {
        title: `${product.name} | ${product.supplier?.name || "Hatay Mobilya"}`,
        description: product.description || `${product.name} - Hatay'ın yerel mobilya üreticilerinden kaliteli mobilya ürünü. Detayları inceleyin ve teklif alın.`,
        alternates: { canonical: `/products/${slug}` },
        openGraph: {
            title: `${product.name} | Hatay Mobilya Pazaryeri`,
            description: product.description || `${product.name} ürün detayları`,
            url: `https://hataymobilyam.com/products/${slug}`,
            images: product.images?.[0] ? [{ url: product.images[0], width: 800, height: 800, alt: product.name }] : [],
        },
    }
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params

    const product = await GetProductBySlug(slug)

    if (!product) {
        notFound()
    }

    const relatedProducts = await GetRelatedProducts(product.id, 4)

    return (
        <main className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-amber-600 transition-colors">
                        Ana Sayfa
                    </Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-amber-600 transition-colors">
                        Ürünler
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px]">
                        {product.name}
                    </span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="container mx-auto px-4 pb-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {product.badge && (
                                <div className="absolute top-4 left-4">
                                    <ProductBadge variant={product.badge}>
                                        {product.badgeText}
                                    </ProductBadge>
                                </div>
                            )}
                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="p-2 bg-white/90 dark:bg-stone-900/90 rounded-full hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-lg">
                                    <Heart className="h-5 w-5 text-stone-600 dark:text-stone-300" />
                                </button>
                                <button className="p-2 bg-white/90 dark:bg-stone-900/90 rounded-full hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-lg">
                                    <Share2 className="h-5 w-5 text-stone-600 dark:text-stone-300" />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((image: string, index: number) => (
                                <button
                                    key={index}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${index === 0
                                        ? "border-amber-500 ring-2 ring-amber-500/20"
                                        : "border-transparent hover:border-amber-300"
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} - Görsel ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="150px"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title & Rating */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                    <span className="font-semibold text-foreground">{product.supplier.rating}</span>
                                    <span className="text-muted-foreground">({product.supplier.reviewCount} değerlendirme)</span>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-amber-700 dark:text-amber-500">
                                    {product.price.toLocaleString("tr-TR")} ₺
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg text-muted-foreground line-through">
                                        {product.originalPrice.toLocaleString("tr-TR")} ₺
                                    </span>
                                )}
                            </div>
                            {product.originalPrice && (
                                <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
                                    {Math.round((1 - product.price / product.originalPrice) * 100)}% indirim
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        {/* Supplier Card */}
                        <Link
                            href={`/companies/${product.supplier.slug}`}
                            className="block p-4 bg-card border rounded-xl hover:border-amber-300 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
                                    <Image
                                        src={product.supplier.logo}
                                        alt={product.supplier.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-foreground group-hover:text-amber-600 transition-colors truncate">
                                            {product.supplier.name}
                                        </h3>
                                        {product.supplier.isVerified && (
                                            <Shield className="h-4 w-4 text-amber-500 shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>{product.supplier.location}</span>
                                        <span className="text-amber-600">•</span>
                                        <span>{product.supplier.experience}</span>
                                    </div>
                                </div>
                                <ChevronLeft className="h-5 w-5 text-muted-foreground rotate-180 group-hover:text-amber-500 transition-colors shrink-0" />
                            </div>
                        </Link>

                        {/* CTA Buttons */}
                        <div className="space-y-3">
                            <Button
                                size="lg"
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white gap-2 h-14 text-lg font-semibold"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Teklif Al
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" size="lg" className="gap-2 h-12">
                                    <Phone className="h-4 w-4" />
                                    Ara
                                </Button>
                                <Button variant="outline" size="lg" className="gap-2 h-12 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950/30">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </Button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg mb-2">
                                    <Truck className="h-5 w-5 text-amber-600" />
                                </div>
                                <p className="text-xs font-medium text-foreground">Ücretsiz Teslimat</p>
                                <p className="text-xs text-muted-foreground">Hatay içi</p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg mb-2">
                                    <Award className="h-5 w-5 text-amber-600" />
                                </div>
                                <p className="text-xs font-medium text-foreground">10 Yıl Garanti</p>
                                <p className="text-xs text-muted-foreground">Resmi garanti</p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg mb-2">
                                    <Clock className="h-5 w-5 text-amber-600" />
                                </div>
                                <p className="text-xs font-medium text-foreground">45-60 Gün</p>
                                <p className="text-xs text-muted-foreground">Üretim süresi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <section className="bg-stone-50 dark:bg-stone-900/50 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Specifications */}
                        <div className="bg-card rounded-2xl border p-6">
                            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
                                Teknik Özellikler
                            </h2>
                            <div className="space-y-4">
                                {product.specifications.map((spec: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-3 border-b border-dashed last:border-0"
                                    >
                                        <span className="text-muted-foreground">{spec.label}</span>
                                        <span className="font-medium text-foreground">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-card rounded-2xl border p-6">
                            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
                                Öne Çıkan Özellikler
                            </h2>
                            <div className="space-y-4">
                                {product.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-0.5 p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Info */}
                            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50">
                                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <Truck className="h-4 w-4 text-amber-600" />
                                    Teslimat Bilgileri
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Tahmini üretim ve teslimat süresi: <span className="font-medium text-foreground">{product.deliveryInfo.estimatedDays} gün</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.deliveryInfo.areas.map((area, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs bg-white dark:bg-stone-800 rounded-md border text-muted-foreground"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground">
                            Benzer Ürünler
                        </h2>
                        <Link
                            href="/products"
                            className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                        >
                            Tümünü Gör
                            <ChevronLeft className="h-4 w-4 rotate-180" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {relatedProducts.map((relatedProduct: any) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sticky CTA for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t lg:hidden z-40">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Fiyat</p>
                        <p className="text-xl font-bold text-amber-700 dark:text-amber-500">
                            {product.price.toLocaleString("tr-TR")} ₺
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="bg-amber-600 hover:bg-amber-700 text-white gap-2 px-8"
                    >
                        <MessageCircle className="h-5 w-5" />
                        Teklif Al
                    </Button>
                </div>
            </div>
        </main>
    )
}
