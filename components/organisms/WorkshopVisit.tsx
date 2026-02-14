import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactInfoItem } from "@/components/molecules/ContactInfoItem"
import { MapPin, Clock, Navigation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface WorkshopVisitProps {
    address: string
    workingHours: string
    mapImage?: string
    mapUrl?: string
    className?: string
}

function WorkshopVisit({
    address,
    workingHours,
    mapImage,
    mapUrl,
    className
}: WorkshopVisitProps) {
    return (
        <section className={cn("py-12 bg-stone-50 dark:bg-stone-900/50", className)}>
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            Ziyaret Edin
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Atölyemizi ziyaret edin ve işçiliği yakından görme fırsatı bulun, ağaç seçeneklerini birlikte yapabilelim. Sizi bir kahveye bekleriz.
                        </p>

                        <div className="space-y-4 mb-6">
                            <ContactInfoItem
                                icon={<MapPin className="h-4 w-4" />}
                                label="Adres"
                                value={address}
                            />
                            <ContactInfoItem
                                icon={<Clock className="h-4 w-4" />}
                                label="Çalışma Saatleri"
                                value={workingHours}
                            />
                        </div>

                        {mapUrl && (
                            <Button asChild className="bg-amber-800 hover:bg-amber-700 text-white gap-2">
                                <Link href={mapUrl} target="_blank" rel="noopener noreferrer">
                                    <Navigation className="h-4 w-4" />
                                    Yol Tarifi Al
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Map */}
                    <Card className="overflow-hidden">
                        <div className="relative aspect-video">
                            {mapImage ? (
                                <iframe
                                    src={mapImage}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            ) : (
                                <div className="w-full h-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                                    <MapPin className="h-12 w-12 text-muted-foreground" />
                                </div>
                            )}
                            {/* Map Pin Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-amber-800 text-white p-3 rounded-full shadow-lg">
                                    <MapPin className="h-6 w-6" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export { WorkshopVisit }
