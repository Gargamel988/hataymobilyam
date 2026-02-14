import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag } from "lucide-react"
import { categoryLabels, type ProductCategory } from "@/lib/data/products"
import type { ProductBadgeType } from "@/components/molecules/ProductCard"

// Badge seçenekleri
const badgeOptions: { value: ProductBadgeType; label: string }[] = [
    { value: "new", label: "Yeni" },
    { value: "traditional", label: "Geleneksel" },
    { value: "handmade", label: "El Yapımı" },
    { value: "local", label: "Yerel" },
    { value: "discount", label: "İndirimli" },
]



interface ProductClassificationProps {
    category: ProductCategory | ""
    badge: ProductBadgeType | ""
    onCategoryChange: (value: ProductCategory) => void
    onBadgeChange: (value: ProductBadgeType) => void
}

export function ProductClassification({
    category, badge,
    onCategoryChange, onBadgeChange
}: ProductClassificationProps) {
    return (
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Tag className="h-5 w-5 text-indigo-600 dark:text-indigo-500" />
                    </div>
                    <CardTitle>Sınıflandırma</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <div className="grid gap-2">
                    <Label>Kategori</Label>
                    <Select
                        value={category}
                        onValueChange={(value) => onCategoryChange(value as ProductCategory)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(categoryLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label>Etiket</Label>
                    <Select
                        value={badge}
                        onValueChange={(value) => onBadgeChange(value as ProductBadgeType)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                            {badgeOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


            </CardContent>
        </Card>
    )
}
