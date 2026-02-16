"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Key, Trash2, LogOut, Loader2, Eye, EyeOff } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function SettingsClient() {
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    // Password state
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)



    const handlePasswordUpdate = async () => {
        if (!newPassword) {
            toast.error("Yeni şifre boş olamaz.")
            return
        }
        if (newPassword.length < 6) {
            toast.error("Yeni şifre en az 6 karakter olmalıdır.")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error("Yeni şifreler uyuşmuyor.")
            return
        }

        setIsUpdatingPassword(true)
        try {
            const supabase = createClient()
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            })
            if (error) throw error
            toast.success("Şifreniz başarıyla güncellendi.")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Şifre güncellenirken bir hata oluştu."
            toast.error(message)
        } finally {
            setIsUpdatingPassword(false)
        }
    }

    const handleSignOut = async () => {
        setIsLoggingOut(true)
        try {
            const supabase = createClient()
            await supabase.auth.signOut()
            router.push("/auth")
        } catch {
            toast.error("Çıkış yapılırken bir hata oluştu.")
            setIsLoggingOut(false)
        }
    }

    return (
        <>
            {/* Security (Password) */}
            <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">Güvenlik</h2>
                        <p className="text-sm text-muted-foreground">Şifrenizi düzenli olarak değiştirmeniz önerilir.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="current-pass" className="text-sm font-medium text-muted-foreground">Mevcut Şifre</Label>
                        <Input
                            id="current-pass"
                            type="password"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="max-w-md"
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 max-w-md">
                        <div className="space-y-1.5">
                            <Label htmlFor="new-pass" className="text-sm font-medium text-muted-foreground">Yeni Şifre</Label>
                            <div className="relative">
                                <Input
                                    id="new-pass"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="confirm-pass" className="text-sm font-medium text-muted-foreground">Yeni Şifre (Tekrar)</Label>
                            <Input
                                id="confirm-pass"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t mt-6 pt-4">
                    <Button
                        variant="outline"
                        onClick={handlePasswordUpdate}
                        disabled={isUpdatingPassword || !newPassword}
                        className="gap-2"
                    >
                        {isUpdatingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
                        Şifreyi Güncelle
                    </Button>
                </div>
            </div>



            {/* Danger Zone */}
            <div className="bg-linear-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg text-red-700 dark:text-red-400">Tehlikeli Bölge</h2>
                        <p className="text-sm text-red-600/80 dark:text-red-400/80">Hesabınızı dondurabilir veya kalıcı olarak silebilirsiniz.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100 dark:border-red-900 dark:hover:bg-red-900/30">
                        Hesabı Dondur
                    </Button>
                    <Button variant="destructive">
                        Hesabı Sil
                    </Button>
                </div>
            </div>

            {/* Sign Out */}
            <div className="flex justify-end pt-2">
                <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground gap-2"
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                >
                    {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                    Güvenli Çıkış
                </Button>
            </div>
        </>
    )
}
