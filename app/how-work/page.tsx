import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Nasıl Çalışır? | Hatay Mobilya Pazaryeri Kullanım Rehberi",
    description: "Hatay Mobilya Pazaryeri nasıl çalışır? Firma keşfi, teklif alma ve mobilya sipariş sürecini adım adım öğrenin. Müşteriler ve firmalar için rehber.",
    alternates: { canonical: "/how-work" },
    openGraph: {
        title: "Nasıl Çalışır? | Hatay Mobilya Pazaryeri Kullanım Rehberi",
        description: "Mobilya teklif alma sürecini adım adım öğrenin.",
        url: "https://hataymobilyam.com/how-work",
    },
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
    Search,
    FileText,
    MessageSquare,
    Handshake,
    Building2,
    Package,
    Users,
    Star,
    Shield,
    Clock,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Target,
    TrendingUp
} from "lucide-react"

const customerSteps = [
    {
        step: 1,
        title: "Projenizi Tanımlayın",
        description: "İstediğiniz mobilyayı, ölçülerini ve malzeme tercihlerinizi belirtin. Referans görseller ekleyebilirsiniz.",
        icon: FileText,
        color: "bg-blue-500"
    },
    {
        step: 2,
        title: "Teklif İsteyin",
        description: "Tek bir formla onlarca firmaya teklif talebi gönderin. Zaman ve emek tasarrufu sağlayın.",
        icon: MessageSquare,
        color: "bg-amber-500"
    },
    {
        step: 3,
        title: "Teklifleri Karşılaştırın",
        description: "Gelen teklifleri fiyat, süre ve firma puanlarına göre değerlendirin.",
        icon: Search,
        color: "bg-green-500"
    },
    {
        step: 4,
        title: "Anlaşın ve Üretim Başlasın",
        description: "Beğendiğiniz firma ile iletişime geçin, detayları netleştirin ve projenizi başlatın.",
        icon: Handshake,
        color: "bg-purple-500"
    },
]

const firmSteps = [
    {
        step: 1,
        title: "Firma Kaydı Oluşturun",
        description: "Ücretsiz hesap açın, firmanızın profilini ve portföyünü oluşturun.",
        icon: Building2,
        color: "bg-amber-600"
    },
    {
        step: 2,
        title: "Ürünlerinizi Sergileyin",
        description: "Ürettiğiniz mobilyaların fotoğraflarını ve açıklamalarını ekleyin.",
        icon: Package,
        color: "bg-orange-500"
    },
    {
        step: 3,
        title: "Talepleri Görüntüleyin",
        description: "Size uygun müşteri taleplerini inceleyin ve teklif verin.",
        icon: Target,
        color: "bg-teal-500"
    },
    {
        step: 4,
        title: "İş Hacminizi Artırın",
        description: "Yeni müşteriler kazanın, puanlarınızla öne çıkın.",
        icon: TrendingUp,
        color: "bg-indigo-500"
    },
]

const benefits = [
    {
        title: "Ücretsiz Kullanım",
        description: "Müşteriler için tamamen ücretsiz. Firmalar için başlangıç planı ücretsiz.",
        icon: Sparkles,
    },
    {
        title: "Güvenli İletişim",
        description: "Platform üzerinden güvenli mesajlaşma ve bilgi paylaşımı.",
        icon: Shield,
    },
    {
        title: "Hızlı Sonuç",
        description: "Ortalama 24 saat içinde teklif almaya başlayın.",
        icon: Clock,
    },
    {
        title: "Doğrulanmış Firmalar",
        description: "Tüm firmalar manuel olarak incelenir ve onaylanır.",
        icon: CheckCircle2,
    },
    {
        title: "Müşteri Yorumları",
        description: "Gerçek müşteri deneyimlerini okuyun, bilinçli karar verin.",
        icon: Star,
    },
    {
        title: "Yerel Ekonomi",
        description: "Hatay'ın yerel üreticilerini destekleyin, kaliteyi yerelde bulun.",
        icon: Users,
    },
]

