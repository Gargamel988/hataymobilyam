import { cn } from "@/lib/utils"

interface StatItemProps {
    value: string | number
    label: string
    suffix?: string
    className?: string
}

function StatItem({ value, label, suffix, className }: StatItemProps) {
    return (
        <div className={cn("text-center", className)}>
            <p className="text-2xl lg:text-3xl font-bold text-foreground">
                {value}
                {suffix && <span className="text-amber-800">{suffix}</span>}
            </p>
            <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wide">
                {label}
            </p>
        </div>
    )
}

export { StatItem }
