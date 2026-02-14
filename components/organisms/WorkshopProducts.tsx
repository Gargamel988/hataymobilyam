"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProductCard, Product } from "@/components/molecules/ProductCard"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

interface WorkshopProductsProps {
    products: Product[]
    workshopSlug: string
    className?: string
}

function WorkshopProducts({
    products,
    workshopSlug,
    className
}: WorkshopProductsProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <section className={cn("py-12 bg-stone-50 dark:bg-stone-900/50", className)}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Koleksiyondan Parçalar
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Bu ustanın öne çıkan eserleri
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => scroll("left")}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => scroll("right")}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Products Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="w-[280px] md:w-[320px] shrink-0 snap-start"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-6 text-center">
                    <Link href={`/atolye/${workshopSlug}/urunler`}>
                        <Button variant="outline" className="gap-2">
                            Tüm Ürünleri Gör
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export { WorkshopProducts }
