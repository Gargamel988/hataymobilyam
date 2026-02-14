import { cn } from "@/lib/utils"

interface PriceTagProps {
    price: number
    originalPrice?: number
    currency?: string
    size?: "sm" | "md" | "lg"
    className?: string
}

function PriceTag({
    price,
    originalPrice,
    currency = "TL",
    size = "md",
    className,
}: PriceTagProps) {
    const hasDiscount = originalPrice && originalPrice > price
    const discountPercent = hasDiscount
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0

    const sizeClasses = {
        sm: "text-sm",
        md: "text-lg",
        lg: "text-2xl",
    }

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat("tr-TR").format(value)
    }

    return (
        <div className={cn("flex items-baseline gap-2", className)}>
            <span className={cn("font-bold text-amber-700 dark:text-amber-500", sizeClasses[size])}>
                {formatPrice(price)} {currency}
            </span>
            {hasDiscount && (
                <>
                    <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(originalPrice)} {currency}
                    </span>
                    <span className="text-xs font-medium text-red-500">
                        %{discountPercent}
                    </span>
                </>
            )}
        </div>
    )
}

export { PriceTag }
