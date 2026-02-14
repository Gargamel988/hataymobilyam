import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/atoms/Badge"
import { CheckCircle, MapPin, Star, Package, Clock, ArrowRight, MessageSquare } from "lucide-react"
import { type Company } from "@/lib/data/company"

interface CompanyCardProps {
    company: Company
    variant?: "grid" | "list"
}

export function CompanyCard({ company, variant = "grid" }: CompanyCardProps) {
    const yearsActive = company.yearEstablished ? new Date().getFullYear() - company.yearEstablished : null

    if (variant === "list") {
        return (
            <Link href={`/companies/${company.slug}`}>
                <div className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:shadow-amber-100/50 dark:hover:shadow-amber-900/20 hover:border-amber-300 cursor-pointer">
                    {/* Logo */}
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden bg-muted border-2 border-amber-100 dark:border-amber-900/50 shrink-0">
                        <Image
                            src={company.logoSrc}
                            alt={company.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="112px"
                        />
                        {company.verified && (
                            <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-0.5">
                                <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-lg text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                                    {company.name}
                                </h3>
                                <p

                                    className="text-sm text-amber-600 dark:text-amber-500 font-medium ">{company.category}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{company.location}, Hatay</span>
                                </div>
                            </div>
                            {company.verified && (
                                <Badge variant="green" className="text-xs gap-1 shrink-0">
                                    <CheckCircle className="h-3 w-3" />
                                    Onaylı
                                </Badge>
                            )}
                        </div>

                        {company.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                                {company.description}
                            </p>
                        )}

                        {/* Stats Row */}
                        <div className="flex items-center gap-6 mt-3 text-sm">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                <span className="font-semibold">{company.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Package className="h-4 w-4" />
                                <span>{company.productCount} ürün</span>
                            </div>
                            {yearsActive && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{yearsActive} yıl</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex items-center">
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
            </Link>
        )
    }

    // Grid variant
    return (
        <Link href={`/companies/${company.slug}`}>
            <div className="group relative flex flex-col gap-4 p-5 rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:shadow-amber-100/50 dark:hover:shadow-amber-900/20 hover:border-amber-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full">
                {/* Verified Badge */}
                {company.verified && (
                    <div className="absolute top-3 right-3">
                        <Badge variant="green" className="text-xs gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Onaylı
                        </Badge>
                    </div>
                )}

                {/* Header with Logo */}
                <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted border-2 border-amber-100 dark:border-amber-900/50 shrink-0">
                        <Image
                            src={company.logoSrc}
                            alt={company.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="64px"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                            {company.name}
                        </h3>
                        <p className="text-sm text-amber-600 dark:text-amber-500 font-medium mt-0.5 line-clamp-1">{company.category}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{company.location}, Hatay</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {company.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {company.description}
                    </p>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="font-bold text-foreground">{company.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Puan</p>
                    </div>
                    <div className="text-center border-x border-border/50">
                        <div className="flex items-center justify-center gap-1">
                            <Package className="h-3.5 w-3.5 text-amber-500" />
                            <span className="font-bold text-foreground">{company.productCount}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Ürün</p>
                    </div>
                    <div className="text-center">
                        {yearsActive ? (
                            <>
                                <div className="flex items-center justify-center gap-1">
                                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                                    <span className="font-bold text-foreground">{yearsActive}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Yıl</p>
                            </>
                        ) : (
                            <>
                                <span className="font-bold text-foreground">-</span>
                                <p className="text-xs text-muted-foreground mt-0.5">Yıl</p>
                            </>
                        )}
                    </div>
                </div>

                {/* View Profile Button */}
                <div className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span>Profili Görüntüle</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    )
}
