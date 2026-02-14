import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

interface ProductPricingProps {
    price: string
    originalPrice: string
    onPriceChange: (value: string) => void
    onOriginalPriceChange: (value: string) => void
}

export function ProductPricing({ price, originalPrice, onPriceChange, onOriginalPriceChange }: ProductPricingProps) {
    return (
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <CardTitle>Fiyat</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="price">Satış Fiyatı (₺)</Label>
                    <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => onPriceChange(e.target.value)}
                        className="text-lg font-semibold"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="originalPrice" className="text-muted-foreground text-sm">Piyasa Fiyatı (Opsiyonel)</Label>
                    <Input
                        id="originalPrice"
                        type="number"
                        placeholder="0.00"
                        value={originalPrice}
                        onChange={(e) => onOriginalPriceChange(e.target.value)}
                        className="text-muted-foreground"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
