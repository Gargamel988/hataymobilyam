import Link from "next/link"
import { Store, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function CTASection() {
    return (
        <section className=" py-16  bg-linear-to-br from-amber-50/50 to-stone-100 dark:from-stone-950 dark:to-stone-900/50">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 container mx-auto max-w-[1450px] ">
                {/* Buyers - Left Column */}
                <div className="relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900 p-8 md:p-12 flex flex-col items-start justify-center text-left group hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <Search className="h-6 w-6 text-stone-700 dark:text-stone-200" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-4">
                        Aradığınız Mobilyayı Bulun
                    </h2>
                    <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-sm text-lg">
                        Hatay&apos;ın en seçkin mobilya üreticilerini keşfedin, hayalinizdeki ürüne doğrudan üreticisinden ulaşın.
                    </p>
                    <Link href="/firmalar">
                        <Button className="h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 text-white dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200">
                            Firmaları Keşfet
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    {/* Abstract Shape/Decoration */}
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-stone-200/50 dark:bg-stone-800/50 rounded-full blur-2xl z-0 pointer-events-none" />
                </div>

                {/* Sellers - Right Column */}
                <div className="relative overflow-hidden rounded-2xl bg-amber-50 dark:bg-amber-950/20 p-8 md:p-12 flex flex-col items-start justify-center text-left group hover:shadow-lg transition-all duration-300 border border-amber-100 dark:border-amber-900/30">
                    <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <Store className="h-6 w-6 text-amber-700 dark:text-amber-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-950 dark:text-amber-50 mb-4">
                        Firmanızı Büyütün
                    </h2>
                    <p className="text-amber-900/80 dark:text-amber-200/80 mb-8 max-w-sm text-lg">
                        Ürünlerinizi binlerce potansiyel müşteriye sergileyin, Hatay Mobilya platformunda yerinizi alın.
                    </p>
                    <Link href="/firma-basvurusu">
                        <Button className="h-12 px-8 text-base bg-amber-600 hover:bg-amber-700 text-white border-none shadow-amber-200/50 hover:shadow-amber-200/60 dark:shadow-none">
                            Firma Profili Oluştur
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    {/* Abstract Shape/Decoration */}
                    <div className="absolute bottom-0 right-0 -mb-8 -mr-8 w-32 h-32 bg-amber-200/30 dark:bg-amber-800/20 rounded-full blur-2xl z-0 pointer-events-none" />
                </div>
            </div>
        </section>
    )
}

export { CTASection }
