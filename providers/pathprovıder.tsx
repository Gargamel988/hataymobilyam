"use client"
import { createContext } from "react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
const PathContext = createContext<string | null>(null);

export const PathProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <PathContext.Provider value={pathname}>{children}</PathContext.Provider>
    );
};

export const usePath = () => useContext(PathContext);
