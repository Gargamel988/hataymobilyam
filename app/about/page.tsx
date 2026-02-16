import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Building2,
    Target,
    Heart,
    Users,
    Star,
    Shield,
    Handshake,
    ArrowRight,
    MapPin,
    Award,
    TrendingUp,
    Sparkles,
} from "lucide-react"

export const metadata: Metadata = {
    title: "Hakkımızda | Hatay Mobilya Pazaryeri",
    description:
        "Hatay Mobilya Pazaryeri hakkında. Hatay'ın yerel mobilya üreticilerini ve zanaatkarlarını dijital dünyada buluşturan B2B platform.",
}

const values = [
    {
        icon: Shield,
        title: "Güvenilirlik",
        description:
            "Tüm firmalar özenle incelenir ve onaylanır. Müşterilerimiz güvenle teklif alabilir.",
    },
    {
        icon: Handshake,
        title: "Şeffaflık",
        description:
            "Teklif süreçlerinde tam şeffaflık sağlarız. Gizli ücret veya komisyon yoktur.",
    },
    {
        icon: Heart,
        title: "Yerel Değer",
        description:
            "Hatay'ın zengin mobilya kültürünü ve yerel üreticileri desteklemeyi amaçlıyoruz.",
    },
    {
        icon: Star,
        title: "Kalite Odaklılık",
        description:
            "Platformumuzdaki her firma, kaliteli işçilik ve müşteri memnuniyeti ilkelerini benimser.",
    },
]

const stats = [
    { value: "50+", label: "Kayıtlı Firma", icon: Building2 },
    { value: "500+", label: "Ürün Çeşidi", icon: Award },
    { value: "1000+", label: "Teklif Talebi", icon: TrendingUp },
    { value: "15+", label: "İlçede Hizmet", icon: MapPin },
]

const teamMembers = [
    {
        name: "Hatay Yazılım",
        role: "Geliştirici Ekip",
        description:
            "Platformun teknik altyapısını geliştiren ve sürekli iyileştiren yazılım ekibi.",
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-amber-50 via-background to-orange-50/30 dark:from-amber-950/20 dark:via-background dark:to-orange-950/10 border-b overflow-hidden">
                <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
                        <Building2 className="h-3.5 w-3.5 mr-1.5" />
                        Bizi Tanıyın
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                        Hakkımızda
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Hatay Mobilya Pazaryeri, Hatay&apos;ın yetenekli mobilya üreticilerini ve zanaatkarlarını
                        dijital dünyada müşterilerle buluşturan bir B2B platformdur.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="mb-3 border-amber-500 text-amber-600">
                                <Target className="h-3.5 w-3.5 mr-1.5" />
                                Misyonumuz
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Hatay&apos;ın Mobilya Sektörünü Dijitale Taşımak
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Hatay, yüzyıllardır süregelen zengin bir mobilya üretim geleneğine sahiptir.
                                Bölgedeki yetenekli ustalar ve modern mobilya firmaları, kaliteli ürünleriyle tanınmaktadır.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Ancak bu değerli üreticilerin müşterilerle buluşması çoğu zaman zor olabiliyor.
                                Hatay Mobilya Pazaryeri olarak, bu boşluğu doldurmak ve yerel ekonomiye katkı sağlamak
                                amacıyla yola çıktık.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Platformumuz sayesinde müşteriler tek bir yerden onlarca firmaya ulaşabilir,
                                teklif alabilir ve projelerini hayata geçirebilir. Firmalar ise dijital bir vitrin
                                kazanarak yeni müşterilere erişim sağlar.
                            </p>
                        </div>
                        <div className="bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/20 rounded-3xl p-8 md:p-12">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white dark:bg-background p-2.5 rounded-lg shadow-sm">
                                        <Users className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Müşteriler İçin</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Tek formla onlarca firmadan ücretsiz teklif alın, karşılaştırın ve en uygun firmayı seçin.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white dark:bg-background p-2.5 rounded-lg shadow-sm">
                                        <Building2 className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Firmalar İçin</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Dijital profilinizi oluşturun, ürünlerinizi sergileyin ve yeni müşterilere ulaşın.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white dark:bg-background p-2.5 rounded-lg shadow-sm">
                                        <Sparkles className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Toplum İçin</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Yerel ekonomiyi destekleyin, Hatay&apos;ın zanaatkarlarına güç katın.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-20 bg-stone-50 dark:bg-stone-900/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Rakamlarla Hatay Mobilya
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Platformumuz hızla büyüyerek Hatay&apos;ın mobilya sektöründe önemli bir yere sahip olmaya başladı.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <Card key={stat.label} className="border-none shadow-lg text-center">
                                    <CardContent className="p-6">
                                        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl w-fit mx-auto mb-3">
                                            <Icon className="h-6 w-6 text-amber-600" />
                                        </div>
                                        <p className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-3">Değerlerimiz</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Bizi Biz Yapan Değerler
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Her adımımızda bu değerleri rehber ediniyoruz.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {values.map((value) => {
                            const Icon = value.icon
                            return (
                                <Card key={value.title} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl w-fit mx-auto mb-4">
                                            <Icon className="h-6 w-6 text-amber-600" />
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                                        <p className="text-sm text-muted-foreground">{value.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Developer Section */}
            <section className="py-16 md:py-20 bg-stone-50 dark:bg-stone-900/30">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <Badge variant="outline" className="mb-3 border-amber-500 text-amber-600">Geliştirici</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Kim Geliştiriyor?
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        Hatay Mobilya Pazaryeri,{" "}
                        <Link href="https://hatayyazilim.com" className="text-amber-600 hover:underline font-semibold">
                            Hatay Yazılım
                        </Link>{" "}
                        tarafından geliştirilmekte ve sürekli olarak iyileştirilmektedir.
                        Amacımız, teknoloji ile yerel ekonomiyi bir araya getirerek Hatay&apos;ın mobilya sektörüne değer katmaktır.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-linear-to-br from-amber-600 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Siz de Aramıza Katılın!
                            </h2>
                            <p className="text-amber-100 max-w-xl mx-auto mb-8 text-lg">
                                İster müşteri olun ister mobilya firması, Hatay Mobilya ailesine katılın
                                ve fırsatlardan yararlanın.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild className="bg-white text-amber-700 hover:bg-amber-50 h-12 px-8 text-base font-semibold">
                                    <Link href="/offer">
                                        Ücretsiz Teklif Al <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 h-12 px-8 text-base font-semibold">
                                    <Link href="/auth">
                                        Firma Olarak Kaydol
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
