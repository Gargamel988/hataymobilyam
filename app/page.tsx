import { HeroSection } from "@/components/home/HeroSection"
import { CategoriesSection } from "@/components/home/CategoriesSection"
import { CompanyShowcase } from "@/components/home/CompanyShowcase"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CTASection } from "@/components/home/CTASection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { FeaturesSection } from "@/components/home/FeaturesSection"
import { FAQSection } from "@/components/home/FAQSection"
import { QueryClient } from '@tanstack/react-query';
import { getCategory, getCompanies } from '@/services/CategoryService';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Hatay Mobilya | Mobilya Ürünleri",
    template: "%s | Hatay Mobilya"
  },
  description: "Hatay Mobilya; ev ve ofis mobilya ürünlerini satan profesyonel mobilya şirketi",
  keywords: ["Hatay Mobilya", "Web Tasarım", "Mobil Uygulama", "E-Ticaret", "SEO", "Dijital Ajans", "Yazılım Şirketi Hatay", "Next.js", "React Native"],
  authors: [{ name: "Hatay Mobilya Ekibi" }],
  creator: "Hatay Mobilya",
  publisher: "Hatay Mobilya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://hataymobilyam.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hatay Mobilya | Mobilya Ürünleri",
    description: "Hatay Mobilya; ev ve ofis mobilya ürünlerini satan profesyonel mobilya şirketi",
    url: 'https://hataymobilyam.com',
    siteName: 'Hatay Mobilyam',
    images: [
      {
        url: 'https://hataymobilyam.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hatay Mobilya - Mobilya Ürünleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hatay Mobilya | Mobilya Ürünleri',
    description: 'Hatay Mobilya; ev ve ofis mobilya ürünlerini satan profesyonel mobilya şirketi',
    images: ['https://hataymobilyam.com/og-image.png'],
    creator: '@hataymobilyam',
  },
};

export default async function Home() {
  const queryClient = new QueryClient();

  const categoryStats = await queryClient.fetchQuery({
    queryKey: ['categories'],
    queryFn: getCategory,
  });

  const companies = await queryClient.fetchQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });

  const ordercompany = companies.sort((a, b) => b.productCount - a.productCount).slice(0, 8);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero - Full Width, B2B Style */}
      <HeroSection />

      {/* Platform Avantajları */}
      <FeaturesSection />

      {/* Kategoriler */}
      <CategoriesSection
        stats={categoryStats}
      />

      {/* Nasıl Çalışır */}
      <HowItWorksSection />

      {/* Öne Çıkan Tedarikçiler */}
      <CompanyShowcase companies={ordercompany as any} />

      {/* Müşteri Yorumları */}
      <TestimonialsSection />

      {/* Sıkça Sorulan Sorular */}
      <FAQSection />

      {/* CTA */}
      <CTASection />
    </main>
  )
}
