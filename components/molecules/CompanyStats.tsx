import { Building2, MapPin, Users, TrendingUp, LucideIcon } from "lucide-react"

interface StatBase {
    icon: LucideIcon
    label: string
    value: string
}

interface CompanyStatsProps {
    stats?: StatBase[]
}

const defaultStats: StatBase[] = [
    { icon: Building2, label: "Kayıtlı Firma", value: "0+" },
    { icon: MapPin, label: "Hatay Bölgesi", value: "0 İlçe" },
    { icon: Users, label: "Aylık Ziyaretçi", value: "10K+" },
    { icon: TrendingUp, label: "Ürün Çeşidi", value: "500+" },
]

export function CompanyStats({ stats = defaultStats }: CompanyStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => {
                const Icon = stat.icon
                return (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-amber-100 dark:border-amber-900/30"
                    >
                        <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        <span className="text-xl font-bold text-foreground">{stat.value}</span>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                )
            })}
        </div>
    )
}
