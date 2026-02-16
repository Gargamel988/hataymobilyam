import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageSquare,
    Globe,
    Facebook,
    Instagram,
    Twitter,
    Send,
    Headphones,
    HelpCircle,
} from "lucide-react"

export const metadata: Metadata = {
    title: "İletişim | Hatay Mobilya Pazaryeri",
    description:
        "Hatay Mobilya Pazaryeri ile iletişime geçin. Sorularınız, önerileriniz ve şikayetleriniz için bize ulaşın.",
}

const contactMethods = [
    {
        icon: Phone,
        title: "Telefon",
        description: "Hafta içi 09:00 - 18:00 arası arayabilirsiniz.",
        value: "0553 731 92 88",
        href: "tel:+905537319288",
        action: "Hemen Ara",
    },
    {
        icon: Mail,
        title: "E-posta",
        description: "7/24 e-posta gönderebilirsiniz, en kısa sürede yanıtlarız.",
        value: "destek@hataymobilya.com",
        href: "mailto:destek@hataymobilya.com",
        action: "E-posta Gönder",
    },
    {
        icon: MessageSquare,
        title: "WhatsApp",
        description: "Hızlı destek için WhatsApp üzerinden yazabilirsiniz.",
        value: "0553 731 92 88",
        href: "https://wa.me/905537319288?text=Merhaba%2C%20Hatay%20Mobilya%20Pazaryeri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
        action: "WhatsApp'tan Yaz",
    },
    {
        icon: Globe,
        title: "Web Sitesi",
        description: "Geliştirici ekibimiz hakkında daha fazla bilgi alın.",
        value: "hatayyazilim.com",
        href: "https://hatayyazilim.com",
        action: "Siteyi Ziyaret Et",
    },
]

const faqs = [
    {
        q: "Teklif almak ücretli mi?",
        a: "Hayır, müşteriler için platformumuz tamamen ücretsizdir. Dilediğiniz kadar teklif talep edebilirsiniz.",
    },
    {
        q: "Firma olarak nasıl kayıt olabilirim?",
        a: "Ana sayfadaki 'Firma Olarak Katıl' butonuna tıklayarak veya /auth sayfasından firma kaydınızı oluşturabilirsiniz.",
    },
    {
        q: "Ürün iade ve değişim nasıl yapılır?",
        a: "Ürün iade ve değişim süreçleri doğrudan firma ile yürütülmektedir. Platform aracılık yapmamaktadır.",
    },
    {
        q: "Şikayetimi nasıl iletebilirim?",
        a: "destek@hataymobilya.com adresine veya WhatsApp üzerinden bize ulaşabilirsiniz. En kısa sürede ilgileneceğiz.",
    },
    {
        q: "Platform hangi bölgelerde hizmet veriyor?",
        a: "Şu anda yalnızca Hatay ili ve ilçelerinde hizmet vermekteyiz.",
    },
]

const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
]

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-amber-50 via-background to-orange-50/30 dark:from-amber-950/20 dark:via-background dark:to-orange-950/10 border-b overflow-hidden">
                <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
                        <Headphones className="h-3.5 w-3.5 mr-1.5" />
                        Size Yardımcı Olalım
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                        İletişim
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Sorularınız, önerileriniz veya şikayetleriniz için bize her zaman ulaşabilirsiniz.
                        En kısa sürede size geri dönüş yapmaya çalışacağız.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Bize Ulaşın
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Size en uygun iletişim kanalını seçin. Her kanaldan hızlı destek sağlıyoruz.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {contactMethods.map((method) => {
                            const Icon = method.icon
                            return (
                                <Card key={method.title} className="border shadow-lg hover:shadow-xl transition-shadow group">
                                    <CardContent className="p-6 md:p-8">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                                <Icon className="h-6 w-6 text-amber-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-foreground mb-1">
                                                    {method.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {method.description}
                                                </p>
                                                <p className="text-base font-medium text-foreground mb-4">
                                                    {method.value}
                                                </p>
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/30"
                                                >
                                                    <Link href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined}>
                                                        <Send className="h-4 w-4 mr-2" />
                                                        {method.action}
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 md:py-20 bg-stone-50 dark:bg-stone-900/30">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Address & Working Hours */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <MapPin className="h-6 w-6 text-amber-600" />
                                Adres ve Çalışma Saatleri
                            </h2>
                            <Card className="border-none shadow-lg">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="font-medium text-foreground">Adres</p>
                                            <p className="text-sm text-muted-foreground">
                                                Hatay, Türkiye
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="font-medium text-foreground">Çalışma Saatleri</p>
                                            <div className="text-sm text-muted-foreground space-y-1 mt-1">
                                                <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                                                <p>Cumartesi: 09:00 - 14:00</p>
                                                <p>Pazar: Kapalı</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="font-medium text-foreground">E-posta Yanıt Süresi</p>
                                            <p className="text-sm text-muted-foreground">
                                                Genellikle 24 saat içinde yanıt veriyoruz.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <Globe className="h-6 w-6 text-amber-600" />
                                Sosyal Medya
                            </h2>
                            <Card className="border-none shadow-lg">
                                <CardContent className="p-6">
                                    <p className="text-muted-foreground mb-6">
                                        Güncel haberler, yeni firmalar ve kampanyalar için bizi sosyal medyada takip edin.
                                    </p>
                                    <div className="space-y-3">
                                        {socialLinks.map((social) => {
                                            const Icon = social.icon
                                            return (
                                                <Link
                                                    key={social.label}
                                                    href={social.href}
                                                    className="flex items-center gap-3 p-3 rounded-xl bg-stone-100 dark:bg-stone-800/50 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors group"
                                                >
                                                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                                                        <Icon className="h-5 w-5 text-amber-600" />
                                                    </div>
                                                    <span className="font-medium text-foreground">{social.label}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-3">
                            <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
                            SSS
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Sıkça Sorulan Sorular
                        </h2>
                        <p className="text-muted-foreground">
                            İletişime geçmeden önce burada cevabınızı bulabilirsiniz.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-linear-to-br from-amber-600 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Yardıma mı İhtiyacınız Var?
                            </h2>
                            <p className="text-amber-100 max-w-xl mx-auto mb-8 text-lg">
                                WhatsApp üzerinden anında destek alabilirsiniz.
                                Size yardımcı olmaktan mutluluk duyarız.
                            </p>
                            <Button size="lg" asChild className="bg-white text-amber-700 hover:bg-amber-50 h-12 px-8 text-base font-semibold">
                                <Link href="https://wa.me/905537319288?text=Merhaba%2C%20Hatay%20Mobilya%20Pazaryeri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank">
                                    <MessageSquare className="mr-2 h-5 w-5" />
                                    WhatsApp&apos;tan Yaz
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
