import { z } from "zod";

const telefonRegex = /^(05\d{2})\s?\d{3}\s?\d{2}\s?\d{2}$/;

export const registerScheme = z.object({
  firma_adi: z
    .string()
    .min(3, "Firma adı en az 3 karakter olmalıdır")
    .max(100, "Firma adı en fazla 100 karakter olabilir")
    .trim(),

  yetkili_adi: z
    .string()
    .min(3, "Yetkili adı en az 3 karakter olmalıdır")
    .max(50, "Yetkili adı en fazla 50 karakter olabilir")
    .trim(),

  telefon: z
    .string()
    .regex(telefonRegex, "Geçerli bir telefon numarası girin (05XX XXX XX XX)")
    .transform((val) => val.replace(/\s/g, "")),

  email: z
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .toLowerCase()
    .trim(),

  sifre: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .max(50, "Şifre en fazla 50 karakter olabilir")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),

  sehir: z.string().min(2, "Şehir seçiniz"),
});

export type RegisterScheme = z.infer<typeof registerScheme>;
