import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const productBadgeVariants = cva(
    "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md",
    {
        variants: {
            variant: {
                default: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
                new: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
                traditional: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
                handmade: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
                local: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
                discount: "bg-red-500 text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface ProductBadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof productBadgeVariants> { }

function ProductBadge({ className, variant, ...props }: ProductBadgeProps) {
    return (
        <span className={cn(productBadgeVariants({ variant }), className)} {...props} />
    )
}

export { ProductBadge, productBadgeVariants }
