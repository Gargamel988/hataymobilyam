import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/providertheme";
import { PathProvider } from "@/providers/pathprovıder";
import { QueryProvider } from "@/providers/QueryProvider";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Toaster } from "sonner";
import { Metadata, Viewport } from "next";
import Script from "next/script";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Hatay Mobilya Pazaryeri | Hatay'ın En Büyük B2B Mobilya Platformu",
    template: "%s | Hatay Mobilya Pazaryeri"
  },
  description: "Hatay'ın yerel mobilya üreticilerini ve zanaatkarlarını bölgedeki alıcılarla buluşturan B2B pazaryeri. Salon, yatak odası, mutfak ve ofis mobilyaları için onlarca firmadan ücretsiz teklif alın.",
  keywords: [
    "Hatay mobilya",
    "mobilya pazaryeri",
    "Hatay mobilya firmaları",
    "B2B mobilya",
    "mobilya teklif al",
    "Antakya mobilya",
    "salon takımı Hatay",
    "yatak odası Hatay",
    "mutfak dolabı Hatay",
    "ofis mobilyası Hatay",
    "el yapımı mobilya",
    "özel üretim mobilya",
    "mobilya üreticileri",
    "Hatay mobilya pazarı",
    "mobilya fiyatları",
  ],
  authors: [{ name: "Hatay Mobilya Pazaryeri" }],
  creator: "Hatay Yazılım",
  publisher: "Hatay Mobilya Pazaryeri",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://hataymobilyam.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hatay Mobilya Pazaryeri | Hatay'ın En Büyük B2B Mobilya Platformu",
    description: "Hatay'ın yerel mobilya üreticilerini ve zanaatkarlarını bölgedeki alıcılarla buluşturan B2B pazaryeri. Onlarca firmadan ücretsiz teklif alın, karşılaştırın ve en uygun firmayı seçin.",
    url: 'https://hataymobilyam.com',
    siteName: 'Hatay Mobilya Pazaryeri',
    images: [
      {
        url: 'https://hataymobilyam.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hatay Mobilya Pazaryeri - B2B Mobilya Platformu',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hatay Mobilya Pazaryeri | Hatay'ın En Büyük B2B Mobilya Platformu",
    description: "Hatay'ın yerel mobilya üreticilerini bölgedeki alıcılarla buluşturan B2B pazaryeri. Ücretsiz teklif alın!",
    images: ['https://hataymobilyam.com/og-image.png'],
    creator: '@hataymobilyam',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Hatay Mobilya Pazaryeri",
    "url": "https://hataymobilyam.com",
    "logo": "https://hataymobilyam.com/logo.png",
    "description": "Hatay'ın yerel mobilya üreticilerini ve zanaatkarlarını bölgedeki alıcılarla buluşturan B2B mobilya pazaryeri.",
    "telephone": "+90-553-731-9288",
    "email": "omeraydin1.web@gmail.com",
    "priceRange": "₺₺",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Derince mahallesi",
      "addressLocality": "Antakya",
      "addressRegion": "Hatay",
      "postalCode": "31000",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.2025",
      "longitude": "36.1604"
    },
    "foundingDate": "2026",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Hatay"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobilya Kategorileri",
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Oturma Odası Mobilyaları" },
        { "@type": "OfferCatalog", "name": "Yatak Odası Mobilyaları" },
        { "@type": "OfferCatalog", "name": "Mutfak Mobilyaları" },
        { "@type": "OfferCatalog", "name": "Ofis Mobilyaları" },
        { "@type": "OfferCatalog", "name": "Özel Üretim Mobilya" }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/omeraydin9826/",
      "https://www.linkedin.com/in/ömer-aydın-3bb453366",
      "https://twitter.com/hatayyazilim",
      "https://github.com/Gargamel988",
      "https://www.facebook.com/profile.php?id=100014515023274&locale=tr_TR"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-553-731-9288",
      "contactType": "customer service",
      "email": "omeraydin1.web@gmail.com",
      "availableLanguage": ["Turkish"]
    }
  }
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} 
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
        </Script>
        <QueryProvider>
          <ThemeProvider>
            <PathProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster richColors position="top-right" />
            </PathProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

