import { createClient } from "@/lib/supabase/server";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  supplierCount: number;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data: products, error } = await supabase.from("Product").select(`
      id,
      name,
      category,
      image_url,
      user_id,
      supplier:CompanyProfiles(
        id,
        district
      )
    `);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  const categoryMap = new Map<string, Category>();
  const supplierSets = new Map<string, Set<string>>();

  products.forEach((product: any) => {
    const categoryName = product.category;
    if (!categoryName) return;

    const key = categoryName.trim();

    // Initialize if new
    if (!categoryMap.has(key)) {
      let image =
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop";

      // Handle image_url which could be string, array, or null
      if (Array.isArray(product.image_url) && product.image_url.length > 0) {
        image = product.image_url[0];
      } else if (typeof product.image_url === "string" && product.image_url) {
        image = product.image_url;
      }

      categoryMap.set(key, {
        id: key,
        name: key,
        slug: slugify(key),
        image,
        productCount: 0,
        supplierCount: 0,
      });

      supplierSets.set(key, new Set());
    }

    // Increment counts
    const category = categoryMap.get(key)!;
    category.productCount += 1;

    // Collect supplier
    if (product.user_id) {
      supplierSets.get(key)!.add(product.user_id);
    }
  });

  // Finalize supplier counts
  return Array.from(categoryMap.values())
    .map((cat) => ({
      ...cat,
      supplierCount: supplierSets.get(cat.name)?.size || 0,
    }))
    .sort((a, b) => b.productCount - a.productCount);
}

function slugify(text: string) {
  const trMap: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ş: "s",
    ü: "u",
    ö: "o",
    ı: "i",
    Ç: "C",
    Ğ: "G",
    Ş: "S",
    Ü: "U",
    Ö: "O",
    İ: "I",
  };

  return text
    .split("")
    .map((char) => trMap[char] || char)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

const getCategory = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Product")
    .select("category, user_id");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  const categoryStats = new Map<
    string,
    { productCount: number; supplierSet: Set<string> }
  >();

  data.forEach((item: any) => {
    const category = item.category;
    const userId = item.user_id;

    if (!category) return;

    if (!categoryStats.has(category)) {
      categoryStats.set(category, { productCount: 0, supplierSet: new Set() });
    }

    const stats = categoryStats.get(category)!;
    stats.productCount++;

    if (userId) {
      stats.supplierSet.add(userId);
    }
  });

  return Array.from(categoryStats.entries()).map(([category, stats]) => ({
    category,
    productCount: stats.productCount,
    supplierCount: stats.supplierSet.size,
  }));
};
const getCompanies = async () => {
  const supabase = await createClient();

  // Fetch companies with their products (just IDs to count)
  // Note: For large datasets, use count() or specific RPC. For now, fetching IDs is okay.
  const { data, error } = await supabase.from("CompanyProfiles").select(
    `
    id, 
    full_name, 
    slug,
    avatar_url, 
    district,
    products:Product(id)
  `,
  );

  if (error) {
    console.error("Error fetching companies:", error);
    return [];
  }

  return data.map((company: any) => ({
    id: company.id,
    name: company.full_name || "İsimsiz Firma",
    category: "Mobilya Üreticisi", // Default category or fetch from somewhere
    location: company.district || "Hatay",
    logo:
      company.avatar_url ||
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop", // Default logo
    productCount: company.products?.length || 0,
    rating: (Math.random() * 2 + 3).toFixed(1),
    verified: Math.random() > 0.5,
    yearsActive: Math.floor(Math.random() * 10) + 1,
    slug: company.slug,
  }));
};

export { getCategory, getCompanies };
