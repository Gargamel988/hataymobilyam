import { z } from "zod";

// Profil formu için Zod şeması
export const profileFormSchema = z.object({
  name: z.string().optional(), // user_metadata'dan geliyor
  authorized: z.string().min(2, "Yetkili adı en az 2 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  phone: z.string().optional(), // user_metadata'dan geliyor
  email: z.string().optional(), // user_metadata'dan geliyor
  district: z.string().optional(), // user_metadata'dan geliyor
  address: z.string().optional(),
  expertise: z.array(z.string()).min(1, "En az bir uzmanlık alanı seçiniz"),
  avatar_url: z.string().optional(),
  background_url: z.string().optional(),
});

// TypeScript tipi
export type ProfileFormData = z.infer<typeof profileFormSchema>;

// Default değerler
export const profileFormDefaults: ProfileFormData = {
  name: "",
  authorized: "",
  description: "",
  phone: "",
  email: "",
  district: "",
  address: "",
  expertise: [],
  avatar_url: "",
  background_url: "",
};
