import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const uploadFile = async (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Dosya adını temizle: Türkçe karakterler, boşluklar ve özel karakterleri kaldır
  const fileExt = file.name.split(".").pop();
  const timestamp = Date.now();
  const sanitizedFileName = `avatar-${timestamp}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(sanitizedFileName, file);

  if (error) {
    console.error(error);
    return null;
  }

  // Public URL al
  const { data: publicUrlData } = supabase.storage
    .from("avatar")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

import type { ProfileFormData } from "@/schemas/profile";

// Türkçe karakterleri dönüştür ve slug oluştur
const slugify = (text: string): string => {
  const turkishMap: Record<string, string> = {
    ı: "i",
    ğ: "g",
    ş: "s",
    ç: "c",
    ö: "o",
    ü: "u",
    İ: "i",
    Ğ: "g",
    Ş: "s",
    Ç: "c",
    Ö: "o",
    Ü: "u",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Profil kaydet veya güncelle (upsert)
export const upsertProfile = async (profileData: ProfileFormData) => {
  const { data: user } = await supabase.auth.getUser();
  const firmaAdi = profileData.name || user.user?.user_metadata.firma_adi || "";
  const slug = slugify(firmaAdi);

  const { data, error } = await supabase
    .from("CompanyProfiles")
    .upsert(
      {
        id: user.user?.id,
        full_name: firmaAdi,
        slug: slug,
        admin: profileData.authorized,
        description: profileData.description,
        phone: profileData.phone,
        email: user.user?.email,
        adress: profileData.address,
        expertise: profileData.expertise,
        avatar_url: profileData.avatar_url,
        background_url: profileData.background_url,
        district: profileData.district,
      },
      {
        onConflict: "id",
      },
    )
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
export const getProfile = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return null;

  const { data, error } = await supabase
    .from("CompanyProfiles")
    .select("*")
    .eq("id", user.user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

export type Company = {
  id: string;
  slug: string;
  name: string;
  categories: string[];
  location: string;
  phone: string;
  logoSrc: string;
  productCount: number;
  rating: number;
  verified: boolean;
  description: string;
  yearEstablished: number;
  authorized?: string;
  address?: string;
};

export const getAllCompanies = async (): Promise<Company[]> => {
  const { data, error } = await supabase.from("CompanyProfiles").select("*");

  if (error) {
    console.error(error);
    throw error;
  }
  return data.map((profile) => ({
    id: profile.id,
    slug: profile.slug || "",
    name: profile.full_name || "",
    categories: Array.isArray(profile.expertise)
      ? profile.expertise
      : profile.expertise
        ? [profile.expertise]
        : ["Genel"],
    location: profile.district || "Hatay",
    phone: profile.phone || "",
    logoSrc:
      profile.avatar_url ||
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop", // Fallback image
    productCount: Math.floor(Math.random() * 20) + 1, // Mock product count for visual variety
    rating: 4.5 + Math.random() * 0.5, // Mock rating
    verified: Math.random() > 0.5, // Mock verified status
    description: profile.description || "",
    yearEstablished: 2024,
    authorized: profile.admin || "",
    address: profile.address || "",
  }));
};
export const getCompanyBySlug = async (
  slug: string,
): Promise<Company | null> => {
  const { data, error } = await supabase
    .from("CompanyProfiles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching company by slug:", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug || "",
    name: data.full_name || "",
    categories: Array.isArray(data.expertise)
      ? data.expertise
      : data.expertise
        ? [data.expertise]
        : ["Genel"],
    location: data.district || "Hatay",
    address: data.adress || "",
    phone: data.phone || "",
    logoSrc:
      data.avatar_url ||
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    productCount: 0, // Need to count products separately or use a join/count
    rating: 0,
    verified: false,
    description: data.description || "",
    yearEstablished: 2024,
    authorized: data.admin || "",
  };
};
