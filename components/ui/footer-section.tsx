import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Sun, Twitter } from "lucide-react"
import Link from "next/link"

const footerLinks: { title: string; href: string }[] = [
  {
    title: "Hakkımızda",
    href: "/about",
  },
  {
    title: "İletişim",
    href: "/contact",
  },
  {
    title: "Firmalar",
    href: "/companies",
  },
  {
    title: "Ürünler",
    href: "/products",
  },
  {
    title: "nasıl çalışır",
    href: "/how-work",
  },

  {
    title: "Gizlilik Politikası",
    href: "/privacy",
  },
  {
    title: "Kullanım Koşulları",
    href: "/terms",
  },
];

function FooterSection({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean, setIsDarkMode: (value: boolean) => void }) {

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Hatay Mobilya Pazaryeri</h2>
            <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
              Hatay&apos;ın yerel mobilya üreticilerini  bölgedeki alıcılarla buluşturan B2B pazaryeri. Kaliteli el işçiliği, modern tasarımlar ve güvenilir hizmet anlayışıyla Hatay&apos;ın mobilya sektörünün dijital buluşma noktası.
            </p>

            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">hızlı erişim</h3>
            <nav className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block transition-colors hover:text-primary">
                  {link.title}
                </Link>
              ))}

            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">İletişim</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Web: <Link href="https://hatayyazilim.com">hatayyazilim.com</Link></p>
              <p>Phone: <Link href="tel:+905537319288">0553 731 92 88</Link></p>
              <p>Email: <Link href="mailto:[EMAIL_ADDRESS]">omeraydin1.web@gmail.com</Link></p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Bizi Takip Edin</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook&apos;ta bizi takip edin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter&apos;da bizi takip edin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram&apos;da bizi takip edin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn&apos;de bizi takip edin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hatay Mobilya Pazaryeri. Tüm hakları <Link className="underline font-bold" href="https://hatayyazilim.com">Hatay yazılım</Link> tarafından geliştirilmiştir.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Kullanım Koşulları
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { FooterSection }