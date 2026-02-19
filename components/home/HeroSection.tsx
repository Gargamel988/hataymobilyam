import Image from "next/image"
import { Button } from "../ui/button"
import { ArrowRight, Globe2, Store } from "lucide-react"
import Link from "next/link"


function HeroSection() {
    return (
        <section
            className="relative overflow-hidden min-h-[420px] lg:min-h-[600px]"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop"
                    alt="Mobilya atölyesi"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center h-full container py-16 mx-auto max-w-[1450px]">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Hatay&apos;ın En Büyük
                    <span className="block text-amber-500 mt-2">Mobilya Pazaryeri</span>
                </h1>
                <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-xl leading-relaxed">
                    Bölgenin en kaliteli mobilya üreticilerini tek platformda keşfedin.
                    Yüzlerce güvenilir firmadan binlerce ürünü karşılaştırın ve güvenle alışveriş yapın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/products">
                        <Button
                            aria-label="Mobilya ürünlerini görüntüle"
                            size="lg"
                            className="bg-amber-600 text-white hover:bg-amber-700 font-semibold text-base px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <Globe2 className="mr-1 h-5 w-5" />
                            Kategoriler
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/auth">
                        <Button
                            aria-label="Firma olarak katıl"
                            size="lg"
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white hover:text-amber-700 font-semibold text-base px-8 py-6 rounded-lg transition-all duration-200"
                        >
                            <Store className="mr-1 h-5 w-5" />
                            Firma Olarak Katıl
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export { HeroSection }