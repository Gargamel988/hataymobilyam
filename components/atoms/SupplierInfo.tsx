import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"

interface SupplierInfoProps {
    name: string
    location?: string
    isLocal?: boolean
    className?: string
}

function SupplierInfo({ name, location, isLocal = true, className }: SupplierInfoProps) {
    return (
        <div className={cn("flex items-center gap-2 text-sm", className)}>
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{name}</span>
            {isLocal && (
                <span className="shrink-0 text-xs px-1.5 py-0.5 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded">
                    YEREL
                </span>
            )}
        </div>
    )
}

export { SupplierInfo }
