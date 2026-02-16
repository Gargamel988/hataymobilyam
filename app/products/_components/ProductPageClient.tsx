"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { MobileFilterDrawer } from "./MobileFilterDrawer"
import { SearchHeader } from "./SearchHeader"
import { ProductList } from "./ProductList"
import { FilterCategory, FilterSidebar } from "@/components/organisms/FilterSidebar"
import { type Product } from "@/components/molecules/ProductCard"
import { normalize } from "@/utils/utils"
import { GetProducts } from "@/services/ProductServices.client"

interface ProductPageClientProps {
    baseCategories: FilterCategory[]
}



export function ProductPageClient({ baseCategories }: ProductPageClientProps) {
    const searchParams = useSearchParams()
    const kategoriParam = searchParams.get("kategori")

    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(() => {
        if (kategoriParam) {
            return { kategori: [kategoriParam] } as Record<string, string[]>
        }
        return {} as Record<string, string[]>
    })
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (kategoriParam) {
            setSelectedFilters(prev => ({ ...prev, kategori: [kategoriParam] }))
        } else {
            setSelectedFilters(prev => {
                const { kategori, ...rest } = prev
                return rest
            })
        }
    }, [kategoriParam])

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const data = await GetProducts()
            return (data && data.length > 0) ? data : []
        },
        staleTime: 1000 * 60 * 5,
    })

    const initialProducts = products as Product[]

    const filteredProducts = useMemo(() => {
        let result = initialProducts

        if (searchQuery) {
            const normalizedQuery = normalize(searchQuery)
            result = result.filter((product) =>
                normalize(product.name).includes(normalizedQuery) ||
                normalize(product.category || "").includes(normalizedQuery) ||
                normalize(product.supplier.name).includes(normalizedQuery)
            )
        }

        Object.entries(selectedFilters).forEach(([key, values]) => {
            if (values.length === 0) return

            result = result.filter((product) => {
                switch (key) {
                    case "kategori":
                        return values.includes(product.category)
                    case "konum":
                        return values.includes(normalize(product.supplier.location))
                    case "fiyat":
                        return values.some((range) => {
                            if (range === "0-10000") return product.price <= 10000
                            if (range === "10000-20000") return product.price > 10000 && product.price <= 20000
                            if (range === "20000-50000") return product.price > 20000 && product.price <= 50000
                            if (range === "50000+") return product.price > 50000
                            return true
                        })
                    case "badge":
                        return values.includes(normalize(product.badge || "")) || values.includes("all")
                    default:
                        return true
                }
            })
        })

        return result
    }, [initialProducts, selectedFilters, searchQuery])

    const activeCategories = useMemo(() => {
        const catCounts: Record<string, number> = {}
        const locCounts: Record<string, number> = {}
        const badgeCounts: Record<string, number> = { all: initialProducts.length }


        filteredProducts.forEach((p) => {
            catCounts[p.category] = (catCounts[p.category] || 0) + 1
            if (p.supplier?.location) {
                const loc = normalize(p.supplier.location)
                locCounts[loc] = (locCounts[loc] || 0) + 1
            }
            if (p.badge) {
                const b = normalize(p.badge)
                badgeCounts[b] = (badgeCounts[b] || 0) + 1
            }
        })

        return baseCategories.map(cat => ({
            ...cat,
            options: cat.options.map(opt => {
                let count = 0
                if (cat.id === "kategori") count = catCounts[opt.id] || 0
                else if (cat.id === "konum") count = locCounts[opt.id] || 0
                else if (cat.id === "badge") count = badgeCounts[opt.id] || 0
                else if (cat.id === "fiyat") {
                    if (opt.id === "0-10000") count = filteredProducts.filter((p) => p.price <= 10000).length
                    else if (opt.id === "10000-20000") count = filteredProducts.filter((p) => p.price > 10000 && p.price <= 20000).length
                    else if (opt.id === "20000-50000") count = filteredProducts.filter((p) => p.price > 20000 && p.price <= 50000).length
                    else if (opt.id === "50000+") count = filteredProducts.filter((p) => p.price > 50000).length
                }
                return { ...opt, count }
            })
        }))
    }, [filteredProducts, baseCategories, initialProducts])

    const handleFilterChange = (categoryId: string, optionId: string, checked: boolean) => {
        setSelectedFilters(prev => {
            const current = prev[categoryId] || []
            const updated = checked
                ? [...current, optionId]
                : current.filter(id => id !== optionId)

            if (updated.length === 0) {
                const { [categoryId]: unused, ...rest } = prev
                return rest
            }
            return { ...prev, [categoryId]: updated }
        })
    }

    const handleClearAll = () => {
        setSelectedFilters({})
        setSearchQuery("")
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Hatay Mobilya Koleksiyonu
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Bölgemizin en seçkin üreticilerinden, nesiller boyu aktarılan tekniklerle üretilmiş el emeği mobilyalar.
                </p>
            </div>

            {/* Mobile Filter & Search Header */}
            <div className="lg:hidden space-y-4 mb-6">
                <SearchHeader totalCount={filteredProducts.length} onSearch={setSearchQuery} />
                <MobileFilterDrawer
                    categories={activeCategories}
                    totalResultCount={filteredProducts.length}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={handleClearAll}
                />
            </div>

            {/* Main Content */}
            <div className="flex gap-8 mt-6">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 shrink-0">
                    <div className=" top-24">
                        <FilterSidebar
                            categories={activeCategories}
                            selectedFilters={selectedFilters}
                            onFilterChange={handleFilterChange}
                            onClearAll={handleClearAll}
                        />
                    </div>
                </div>

                {/* Product Grid Column */}
                <div className="flex-1">
                    {/* Desktop Search Header */}
                    <div className="hidden lg:block mb-6">
                        <SearchHeader totalCount={filteredProducts.length} onSearch={setSearchQuery} />
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                        </div>
                    ) : (
                        <ProductList initialProducts={filteredProducts} />
                    )}
                </div>
            </div>
        </div>
    )
}
