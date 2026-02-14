import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsClient } from "./_components/SettingsClient";

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    const { data: profile } = await supabase
        .from("CompanyProfiles")
        .select("email, phone")
        .eq("id", user.id)
        .maybeSingle();

    const email = profile?.email || user.email || "";
    const phone = profile?.phone || "";

    return (
        <div className="min-h-screen bg-muted/40 pb-20">
            <section className="container mx-auto px-4 py-8 max-w-4xl space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Ayarlar</h1>
                    <p className="text-muted-foreground mt-1">
                        Hesap güvenliği ve bildirim tercihlerinizi yönetin.
                    </p>
                </div>

                {/* Account Info */}
                <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Hesap Bilgileri</h2>
                            <p className="text-sm text-muted-foreground">Giriş yapmak için kullandığınız bilgiler.</p>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Kayıtlı E-posta</label>
                            <div className="bg-muted/50 border rounded-lg px-4 py-3 text-sm text-foreground flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                {email}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Doğrulanmış Telefon</label>
                            <div className="bg-muted/50 border rounded-lg px-4 py-3 text-sm text-foreground flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                                {phone || "Belirtilmemiş"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Client-side interactive parts */}
                <SettingsClient />

            </section>
        </div>
    );
}
