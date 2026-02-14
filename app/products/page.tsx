import { GetProducts } from "@/services/ProductServices"
import { FilterCategory } from "@/components/organisms/FilterSidebar"
import { ProductPageClient } from "./_components/ProductPageClient"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const baseFilterCategories: FilterCategory[] = [
    {
        id: "badge",
        name: "ETİKETLER",
        options: [
            { id: "all", label: "Tümü" },
            { id: "new", label: "Yeni" },
            { id: "traditional", label: "Geleneksel" },
            { id: "handmade", label: "El Yapım" },
            { id: "local", label: "Yerli" },
            { id: "discount", label: "İndirimli" },
        ],
    },
    {
        id: "kategori",
        name: "KATEGORİLER",
        options: [
            { id: "oturma-odasi", label: "Oturma Odası" },
            { id: "yatak-odasi", label: "Yatak Odası" },
            { id: "mutfak", label: "Mutfak" },
            { id: "ofis-ve-calisma", label: "Ofis & Çalışma" },
            { id: "cocuk-ve-genç", label: "Çocuk & Genç" },
            { id: "bahce-ve-balkon", label: "Bahçe & Balkon" },
            { id: "antre-ve-depolama", label: "Antre & Depolama" },
            { id: "tamamlayici-urunler", label: "Tamamlayıcı Ürünler" },
            { id: "ozel-uretim-ve-projeler", label: "Özel Üretim & Projeler" },
        ],
    },
    {
        id: "fiyat",
        name: "FİYAT ARALIĞI (TL)",
        options: [
            { id: "0-10000", label: "0 - 10.000 TL" },
            { id: "10000-20000", label: "10.000 - 20.000 TL" },
            { id: "20000-50000", label: "20.000 - 50.000 TL" },
            { id: "50000+", label: "50.000 TL ve üzeri" },
        ],
    },
    {
        id: "konum",
        name: "KONUM",
        options: [
            { id: "antakya", label: "Antakya" },
            { id: "altinozu", label: "Altınözü" },
            { id: "arsuz", label: "Arsuz" },
            { id: "belen", label: "Belen" },
            { id: "defne", label: "Defne" },
            { id: "dortyol", label: "Dörtyol" },
            { id: "erzin", label: "Erzin" },
            { id: "hassa", label: "Hassa" },
            { id: "iskenderun", label: "İskenderun" },
            { id: "kirikhan", label: "Kırıkhan" },
            { id: "kumlu", label: "Kumlu" },
            { id: "payas", label: "Payas" },
            { id: "reyhanli", label: "Reyhanlı" },
            { id: "samandag", label: "Samandağ" },
            { id: "yayladagi", label: "Yayladağı" }
        ]
    },
]

export default async function ÜrünlerPage() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: GetProducts,
    })

    return (
        <div className="min-h-screen bg-background">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductPageClient
                    baseCategories={baseFilterCategories}
                />
            </HydrationBoundary>
        </div>
    )
}
