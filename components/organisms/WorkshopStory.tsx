import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StatItem } from "@/components/atoms/StatItem"
import { Palette } from "lucide-react"

interface WorkshopStoryProps {
    story: string
    specialties: string[]
    materials: string[]
    stats: {
        completedProjects: number
        yearsExperience: number
        localMaterialPercent: number
    }
    serviceAreas: string[]
    phone?: string
    className?: string
}

function WorkshopStory({
    story,
    specialties,
    materials,
    stats,
    serviceAreas,
    className
}: WorkshopStoryProps) {
    return (
        <section className={cn("py-12", className)}>
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Story */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Firma Hikayesi
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {story}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 py-6 border-y">
                            <StatItem
                                value={stats.completedProjects}
                                suffix="+"
                                label="Tamamlanan Proje"
                            />
                            <StatItem
                                value={stats.yearsExperience}
                                label="Yıl Deneyim"
                            />
                            <StatItem
                                value={`%${stats.localMaterialPercent}`}
                                label="Yerli Malzeme"
                            />
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-amber-800" />
                                    Firma Bilgileri
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                        UZMANLIK ALANLARI
                                    </p>
                                    <p className="text-sm text-foreground">
                                        {specialties.join(", ")}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                        KULLANILAN MALZEMELER
                                    </p>
                                    <p className="text-sm text-foreground">
                                        {materials.join(", ")}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                        HİZMET ALANI
                                    </p>
                                    <p className="text-sm text-foreground">
                                        {serviceAreas.join(", ")}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { WorkshopStory }
