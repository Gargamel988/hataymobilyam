"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"
import { FilterSidebar, type FilterCategory } from "@/components/organisms/FilterSidebar"

interface MobileFilterDrawerProps {
    categories: FilterCategory[]
    totalResultCount: number
    selectedFilters: Record<string, string[]>
    onFilterChange: (categoryId: string, optionId: string, checked: boolean) => void
    onClearAll: () => void
}

export function MobileFilterDrawer({
    categories,
    totalResultCount,
    selectedFilters,
    onFilterChange,
    onClearAll
}: MobileFilterDrawerProps) {
    const [isOpen, setIsOpen] = useState(false)

    const activeFilterCount = Object.values(selectedFilters).reduce(
        (acc, curr) => acc + curr.length,
        0
    )

    return (
        <>
            <div className="lg:hidden mb-6">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                    className="gap-2"
                >
                    <Filter className="h-4 w-4" />
                    Filtreler
                    {activeFilterCount > 0 && (
                        <span className="bg-amber-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </Button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-foreground text-lg">Filtreler</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <FilterSidebar
                            categories={categories}
                            selectedFilters={selectedFilters}
                            onFilterChange={onFilterChange}
                            onClearAll={() => {
                                onClearAll()
                            }}
                        />
                        <div className="mt-6 pt-4 border-t">
                            <Button
                                onClick={() => setIsOpen(false)}
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                            >
                                {totalResultCount} Ürün Göster
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
