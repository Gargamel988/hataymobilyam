import { createClient } from "@/lib/supabase/server";
import type { ProfileFormData } from "@/schemas/profile";
import { slugify } from "@/utils/utils";

// Profil kaydet veya güncelle (upsert)
export const upsertProfile = async (profileData: ProfileFormData) => {
  const supabase = await createClient();
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
  const supabase = await createClient();
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

export type { Company } from "@/types/company";
import type { Company } from "@/types/company";

export const getAllCompanies = async (): Promise<Company[]> => {
  const supabase = await createClient();
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
    coverImage: profile.background_url || "",
    logoSrc:
      profile.avatar_url ||
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop", // Fallback image
    productCount: Math.floor(Math.random() * 20) + 1,
    rating: 4.5 + Math.random() * 0.5,
    verified: Math.random() > 0.5,
    description: profile.description || "",
    yearEstablished: 2024,
    authorized: profile.admin || "",
    address: profile.address || "",
  }));
};
export const getCompanyBySlug = async (
  slug: string,
): Promise<Company | null> => {
  const supabase = await createClient();
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
    coverImage: data.background_url || "",
    logoSrc: data.avatar_url || "",
    productCount: 0,
    rating: 0,
    verified: false,
    description: data.description || "",
    yearEstablished: 2024,
    authorized: data.admin || "",
  };
};
