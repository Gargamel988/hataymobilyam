"use client"
import { useState } from "react"
import { ProductGrid } from "@/components/organisms/ProductGrid"
import { type Product } from "@/components/molecules/ProductCard"

interface ProductListProps {
    initialProducts: Product[]
}

export function ProductList({ initialProducts }: ProductListProps) {
    const ITEMS_PER_PAGE = 12
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

    const visibleProducts = initialProducts.slice(0, visibleCount)
    const hasMore = visibleCount < initialProducts.length

    const loadMore = () => {
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, initialProducts.length))
    }

    return (
        <ProductGrid
            products={visibleProducts}
            totalCount={initialProducts.length}
            hasMore={hasMore}
            onLoadMore={loadMore}
        />
    )
}
