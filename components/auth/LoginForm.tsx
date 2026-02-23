"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { LoginScheme, loginScheme } from "@/schemas/loginScheme"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/useAuth"


function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const { loginMutation } = useAuth()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginScheme>({
        resolver: zodResolver(loginScheme),
        defaultValues: {
            email: "",
            sifre: "",
        },
    })

    const onSubmit = (data: LoginScheme) => {
        loginMutation.mutate({
            email: data.email,
            password: data.sifre,
        })
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Firma Girişi
                </h1>
                <p className="text-muted-foreground">
                    Hatay Mobilya Pazaryeri&apos;ne hoş geldiniz
                </p>
            </div>

            {/* Form */}
            <form action="/api/auth/login" method="POST" className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                        E-posta
                    </Label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="firma@example.com"
                                        className="h-12 pl-10"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Şifre */}
                <div className="space-y-1.5">
                    <Label htmlFor="sifre" className="text-sm font-medium">
                        Şifre
                    </Label>
                    <Controller
                        name="sifre"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        {...field}
                                        id="sifre"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Şifrenizi girin"
                                        className="h-12 pl-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.sifre && (
                                    <p className="text-red-500 text-xs mt-1">{errors.sifre.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="flex justify-end">
                    <Link
                        href="/sifremi-unuttum"
                        className="text-sm text-amber-700 hover:underline"
                    >
                        Şifremi Unuttum
                    </Link>
                </div>

                <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-base font-medium"
                >
                    {loginMutation.isPending ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </Button>
            </form>

            {/* Switch to Register */}
            <p className="text-center mt-8 text-sm text-muted-foreground">
                Hesabınız yok mu?{" "}
                <Link
                    href="/auth?mode=register"
                    className="text-amber-700 font-semibold hover:underline"
                >
                    Kayıt Ol
                </Link>
            </p>
        </div>
    )
}

export { LoginForm }
