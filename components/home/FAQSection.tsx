"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FAQSection() {
    const [activeCategory, setActiveCategory] = useState("Genel");

    const faqs = [
        {
            question: "Üyelik ücretsiz mi?",
            answer: "Evet, platformumuza üye olmak alıcılar için tamamen ücretsizdir. Kurumsal firmalar için ise kayıt ücretsiz olup, gelişmiş özellikler için farklı paket seçenekleri sunulmaktadır.",
            category: "Genel"
        },
        {
            question: "Nasıl firma eklerim?",
            answer: "Üye girişi yaptıktan sonra 'Firma Ekle' butonuna tıklayarak firmanızın bilgilerini girebilir, görsellerinizi yükleyebilir ve onay sürecinin ardından firmanızı yayınlayabilirsiniz.",
            category: "Satıcılar"
        },
        {
            question: "İletişim nasıl kurulur?",
            answer: "Beğendiğiniz ürün veya firmanın sayfasında bulunan 'Teklif İste', 'WhatsApp' veya 'Telefon' butonlarını kullanarak doğrudan satıcı ile iletişime geçebilirsiniz.",
            category: "Alıcılar"
        },
        {
            question: "Firmalar nasıl doğrulanıyor?",
            answer: "Platforma kaydolan tüm firmalar, kimlik ve vergi doğrulama sürecinden geçirilir. Ticaret sicil belgesi, vergi levhası ve yetkili kişi kimlik doğrulaması yapılır. Onaylanan firmalar 'Doğrulanmış' rozeti alır.",
            category: "Güvenlik"
        },
        {
            question: "Ödeme platformda mı yapılıyor?",
            answer: "Hayır, bizim platformumuz bir B2B marketplace olup, alıcı ve satıcıyı buluşturur. Ödeme ve fiyat görüşmeleri taraflar arasında doğrudan gerçekleşir. Platform sadece iletişimi kolaylaştırır.",
            category: "Genel"
        },
        {
            question: "Firma sayfamı nasıl öne çıkarabilirim?",
            answer: "Premium üyelik paketleri ile firma sayfanız arama sonuçlarında üst sıralarda yer alabilir, anasayfada öne çıkarılabilir ve kategori sayfalarında öncelikli gösterilebilir. Ayrıca sınırsız ürün ekleme, istatistikler ve reklam alanları gibi avantajlardan yararlanabilirsiniz.",
            category: "Satıcılar"
        },
        {
            question: "Yurt dışı firmalarla da çalışabiliyor muyum?",
            answer: "Evet, platformumuzda Türkiye ve yurt dışından birçok firma bulunmaktadır. Arama filtrelerinde 'Ülke' seçeneğini kullanarak istediğiniz bölgedeki firmaları bulabilirsiniz.",
            category: "Alıcılar"
        },
        {
            question: "Minimum sipariş miktarı var mı?",
            answer: "Minimum sipariş miktarı firmadan firmaya değişiklik gösterir. Her firmanın ürün sayfasında veya firma profilinde MOQ (Minimum Order Quantity) bilgisi yer almaktadır. Detaylar için doğrudan satıcı ile iletişime geçebilirsiniz.",
            category: "Alıcılar"
        },
        {
            question: "Ürün fotoğraflarımı nasıl yüklerim?",
            answer: "Firma panelinizden 'Ürünler' bölümüne giderek yeni ürün ekleyebilirsiniz. Her ürün için 10 adede kadar fotoğraf yükleyebilirsiniz. Fotoğraflar JPG, PNG formatında ve minimum 800x800 piksel olmalıdır. İlk yüklediğiniz fotoğraf kapak resmi olarak kullanılır.",
            category: "Satıcılar"
        },
        {
            question: "Gelen teklifleri nasıl yönetirim?",
            answer: "Firma panelinizde 'Gelen Talepler' bölümünden size ulaşan tüm teklif taleplerini, mesajları ve sorgulamaları görebilir, yanıtlayabilir ve takip edebilirsiniz. E-posta ve SMS bildirimleri ile anlık olarak haberdar olursunuz.",
            category: "Satıcılar"
        },
        {
            question: "Firma bilgilerimi değiştirebilir miyim?",
            answer: "Evet, firma panelinizden istediğiniz zaman şirket bilgilerinizi, iletişim detaylarınızı, açıklamanızı ve görsellerinizi güncelleyebilirsiniz. Önemli değişiklikler (firma ünvanı, vergi numarası gibi) tekrar doğrulama gerektirebilir.",
            category: "Satıcılar"
        },
        {
            question: "Platformda reklam verebilir miyim?",
            answer: "Evet, banner reklamları, sponsorlu içerikler ve kategori özel reklamlar gibi farklı reklam seçeneklerimiz bulunmaktadır. Detaylı bilgi için satış ekibimizle iletişime geçebilirsiniz.",
            category: "Satıcılar"
        },
        {
            question: "Kaç adet ürün ekleyebilirim?",
            answer: "Ücretsiz üyelikte 20 ürüne kadar ekleme yapabilirsiniz. Standart pakette 100, Premium pakette 500 ve Enterprise pakette sınırsız ürün ekleme hakkınız bulunur.",
            category: "Satıcılar"
        },
        {
            question: "Alıcı olarak kayıt olmak zorunda mıyım?",
            answer: "Firmaları ve ürünleri keşfetmek için kayıt olmanıza gerek yoktur. Ancak teklif isteme, favorilere ekleme ve satıcı ile direkt iletişim kurabilmek için ücretsiz üyelik oluşturmanız gerekmektedir.",
            category: "Alıcılar"
        },
        {
            question: "Satıcı puanlama sistemi var mı?",
            answer: "Evet, alıcılar geçmiş işlemleri sonrası satıcıları 5 yıldız üzerinden değerlendirebilir ve yorum bırakabilir. Bu puanlamalar firma sayfalarında görünür ve güvenilirlik göstergesi olarak kullanılır.",
            category: "Genel"
        },
        {
            question: "Hesabımı nasıl silerim?",
            answer: "Hesap ayarlarınızdan 'Hesabı Kapat' seçeneği ile hesabınızı silebilirsiniz. Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir. Aktif ilanlarınız varsa önce bunları kaldırmanız gerekir.",
            category: "Genel"
        }
    ];

    const categories = ["Genel", "Alıcılar", "Satıcılar", "Güvenlik"];

    const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

    return (
        <section className="py-16 container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Sıkça Sorulan Sorular
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        onClick={() => setActiveCategory(category)}
                        className={
                            `rounded-full px-6 transition-all ${activeCategory === category
                                ? "bg-amber-600 hover:bg-amber-700 text-white border-transparent"
                                : "hover:border-amber-200 hover:text-amber-700"
                            }`
                        }
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 dark:border-slate-800">
                        <AccordionTrigger className="text-left text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-500 hover:no-underline font-medium py-5 md:py-4">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 ">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
