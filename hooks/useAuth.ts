import {
  Login,
  Logout,
  Register,
  verifyOtpEmail,
} from "@/services/AuthServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { translateError } from "@/utils/ErrorTranslator";

export const useAuth = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: Register,
    onSuccess: () => {
      toast.success(
        "Kayıt başarılı! Email adresinize gelen doğrulama kodunu girin.",
      );
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Kayıt hatası:", error);
      toast.error(translateError(error));
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtpEmail,
    onSuccess: () => {
      toast.success("E-posta başarıyla doğrulandı!");
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Doğrulama hatası:", error);
      toast.error(translateError(error));
    },
  });

  const loginMutation = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      toast.success("Giriş başarılı!");
      router.refresh(); // Middleware session güncellemesi için
    },
    onError: (error: Error) => {
      console.error("Giriş hatası:", error);
      toast.error(translateError(error));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("Çıkış başarılı!");
      router.refresh();
    },
    onError: (error: Error) => {
      console.error("Çıkış hatası:", error);
      toast.error(translateError(error));
    },
  });

  return {
    registerMutation,
    verifyOtpMutation,
    loginMutation,
    logoutMutation,
  };
};
