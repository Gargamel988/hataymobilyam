import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getProfileSlug() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("CompanyProfiles")
    .select("slug")
    .eq("id", user.id)
    .single();

  return profile?.slug;
}

export async function getProductCount() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Use count: 'exact', head: true to get just the count without fetching data
  const { count } = await supabase
    .from("Product")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return count || 0;
}

export async function getProfileCompleteness() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("CompanyProfiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return {
      completionRate: 0,
      missingFields: ["Profil henüz oluşturulmamış"],
      isComplete: false,
    };
  }

  const checks = [
    { field: profile.phone, label: "Telefon" },
    { field: profile.email, label: "E-posta" },
    { field: profile.adress, label: "Adres" },
    { field: profile.district, label: "İlçe" },
    { field: profile.full_name, label: "Firma Adı" },
    { field: profile.admin, label: "Yetkili Kişi" },
    { field: profile.description, label: "Açıklama" },
    {
      field: profile.expertise && profile.expertise.length > 0,
      label: "Uzmanlık Alanları",
    },
    { field: profile.avatar_url, label: "Firma Logosu" },
  ];

  const filled = checks.filter((c) => !!c.field).length;
  const missingFields = checks.filter((c) => !c.field).map((c) => c.label);
  const completionRate = Math.round((filled / checks.length) * 100);

  return { completionRate, missingFields, isComplete: completionRate === 100 };
}
