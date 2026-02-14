import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RatingStars } from "@/components/atoms/RatingStars"

interface ReviewCardProps {
    name: string
    avatar?: string
    location?: string
    rating: number
    text: string
    className?: string
}

function ReviewCard({
    name,
    avatar,
    location,
    rating,
    text,
    className
}: ReviewCardProps) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardContent className="p-6">
                {/* Rating */}
                <RatingStars rating={rating} className="mb-4" />

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                    &quot;{text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={avatar} alt={name} />
                        <AvatarFallback className="bg-stone-200 dark:bg-stone-700 text-foreground font-medium">
                            {name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-foreground text-sm">{name}</p>
                        {location && (
                            <p className="text-xs text-muted-foreground">{location}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export { ReviewCard }
