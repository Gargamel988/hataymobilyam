"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"

interface FilterCategory {
    id: string
    name: string
    options: {
        id: string
        label: string
        count?: number
    }[]
}

interface FilterSidebarProps {
    categories: FilterCategory[]
    priceRange?: { min: number; max: number }
    selectedFilters: Record<string, string[]>
    onFilterChange: (categoryId: string, optionId: string, checked: boolean) => void
    onPriceChange?: (min: number, max: number) => void
    onClearAll: () => void
    className?: string
}

function FilterSidebar({
    categories,
    selectedFilters,
    onFilterChange,
    onClearAll,
    className,
}: FilterSidebarProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>(
        categories.map((c) => c.id)
    )

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        )
    }

    const totalSelectedCount = Object.values(selectedFilters).reduce(
        (acc, curr) => acc + curr.length,
        0
    )

    return (
        <aside className={cn("w-full ", className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-foreground" />
                    <h2 className="font-semibold text-foreground">Filtreler</h2>
                    {totalSelectedCount > 0 && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            {totalSelectedCount}
                        </span>
                    )}
                </div>
                {totalSelectedCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearAll}
                        className="text-muted-foreground hover:text-foreground gap-1"
                    >
                        <X className="h-3.5 w-3.5" />
                        Temizle
                    </Button>
                )}
            </div>

            {/* Filter Categories */}
            <div className="space-y-6">
                {categories.map((category) => {
                    const isExpanded = expandedCategories.includes(category.id)
                    const selectedCount = selectedFilters[category.id]?.length || 0

                    return (
                        <div key={category.id} className="border-b pb-6 last:border-b-0">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="flex items-center justify-between w-full text-left mb-3"
                            >
                                <span className="font-medium text-foreground">
                                    {category.name}
                                    {selectedCount > 0 && (
                                        <span className="ml-2 text-xs text-amber-700">({selectedCount})</span>
                                    )}
                                </span>
                                {isExpanded ? (
                                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )}
                            </button>

                            {/* Options */}
                            {isExpanded && (
                                <div className="space-y-2">
                                    {category.options.map((option) => {
                                        const isChecked = selectedFilters[category.id]?.includes(option.id)

                                        return (
                                            <div key={option.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`${category.id}-${option.id}`}
                                                    checked={isChecked}
                                                    onCheckedChange={(checked) =>
                                                        onFilterChange(category.id, option.id, !!checked)
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`${category.id}-${option.id}`}
                                                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer flex-1"
                                                >
                                                    {option.label}
                                                </Label>
                                                {option.count !== undefined && (
                                                    <span className="text-xs text-muted-foreground">
                                                        ({option.count})
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </aside>
    )
}

export { FilterSidebar }
export type { FilterCategory }
