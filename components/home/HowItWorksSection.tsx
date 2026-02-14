import { UserPlus, Search, MessageCircle, Store, Users } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function HowItWorksSection() {
    const buyerSteps = [
        {
            icon: <UserPlus className="w-8 h-8 text-amber-600" />,
            title: "Ücretsiz Kayıt Ol",
            description: "Hızlıca üye olun ve platformun avantajlarından yararlanmaya başlayın.",
        },
        {
            icon: <Search className="w-8 h-8 text-amber-600" />,
            title: "Firmaları Keşfet",
            description: "Hatay'ın en iyi mobilya üreticileri ve mağazalarını detaylıca inceleyin.",
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-amber-600" />,
            title: "Direkt İletişime Geç",
            description: "Beğendiğiniz ürünler veya özel siparişler için firmalarla doğrudan görüşün.",
        },
    ];

    const sellerSteps = [
        {
            icon: <UserPlus className="w-8 h-8 text-primary" />,
            title: "Ücretsiz Kayıt Ol",
            description: "Firmanızı sisteme kaydedin ve dijital dünyada yerinizi alın.",
        },
        {
            icon: <Store className="w-8 h-8 text-primary" />,
            title: "Firma Profili Oluştur",
            description: "Ürünlerinizi, referanslarınızı ve hizmetlerinizi sergileyen profesyonel bir profil hazırlayın.",
        },
        {
            icon: <Users className="w-8 h-8 text-primary" />,
            title: "Müşterilere Ulaş",
            description: "Binlerce potansiyel müşteriye ulaşın ve iş hacminizi büyütün.",
        },
    ];

    return (
        <section className="py-12 bg-amber-50/50 dark:bg-stone-900/50 container mx-auto px-4">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-stone-100">Nasıl Çalışır?</h2>
                <p className="text-slate-600 dark:text-stone-300 max-w-2xl mx-auto text-sm">
                    Hatay Mobilya platformu hem alıcılar hem de satıcılar için kolay ve güvenli bir deneyim sunar.
                </p>
            </div>

            <div className="space-y-12 max-w-5xl mx-auto">
                {/* Buyers Row */}
                <div>
                    <div className="flex items-center justify-center mb-6">
                        <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 px-3 py-1 text-sm rounded-full font-semibold">
                            Alıcılar İçin
                        </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Horizontal Line for Desktop */}
                        <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-amber-200 dark:bg-amber-800/50 z-0" />

                        {buyerSteps.map((step, index) => (

                            <div key={index} className="flex flex-col items-center text-center space-y-3 relative z-10 hover:scale-[1.03] transition-transform
">

                                <div aria-hidden="true" className="bg-white dark:bg-stone-900 p-3 rounded-full shadow-md border border-amber-100 dark:border-amber-900/30">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-stone-100">{step.title}</h3>
                                <p className="text-slate-600 dark:text-stone-400 max-w-xs text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <div aria-hidden="true" className="flex items-center justify-center">
                        <Link href="/companies">
                            <Button size="lg" className="w-full sm:w-auto px-10 mt-6 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer">Hemen firmaları keşfet</Button>
                        </Link>
                    </div>

                </div>

                {/* Sellers Row */}
                <div>
                    <div className="flex items-center justify-center mb-6">
                        <span className="bg-slate-100 text-slate-800 dark:bg-stone-800 dark:text-stone-300 px-3 py-1 text-sm rounded-full font-semibold">
                            Satıcılar İçin
                        </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Horizontal Line for Desktop */}
                        <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-slate-200 dark:bg-stone-800 z-0" />

                        {sellerSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-3 relative z-10 hover:scale-[1.03] transition-transform
">
                                <div className="bg-white dark:bg-stone-900 p-3 rounded-full shadow-md border border-slate-100 dark:border-stone-800">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-stone-100">{step.title}</h3>
                                <p className="text-slate-600 dark:text-stone-400 max-w-xs text-sm">{step.description}</p>
                            </div>
                        ))}

                    </div>
                    <div aria-hidden="true" className="flex items-center justify-center">
                        <Link href="/auth">
                            <Button size="lg" className="w-full sm:w-auto px-10 mt-6 bg-primary hover:bg-primary/80 text-black cursor-pointer">Hemen Kayıt Ol</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section >
    );
}
