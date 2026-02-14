import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface RatingStarsProps {
    rating: number
    maxRating?: number
    size?: "sm" | "md" | "lg"
    showValue?: boolean
    className?: string
}

function RatingStars({
    rating,
    maxRating = 5,
    size = "md",
    showValue = false,
    className
}: RatingStarsProps) {
    const sizeClasses = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5"
    }

    return (
        <div className={cn("flex items-center gap-1", className)}>
            {[...Array(maxRating)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        sizeClasses[size],
                        i < rating
                            ? "fill-amber-500 text-amber-500"
                            : "fill-stone-200 text-stone-200 dark:fill-stone-700 dark:text-stone-700"
                    )}
                />
            ))}
            {showValue && (
                <span className="ml-1 text-sm font-medium text-foreground">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    )
}

export { RatingStars }
