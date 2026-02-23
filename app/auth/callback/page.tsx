import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OtpVerificationForm } from "@/components/auth/OtpVerificationForm";

export default async function AuthCallbackPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const { code, token_hash, type, next = "/panel" } = params;

    const supabase = await createClient();

    // PKCE flow: code ile session exchange
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code as string);
        if (error) {
            console.error("Code exchange error:", error);
            return redirect(`/auth?error=${encodeURIComponent(error.message)}`);
        }
        return redirect(next as string);
    }

    // Magic link / token_hash flow
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            type: type as any,
            token_hash: token_hash as string,
        });
        if (error) {
            console.error("Verification error:", error);
            return redirect(`/auth?error=${encodeURIComponent(error.message)}`);
        }
        return redirect(next as string);
    }

    // Parametresiz geldiyse: OTP doğrulama formunu göster
    const email = params.email as string | undefined;

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 p-4">
            <div className="w-full max-w-md">
                <OtpVerificationForm email={email ?? ""} />
            </div>
        </div>
    );
}
