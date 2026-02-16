import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, BadgeCheck, MapPin, Package, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

type Company = {
    id: string | number
    name: string
    category: string
    location: string
    logo: string
    productCount: number
    phone: string
    rating: number
    verified: boolean
    yearsActive: number
    slug?: string
}

function CompanyShowcase({ companies }: { companies: Company[] }) {

    return (
        <section className="py-12 container mx-auto max-w-[1450px]">

            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground flex flex-col">
                    Öne Çıkan Tedarikçiler
                    <span className="text-muted-foreground mt-1 text-[18px] font-normal">
                        Bölgenin güvenilir mobilya üreticileri ve tedarikçileri
                    </span>
                </h2>
                <Link href="/firmalar" className=" text-amber-700 ">
                    <Button variant="outline" className="gap-2">
                        Tüm Tedarikçiler
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            {/* Company Cards - B2B Style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {companies.map((company) => (
                    <div
                        key={company.id}
                        className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                        {/* Header with Logo */}
                        <div className="p-4 border-b bg-stone-50 dark:bg-stone-900 flex items-start gap-3">
                            <Image
                                src={company.logo}
                                alt={company.name}
                                width={56}
                                height={56}
                                className="rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-semibold text-foreground truncate group-hover:text-amber-700 transition-colors">
                                        {company.name}
                                    </h3>
                                    {company.verified && (
                                        <BadgeCheck
                                            aria-label="Onaylı firma"
                                            className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">{company.category}</p>
                                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {company.location}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="p-4 grid grid-cols-3 gap-2 text-center text-sm">
                            <p className="font-semibold text-foreground flex flex-col">{company.productCount}
                                <span className="text-muted-foreground text-xs">Ürün</span>
                            </p>
                            <div className="flex flex-col">
                                <div className="flex items-center justify-center gap-1">
                                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                    <span className="font-semibold text-foreground">{company.rating}</span>
                                </div>
                                <span className="text-muted-foreground text-xs">Puan</span>
                            </div>
                            <p className="font-semibold text-foreground flex flex-col">{company.yearsActive} Yıl
                                <span className="text-muted-foreground text-xs">Deneyim</span>
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="p-4 pt-0 flex gap-2">
                            <Link href={`/companies/${company.slug}`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full gap-1">
                                    <Package className="h-3.5 w-3.5" />
                                    Ürünleri Gör
                                </Button>
                            </Link>
                            <Link href={`https://wa.me/+90${company.phone}`} className="flex-1" target="_blank">
                                <Button size="sm" className="flex-1 gap-1 bg-amber-700 hover:bg-amber-800 text-white">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    İletişime Geç
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export { CompanyShowcase }
