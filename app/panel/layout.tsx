import React from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { PanelHeader } from "@/components/panel/PanelHeader";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "hatay mobilya panel",
    description: "hatay mobilya panel",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function PanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    const { data: profile } = await supabase
        .from("CompanyProfiles")
        .select("full_name, avatar_url, email")
        .eq("id", user.id)
        .single();

    const name = profile?.full_name || user.user_metadata?.full_name || "Hatay Mobilya";
    const email = profile?.email || user.email || "";
    const avatar = profile?.avatar_url || user.user_metadata?.avatar_url || "";

    return (
        <SidebarProvider>
            <AppSidebar name={name} email={email} avatar={avatar} />
            <SidebarInset>
                <PanelHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
