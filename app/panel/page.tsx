import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    Plus,
    ExternalLink,
    Store,
    MessageCircle,
    Eye,
    MousePointerClick
} from "lucide-react";
import Link from "next/link";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { getProductCount, getProfileSlug } from "./services/services";

export default async function Page() {
    const queryClient = new QueryClient()

    const productCount = await getProductCount();
    const profileSlug = await getProfileSlug();

    await queryClient.prefetchQuery({
        queryKey: ['productCount'],
        queryFn: () => productCount,
    })
    await queryClient.prefetchQuery({
        queryKey: ['profileSlug'],
        queryFn: () => profileSlug,
    })


    return (
        <div className="min-h-screen bg-muted/40 pb-20">

            {/* 1. Header & Welcome */}
            <section className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Panel'e Hoşgeldin</h1>
                        <p className="text-muted-foreground mt-1">
                            Mağazanı yönet, ürünlerini ekle ve müşterilerine ulaş.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <HydrationBoundary state={dehydrate(queryClient)}>

                            <Button variant="outline" className="gap-2" asChild>
                                <Link href={profileSlug ? `/companies/${profileSlug}` : "#"} target="_blank">
                                    <ExternalLink className="h-4 w-4" />
                                    Mağazamı Gör
                                </Link>
                            </Button>
                            <Button className="gap-2 bg-amber-600 hover:bg-amber-700 text-white" asChild>
                                <Link href="/panel/products/add">
                                    <Plus className="h-4 w-4" />
                                    Yeni Ürün Ekle
                                </Link>
                            </Button>
                        </HydrationBoundary>
                    </div>
                </div>

                {/* 2. Quick Stats (MVP Focus) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Stat: Total Products */}
                    <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Toplam Ürün</span>
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                                <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <div>
                                <div className="text-3xl font-bold">{productCount || 0}</div>
                            </div>
                        </HydrationBoundary>
                    </div>

                    {/* Stat: Profile Views */}
                    <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Profil Görüntülenme</span>
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">145</div>
                            <p className="text-xs mt-1 text-green-600 font-medium">
                                %12 artış
                            </p>
                        </div>
                    </div>

                    {/* Stat: WhatsApp Clicks */}
                    <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">WhatsApp Tıklanma</span>
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">28</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Müşteri iletişimi
                            </p>
                        </div>
                    </div>

                    {/* Stat: Product Clicks */}
                    <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Ürün İnceleme</span>
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                                <MousePointerClick className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">342</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Toplam etkileşim
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Main Actions Grid */}
                <h2 className="text-xl font-semibold mb-4 text-foreground icon-title flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Mağaza Yönetimi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                    {/* Action: Products */}
                    <Link href="/panel/products" className="group block">
                        <div className="bg-card border rounded-xl p-6 h-full hover:border-amber-500/50 hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
                                    <Package className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Ürünlerim</h3>
                                    <p className="text-sm text-muted-foreground">Ürünlerini listele, düzenle veya kaldır</p>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
                                Yönetmeye Başla &rarr;
                            </div>
                        </div>
                    </Link>

                    {/* Action: Profile */}
                    <Link href="/panel/profil" className="group block">
                        <div className="bg-card border rounded-xl p-6 h-full hover:border-blue-500/50 hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                    <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Firma Profili</h3>
                                    <p className="text-sm text-muted-foreground">Logo, iletişim bilgileri ve hakkımızda</p>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                                Profili Düzenle &rarr;
                            </div>
                        </div>
                    </Link>

                    {/* Action: Support (WhatsApp) */}
                    <Link href="https://wa.me/905537319288" target="_blank" className="group block">
                        <div className="bg-card border rounded-xl p-6 h-full hover:border-green-500/50 hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-xl group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Canlı Destek</h3>
                                    <p className="text-sm text-muted-foreground">WhatsApp üzerinden bize ulaşın</p>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium group-hover:translate-x-1 transition-transform">
                                Mesaj Gönder &rarr;
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 4. Tips / Info Banner */}
                <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="p-4 bg-background rounded-full shadow-sm shrink-0">
                            <LayoutDashboard className="h-8 w-8 text-amber-600" />
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-bold text-foreground mb-2">Mağazanızı Öne Çıkarın</h3>
                            <p className="text-muted-foreground max-w-2xl">
                                Daha fazla müşteriye ulaşmak için ürün fotoğraflarınızın kaliteli olduğundan ve ürün açıklamalarınızın detaylı olduğundan emin olun. Profil bilgilerinizi eksiksiz doldurmak güvenilirliğinizi artırır.
                            </p>
                        </div>
                        <div className="ml-auto">
                            {/* Placeholder for future action */}
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