const faqs = [
    {
        q: "Teklif almak ücretli mi?",
        a: "Hayır, müşteriler için platformumuz tamamen ücretsizdir. Dilediğiniz kadar teklif isteyin."
    },
    {
        q: "Firmalar nasıl seçiliyor?",
        a: "Tüm firmalar, portföyleri ve referansları incelenerek platforma kabul edilir. Sürekli müşteri geri bildirimleri takip edilir."
    },
    {
        q: "Ödeme nasıl yapılır?",
        a: "Ödeme, müşteri ve firma arasında doğrudan gerçekleşir. Platform herhangi bir ödeme aracılığı yapmaz."
    },
    {
        q: "Kargo ve montaj dahil mi?",
        a: "Bu tamamen firmaya bağlıdır. Teklif alırken kargo ve montaj hizmetlerini sorgulamanızı öneririz."
    },
    {
        q: "Şikayetimi nasıl iletebilirim?",
        a: "destek@hataymobilya.com adresine veya iletişim sayfamızdaki formu kullanarak bize ulaşabilirsiniz."
    },
]

export default function HowWorkPage() {
    return (
        <div className="min-h-screen bg-background">

            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-amber-50 via-background to-orange-50/30 dark:from-amber-950/20 dark:via-background dark:to-orange-950/10 border-b overflow-hidden">
                <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
                        Basit ve Şeffaf
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                        Nasıl Çalışır?
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                        Hatay Mobilya, hayalinizdeki mobilyayı bölgenin en iyi ustalarıyla buluşturan bir köprüdür.
                        İster müşteri olun ister firma, süreç son derece basittir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-amber-600 hover:bg-amber-700 text-white h-12 px-8 text-base font-semibold">
                            <Link href="/offer">
                                Teklif Al <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base font-semibold">
                            <Link href="/auth">
                                Firma Olarak Katıl
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Customer Steps */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-3">Müşteriler İçin</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            4 Adımda Hayalinizdeki Mobilya
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Karmaşık süreçlere son. Tek platform üzerinden onlarca firmadan teklif alın.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {customerSteps.map((step) => {
                            const Icon = step.icon
                            return (
                                <Card key={step.step} className="relative border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
                                    <div className={`absolute -top-4 left-6 ${step.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md`}>
                                        {step.step}
                                    </div>
                                    <CardHeader className="pt-8 pb-2">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-amber-600" />
                                            <CardTitle className="text-lg">{step.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Firm Steps */}
            <section className="py-16 md:py-24 bg-stone-50 dark:bg-stone-900/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-3 border-amber-500 text-amber-600">Firmalar İçin</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            İşinizi Büyütmenin Yolu
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Yeni müşterilere ulaşın, portföyünüzü sergileyin ve rekabetçi teklifler verin.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {firmSteps.map((step) => {
                            const Icon = step.icon
                            return (
                                <Card key={step.step} className="relative border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
                                    <div className={`absolute -top-4 left-6 ${step.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md`}>
                                        {step.step}
                                    </div>
                                    <CardHeader className="pt-8 pb-2">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-amber-600" />
                                            <CardTitle className="text-lg">{step.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Neden Hatay Mobilya?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Platformumuz, hem müşteriler hem de firmalar için avantajlarla doludur.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon
                            return (
                                <div key={benefit.title} className="flex gap-4 p-6 rounded-xl bg-card border hover:border-amber-200 transition-colors">
                                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg h-fit">
                                        <Icon className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-24 bg-stone-50 dark:bg-stone-900/30">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Sıkça Sorulan Sorular
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-card border rounded-xl p-6">
                                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-linear-to-br from-amber-600 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Haydi Başlayalım!
                            </h2>
                            <p className="text-amber-100 max-w-xl mx-auto mb-8 text-lg">
                                İster müşteri olun ister firma, Hatay Mobilya ailesine katılın ve mobilya dünyasının kapılarını aralayın.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild className="bg-white text-amber-700 hover:bg-amber-50 h-12 px-8 text-base font-semibold">
                                    <Link href="/offer">
                                        Ücretsiz Teklif Al
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 h-12 px-8 text-base font-semibold">
                                    <Link href="/companies">
                                        Firmaları Keşfet
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
