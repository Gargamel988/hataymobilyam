import { createClient } from "@/lib/supabase/client";

type RegisterProps = {
  email: string;
  password: string;
  firma_adi: string;
  yetkili_adi: string;
  telefon: string;
  sehir: string;
};

type LoginProps = {
  email: string;
  password: string;
};

// Kayıt ol
export const Register = async ({
  email,
  password,
  firma_adi,
  yetkili_adi,
  telefon,
  sehir,
}: RegisterProps) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        firma_adi,
        yetkili_adi,
        telefon,
        sehir,
      },
    },
  });

  if (error) throw error;
  return data;
};

// Giriş yap
export const Login = async ({ email, password }: LoginProps) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// Çıkış yap
export const Logout = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

// Mevcut kullanıcıyı getir
export const getCurrentUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
};

// E-posta OTP Doğrula
export const verifyOtpEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });

  if (error) throw error;
  return data;
};
