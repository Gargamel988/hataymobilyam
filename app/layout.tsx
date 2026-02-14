import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/providertheme";
import { PathProvider } from "@/providers/pathprovıder";
import { QueryProvider } from "@/providers/QueryProvider";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hatay Mobilya Pazaryeri",
  description: "Hatay'ın en büyük online mobilya pazaryeri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
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

