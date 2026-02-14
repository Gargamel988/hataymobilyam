
import { getAllCompanies } from "@/services/CompanyServices"
import { FilterCategory } from "@/components/organisms/FilterSidebar"
import { CompanyPageClient } from "./_components/CompanyPageClient"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const baseFilterCategories: FilterCategory[] = [
    {
        id: "konum",
        name: "İLÇELER",
        options: [
            { id: "antakya", label: "Antakya" },
            { id: "iskenderun", label: "İskenderun" },
            { id: "defne", label: "Defne" },
            { id: "samandag", label: "Samandağ" },
            { id: "arsuz", label: "Arsuz" },
            { id: "kirikhan", label: "Kırıkhan" },
            { id: "reyhanli", label: "Reyhanlı" },
            { id: "dortyol", label: "Dörtyol" },
            { id: "hassa", label: "Hassa" },
            { id: "altinozu", label: "Altınözü" },
            { id: "kumlu", label: "Kumlu" },
            { id: "erzin", label: "Erzin" },
            { id: "belen", label: "Belen" },
            { id: "payas", label: "Payas" },
            { id: "yayladagi", label: "Yayladağı" }
        ]
    },
    {
        id: "kategori",
        name: "KATEGORİLER",
        options: [
            { id: "oturma-odasi", label: "Oturma Odası" },
            { id: "yatak-odasi", label: "Yatak Odası" },
            { id: "mutfak", label: "Mutfak" },
            { id: "ofis-calisma", label: "Ofis & Çalışma" },
            { id: "cocuk-genc-odasi", label: "Çocuk & Genç Odası" },
            { id: "antre-depolama", label: "Antre & Depolama" },
            { id: "bahce-balkon", label: "Bahçe & Balkon" },
            { id: "tamamlayici-urunler", label: "Tamamlayıcı Ürünler" }
        ]
    }
]

export default async function FirmalarPage() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["companies"],
        queryFn: getAllCompanies,
    })

    return (
        <div className="min-h-screen bg-background">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CompanyPageClient
                    baseCategories={baseFilterCategories}
                />
            </HydrationBoundary>
        </div>
    )
}
