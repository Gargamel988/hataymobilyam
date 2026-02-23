"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { FilterSidebar, type FilterCategory } from "@/components/organisms/FilterSidebar"
import { Building2, MapPin, Users, TrendingUp } from "lucide-react"
import { CompanyHero } from "@/components/sections/CompanyHero"
import { CompanyToolbar } from "@/components/molecules/CompanyToolbar"
import { ActiveFilterList } from "@/components/molecules/ActiveFilterList"
import { CompanyGrid } from "@/components/sections/CompanyGrid"
import { CompanyCTA } from "@/components/sections/CompanyCTA"
import { getAllCompanies } from "@/services/CompanyServices.client"
import type { Company } from "@/types/company"
import { MobileFilterDrawer } from "./MobileFilterDrawer"
import { normalize } from "@/utils/utils"

interface CompanyPageClientProps {
    baseCategories: FilterCategory[]
}

export function CompanyPageClient({ baseCategories }: CompanyPageClientProps) {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("popular")

    const { data: companies = [] } = useQuery({
        queryKey: ["companies"],
        queryFn: async () => {
            const data = await getAllCompanies()
            return (data && data.length > 0) ? data : []
        },
        staleTime: 1000 * 60 * 5,
    })

    const initialCompanies = companies as Company[]

    // Stats based on total data
    const stats = useMemo(() => [
        { icon: Building2, label: "Kayıtlı Firma", value: `${initialCompanies.length}+` },
        { icon: MapPin, label: "Hatay Bölgesi", value: "15 İlçe" },
        { icon: Users, label: "Aylık Ziyaretçi", value: "10K+" },
        { icon: TrendingUp, label: "Ürün Çeşidi", value: "500+" },
    ], [initialCompanies])

    // Derive ID to Label map from base categories
    const idToLabel = useMemo(() => {
        const map: Record<string, string> = {}
        baseCategories.forEach(cat => {
            cat.options.forEach(opt => {
                map[opt.id] = opt.label
            })
        })
        return map
    }, [baseCategories])

    const filteredCompanies = useMemo(() => {
        let result = initialCompanies

        if (searchQuery) {
            const normalizedQuery = normalize(searchQuery)
            result = result.filter((company) =>
                normalize(company.name).includes(normalizedQuery) ||
                company.categories.some(cat => normalize(cat).includes(normalizedQuery)) ||
                normalize(company.location).includes(normalizedQuery)
            )
        }

        Object.entries(selectedFilters).forEach(([key, values]) => {
            if (values.length === 0) return

            result = result.filter((company) => {
                // Determine attribute based on filter key (id from baseCategories)
                let attributeValues: string[] = []
                if (key === "kategori") attributeValues = company.categories
                else if (key === "konum") attributeValues = [company.location]
                else if (key === "durum" && values.includes("verified")) return company.verified

                if (attributeValues.length === 0 && key !== "durum") return true

                // Check if any selected value matches any of the attribute values
                return values.some(valId =>
                    attributeValues.some(attr =>
                        normalize(attr) === normalize(valId) || normalize(attr) === normalize(idToLabel[valId] || valId)
                    )
                )
            })
        })

        return result
    }, [initialCompanies, selectedFilters, searchQuery, idToLabel])

    const sortedCompanies = useMemo(() => {
        return [...filteredCompanies].sort((a, b) => {
            switch (sortBy) {
                case "rating-desc":
                    return (b.rating || 0) - (a.rating || 0)
                case "rating-asc":
                    return (a.rating || 0) - (b.rating || 0)
                case "newest":
                    return (b.yearEstablished || 0) - (a.yearEstablished || 0)
                case "oldest":
                    return (a.yearEstablished || 0) - (b.yearEstablished || 0)
                case "name-asc":
                    return a.name.localeCompare(b.name, "tr")
                case "name-desc":
                    return b.name.localeCompare(a.name, "tr")
                case "products-desc":
                    return (b.productCount || 0) - (a.productCount || 0)
                default: // popular - rating'e göre
                    return (b.rating || 0) - (a.rating || 0)
            }
        })
    }, [filteredCompanies, sortBy])

    const activeCategories = useMemo(() => {
        const counts: Record<string, number> = {}
        // Initialize counts
        baseCategories.forEach(cat => cat.options.forEach(opt => counts[`${cat.id}-${opt.id}`] = 0))

        filteredCompanies.forEach(c => {
            // Increment for categories
            const cCatsNorm = c.categories.map(cat => normalize(cat))
            const cLocNorm = normalize(c.location)

            // Find matching category options
            const categoryOptions = baseCategories.find(cat => cat.id === "kategori")?.options || []
            const locationOptions = baseCategories.find(cat => cat.id === "konum")?.options || []

            categoryOptions.forEach(opt => {
                const optNorm = normalize(opt.id)
                const optLabelNorm = normalize(opt.label)
                if (cCatsNorm.some(cCat => cCat.includes(optNorm) || cCat.includes(optLabelNorm))) {
                    counts[`kategori-${opt.id}`] = (counts[`kategori-${opt.id}`] || 0) + 1
                }
            })

            locationOptions.forEach(opt => {
                if (normalize(opt.id) === cLocNorm || normalize(opt.label) === cLocNorm) {
                    counts[`konum-${opt.id}`] = (counts[`konum-${opt.id}`] || 0) + 1
                }
            })
        })

        return baseCategories.map(cat => ({
            ...cat,
            options: cat.options.map(opt => ({
                ...opt,
                count: counts[`${cat.id}-${opt.id}`] || 0
            }))
        }))
    }, [filteredCompanies, baseCategories])

    const handleFilterChange = (categoryId: string, optionId: string, checked: boolean) => {
        setSelectedFilters((prev) => {
            const current = prev[categoryId] || []
            if (checked) {
                return { ...prev, [categoryId]: [...current, optionId] }
            } else {
                const updated = current.filter((id) => id !== optionId)
                if (updated.length === 0) {
                    const { [categoryId]: unused, ...rest } = prev
                    return rest
                }
                return { ...prev, [categoryId]: updated }
            }
        })
    }

    const handleClearAll = () => {
        setSelectedFilters({})
        setSearchQuery("")
    }

    const handleRemoveFilter = (categoryId: string, optionId: string) => {
        handleFilterChange(categoryId, optionId, false)
    }

    return (
        <div className="min-h-screen bg-background">
            <CompanyHero
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                stats={stats}
            />

            <div className="container mx-auto px-4 py-8">
                <MobileFilterDrawer
                    categories={activeCategories}
                    totalResultCount={sortedCompanies.length}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={handleClearAll}
                />

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-64 shrink-0">
                        <FilterSidebar
                            categories={activeCategories}
                            selectedFilters={selectedFilters}
                            onFilterChange={handleFilterChange}
                            onClearAll={handleClearAll}
                        />
                    </div>

                    {/* Company Grid/List */}
                    <div className="flex-1">
                        <CompanyToolbar
                            totalCount={sortedCompanies.length}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                        />

                        <ActiveFilterList
                            selectedFilters={selectedFilters}
                            idToLabel={idToLabel}
                            onRemoveFilter={handleRemoveFilter}
                            onClearAll={handleClearAll}
                        />

                        <CompanyGrid
                            companies={sortedCompanies}
                            viewMode={viewMode}
                            onClearFilters={handleClearAll}
                        />

                        {sortedCompanies.length > 0 && (
                            <CompanyCTA />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
