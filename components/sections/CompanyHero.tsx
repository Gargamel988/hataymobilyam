import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CompanyStats } from "@/components/molecules/CompanyStats"

interface CompanyHeroProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    stats: any[]
}

export function CompanyHero({ searchQuery, onSearchChange, stats }: CompanyHeroProps) {
    return (
        <section className="relative bg-gradient-to-br from-amber-50 via-background to-amber-50/30 dark:from-amber-950/20 dark:via-background dark:to-amber-950/10 border-b">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-3xl mx-auto text-center mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Hatay Mobilya Firmaları
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Hatay&apos;ın köklü mobilya üreticileri ve toptancılarını keşfedin. Geleneksel el işçiliğinden modern tasarımlara, güvenilir firmalarla çalışın.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground " />
                        <Input
                            type="text"
                            placeholder="Firma adı, kategori veya konum ara..."
                            className="pl-12 pr-4 h-12 rounded-xl border-2 border-amber-200/50 focus:border-amber-400 bg-background/80"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats */}
                <CompanyStats stats={stats} />
            </div>
        </section>
    )
}
