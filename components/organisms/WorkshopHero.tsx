import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheck, MapPin, MessageSquare, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { capitalizeWords } from "@/utils/utils"

interface WorkshopHeroProps {
    name: string
    slogan?: string
    background_url?: string
    avatar_url?: string
    expertise?: string[]
    district?: string
    authorized?: string
    isVerified?: boolean
    className?: string
    phone?: string
}

function WorkshopHero({
    name,
    background_url,
    avatar_url,
    expertise,
    district,
    authorized,
    isVerified = false,
    className,
    phone
}: WorkshopHeroProps) {

    return (
        <section className={cn("relative", className)}>
            {/* Cover Image */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                    src={background_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop&q=90"}
                    alt={name}
                    fill
                    quality={100}
                    sizes="100vw"
                    className="object-cover"
                    priority
                    unoptimized={!!background_url}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Workshop Card */}
            <div className="container mx-auto px-4">
                <div className="relative -mt-16 md:-mt-20">
                    <div className="bg-card border rounded-xl p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                        {/* Logo */}
                        <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-background shadow-md">
                            <AvatarImage src={avatar_url} alt={name} />
                            <AvatarFallback className="bg-amber-800 text-white text-2xl font-bold">
                                {name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="capitalize text-xl md:text-2xl font-bold text-foreground">
                                    {capitalizeWords(name)}
                                </h2>
                                {isVerified && (
                                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                                )}
                            </div>

                            {/* Authorized Person */}
                            {authorized && (
                                <p className="text-sm text-muted-foreground mb-1">
                                    Yetkili: <span className="font-medium text-foreground">{capitalizeWords(authorized)}</span>
                                </p>
                            )}

                            {/* Expertise */}
                            {expertise && expertise.length > 0 && (
                                <p className="text-amber-800 font-medium text-sm mb-2">
                                    {expertise.join(" | ")}
                                </p>
                            )}

                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {district ? `${district}, Hatay` : "Hatay"}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <Link href={`tel:+9${phone}`} target="_blank">
                                <Button variant="outline" className="flex-1 md:flex-none">
                                    <Phone className="h-4 w-4" />
                                    Ara
                                </Button>
                            </Link>
                            <Link href={`https://wa.me/+9${phone}`} target="_blank">
                                <Button className="flex-1 md:flex-none bg-amber-800 hover:bg-amber-700 text-white gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Mesaj Gönder
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { WorkshopHero }
