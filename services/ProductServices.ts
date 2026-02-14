import { createClient } from "@/lib/supabase/client";
import { Product } from "@/schemas/product";

const supabase = createClient();

export async function InsertProduct(product: Product) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.");
  }

  const payload = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category,
    price: parseFloat(product.price),
    original_price: product.originalPrice
      ? parseFloat(product.originalPrice)
      : null,
    image_url: product.image_url,
    techSpecs: product.techSpecs,
    features: product.features,
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from("Product")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function GetProducts() {
  const { data, error } = await supabase.from("Product").select(`
      *,
      supplier:CompanyProfiles(
        full_name,
        district,
        slug
      )
    `);

  if (error) throw error;

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: Array.isArray(item.image_url) ? item.image_url[0] : item.image_url,
    price: item.price,
    originalPrice: item.original_price,
    category: item.category,
    description: item.description,
    badge: item.badge || undefined,
    isLocal: true,
    supplier: {
      name: item.supplier?.full_name || "Bilinmeyen Üretici",
      location: item.supplier?.district || "Hatay",
    },
    companySlug: item.supplier?.slug,
  }));
}

export async function DeleteProduct(id: string) {
  const { data, error } = await supabase.from("Product").delete().eq("id", id);
  if (error) throw error;
  return data;
}

export async function UpdateProduct(id: string, product: Product) {
  const payload = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category,
    price: parseFloat(product.price),
    original_price: product.originalPrice
      ? parseFloat(product.originalPrice)
      : null,
    image_url: product.image_url,
    techSpecs: product.techSpecs,
    features: product.features,
  };

  const { data, error } = await supabase
    .from("Product")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadProductImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const timestamp = Date.now();
  const fileName = `product-${timestamp}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("product")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("product")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

export async function getProductsByCompanyId(companyId: string) {
  const { data, error } = await supabase
    .from("Product")
    .select(
      `
      *,
      supplier:CompanyProfiles(
        full_name,
        district,
        slug
      )
    `,
    )
    .eq("user_id", companyId);

  if (error) throw error;

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    // Handle both array and string image formats, similar to other functions
    image_url: Array.isArray(item.image_url)
      ? item.image_url
      : item.image_url
        ? [item.image_url]
        : [],
    price: item.price,
    original_price: item.original_price,
    category: item.category,
    description: item.description,
    authorized: item.supplier?.admin,
    supplier: {
      name: item.supplier?.full_name || "Bilinmeyen Üretici",
      location: item.supplier?.district || "Hatay",
    },
  }));
}

export async function GetProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("Product")
    .select(
      `
      *,
      supplier:CompanyProfiles(
        full_name,
        district,
        slug,
        avatar_url,
        admin,
        phone
      )
    `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    originalPrice: data.original_price,
    images: Array.isArray(data.image_url) ? data.image_url : [data.image_url],
    category: data.category,
    badge: data.badge,
    badgeText: data.badge ? getBadgeText(data.badge) : undefined,
    techSpecs: (data.techSpecs || [])
      .map((spec: any) => ({
        key: spec.key || spec.label || "",
        value: spec.value || "",
      }))
      .filter((spec: any) => spec.key.trim() !== ""),
    features: data.features || [],
    specifications: (data.techSpecs || []).map((spec: any) => ({
      label: spec.label || spec.key,
      value: spec.value,
    })),

    supplier: {
      name: data.supplier?.full_name || "Bilinmeyen Üretici",
      slug: data.supplier?.slug,
      location: data.supplier?.district || "Hatay",
      logo:
        data.supplier?.avatar_url ||
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
      rating: 4.8,
      reviewCount: 24,
      isVerified: true,
      experience: "15 Yıl",
      phone: data.supplier?.phone,
    },
    deliveryInfo: {
      estimatedDays: "15-20",
      areas: ["Tüm Türkiye", "Hatay İçi Ücretsiz"],
    },
  };
}

export async function GetProductById(id: string) {
  const { data, error } = await supabase
    .from("Product")
    .select(
      `
            *,
            supplier:CompanyProfiles(
                full_name,
                district,
                slug,
                avatar_url,
                phone
            )
        `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    originalPrice: data.original_price,
    images: Array.isArray(data.image_url) ? data.image_url : [data.image_url],
    category: data.category,
    badge: data.badge,
    techSpecs: (data.techSpecs || [])
      .map((spec: any) => ({
        key: spec.key || spec.label || "",
        value: spec.value || "",
      }))
      .filter((spec: any) => spec.key.trim() !== ""),
    features: data.features || [],
    supplier: {
      name: data.supplier?.full_name || "Bilinmeyen Üretici",
      slug: data.supplier?.slug,
      location: data.supplier?.district || "Hatay",
      logo:
        data.supplier?.avatar_url ||
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
      phone: data.supplier?.phone,
    },
  };
}

export async function GetRelatedProducts(currentProductId: string, limit = 4) {
  const { data, error } = await supabase
    .from("Product")
    .select(
      `
      *,
      supplier:CompanyProfiles(
        full_name,
        district,
        slug
      )
    `,
    )
    .neq("id", currentProductId)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: Array.isArray(item.image_url) ? item.image_url[0] : item.image_url,
    price: item.price,
    originalPrice: item.original_price,
    category: item.category,
    supplier: {
      name: item.supplier?.full_name || "Bilinmeyen Üretici",
      location: item.supplier?.district || "Hatay",
    },
    companySlug: item.supplier?.slug,
    badge: item.badge,
  }));
}

function getBadgeText(badge: string): string {
  const badgeTexts: Record<string, string> = {
    new: "YENİ",
    traditional: "GELENEKSEL",
    handmade: "EL YAPIMI",
    local: "YEREL",
    discount: "İNDİRİM",
  };
  return badgeTexts[badge] || badge;
}
