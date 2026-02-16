"use client";
import { useRef, useEffect } from "react";
import { FooterSection } from "@/components/ui/footer-section";
import { useTheme } from "next-themes";
import { usePath } from "@/providers/pathprovıder"


function Footer() {
    const { theme, setTheme } = useTheme();
    const pathname = usePath()
    const hiddenFooterPaths = ["/auth", "/not-found", "/sifremi-unuttum", "/panel"]

    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
    }, []);

    if (pathname && hiddenFooterPaths.some(path => pathname.startsWith(path))) {
        return null
    }


    return (
        <div className="block">
            <FooterSection isDarkMode={mountedRef.current && theme === "dark"} setIsDarkMode={(value) => setTheme(value ? "dark" : "light")} />
        </div>
    );
}

export { Footer };
