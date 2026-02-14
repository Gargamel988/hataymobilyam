import { X } from "lucide-react"

interface ActiveFilterListProps {
    selectedFilters: Record<string, string[]>
    idToLabel: Record<string, string>
    onRemoveFilter: (categoryId: string, optionId: string) => void
    onClearAll: () => void
}

export function ActiveFilterList({ selectedFilters, idToLabel, onRemoveFilter, onClearAll }: ActiveFilterListProps) {
    const activeFilterCount = Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0)

    if (activeFilterCount === 0) return null

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Aktif filtreler:</span>
            {Object.entries(selectedFilters).map(([categoryId, optionIds]) =>
                optionIds.map(optionId => (
                    <button
                        key={`${categoryId}-${optionId}`}
                        onClick={() => onRemoveFilter(categoryId, optionId)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                    >
                        {idToLabel[optionId] || optionId}
                        <X className="h-3 w-3" />
                    </button>
                ))
            )}
            <button
                onClick={onClearAll}
                className="text-sm text-muted-foreground hover:text-foreground underline"
            >
                Tümünü temizle
            </button>
        </div>
    )
}
