export const translateError = (error: any): string => {
  // Eğer error bir string ise direkt kontrol et
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message ||
        error?.error_description ||
        "Bilinmeyen bir hata oluştu";

  const lowerMessage = errorMessage.toLowerCase();

  // Supabase / Auth Hataları
  if (lowerMessage.includes("invalid login credentials"))
    return "Giriş bilgileri hatalı. Lütfen e-posta ve şifrenizi kontrol edin.";

  if (lowerMessage.includes("email not confirmed"))
    return "E-posta adresi doğrulanmamış. Lütfen gelen kutunuzu kontrol edin.";

  if (lowerMessage.includes("user already registered"))
    return "Bu e-posta adresi ile zaten bir kayıt mevcut.";

  if (lowerMessage.includes("password should be at least"))
    return "Şifre çok kısa. Lütfen en az 6 karakterli bir şifre girin.";

  if (lowerMessage.includes("rate limit exceeded"))
    return "Çok fazla deneme yaptınız. Lütfen biraz bekleyip tekrar deneyin.";

  if (lowerMessage.includes("duplicate key value violates unique constraint")) {
    if (lowerMessage.includes("users_email_key"))
      return "Bu e-posta adresi zaten kullanımda.";
    if (lowerMessage.includes("slug"))
      return "Bu URL (slug) zaten kullanımda, lütfen başlığı değiştirin.";
    return "Bu kayıt zaten mevcut (Tekrarlanan veri hatası).";
  }

  if (error?.code === "23505")
    // Unique violation
    return "Bu kayıt zaten sistemde mevcut.";

  if (error?.code === "23503")
    // Foreign key violation
    return "İlişkili kayıt bulunamadı. (Örn: Firma profili oluşturmadan ürün eklenemez)";

  if (lowerMessage.includes("permission denied"))
    return "Bu işlemi yapmaya yetkiniz yok.";

  if (lowerMessage.includes("jwt expired"))
    return "Oturum süresi doldu. Lütfen tekrar giriş yapın.";

  // Bilinmeyen hatalar için orijinal mesajı (veya genel mesajı) döndür ama biraz süsle
  // Kullanıcıya teknik detay göstermek yerine genel hata + log önerisi
  console.error("Untranslated Error:", error);
  return `Beklenmeyen bir hata: ${errorMessage}`; // Geliştirme aşamasında hatayı görmek iyidir, prod'da sadece genel mesaj olabilir.
};
