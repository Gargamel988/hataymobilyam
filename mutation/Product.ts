"use client";

import { useMutation } from "@tanstack/react-query";
import { InsertProduct, UpdateProduct } from "@/services/ProductServices";
import { Product } from "@/schemas/product";

export const useInsertProductMutation = () => {
  return useMutation({
    mutationFn: InsertProduct,
    onSuccess: (data) => {
      console.log("Product inserted successfully", data);
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
      console.log("Product updated successfully", data);
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
