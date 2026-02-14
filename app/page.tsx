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
