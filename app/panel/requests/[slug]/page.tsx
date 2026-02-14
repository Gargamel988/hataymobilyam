"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    MapPin,
    Clock,
    Lock,
    Star,
    EyeOff,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

const getRequestData = (slug: string) => {
    return {
        id: slug,
        title: "Özel Ölçü Mutfak Dolabı",
        status: "Yeni", // Yeni, Aktif
        budget: "50.000 - 70.000 ₺",
        created_at: "2 saat önce",
        location: {
            city: "Hatay",
            district: "Antakya",
            neighborhood: "Sümerler Mah."
        },
        description: "Yeni taşındığım evim için L tipi mutfak dolabı yaptırmak istiyorum. Mevcut tezgahım granit, ona uygun antrasit veya koyu gri tonlarında high-gloss veya akrilik kapak düşünüyorum. Toplam uzunluk yaklaşık 6 metre. Çizimlerim mevcut değil, keşif yapılması gerekiyor.",
        specs: [
            { label: "Mobilya Türü", value: "Mutfak Dolabı" },
            { label: "Ölçüler", value: "~6 Metre Tül" },
            { label: "Malzeme", value: "High-Gloss / Akrilik" },
            { label: "Teslimat", value: "15 Gün İçinde" },
            { label: "Mekan", value: "Daire (3. Kat)" }
        ],
        isLocked: true,
        competitors_count: 2,
        customer: {
            name: "Ahmet Y.",
            initial: "AY",
            phone: "+90 532 *** ** **",
            email: "ahm***@gmail.com"
        }
    };
}

export default function RequestDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = use(params).slug;
    const request = getRequestData(slug);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="container mx-auto p-4 md:p-6 pb-24 max-w-6xl">
            {/* Back Navigation */}
            <div className="mb-6">
                <Link href="/panel/requests" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Taleplere Dön
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Main Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 1. Top Summary Card */}
                    <Card className="border-l-4 border-l-primary shadow-sm bg-card">
                        <CardHeader className="p-4 md:p-6 pb-2">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                        {request.specs.find(s => s.label === "Mobilya Türü")?.value}
                                    </Badge>
                                    <h1 className="text-2xl font-bold leading-tight">{request.title}</h1>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xl font-bold text-primary">{request.budget}</div>
                                    <Badge variant="outline" className="mt-1 border-green-500 text-green-600 bg-green-50">
                                        {request.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-2">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {request.location.district}, {request.location.city}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {request.created_at}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Description & Specs */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Müşteri İhtiyacı</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-foreground/90 leading-relaxed text-base">
                                {request.description}
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-semibold mb-3 text-sm">Ek Bilgiler</h4>
                                <div className="flex flex-wrap gap-2">
                                    {request.specs.map((spec, i) => (
                                        <div key={i} className="bg-muted px-3 py-1.5 rounded-md text-sm border">
                                            <span className="text-muted-foreground mr-2">{spec.label}:</span>
                                            <span className="font-medium text-foreground">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Customer Info (Locked) */}
                    <Card className="relative overflow-hidden border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/10">
                        {request.isLocked && (
                            <div className="absolute inset-0 bg-white/60 dark:bg-black/40 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center text-center p-6">
                                <div className="bg-background p-3 rounded-full shadow-lg mb-3">
                                    <Lock className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg text-foreground mb-1">Müşteri Bilgilerini Gör</h3>
                                <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                                    İletişim bilgilerini görmek ve direkt aramak için Pro pakete geçin.
                                </p>
                                <Button className="shadow-lg">Pro'ya Yükselt</Button>
                            </div>
                        )}

                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <span className={request.isLocked ? "blur-xs" : ""}>Müşteri Bilgileri</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={request.isLocked ? "blur-sm select-none opacity-70" : ""}>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback>{request.customer.initial}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <div className="font-semibold text-lg">{request.customer.name}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-3">
                                        <span>{request.customer.phone}</span>
                                        <span>•</span>
                                        <span>{request.customer.email}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>


                {/* RIGHT COLUMN: Action & Quote Format */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20 space-y-4">

                        {/* 5. Quote Form */}
                        <Card className="border-primary/20 shadow-md">
                            <CardHeader className="pb-3 bg-muted/20">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    Teklif Ver
                                </CardTitle>
                                <p className="text-xs text-muted-foreground">
                                    Bu talebe şu ana kadar <strong className="text-foreground">{request.competitors_count} firma</strong> teklif verdi.
                                </p>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Fiyat Teklifiniz (₺)</label>
                                    <Input type="number" placeholder="Örn: 55000" className="text-lg font-semibold" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Teslim Süresi</label>
                                    <Input placeholder="Örn: 15 Gün" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Mesaj (Opsiyonel)</label>
                                    <Textarea placeholder="Kısa bir not ekleyin..." className="resize-none h-20" />
                                </div>

                                <Button className="w-full h-11 text-base font-semibold shadow-md" size="lg">
                                    Teklifi Gönder
                                </Button>
                            </CardContent>
                        </Card>

                        {/* 7. Side Actions */}
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 gap-2 border-dashed">
                                <Star className="h-4 w-4" /> Favorile
                            </Button>
                            <Button variant="outline" className="flex-1 gap-2 border-dashed text-muted-foreground hover:text-red-500 hover:bg-red-50">
                                <EyeOff className="h-4 w-4" /> Gizle
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
