"use client";

import { useMutation } from "@tanstack/react-query";
import {
  InsertProduct,
  UpdateProduct,
} from "@/services/ProductServices.client";
import { Product } from "@/schemas/product";

export const useInsertProductMutation = () => {
  return useMutation({
    mutationFn: InsertProduct,
    onSuccess: (data) => {
      // Ürün başarıyla eklendi
    },
    onError: (error) => {
      console.error("Error inserting product:", error);
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: Product }) =>
      UpdateProduct(id, product),
    onSuccess: (data) => {
      // Ürün başarıyla güncellendi
    },
    onError: (error: any) => {
      console.error(
        "Error updating product:",
        error?.message,
        error?.code,
        error?.details,
        error?.hint,
        error,
      );
    },
  });
};
