"use client";
import {
    MapPin,
    Clock,
    ChevronRight,
    Lock,
    AlertCircle,
    Search,
    SlidersHorizontal
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock Data
const requests = [
    {
        id: 1,
        title: "Mutfak Dolabı",
        location: "Antakya, Sümerler",
        time: "2 saat önce",
        description: "L tipi, high-gloss kapaklı, antrasit renkli mutfak dolabı. 6 metre tül uzunluğunda.",
        budget: "50.000 - 70.000 ₺",
        isNew: true,
        isLocked: false,
        category: "Mutfak",
    },
    {
        id: 2,
        title: "Yatak Odası Takımı",
        location: "Defne, Çekmece",
        time: "5 saat önce",
        description: "Masif ahşap, çift kişilik bazalı yatak ve 2 komodin. Modern tasarım.",
        budget: "30.000 - 45.000 ₺",
        isNew: true,
        isLocked: false, /* Unlocked for demo */
        category: "Yatak Odası",
    },
    {
        id: 3,
        title: "Ofis Çalışma Masası",
        location: "İskenderun, Merkez",
        time: "1 gün önce",
        description: "3 adet bitişik nizam çalışma masası, metal ayaklı. Ofis projesi için.",
        budget: "15.000 - 20.000 ₺",
        isNew: false,
        isLocked: true, /* Locked Logic */
        category: "Ofis",
    },
    {
        id: 4,
        title: "TV Ünitesi",
        location: "Samandağ, Deniz",
        time: "2 gün önce",
        description: "Duvara monte, led ışıklı modern TV ünitesi. 240cm genişliğinde.",
        budget: "10.000 - 15.000 ₺",
        isNew: false,
        isLocked: true,
        category: "Salon",
    },
];

export default function RequestsPage() {

    return (
        <div className="container mx-auto p-4 md:p-6 pb-20 space-y-6">

            {/* 1. Header & Summary */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        Müşteri Talepleri
                        <Badge variant="secondary" className="text-primary bg-primary/10">12 aktif</Badge>
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Uzmanlık alanına ve konumuna uygun iş fırsatları.
                    </p>
                </div>

                {/* Profile Completion Alert (Mini) */}
                <div className="hidden md:flex items-center gap-3 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-900 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-amber-800 dark:text-amber-200">Daha fazla talep için profilini tamamla</span>
                    <Button variant="link" className="h-auto p-0 text-amber-700 dark:text-amber-300 font-semibold underline">Tamamla</Button>
                </div>
            </div>

            {/* 2. Filters */}
            <div className="bg-card border rounded-xl p-4 shadow-xs sticky top-16 z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Search */}
                    <div className="col-span-2 md:col-span-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Talep ara..." className="pl-9" />
                    </div>

                    {/* Category Filter */}
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Mobilya Türü" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tümü</SelectItem>
                            <SelectItem value="mutfak">Mutfak</SelectItem>
                            <SelectItem value="yatak">Yatak Odası</SelectItem>
                            <SelectItem value="salon">Salon</SelectItem>
                            <SelectItem value="ofis">Ofis</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Location Filter */}
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="İlçe / Konum" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tümü</SelectItem>
                            <SelectItem value="antakya">Antakya</SelectItem>
                            <SelectItem value="defne">Defne</SelectItem>
                            <SelectItem value="skenderun">İskenderun</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Budget/Date Filter */}
                    <div className="flex gap-2">
                        <Button variant="outline" className="w-full text-muted-foreground font-normal justify-between">
                            <span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Filtrele</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* 3. Request List */}
            <div className="grid gap-4">
                {requests.map((req) => (
                    <Card key={req.id} className={`overflow-hidden transition-all duration-200 hover:border-primary/50 group ${req.isLocked ? 'bg-muted/30' : 'bg-card'}`}>
                        <CardHeader className="p-4 md:p-5 pb-2">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="font-semibold">{req.category}</Badge>
                                        {req.isNew && <Badge className="bg-green-500 hover:bg-green-600">Yeni</Badge>}
                                        <span className="text-xs text-muted-foreground flex items-center">
                                            <Clock className="h-3 w-3 mr-1" /> {req.time}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight">{req.title}</h3>
                                </div>
                                <div className="hidden md:flex flex-col items-end text-right">
                                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {req.location}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-4 md:p-5 pt-0">
                            <div className="md:hidden text-sm text-muted-foreground mb-3 flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" /> {req.location}
                            </div>

                            <div className="relative">
                                <p className={`text-muted-foreground line-clamp-2 ${req.isLocked ? 'blur-[3px] select-none' : ''}`}>
                                    {req.description}
                                </p>

                                {/* Lock Overlay */}
                                {req.isLocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-[1px]">
                                        <div className="flex items-center gap-2 bg-background/90 px-3 py-1.5 rounded-full shadow-sm border text-xs font-semibold">
                                            <Lock className="h-3 w-3" /> Detaylar Gizli
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 md:p-5 pt-0 border-t bg-muted/10 flex items-center justify-between">
                            <div className="text-sm font-semibold">
                                {req.isLocked ? (
                                    <span className="text-muted-foreground">Bütçe Gizli</span>
                                ) : (
                                    <span className="text-foreground">{req.budget}</span>
                                )}
                            </div>

                            {req.isLocked ? (
                                <Button variant="secondary" size="sm" className="gap-2">
                                    <Lock className="h-4 w-4" /> Pro&apos;ya Geç
                                </Button>
                            ) : (
                                <Button size="sm" className="gap-2" asChild>
                                    <Link href={`/panel/requests/${req.id}`}>
                                        Detayı Gör <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))
                }
            </div >

            {/* 4. Empty State Example (Hidden by default, shown logic would be here) */}
            {/* 
       <div className="flex flex-col items-center justify-center py-12 text-center">
           <div className="bg-muted p-4 rounded-full mb-4">
               <Search className="h-8 w-8 text-muted-foreground" />
           </div>
           <h3 className="font-bold text-lg mb-2">Şu an sana uygun talep yok</h3>
           <p className="text-muted-foreground max-w-sm mb-6">Uzmanlık alanlarını genişleterek veya konum ayarlarını değiştirerek daha fazla talep görebilirsin.</p>
           <Button variant="outline">Ayarları Güncelle</Button>
       </div> 
       */}

            {/* Pagination */}
            <div className="flex justify-center pt-4">
                <Button variant="ghost" size="sm" disabled>Önceki</Button>
                <div className="flex items-center gap-1 mx-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground border-primary">1</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
                    <span className="text-muted-foreground text-xs">...</span>
                </div>
                <Button variant="ghost" size="sm">Sonraki</Button>
            </div>

        </div >
    );
}
