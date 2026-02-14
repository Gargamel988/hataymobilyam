import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

interface ProductDetailsProps {
    name: string
    description: string
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDescriptionChange: (value: string) => void
    errors?: {
        name?: string
        description?: string
    }
}

export function ProductDetails({ name, description, onNameChange, onDescriptionChange, errors }: ProductDetailsProps) {
    return (
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <Package className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <div>
                        <CardTitle>Ürün Detayları</CardTitle>
                        <CardDescription>Müşterilerinizin göreceği ana bilgiler</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="grid gap-3">
                    <Label htmlFor="name" className="text-base font-medium">Ürün Adı <span className="text-destructive">*</span></Label>
                    <Input
                        id="name"
                        placeholder="Örn: Antakya El Oyması Ceviz Sandık"
                        value={name}
                        onChange={onNameChange}
                        className={`h-12 text-lg ${errors?.name ? 'border-destructive' : ''}`}
                    />
                    {errors?.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="description" className="text-base font-medium">Açıklama</Label>
                    <Textarea
                        id="description"
                        placeholder="Ürünün hikayesi, kullanım alanları ve detayları..."
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        rows={5}
                        className={`resize-none text-base ${errors?.description ? 'border-destructive' : ''}`}
                    />
                    {errors?.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>
            </CardContent>
        </Card>
    )
}
