import { z } from "zod";

export const loginScheme = z.object({
  email: z
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .toLowerCase()
    .trim(),

  sifre: z.string().min(1, "Şifre gereklidir"),
});

export type LoginScheme = z.infer<typeof loginScheme>;
