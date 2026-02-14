"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus, Upload, X, Loader2 } from "lucide-react"

interface ProductImagesProps {
    images: string[]
    onAddImage: (files: File[]) => Promise<void>
    onRemoveImage: (index: number) => void
}

export function ProductImages({ images, onAddImage, onRemoveImage }: ProductImagesProps) {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)


    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        try {
            setIsUploading(true)
            await onAddImage(Array.from(files))
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    return (
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <ImagePlus className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                    </div>
                    <CardTitle>Görseller</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    {images.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border group bg-muted">
                            <Image src={img} alt="" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={() => onRemoveImage(index)}
                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] py-1 text-center font-medium">
                                    Kapak
                                </div>
                            )}
                        </div>
                    ))}
                    {images.length < 5 && (
                        <button
                            type="button"
                            disabled={isUploading}
                            className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {isUploading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <Upload className="h-6 w-6" />
                            )}
                            <span className="text-xs font-medium">{isUploading ? "Yükleniyor..." : "Yükle"}</span>
                            <span className="text-[10px] text-muted-foreground/60">({images.length}/5)</span>
                        </button>
                    )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                />

            </CardContent>
        </Card>
    )
}
