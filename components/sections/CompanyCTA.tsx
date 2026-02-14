import Link from "next/link"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CompanyCTA() {
    return (
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200/50 dark:border-amber-800/30 text-center">
            <Building2 className="h-12 w-12 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
                Firmanızı Kaydedin
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Hatay Mobilya Pazarı&apos;na katılın, ürünlerinizi sergileyin ve binlerce potansiyel müşteriye ulaşın.
            </p>
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                <Link href="/giris">
                    Hemen Başla
                </Link>
            </Button>
        </div>
    )
}
