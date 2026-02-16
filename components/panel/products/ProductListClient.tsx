"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Package
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductsByCompanyId, DeleteProduct } from "@/services/ProductServices.client";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ProductListClientProps {
    userId: string;
}

export function ProductListClient({ userId }: ProductListClientProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    const { data: products = [] } = useQuery({
        queryKey: ['products', userId],
        queryFn: () => getProductsByCompanyId(userId),
    });

    const deleteMutation = useMutation({
        mutationFn: DeleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', userId] });
            toast.success("Ürün başarıyla silindi.");
            setProductToDelete(null);
        },
        onError: (error) => {
            console.error("Delete error:", error);
            toast.error("Ürün silinirken bir hata oluştu.");
            setProductToDelete(null);
        }
    });

    const filteredProducts = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = () => {
        if (productToDelete) {
            deleteMutation.mutate(productToDelete);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        Ürünlerim
                        <Badge variant="secondary" className="bg-primary/10 text-primary">{products.length}</Badge>
                    </h1>
                    <p className="text-muted-foreground text-sm">Portfolyonuzu ve ürün kataloğunuzu yönetin.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Ürün ara..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Button className="gap-2" asChild>
                        <Link href="/panel/products/add">
                            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Yeni Ekle</span>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Empty State / Add New Placeholder Card */}
                <Card onClick={() => { router.push("/panel/products/add") }} className="border-dashed bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px] group/add">
                    <div className="rounded-full bg-muted p-4 group-hover/add:bg-primary/10 transition-colors mb-4">
                        <Plus className="h-8 w-8 text-muted-foreground group-hover/add:text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Yeni Ekle</h3>
                    <p className="text-sm text-muted-foreground">Portfolyona yeni bir iş ekle</p>
                </Card>

                {filteredProducts.map((product: any) => (
                    <Card key={product.id} className="group overflow-hidden">
                        <div className="aspect-video bg-muted relative h-[200px] w-full">
                            <Image
                                src={Array.isArray(product.image_url) ? product.image_url[0] : product.image_url}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="object-cover w-full h-full "
                            />


                            {/* Status Badge - Mock property if not in DB, assuming 'Active' for now */}
                            <div className="absolute top-2 right-2">
                                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                    Aktif
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-base line-clamp-1">{product.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{product.category}</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => router.push(`/panel/products/edit/${product.slug}`)}>
                                            <Edit className="mr-2 h-4 w-4" /> Düzenle
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600" onClick={() => setProductToDelete(product.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Sil
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="font-semibold">
                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.price)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={!!productToDelete} onOpenChange={(open: boolean) => !open && setProductToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Emin misiniz?</DialogTitle>
                        <DialogDescription>
                            Bu işlem geri alınamaz. Bu ürün kalıcı olarak silinecektir.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setProductToDelete(null)}>İptal</Button>
                        <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Sil</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
