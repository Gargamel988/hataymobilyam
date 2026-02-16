"use client";

import { createClient } from "@/lib/supabase/client";
import { Product } from "@/schemas/product";

const getSupabase = () => createClient();

export async function InsertProduct(product: Product) {
  const supabase = getSupabase();
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
  const supabase = getSupabase();
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
  const supabase = getSupabase();
  const { data, error } = await supabase.from("Product").delete().eq("id", id);
  if (error) throw error;
  return data;
}

export async function UpdateProduct(id: string, product: Product) {
  const supabase = getSupabase();
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
  const supabase = getSupabase();
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
  const supabase = getSupabase();
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
