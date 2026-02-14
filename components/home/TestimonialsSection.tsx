import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Kerem Şahin",
        role: "Ev Sahibi",
        location: "Antakya",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Hatay'ın kadim zanaatkarlığının gerçek yansıması. Ev içinde çok geniş bir koleksiyon buldum. Aldığım salon takımı herkesi büyülüyor. Artık tüm arkadaşlarım da buradan alışveriş yapıyor."
    },
    {
        id: 2,
        name: "Ahmet Bağcı",
        role: "Mimar",
        location: "İskenderun",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Modern bir tasarımda geleneksel detayları arayanlara kesinlikle tavsiye ederim. Bu kadar özgün ve kaliteli üründen pürüzsüz fiyata ulaşmak gerçekten zor, çok memnunum."
    },
    {
        id: 3,
        name: "Selma Nur",
        role: "İç Mimar",
        location: "Ankara",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Hatay'ın zanaat geleneğini yansıtan eşsiz parçalar buldum. Her biri farklı bir hikâye anlatıyor. Müşterilerime bu platformu güvenle tavsiye edebiliyorum."
    },
]

function TestimonialsSection() {
    return (
        <section className="py-16 container mx-auto max-w-[1450px]">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                    Mutlu Müşterilerimizden Yorumlar
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Binlerce mutlu müşterimizin deneyimlerinden bazıları
                </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="relative bg-card border rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow"
                    >
                        {/* Quote Icon */}
                        <Quote aria-hidden="true" className="absolute top-6 right-6 h-8 w-8 text-amber-100 dark:text-amber-700/30" />

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star aria-label="Yorumunun puanı" key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            &quot;{testimonial.text}&quot;
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="rounded-full object-cover ring-2 ring-stone-100 dark:ring-stone-800"
                            />
                            <div>
                                <p className="font-semibold text-foreground">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export { TestimonialsSection }
