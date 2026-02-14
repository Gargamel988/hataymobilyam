import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"
import Image from "next/image"

interface AuthPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: AuthPageProps) {
    const params = await searchParams
    const mode = params.mode
    const isLogin = mode !== 'register'

    return (
        <div className="min-h-screen flex overflow-hidden">
            {/* Sol Panel - Form veya Görsel */}
            <div
                className="w-1/2 h-screen relative flex items-center justify-center transition-transform duration-700 ease-in-out"
                style={{ transform: isLogin ? "translateX(100%)" : "translateX(0%)" }}
            >
                {/* Login Form */}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-stone-50 dark:bg-stone-900 p-8 transition-opacity duration-500 ${isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="w-full max-w-md">
                        <LoginForm />
                    </div>
                </div>

                {/* Register Image */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 ${!isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <Image
                        src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=1600&fit=crop"
                        alt="Minimalist oturma odası"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
                </div>
            </div>

            {/* Sağ Panel - Görsel veya Form */}
            <div
                className="w-1/2 h-screen relative flex items-center justify-center transition-transform duration-700 ease-in-out"
                style={{ transform: isLogin ? "translateX(-100%)" : "translateX(0%)" }}
            >
                {/* Register Form */}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-stone-50 dark:bg-stone-900 p-8 transition-opacity duration-500 ${!isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="w-full max-w-md">
                        <RegisterForm />
                    </div>
                </div>
                {/* Login Image */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 ${isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <Image
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=1600&fit=crop&v=2"
                        alt="Modern iç mekan tasarımı"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                </div>
            </div>
        </div>
    )
}
