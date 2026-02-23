import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { ProfileForm } from "@/components/forms/ProfileForm"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth")
    }

    const { data: profile } = await supabase
        .from("CompanyProfiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

    let filledCount = 0

    if (profile?.phone) filledCount++
    if (profile?.email) filledCount++
    if (profile?.adress) filledCount++
    if (profile?.district) filledCount++
    if (profile?.full_name) filledCount++
    if (profile?.admin) filledCount++
    if (profile?.description) filledCount++

    // 3. Görseller ve Uzmanlık
    const hasAvatar = !!profile?.avatar_url
    // const hasBackground = !!profile?.background_url // Şimdilik zorunlu değil
    const hasExpertise = profile?.expertise && profile.expertise.length > 0

    if (hasExpertise) filledCount++

    const totalCriteria = 9

    if (hasAvatar) filledCount++

    const completionRate = Math.round((filledCount / totalCriteria) * 100)

    return (
        <div className="container mx-auto p-4 md:p-6 pb-20 space-y-6 max-w-5xl">
            {/* 1. Completion Rate Banner */}
            <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/50 rounded-xl p-6 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                            Profil Tamamlanma Oranı
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">%{completionRate}</Badge>
                        </h2>
                        <p className="text-sm text-muted-foreground">Profilini %100 tamamlayarak müşteri güvenini kazan ve daha fazla etkileşim al.</p>
                    </div>
                    <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-800 dark:text-amber-300">
                        <Link href={`/companies/${profile?.slug}`}>
                            {completionRate === 100 ? "Profili Görüntüle" : "Eksikleri Gör"}
                        </Link>
                    </Button>
                </div>
                <Progress value={completionRate} className="h-3 bg-amber-200/50 [&>div]:bg-linear-to-r [&>div]:from-amber-500 [&>div]:to-orange-500" />
                <div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-4">
                    <span className={`flex items-center gap-1 font-medium ${profile?.phone && profile?.email && profile?.adress ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {profile?.phone && profile?.email && profile?.adress ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        İletişim Bilgileri
                    </span>
                    <span className={`flex items-center gap-1 font-medium ${hasExpertise ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {hasExpertise ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        Uzmanlık Alanları
                    </span>
                    <span className={`flex items-center gap-1 font-medium ${hasAvatar ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {hasAvatar ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        Firma Logosu
                    </span>
                </div>
            </div>

            {/* 2. Profile Form - Client Component */}
            <ProfileForm />
        </div>
    )
}
