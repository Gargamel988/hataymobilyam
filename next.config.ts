import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Görsel optimizasyonu
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kjiajuwmuhodhudipfjm.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 100],
  },

  // Sıkıştırma
  compress: true,

  // Powered-by header'ı kaldır (güvenlik)
  poweredByHeader: false,

  // Strict mode (React hataları erkenden yakala)
  reactStrictMode: true,

  // Production source map'leri kapat (bundle boyutunu küçült)
  productionBrowserSourceMaps: false,

  // HTTP header optimizasyonları
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Güvenlik headerları
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Statik dosyalar için uzun süreli cache
        source:
          "/(.*)\\.(js|css|woff2|woff|ttf|ico|svg|png|jpg|jpeg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
