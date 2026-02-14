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
