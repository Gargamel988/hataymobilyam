
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ruler, Plus, Trash2 } from "lucide-react"

interface TechSpec {
    key: string
    value: string
}

interface TechSpecsProps {
    specs: TechSpec[]
    onAddSpec: (key: string, value: string) => void
    onRemoveSpec: (index: number) => void
}

export function TechSpecs({ specs, onAddSpec, onRemoveSpec }: TechSpecsProps) {
    const [newTechKey, setNewTechKey] = useState("")
    const [newTechValue, setNewTechValue] = useState("")

    const handleAdd = () => {
        if (newTechKey && newTechValue) {
            onAddSpec(newTechKey, newTechValue)
            setNewTechKey("")
            setNewTechValue("")
        }
    }

    return (
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-4 border-b bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Ruler className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                    </div>
                    <div>
                        <CardTitle>Teknik Özellikler</CardTitle>
                        <CardDescription>Malzeme, ölçü ve diğer teknik detaylar</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                        placeholder="Özellik (Örn: Malzeme)"
                        value={newTechKey}
                        onChange={(e) => setNewTechKey(e.target.value)}
                        className="flex-1"
                    />
                    <Input
                        placeholder="Değer (Örn: Gürgen Ağacı)"
                        value={newTechValue}
                        onChange={(e) => setNewTechValue(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
                    />
                    <Button type="button" onClick={handleAdd} variant="secondary">
                        <Plus className="h-4 w-4 mr-2" /> Ekle
                    </Button>
                </div>

                {specs.length > 0 ? (
                    <div className="rounded-lg border divide-y">
                        {specs.map((spec, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 hovering:bg-muted/50 transition-colors">
                                <div className="grid grid-cols-2 gap-4 flex-1">
                                    <span className="font-medium text-muted-foreground">{spec.key}</span>
                                    <span className="font-medium text-foreground">{spec.value}</span>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveSpec(idx)}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-6 border-2 border-dashed rounded-lg text-muted-foreground bg-muted/10">
                        <Ruler className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        Henüz özellik eklenmedi.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
