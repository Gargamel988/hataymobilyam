"use client";
import { useState, useEffect } from "react";
import { FooterSection } from "@/components/ui/footer-section";
import { useTheme } from "next-themes";
import { usePath } from "@/providers/path-provider"


function Footer() {
    const { theme, setTheme } = useTheme();
    const pathname = usePath()
    const hiddenFooterPaths = ["/auth", "/not-found", "/sifremi-unuttum", "/panel"]

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (pathname && hiddenFooterPaths.some(path => pathname.startsWith(path))) {
        return null
    }


    return (
        <div className="block">
            <FooterSection isDarkMode={mounted && theme === "dark"} setIsDarkMode={(value) => setTheme(value ? "dark" : "light")} />
        </div>
    );
}

export { Footer };
