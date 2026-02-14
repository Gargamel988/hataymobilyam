import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { ProductListClient } from "@/components/panel/products/ProductListClient";

// Server-side fetch function
async function getProductsForServer(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("Product")
        .select(`
            *,
            supplier:CompanyProfiles(
                full_name,
                district,
                slug
            )
        `)
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }

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

export default async function ProductsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['products', user.id],
        queryFn: () => getProductsForServer(user.id),
    });

    return (
        <div className="container mx-auto p-4 md:p-6 pb-20 space-y-6">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListClient userId={user.id} />
            </HydrationBoundary>
        </div>
    );
}

