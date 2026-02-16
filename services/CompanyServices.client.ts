"use client";

import { createClient } from "@/lib/supabase/client";
import type { ProfileFormData } from "@/schemas/profile";
import type { Company } from "./CompanyServices";

export { type Company } from "./CompanyServices";

const getSupabase = () => createClient();

export const uploadFile = async (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const supabase = getSupabase();

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

  const { data: publicUrlData } = supabase.storage
    .from("avatar")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

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

export const upsertProfile = async (profileData: ProfileFormData) => {
  const supabase = getSupabase();
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
  const supabase = getSupabase();
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

export const getAllCompanies = async (): Promise<Company[]> => {
  const supabase = getSupabase();
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
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    productCount: Math.floor(Math.random() * 20) + 1,
    rating: 4.5 + Math.random() * 0.5,
    verified: Math.random() > 0.5,
    description: profile.description || "",
    yearEstablished: 2024,
    authorized: profile.admin || "",
    address: profile.address || "",
  }));
};
