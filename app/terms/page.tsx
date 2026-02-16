import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"
import Link from "next/link"
import {
    Scale,
    FileText,
    Users,
    ShieldCheck,
    AlertTriangle,
    Ban,
    CreditCard,
    MessageSquare,
    Copyright,
    Gavel,
    BookOpen,
    Mail,
} from "lucide-react"

export const metadata: Metadata = {
    title: "Kullanım Koşulları | Hatay Mobilya Pazaryeri",
    description:
        "Hatay Mobilya Pazaryeri kullanım koşulları. Platformu kullanmadan önce lütfen bu koşulları dikkatlice okuyunuz.",
}

const sections = [
    {
        id: "genel",
        icon: BookOpen,
        title: "1. Genel Hükümler",
        content: [
            "Bu kullanım koşulları, Hatay Mobilya Pazaryeri (bundan sonra \"Platform\" olarak anılacaktır) web sitesinin ve hizmetlerinin kullanımına ilişkin kuralları ve şartları belirler.",
            "Platformu kullanarak, bu kullanım koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz. Bu koşulları kabul etmiyorsanız, platformu kullanmamanız gerekmektedir.",
        ],
    },
    {
        id: "tanimlar",
        icon: FileText,
        title: "2. Tanımlar",
        content: [],
        list: [
            "**Platform:** hataymobilya.com alan adı üzerinden erişilebilen Hatay Mobilya Pazaryeri web sitesi ve mobil uygulaması",
            "**Kullanıcı:** Platforma kayıt olan veya platformu ziyaret eden gerçek veya tüzel kişiler",
            "**Firma/Tedarikçi:** Platform üzerinde profil oluşturarak ürün ve hizmetlerini sergileyen mobilya üreticileri ve zanaatkarlar",
            "**Müşteri:** Platform üzerinden teklif talep eden gerçek veya tüzel kişiler",
            "**Teklif Talebi:** Müşterilerin firmalardan fiyat ve süre bilgisi istemek için oluşturdukları talepler",
            "**Hizmet:** Platform aracılığıyla sunulan aracılık, eşleştirme ve iletişim hizmetlerinin tamamı",
        ],
    },
    {
        id: "uyelik",
        icon: Users,
        title: "3. Üyelik ve Hesap",
        content: [],
        list: [
            "Platforma üye olmak için 18 yaşını doldurmuş olmak ve Türkiye Cumhuriyeti vatandaşı veya yasal olarak ikamet eden bir kişi olmak gerekmektedir.",
            "Firma hesabı oluşturmak için geçerli bir vergi numarası veya esnaf sicil numarası gereklidir.",
            "Kullanıcılar, kayıt sırasında verdikleri bilgilerin doğru, güncel ve eksiksiz olmasından sorumludur.",
            "Hesap bilgileri (kullanıcı adı ve şifre) kişiye özeldir ve üçüncü kişilerle paylaşılmamalıdır.",
            "Hesabınız üzerinden gerçekleştirilen tüm işlemlerden siz sorumlusunuz.",
            "Platform, yanlış veya yanıltıcı bilgi veren hesapları önceden bildirimde bulunmaksızın askıya alabilir veya silebilir.",
        ],
    },
    {
        id: "hizmet-kosullari",
        icon: ShieldCheck,
        title: "4. Hizmet Koşulları",
        content: [
            "Platform, müşteriler ile firma/tedarikçiler arasında bir aracılık ve eşleştirme hizmeti sunmaktadır. Bu kapsamda:",
        ],
        list: [
            "Platform, doğrudan satış veya ödeme aracılığı yapmamaktadır. Tüm ticari anlaşmalar taraflar arasında gerçekleşir.",
            "Firmalar tarafından verilen fiyat teklifleri, süre tahminleri ve ürün açıklamaları tamamen firmanın sorumluluğundadır.",
            "Platform, firmaların sunduğu ürün ve hizmetlerin kalitesi, teslim süresi veya uygunluğu konusunda garanti vermemektedir.",
            "Teklif talep sürecinde paylaşılan iletişim bilgileri, yalnızca ilgili teklif kapsamında kullanılmalıdır.",
            "Platform, hizmetlerini önceden bildirimde bulunmaksızın değiştirme, güncelleme veya sonlandırma hakkını saklı tutar.",
            "Platform kesintisiz ve hatasız çalışmayı garanti etmemektedir. Bakım, güncelleme ve teknik sorunlar nedeniyle geçici kesintiler yaşanabilir.",
        ],
    },
    {
        id: "yasaklar",
        icon: Ban,
        title: "5. Yasaklanan Davranışlar",
        content: [
            "Platform kullanıcıları aşağıdaki davranışlardan kaçınmakla yükümlüdür:",
        ],
        list: [
            "Yanlış, yanıltıcı veya sahte bilgi paylaşmak",
            "Başka bir kişi veya firmayı taklit etmek",
            "Platform üzerinden spam, istenmeyen mesaj veya reklam göndermek",
            "Platformun güvenliğini tehlikeye atacak yazılımlar kullanmak (virüs, trojan, bot vb.)",
            "Platformun altyapısına zarar verecek veya aşırı yük bindirecek faaliyetlerde bulunmak",
            "Diğer kullanıcıların kişisel bilgilerini izinsiz toplamak veya paylaşmak",
            "Telif hakkıyla korunan içerikleri izinsiz kullanmak",
            "Yasalara aykırı ürün veya hizmet tanıtımı yapmak",
            "Platform üzerindeki fiyatları manipüle etmeye çalışmak",
            "Sahte teklif talepleri oluşturmak veya firmaları yanıltmak",
        ],
    },
    {
        id: "sorumluluk",
        icon: AlertTriangle,
        title: "6. Sorumluluk Sınırlandırması",
        content: [
            "Platform, aşağıdaki durumlardan dolayı sorumluluk kabul etmemektedir:",
        ],
        list: [
            "Kullanıcılar arasındaki ticari anlaşmazlıklar ve uyuşmazlıklar",
            "Firmaların sundukları ürün ve hizmetlerin kalitesi, teslimat gecikmeleri veya hatalı ürün teslimi",
            "Kullanıcıların platform dışında gerçekleştirdikleri işlemler",
            "Mücbir sebepler (doğal afet, savaş, salgın, hükümet düzenlemeleri vb.) nedeniyle oluşan aksaklıklar",
            "Teknik arızalar, sunucu kesintileri veya siber saldırılar nedeniyle oluşabilecek veri kayıpları",
            "Üçüncü taraf web sitelerine yönlendirme linkleri üzerinden yaşanan sorunlar",
        ],
    },
    {
        id: "ucretlendirme",
        icon: CreditCard,
        title: "7. Ücretlendirme",
        content: [],
        list: [
            "Müşteriler için teklif talebi oluşturma ve firma profillerini inceleme hizmeti **ücretsizdir**.",
            "Firmalar için temel profil oluşturma ve ürün sergileme hizmeti **ücretsiz başlangıç planı** kapsamındadır.",
            "Premium firma özellikleri (öne çıkarma, öncelikli listeleme vb.) için ücretli planlar sunulabilir.",
            "Ücretlendirme politikasında yapılacak değişiklikler, en az 30 gün öncesinden kullanıcılara bildirilecektir.",
            "Tüm fiyatlar KDV dahil olarak belirtilecektir.",
        ],
    },
    {
        id: "icerik",
        icon: MessageSquare,
        title: "8. İçerik Politikası",
        content: [
            "Kullanıcılar tarafından platforma yüklenen içerikler (fotoğraf, açıklama, yorum vb.) hakkında:",
        ],
        list: [
            "İçerik yükleyen kullanıcı, ilgili içeriğin telif haklarına sahip olduğunu veya kullanım iznine sahip olduğunu beyan eder.",
            "Platform, uygunsuz, yanıltıcı veya yasalara aykırı içerikleri önceden bildirimde bulunmaksızın kaldırma hakkını saklı tutar.",
            "Firmalar, ürün fotoğraflarının gerçeğe uygun olmasını sağlamakla yükümlüdür.",
            "Kullanıcı yorumları ve değerlendirmeler objektif ve gerçeğe dayalı olmalıdır.",
            "Platforma yüklenen içerikler, platform hizmetlerinin sunulması amacıyla kullanılabilir.",
        ],
    },
    {
        id: "fikri-mulkiyet",
        icon: Copyright,
        title: "9. Fikri Mülkiyet Hakları",
        content: [],
        list: [
            "Platformun tasarımı, logosu, yazılımı, içerikleri ve tüm görsel unsurları telif hakkı ile korunmaktadır.",
            "Platform içeriklerinin izinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.",
            "Kullanıcılar, platforma yükledikleri içerikler üzerindeki haklarını korumaya devam eder.",
            "Platform, kullanıcı içeriklerini hizmet sunumu kapsamında kullanmak üzere sınırlı ve geri alınabilir bir lisansa sahiptir.",
        ],
    },
    {
        id: "uyusmazlik",
        icon: Gavel,
        title: "10. Uyuşmazlık Çözümü ve Yürürlük",
        content: [],
        list: [
            "Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir.",
            "Uyuşmazlıkların çözümünde **Hatay Mahkemeleri ve İcra Daireleri** yetkilidir.",
            "Platform, bu kullanım koşullarını önceden bildirimde bulunarak değiştirme hakkını saklı tutar.",
            "Değişiklikler, platformda yayınlandığı tarihten itibaren geçerli olacaktır.",
            "Kullanıcıların değişiklik sonrası platformu kullanmaya devam etmeleri, güncellenmiş koşulları kabul ettikleri anlamına gelir.",
            "Bu koşulların herhangi bir hükmünün geçersiz veya uygulanamaz bulunması, diğer hükümlerin geçerliliğini etkilemez.",
        ],
    },
]

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-amber-50 via-background to-orange-50/30 dark:from-amber-950/20 dark:via-background dark:to-orange-950/10 border-b overflow-hidden">
                <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
                        <Scale className="h-3.5 w-3.5 mr-1.5" />
                        Kullanım Şartları
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                        Kullanım Koşulları
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Hatay Mobilya Pazaryeri&apos;ni kullanmadan önce lütfen aşağıdaki koşulları dikkatlice okuyunuz.
                        Platformu kullanarak bu koşulları kabul etmiş sayılırsınız.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                        Son güncelleme: 16 Şubat 2026
                    </p>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="py-8 border-b bg-stone-50/50 dark:bg-stone-900/20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="text-sm px-3 py-1.5 rounded-full bg-card border hover:border-amber-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                            >
                                {section.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-8">
                        {sections.map((section) => {
                            const Icon = section.icon
                            return (
                                <Card
                                    key={section.id}
                                    id={section.id}
                                    className="border shadow-sm scroll-mt-24"
                                >
                                    <CardContent className="p-6 md:p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-lg">
                                                <Icon className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold text-foreground">
                                                {section.title}
                                            </h2>
                                        </div>

                                        {section.content?.map(
                                            (paragraph, idx) => (
                                                <p
                                                    key={idx}
                                                    className="text-muted-foreground leading-relaxed mb-4"
                                                >
                                                    {paragraph}
                                                </p>
                                            )
                                        )}

                                        {section.list && (
                                            <ul className="space-y-2 ml-1">
                                                {section.list.map(
                                                    (item, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                                        >
                                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item
                                                                        .replace(
                                                                            /\*\*(.*?)\*\*/g,
                                                                            '<strong class="text-foreground font-medium">$1</strong>'
                                                                        ),
                                                                }}
                                                            />
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Contact Section */}
                    <Card className="mt-8 border-amber-200 dark:border-amber-800 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-lg">
                                    <Mail className="h-5 w-5 text-amber-600" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                                    Sorularınız mı Var?
                                </h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Kullanım koşullarıyla ilgili herhangi bir
                                sorunuz veya açıklamamız gereken bir konu varsa
                                bizimle iletişime geçmekten çekinmeyin:
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>
                                    <strong className="text-foreground">
                                        E-posta:
                                    </strong>{" "}
                                    <Link
                                        href="mailto:destek@hataymobilya.com"
                                        className="text-amber-600 hover:underline"
                                    >
                                        destek@hataymobilya.com
                                    </Link>
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Telefon:
                                    </strong>{" "}
                                    <Link
                                        href="tel:+905537319288"
                                        className="text-amber-600 hover:underline"
                                    >
                                        0553 731 92 88
                                    </Link>
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Adres:
                                    </strong>{" "}
                                    Hatay, Türkiye
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Related Links */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Ayrıca{" "}
                            <Link
                                href="/privacy"
                                className="text-amber-600 hover:underline font-medium"
                            >
                                Gizlilik Politikası
                            </Link>{" "}
                            sayfamızı da incelemenizi öneririz.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
