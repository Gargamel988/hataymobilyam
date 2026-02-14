"use client"

import { ProductCard, type Product } from "@/components/molecules/ProductCard"
import { Button } from "@/components/ui/button"
import { ChevronDown, Grid3X3, LayoutList, SlidersHorizontal, Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGridProps {
    products: Product[]
    totalCount: number
    isLoading?: boolean
    hasMore?: boolean
    onLoadMore?: () => void
    className?: string
}

function ProductGrid({
    products,
    totalCount,
    isLoading = false,
    hasMore = true,
    onLoadMore,
    className,
}: ProductGridProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("popular")

    // Ürünleri sıralama
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case "price-asc":
                return a.price - b.price
            case "price-desc":
                return b.price - a.price
            case "newest":
                return parseInt(b.id) - parseInt(a.id)
            case "name-asc":
                return a.name.localeCompare(b.name, "tr")
            case "name-desc":
                return b.name.localeCompare(a.name, "tr")
            default:
                return 0
        }
    })

    return (
        <div className={cn("flex-1", className)}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-end gap-4 mb-6">
                <div className="flex items-center gap-3">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-10 pl-9 pr-8 text-sm border rounded-lg bg-background appearance-none cursor-pointer hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        >
                            <option value="popular">Popüler</option>
                            <option value="newest">En Yeni</option>
                            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                            <option value="name-asc">İsim: A-Z</option>
                            <option value="name-desc">İsim: Z-A</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex items-center bg-muted/50 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                                viewMode === "grid"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Grid3X3 className="h-4 w-4" />
                            <span className="hidden md:inline">Grid</span>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                                viewMode === "list"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <LayoutList className="h-4 w-4" />
                            <span className="hidden md:inline">Liste</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid/List */}
            {viewMode === "grid" ? (
                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            variant="grid"
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            variant="list"
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
                        <Search className="h-10 w-10 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        Ürün Bulunamadı
                    </h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                        Seçtiğiniz filtrelere uygun ürün bulunamadı. Farklı filtre kombinasyonları deneyebilir veya filtreleri temizleyebilirsiniz.
                    </p>
                </div>
            )}

            {/* Load More */}
            {hasMore && products.length > 0 && (
                <div className="flex flex-col items-center mt-12">
                    <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                        <span>{products.length} / {totalCount} ürün gösteriliyor</span>
                        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((products.length / totalCount) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onLoadMore}
                        disabled={isLoading}
                        className="gap-2 px-8 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 dark:hover:bg-amber-950/30 dark:hover:border-amber-700 dark:hover:text-amber-400 transition-all"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Yükleniyor...
                            </>
                        ) : (
                            <>
                                Daha Fazla Ürün Göster
                                <ChevronDown className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* All loaded message */}
            {!hasMore && products.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-12 py-4 text-sm text-muted-foreground">
                    <div className="w-8 h-px bg-border" />
                    <span>Tüm ürünler yüklendi</span>
                    <div className="w-8 h-px bg-border" />
                </div>
            )}
        </div>
    )
}

export { ProductGrid }
