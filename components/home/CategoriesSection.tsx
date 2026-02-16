import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { slug } from "@/utils/GenerateSlug"
import { Category } from "@/types/categories"


interface CategoryStat {
    category: string;
    productCount: number;
    supplierCount: number;
}

function CategoriesSection({ stats }: { stats?: CategoryStat[] }) {

    const categories = Category.map((name, index) => {

        const roomImages: Record<string, string> = {
            "Oturma": "/images/oturma.webp",
            "Yatak": "/images/yatak.webp",
            "Mutfak": "/images/mutfak.avif",
            "Ofis": "/images/ofis.webp",
            "Çocuk": "/images/cocuk.webp",
            "Antre": "/images/depolama.webp",
            "Bahçe": "/images/bahce.webp",
            "Tamamlayıcı": "/images/tamamlayici.webp",
            "Özel": "/images/ozel.webp",
        };


        const getRoomImage = (name: string): string => {
            const matchedKey = Object.keys(roomImages).find(key => name.includes(key));
            return matchedKey ? roomImages[matchedKey] : "";
        };

        const image = getRoomImage(name);

        const stat = stats?.find(s =>
            s.category && (s.category.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(s.category.toLowerCase()))
        );

        return {
            id: index + 1,
            name: name,
            slug: slug(name),
            image: image,
            productCount: stat?.productCount || 0,
            supplierCount: stat?.supplierCount || 0,
        };
    });
    return (
        <section className="py-12 container mx-auto max-w-[1450px]">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-4 md:px-8 gap-4">

                <h2 className="text-2xl font-bold text-foreground   flex flex-col">
                    Kategorilere Göz At
                    <span className="text-muted-foreground mt-1 text-[18px] font-normal">
                        İhtiyacınıza uygun mobilyayı bulun
                    </span>
                </h2>
                <Link
                    href="/products"
                    className="hidden md:flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm"
                >
                    Tüm Kategoriler
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            {/* Category Grid - B2B Style */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/products?kategori=${category.slug}`}
                        className="relative group bg-card border rounded-xl overflow-hidden hover:shadow-lg hover:border-amber-200 dark:hover:border-amber-800 transition-all"
                    >
                        {category.productCount > 200 && (
                            <span className="z-10 absolute top-2 left-2 bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded">
                                Popüler
                            </span>
                        )}
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, 16vw"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                        </div>

                        {/* Info */}
                        <div className="p-3">
                            <h3 className="font-medium text-sm flex items-center gap-1">
                                {category.name}
                                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>


                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <span className="font-medium text-foreground/80">
                                    {category.productCount} ürün
                                </span>

                                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                                <span>{category.supplierCount} tedarikçi</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Mobile Link */}
            <div className="flex  justify-center mt-6">
                <Link
                    href="/kategoriler"
                    className="flex  items-center gap-2 text-amber-700 hover:text-amber-800 font-medium"
                >
                    Tüm Kategoriler
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </section>
    )
}

export { CategoriesSection }
