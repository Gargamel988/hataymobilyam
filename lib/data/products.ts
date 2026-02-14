export const categoryLabels = {
  "oturma-odasi": "Oturma Odası",
  "yatak-odasi": "Yatak Odası",
  "cocuk-genc-odasi": "Çocuk & Genç Odası",
  mutfak: "Mutfak",
  "antre-depolama": "Antre & Depolama",
  "ofis-calisma": "Ofis & Çalışma",
  "bahce-balkon": "Bahçe & Balkon",
  "tamamlayici-urunler": "Tamamlayıcı Ürünler",
  "ozel-uretim-projeler": "Özel Üretim & Projeler",
} as const;

export type ProductCategory = keyof typeof categoryLabels;
