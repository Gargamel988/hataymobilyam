import { cn } from "@/lib/utils"
interface ContactInfoItemProps {
    icon: React.ReactNode
    label?: string
    value: string
    href?: string
    className?: string
}

function ContactInfoItem({
    icon,
    label,
    value,
    href,
    className
}: ContactInfoItemProps) {


    const content = (
        <div className={cn("flex items-start gap-3", className)}>
            <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                <span className="text-amber-800">{icon}</span>
            </div>
            <div className="min-w-0">
                {label && (
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                        {label}
                    </p>
                )}
                <p className="text-sm text-foreground font-medium break-words">
                    {value}
                </p>
            </div>
        </div>
    )

    if (href) {
        return (
            <a
                href={href}
                className="block hover:opacity-80 transition-opacity"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
                {content}
            </a>
        )
    }

    return content
}

export { ContactInfoItem }
