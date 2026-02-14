import { GetProductById, GetProductBySlug } from "@/services/ProductServices";
import { EditProductForm } from "@/components/panel/products/EditProductForm";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EditProductPage(props: PageProps) {
    const params = await props.params;
    const slug = decodeURIComponent(params.slug);
    const product = await GetProductBySlug(slug);
    console.log(product, "product")
    console.log(slug, "slug")
    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto p-4 md:p-6 pb-20 space-y-6">
            <EditProductForm initialData={product} productId={product.id} />
        </div>
    );
}