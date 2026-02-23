"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface OtpVerificationFormProps {
    email: string
}

export function OtpVerificationForm({ email }: OtpVerificationFormProps) {
    const [otpToken, setOtpToken] = useState("")
    const [emailInput, setEmailInput] = useState(email)
    const { verifyOtpMutation } = useAuth()
    const router = useRouter()

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault()

        if (!emailInput) {
            toast.error("Lütfen e-posta adresinizi girin.")
            return
        }

        if (otpToken.length !== 8) {
            toast.error("Lütfen 8 haneli doğrulama kodunu girin.")
            return
        }

        verifyOtpMutation.mutate({
            email: emailInput,
            token: otpToken,
        }, {
            onSuccess: () => {
                toast.success("E-posta başarıyla doğrulandı!")
                router.push("/panel")
            }
        })
    }

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    E-posta Doğrulama
                </h1>
                <p className="text-muted-foreground text-sm">
                    E-posta adresinize gönderilen 8 haneli kodu girin.
                </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
                {/* E-posta (email boş geldiyse kullanıcı girebilsin) */}
                {!email && (
                    <div className="space-y-2">
                        <Label htmlFor="verify-email" className="text-sm font-medium">
                            E-posta
                        </Label>
                        <Input
                            id="verify-email"
                            type="email"
                            placeholder="firma@example.com"
                            className="h-11"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            inputMode="email"
                        />
                    </div>
                )}

                {email && (
                    <p className="text-sm text-center text-muted-foreground bg-muted/50 rounded-lg py-2 px-3">
                        📧 {email}
                    </p>
                )}

                {/* OTP Kodu */}
                <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium">
                        Doğrulama Kodu
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="otp"
                            type="text"
                            placeholder="00000000"
                            className="h-12 pl-10 text-center tracking-[1em] text-xl font-bold"
                            value={otpToken}
                            onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, "").slice(0, 8))}
                            maxLength={8}
                            inputMode="numeric"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={verifyOtpMutation.isPending}
                    className="w-full h-11 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium"
                >
                    {verifyOtpMutation.isPending ? "Doğrulanıyor..." : "Doğrula"}
                </Button>
            </form>
        </div>
    )
}
