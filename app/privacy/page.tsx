import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"
import Link from "next/link"
import {
    Shield,
    Lock,
    Eye,
    Database,
    UserCheck,
    Bell,
    Cookie,
    Mail,
    FileText,
    Scale,
} from "lucide-react"

export const metadata: Metadata = {
    title: "Gizlilik Politikası | Hatay Mobilya Pazaryeri",
    description:
        "Hatay Mobilya Pazaryeri gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinin.",
}

const sections = [
    {
        id: "veri-toplama",
        icon: Database,
        title: "1. Toplanan Veriler",
        content: [
            "Hatay Mobilya Pazaryeri olarak, platformumuzu kullanırken aşağıdaki kişisel verileri toplayabiliriz:",
        ],
        list: [
            "**Kimlik Bilgileri:** Ad, soyad (firma sahipleri için)",
            "**İletişim Bilgileri:** E-posta adresi, telefon numarası, WhatsApp numarası",
            "**Firma Bilgileri:** Firma adı, adres, faaliyet alanı, yetkili kişi bilgileri",
            "**Hesap Bilgileri:** Kullanıcı adı, şifre (şifrelenmiş olarak saklanır)",
            "**İşlem Bilgileri:** Teklif talepleri, mesajlaşma geçmişi, ürün ve hizmet bilgileri",
            "**Teknik Veriler:** IP adresi, tarayıcı türü, cihaz bilgileri, çerez verileri, oturum bilgileri",
            "**Konum Bilgileri:** İl ve ilçe bilgisi (hizmet eşleştirmesi için)",
        ],
    },
    {
        id: "veri-kullanim",
        icon: Eye,
        title: "2. Verilerin Kullanım Amaçları",
        content: [
            "Topladığımız kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:",
        ],
        list: [
            "Platformun işleyişinin sağlanması ve hizmet kalitesinin artırılması",
            "Müşteri ve firma arasında teklif süreçlerinin yönetilmesi",
            "Kullanıcı hesaplarının oluşturulması ve yönetilmesi",
            "Firma profillerinin doğrulanması ve güvenilirliğin sağlanması",
            "İletişim ve destek hizmetlerinin sunulması",
            "Yasal yükümlülüklerin yerine getirilmesi",
            "Platform güvenliğinin sağlanması ve kötüye kullanımın önlenmesi",
            "İstatistiksel analizler ve hizmet geliştirme çalışmaları",
            "Pazarlama ve bilgilendirme amaçlı iletişim (onayınız dahilinde)",
        ],
    },
    {
        id: "veri-koruma",
        icon: Lock,
        title: "3. Verilerin Korunması",
        content: [
            "Kişisel verilerinizin güvenliği bizim için en önemli önceliklerden biridir. Bu kapsamda aşağıdaki güvenlik önlemlerini uyguluyoruz:",
        ],
        list: [
            "SSL/TLS şifrelemesi ile veri iletiminin güvenli hale getirilmesi",
            "Şifrelerin bcrypt algoritması ile hash'lenerek saklanması",
            "Düzenli güvenlik denetimleri ve güncelleme süreçleri",
            "Yetkisiz erişime karşı güvenlik duvarı ve erişim kontrol mekanizmaları",
            "Veri tabanı yedekleme ve felaket kurtarma planları",
            "Çalışan/geliştirici erişim yetkilerinin minimum düzeyde tutulması",
        ],
    },
    {
        id: "veri-paylasim",
        icon: UserCheck,
        title: "4. Verilerin Paylaşılması",
        content: [
            "Kişisel verileriniz, aşağıdaki durumlar haricinde üçüncü taraflarla paylaşılmaz:",
        ],
        list: [
            "**Hizmet Sağlayıcılar:** Platformun işleyişi için gerekli altyapı hizmetleri sağlayıcıları (sunucu, e-posta, analitik vb.)",
            "**Yasal Zorunluluklar:** Mahkeme kararı, savcılık talebi veya yasal düzenleme gereği",
            "**Teklif Süreçleri:** Teklif talebinde bulunduğunuzda, ilgili firmayla paylaşmanız gereken iletişim bilgileri",
            "**İş Ortakları:** Açık rızanız dahilinde, iş ortaklarımızla sınırlı veri paylaşımı",
        ],
        extraNote:
            "Kişisel verileriniz hiçbir koşulda satılmaz veya ticari amaçla üçüncü taraflara devredilmez.",
    },
    {
        id: "cerezler",
        icon: Cookie,
        title: "5. Çerezler (Cookies)",
        content: [
            "Platformumuz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır:",
        ],
        list: [
            "**Zorunlu Çerezler:** Platformun temel işleyişi için gerekli olan çerezler (oturum yönetimi, güvenlik)",
            "**Analitik Çerezler:** Platformun nasıl kullanıldığını anlamamıza yardımcı olan çerezler (ziyaretçi istatistikleri)",
            "**Tercih Çerezleri:** Dil, tema gibi kullanıcı tercihlerini hatırlayan çerezler",
        ],
        extraNote:
            "Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz. Ancak bu durumda bazı platform özellikleri düzgün çalışmayabilir.",
    },
    {
        id: "haklariniz",
        icon: Scale,
        title: "6. KVKK Kapsamındaki Haklarınız",
        content: [
            "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki haklara sahipsiniz:",
        ],
        list: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme",
            "Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme",
            "Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme",
            "Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme",
            "KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme",
            "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
            "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
        ],
    },
    {
        id: "veri-saklama",
        icon: FileText,
        title: "7. Veri Saklama Süresi",
        content: [
            "Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca ve ilgili yasal düzenlemelerde öngörülen süreler dahilinde saklanır.",
        ],
        list: [
            "**Hesap Bilgileri:** Hesabınız aktif olduğu sürece ve hesap silindikten sonra 1 yıl süreyle",
            "**İşlem Geçmişi:** İşlem tarihinden itibaren 5 yıl (yasal zorunluluk gereği)",
            "**İletişim Kayıtları:** Son iletişimden itibaren 3 yıl",
            "**Çerez Verileri:** Çerez türüne göre oturum süresi ile 1 yıl arası",
            "**Log Kayıtları:** 2 yıl (5651 sayılı Kanun gereği)",
        ],
    },
    {
        id: "degisiklikler",
        icon: Bell,
        title: "8. Politika Değişiklikleri",
        content: [
            "Bu gizlilik politikası, yasal düzenlemelerdeki değişikliklere veya platform hizmetlerindeki güncellemelere bağlı olarak zaman zaman güncellenebilir.",
            "Önemli değişiklikler yapıldığında, kayıtlı e-posta adresinize bildirim gönderilecek ve platform üzerinde duyurulacaktır.",
            "Güncellenmiş politikayı kabul etmemeniz durumunda hesabınızı kapatma hakkınız saklıdır.",
        ],
    },
]

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-amber-50 via-background to-orange-50/30 dark:from-amber-950/20 dark:via-background dark:to-orange-950/10 border-b overflow-hidden">
                <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
                        <Shield className="h-3.5 w-3.5 mr-1.5" />
                        Kişisel Verileriniz Güvende
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
                        Gizlilik Politikası
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Hatay Mobilya Pazaryeri olarak kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu politika,
                        verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
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

                                        {section.extraNote && (
                                            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                                <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                                                    ⚠️ {section.extraNote}
                                                </p>
                                            </div>
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
                                    İletişim
                                </h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Gizlilik politikamız veya kişisel verilerinizle
                                ilgili sorularınız, talepleriniz veya
                                şikayetleriniz için bizimle iletişime
                                geçebilirsiniz:
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
                                href="/terms"
                                className="text-amber-600 hover:underline font-medium"
                            >
                                Kullanım Koşulları
                            </Link>{" "}
                            sayfamızı da incelemenizi öneririz.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
