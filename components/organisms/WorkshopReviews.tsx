import { cn } from "@/lib/utils"
import { ReviewCard } from "@/components/molecules/ReviewCard"

interface Review {
    id: string
    name: string
    avatar?: string
    location?: string
    rating: number
    text: string
}

interface WorkshopReviewsProps {
    reviews: Review[]
    className?: string
}

function WorkshopReviews({ reviews, className }: WorkshopReviewsProps) {
    return (
        <section className={cn("py-12", className)}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground">
                        Müşteri Yorumları
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Bu ustadan alışveriş yapanların deneyimleri
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            name={review.name}
                            avatar={review.avatar}
                            location={review.location}
                            rating={review.rating}
                            text={review.text}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export { WorkshopReviews }
export type { Review }
