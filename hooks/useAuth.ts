import { Login, Logout, Register } from "@/services/AuthServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: Register,
    onSuccess: () => {
      toast.success("Kayıt başarılı! Email adresinizi kontrol edin.");
    },
    onError: (error: Error) => {
      toast.error(`Kayıt hatası: ${error.message}`);
    },
  });

  const loginMutation = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      toast.success("Giriş başarılı!");
      router.push("/");
      router.refresh(); // Middleware session güncellemesi için
    },
    onError: (error: Error) => {
      toast.error(`Giriş hatası: ${error.message}`);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("Çıkış başarılı!");
      router.push("/giris");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(`Çıkış hatası: ${error.message}`);
    },
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
  };
};
