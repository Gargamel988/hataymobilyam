import { notFound } from "next/navigation"
import { WorkshopHero } from "@/components/organisms/WorkshopHero"
import { WorkshopStory } from "@/components/organisms/WorkshopStory"
import { WorkshopProducts } from "@/components/organisms/WorkshopProducts"
import { WorkshopReviews } from "@/components/organisms/WorkshopReviews"
import { WorkshopVisit } from "@/components/organisms/WorkshopVisit"
import { getCompanyBySlug } from "@/services/CompanyServices"
import { getProductsByCompanyId } from "@/services/ProductServices"
import { Product } from "@/components/molecules/ProductCard"


interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function CompanyDetailPage({ params }: PageProps) {
    const { slug } = await params

    const company = await getCompanyBySlug(slug)

    if (!company) {
        notFound()
    }

    const rawProducts = await getProductsByCompanyId(company.id)

    const products: Product[] = rawProducts?.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: Array.isArray(p.image_url) ? p.image_url[0] : (p.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop"), // Handle array or string
        price: p.price,
        authorized: p.authorized,
        originalPrice: p.original_price,
        supplier: { name: company.name, location: company.location },
        badge: "new",
        badgeText: "YENİ",
        isLocal: true,
        category: p.category,
        companySlug: company.slug,
        phone: company.phone
    })) || []

    // Calculate years of experience
    const yearsExperience = new Date().getFullYear() - (company.yearEstablished || 2020)

    // Build workshop data from company
    const workshopData = {
        name: company.name,
        slogan: company.categories[0],
        coverImage: company.logoSrc ? company.logoSrc.replace("w=200", "w=1200").replace("h=200", "h=600") : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
        logo: company.logoSrc,
        authorized: company.authorized,
        experience: `${yearsExperience > 0 ? yearsExperience : 1} Yıllık Tecrübe`,
        specialty: company.categories[0],
        location: `${company.location}, Hatay`,
        isVerified: company.verified,
        story: `${company.description || "Hatay'ın köklü mobilya üreticilerinden."}\n\nKullandığımız malzemeler özenle seçilir ve her bir ürün titizlikle üretilir. Müşteri memnuniyeti bizim için en önemli önceliktir.`,
        specialties: [...company.categories, "Özel Tasarım", "El İşçiliği"],
        materials: ["Masif Ahşap", "Ceviz", "Meşe", "Kayın"],
        serviceAreas: ["Hatay", "Tüm Türkiye"],
        phone: company.phone,
        stats: {
            completedProjects: (products.length * 5) + 10, // Mock calculation based on product count
            yearsExperience: yearsExperience > 0 ? yearsExperience : 1,
            localMaterialPercent: 100,
        },
        address: `${company.address} ${company.location}/Hatay`,
        workingHours: "Pazartesi - Cumartesi 09:00 - 19:00",
        mapImage: `https://maps.google.com/maps?q=${encodeURIComponent(`${company.address || ""} ${company.location} Hatay`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
        mapUrl: `https://maps.google.com/?q=${encodeURIComponent(`${company.address || ""} ${company.location} Hatay`)}`,
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <WorkshopHero
                name={workshopData.name}
                background_url={workshopData.coverImage}
                avatar_url={workshopData.logo}
                expertise={workshopData.specialties}
                district={company.location}
                authorized={company.authorized}
                isVerified={workshopData.isVerified}
                phone={company.phone}
            />

            {/* Story & Info */}
            <WorkshopStory
                story={workshopData.story}
                specialties={workshopData.specialties}
                materials={workshopData.materials}
                stats={workshopData.stats}
                serviceAreas={workshopData.serviceAreas}
            />

            {/* Products */}
            <WorkshopProducts
                products={products}
                workshopSlug={slug}
            />

            {/* Reviews */}
            {/* <WorkshopReviews reviews={reviews} /> */}

            {/* Visit */}
            <WorkshopVisit
                address={workshopData.address}
                workingHours={workshopData.workingHours}
                mapImage={workshopData.mapImage}
                mapUrl={workshopData.mapUrl}
            />
        </main>
    )
}
