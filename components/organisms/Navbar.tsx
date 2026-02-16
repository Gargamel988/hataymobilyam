"use client"
import React, { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
    Sofa,
    Bed,

    ChefHat,
    Briefcase,
    Ruler,
    Store,
    Menu,
    X,
} from "lucide-react"
import { usePath } from "@/providers/pathprovıder"

const categories = [
    {
        title: "Oturma Odası",
        href: "/products?kategori=oturma-odasi",
        description: "Modern ve klasik koltuk takımları, köşe grupları",
        icon: Sofa,
    },
    {
        title: "Yatak Odası",
        href: "/products?kategori=yatak-odasi",
        description: "Yatak odası takımları, gardıroplar ve komodinler",
        icon: Bed,
    },
    {
        title: "Mutfak",
        href: "/products?kategori=mutfak",
        description: "Mutfak dolapları ve modüler mutfak çözümleri",
        icon: ChefHat,
    },
    {
        title: "Ofis & Çalışma",
        href: "/products?kategori=ofis-ve-calisma",
        description: "Çalışma masaları, ofis koltukları ve dosya dolapları",
        icon: Briefcase,
    },
    {
        title: "Özel Üretim & Projeler",
        href: "/products?kategori=ozel-uretim-ve-projeler",
        description: "Size özel tasarlanmış mobilya çözümleri",
        icon: Ruler,
    },
]

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePath()

    if (pathname && (pathname.startsWith("/panel") || pathname.startsWith("/auth"))) {
        return null
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-700 dark:bg-white">
                        <Store className="h-5 w-5 dark:text-amber-700 text-white" />
                    </div>
                    <span className="hidden font-bold text-xl sm:inline-block">
                        Hatay Mobilya
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        {/* Kategoriler Dropdown */}
                        <NavigationMenuItem>
                            <Link href="/products" passHref>
                                <NavigationMenuTrigger className="cursor-pointer">
                                    Kategoriler
                                </NavigationMenuTrigger>
                            </Link>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {/* Tüm Ürünler Linki */}
                                    <li className="col-span-2">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/products"
                                                className="flex items-center gap-3 p-4 rounded-lg bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/30 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-900/50 dark:hover:to-amber-800/30 transition-all"
                                            >
                                                <Store className="h-8 w-8 text-amber-600" />
                                                <div>
                                                    <div className="text-sm font-semibold text-amber-900 dark:text-amber-100">Tüm Ürünler</div>
                                                    <p className="text-xs text-amber-700 dark:text-amber-300">Tüm kategorilerdeki ürünleri görüntüle</p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    {categories.map((category) => (
                                        <ListItem
                                            key={category.title}
                                            title={category.title}
                                            href={category.href}
                                            icon={category.icon}
                                        >
                                            {category.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Firmalar */}
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/companies">
                                    Firmalar
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        {/* Nasıl Çalışır? */}
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/how-work">
                                    Nasıl Çalışır?
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        {/* Hakkımızda */}
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/about">
                                    Hakkımızda
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        {/* İletişim */}
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/contact">
                                    İletişim
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <Button asChild className="bg-amber-700 hover:bg-amber-600 text-white">
                        <Link href="/auth">Firma Kaydı</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t bg-background">
                    <div className="container px-4 py-4 space-y-4">
                        {/* Kategoriler */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                Kategoriler
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {categories.map((category) => {
                                    const Icon = category.icon
                                    return (
                                        <Link
                                            key={category.title}
                                            href={category.href}
                                            className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Icon className="h-4 w-4 text-amber-600" />
                                            <span className="text-sm font-medium">{category.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                Hızlı Linkler
                            </h4>
                            <div className="space-y-1">
                                <Link
                                    href="/companies"
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Firmalar
                                </Link>
                                <Link
                                    href="/how-work"
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Nasıl Çalışır?
                                </Link>
                                <Link
                                    href="/about"
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Hakkımızda
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    İletişim
                                </Link>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 pt-2 border-t">
                            <Button className="w-full bg-amber-700 hover:bg-amber-600" asChild>
                                <Link href="/auth">Firma Kaydı</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & {
        icon?: React.ComponentType<{ className?: string }>
    }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4 text-amber-600" />}
                        <div className="text-sm font-medium leading-none">{title}</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
