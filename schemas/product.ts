import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
  slug: z.string().min(1, "Slug oluşturulamadı"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  category: z.string().min(1, "Lütfen bir kategori seçiniz"),
  price: z.string().min(1, "Fiyat bilgisi zorunludur"),
  originalPrice: z.string().optional().or(z.literal("")),
  image_url: z.array(z.string()),
  techSpecs: z.array(
    z.object({
      key: z.string().min(1, "Özellik adı boş olamaz"),
      value: z.string(),
    }),
  ),
  features: z.array(z.string()),
  badge: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
