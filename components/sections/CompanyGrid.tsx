import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CompanyCard } from "@/components/molecules/CompanyCard"
import { type Company } from "@/services/CompanyServices"

interface CompanyGridProps {
    companies: Company[]
    viewMode: "grid" | "list"
    onClearFilters: () => void
}

export function CompanyGrid({ companies, viewMode, onClearFilters }: CompanyGridProps) {
    if (companies.length === 0) {
        return (
            <div className="text-center py-16">
                <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    Firma bulunamadı
                </h3>
                <p className="text-muted-foreground mb-4">
                    Arama kriterlerinize uygun firma bulunamadı.
                </p>
                <Button
                    variant="outline"
                    onClick={onClearFilters}
                >
                    Filtreleri Temizle
                </Button>
            </div>
        )
    }

    return (
        <div className={cn(
            viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
        )}>
            {companies.map((company) => (
                <CompanyCard
                    key={company.id}
                    company={company}
                    variant={viewMode}
                />
            ))}
        </div>
    )
}
