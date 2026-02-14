import { BadgeCheck, ShieldCheck, Globe2, Headset } from "lucide-react";

interface Featurestype {
    icon: React.ReactNode;
    title: string;
    description: string;
}


const features: Featurestype[] = [
    {
        icon: <BadgeCheck className="w-8 h-8 text-amber-600" />,
        title: "Doğrulanmış Firmalar",
        description: "Güvenilir ve kontrol edilmiş üreticilerle çalışın.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
        title: "Güvenli İletişim",
        description: "Kişisel verileriniz korunarak güvenle mesajlaşın.",
    },
    {
        icon: <Globe2 className="w-8 h-8 text-amber-600" />,
        title: "Geniş Tedarikçi Ağı",
        description: "Hatay'ın dört bir yanından mobilyacılara ulaşın.",
    },
    {
        icon: <Headset className="w-8 h-8 text-amber-600" />,
        title: "7/24 Destek",
        description: "Her türlü sorunuz için kesintisiz destek alın.",
    },
];

export function FeaturesSection() {

    return (
        <section className="py-16 container mx-auto max-w-[1450px]">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-stone-100 mb-4 text-center">
                Platformun Avantajları
            </h2>
            <p className="text-slate-600 dark:text-stone-400 text-center mb-8">
                Üreticiler ve alıcılar neden bizi tercih ediyor?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group p-6 rounded-2xl bg-amber-50/30 dark:bg-stone-900/50 transition-colors border border-amber-100/50 dark:border-amber-900/20 hover:border-amber-200 dark:hover:border-amber-800 text-center"
                    >
                        <div aria-hidden="true" className="inline-flex items-center justify-center p-3 bg-white dark:bg-stone-800 rounded-xl shadow-sm dark:shadow-none mb-4 group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-stone-100 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
