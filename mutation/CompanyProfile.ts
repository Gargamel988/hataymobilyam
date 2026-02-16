import { upsertProfile } from "@/services/CompanyServices.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileFormData } from "@/schemas/profile";

// Upsert hook - tek fonksiyon hem insert hem update yapar
export function useUpsertProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileFormData) => upsertProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyProfile"] });
      console.log("Profil başarıyla kaydedildi");
    },
    onError: (error: Error) => {
      console.error("Profil kaydetme hatası:", error.message);
    },
  });
}
