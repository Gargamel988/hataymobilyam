import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react"

interface ProductHeaderProps {
    isSubmitting: boolean
    isFormValid: boolean
    title?: string
    description?: string
}

export function ProductHeader({ isSubmitting, isFormValid, title = "Yeni Ürün Ekle", description = "Ürününüzü vitrine çıkarmak için tüm detayları doldurun." }: ProductHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild className="h-10 w-10 rounded-full border-2">
                    <Link href="/panel/products">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                    <p className="text-muted-foreground mt-1">{description}</p>
                </div>
            </div>
        </div>
    )
}
