const normalize = (value: string | null | undefined) => {
  if (!value) return "";
  const str = String(value);
  return str
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
};

const capitalizeWords = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toLocaleUpperCase("tr-TR") + word.slice(1))
    .join(" ");
};

// Türkçe karakterleri dönüştür ve slug oluştur (tek kaynak)
const slugify = (text: string): string => {
  const turkishMap: Record<string, string> = {
    ı: "i",
    ğ: "g",
    ş: "s",
    ç: "c",
    ö: "o",
    ü: "u",
    İ: "i",
    Ğ: "g",
    Ş: "s",
    Ç: "c",
    Ö: "o",
    Ü: "u",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export { normalize, capitalizeWords, slugify };
