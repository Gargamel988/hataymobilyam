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
            question: "HatayMobilya.com nedir?",
            answer: "HatayMobilya.com, Hatay'ın köklü mobilya geleneğini 81 ille buluşturan, yerel üreticileri doğrudan tüketicilerle bir araya getiren dijital bir platformdur.",
            category: "Genel"
        },
        {
            question: "Satın alma işlemi nasıl gerçekleşir?",
            answer: "Platformumuz bir sergi ve iletişim kanalıdır. Beğendiğiniz ürünü seçtikten sonra üreticiyle doğrudan WhatsApp veya telefon üzerinden iletişime geçerek detayları konuşabilir ve siparişinizi oluşturabilirsiniz.",
            category: "Genel"
        },
        {
            question: "Teslimat tüm Türkiye'ye yapılıyor mu?",
            answer: "Evet, Hatay'daki üreticilerimiz mobilya sevkiyatına uygun lojistik ağları ile Türkiye'nin 81 iline güvenli gönderim sağlamaktadır.",
            category: "Sipariş ve Teslimat"
        },
        {
            question: "Özel ölçü ve tasarım yapıyor musunuz?",
            answer: "Hataylı mobilya ustalarımız talepleriniz doğrultusunda özel ölçü, renk ve tasarım seçenekleri sunabilmektedir. İletişime geçtiğiniz firmaya talebinizi iletebilirsiniz.",
            category: "Sipariş ve Teslimat"
        },
        {
            question: "Fiyatlar neden doğrudan yazılmıyor?",
            answer: "Mobilya ürünlerinde kumaş seçimi, ölçü değişiklikleri ve nakliye mesafesi fiyatı etkilediği için en güncel ve net fiyat bilgisini üreticiden doğrudan almanız daha sağlıklıdır.",
            category: "Sipariş ve Teslimat"
        },
        {
            question: "Üretici olarak nasıl kayıt olurum?",
            answer: "Üst menüdeki 'Giriş Yap' veya 'Firma Katılım' butonuna tıklayarak üyelik sürecini başlatabilir, ardından onay sürecinin ardından ürünlerinizi ekleyebilirsiniz.",
            category: "Üreticiler İçin"
        },
        {
            question: "Hangi bölgelerden üretici kabul ediliyor?",
            answer: "Platformumuz öncelikle Hatay ilindeki (özellikle Antakya ve çevre ilçelerdeki) mobilya üreticilerini desteklemek üzere kurulmuştur.",
            category: "Üreticiler İçin"
        },
        {
            question: "Üreticilerle nasıl iletişim kurarım?",
            answer: "Firma profil sayfalarında veya ürün detaylarında bulunan 'WhatsApp ile Ulaş' veya 'Telefon' butonlarını kullanarak 7/24 iletişim kurabilirsiniz.",
            category: "Üreticiler İçin"
        },
        {
            question: "Hatay mobilyasını özel kılan nedir?",
            answer: "Hatay mobilyası, nesiller boyu aktarılan el işçiliği, sağlam masif ağaç kullanımı ve kendine has oyma işçiliği ile bilinir. Hem klasik hem de modern tasarımlarda yüksek kalite sunar.",
            category: "Kalite ve Güven"
        },
        {
            question: "Platform güvenilir mi?",
            answer: "Sistemimizde yer alan tüm firmalar vergi levhası ve yetkili kişi onayıyla sisteme dahil edilir. Doğrudan üreticiyle görüştüğünüz için süreci şeffaf bir şekilde yönetebilirsiniz.",
            category: "Kalite ve Güven"
        }
    ];

    const categories = ["Genel", "Sipariş ve Teslimat", "Üreticiler İçin", "Kalite ve Güven"];

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
