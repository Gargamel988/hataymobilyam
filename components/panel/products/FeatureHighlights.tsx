
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Plus, X, List } from "lucide-react"

interface FeatureHighlightsProps {
    features: string[]
    onAddFeature: (feature: string) => void
    onRemoveFeature: (index: number) => void
}

export function FeatureHighlights({ features, onAddFeature, onRemoveFeature }: FeatureHighlightsProps) {
    const [newFeature, setNewFeature] = useState("")

    const handleAdd = () => {
        if (newFeature) {
            onAddFeature(newFeature)
            setNewFeature("")
        }
    }

    return (
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-4 border-b bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                    </div>
                    <div>
                        <CardTitle>Öne Çıkan Özellikler</CardTitle>
                        <CardDescription>Ürünü benzersiz kılan avantajlar</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="flex gap-3">
                    <Input
                        placeholder="Özellik (Örn: Leke tutmaz kumaş)"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
                    />
                    <Button type="button" onClick={handleAdd} variant="secondary">
                        <Plus className="h-4 w-4 mr-2" /> Ekle
                    </Button>
                </div>

                {features.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-3">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-card border rounded-lg shadow-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemoveFeature(idx)}
                                    className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {features.length === 0 && (
                    <div className="text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground bg-muted/10">
                        <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        Henüz öne çıkan özellik eklenmedi.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
