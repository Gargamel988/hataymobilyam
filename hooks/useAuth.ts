import { Login, Logout, Register } from "@/services/AuthServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: Register,
    onSuccess: () => {
      // Email onayı gerekiyorsa bilgi ver
      alert("Kayıt başarılı! Email adresinizi kontrol edin.");
    },
    onError: (error: Error) => {
      alert(`Kayıt hatası: ${error.message}`);
    },
  });

  const loginMutation = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      // Başarılı giriş - ana sayfaya yönlendir
      router.push("/");
      router.refresh(); // Middleware session güncellemesi için
    },
    onError: (error: Error) => {
      alert(`Giriş hatası: ${error.message}`);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      router.push("/giris");
      router.refresh();
    },
    onError: (error: Error) => {
      alert(`Çıkış hatası: ${error.message}`);
    },
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
  };
};
