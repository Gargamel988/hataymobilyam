'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 py-16 text-center sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center space-y-6">
                <div className="relative flex size-32 items-center justify-center rounded-full bg-muted">
                    <FileQuestion className="size-16 text-muted-foreground" aria-hidden="true" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        Sayfa Bulunamadı
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/">
                            <Home className="size-4" />
                            Ana Sayfaya Dön
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="size-4" />
                        Geri Git
                    </Button>
                </div>
            </div>
        </div>
    )
}
