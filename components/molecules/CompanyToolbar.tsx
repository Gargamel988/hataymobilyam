import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutList } from "lucide-react"
import { cn } from "@/lib/utils"

interface CompanyToolbarProps {
    totalCount: number
    sortBy: string
    onSortChange: (value: string) => void
    viewMode: "grid" | "list"
    onViewModeChange: (mode: "grid" | "list") => void
}

export function CompanyToolbar({
    totalCount,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange
}: CompanyToolbarProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card rounded-xl border">
            {/* Results Count */}
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{totalCount}</span> firma bulundu
                </p>
            </div>

            <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="h-10 pl-9 pr-8 text-sm border rounded-lg bg-background appearance-none cursor-pointer hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    >
                        <option value="popular">Popüler</option>
                        <option value="rating-desc">Puan: Yüksekten Düşüğe</option>
                        <option value="rating-asc">Puan: Düşükten Yükseğe</option>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                        <option value="products-desc">Ürün Sayısı</option>
                        <option value="name-asc">İsim: A-Z</option>
                        <option value="name-desc">İsim: Z-A</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-muted/50 rounded-lg p-1">
                    <button
                        onClick={() => onViewModeChange("grid")}
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
                        onClick={() => onViewModeChange("list")}
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
    )
}
