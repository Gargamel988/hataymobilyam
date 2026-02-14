"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchHeaderProps {
    totalCount: number
    onSearch: (query: string) => void
}

export function SearchHeader({ totalCount, onSearch }: SearchHeaderProps) {
    const [value, setValue] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value)
        }, 500)

        return () => clearTimeout(timer)
    }, [value, onSearch])

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card rounded-xl border">
            {/* Results Count */}
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{totalCount}</span> ürün bulundu
                </p>
            </div>
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Ürün ara..."
                    className="pl-9 h-9 bg-background border focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-colors"
                />
            </div>
        </div>
    )
}
