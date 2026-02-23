"use client"
import React from "react"
import {
  Settings2,
  SquareTerminal,

} from "lucide-react"
import { useRouter } from "next/navigation"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"



export function AppSidebar({ name, email, avatar, ...props }: { name: string, email: string, avatar: string } & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const data = {
    user: {
      name: name,
      email: email,
      avatar: avatar,
    },
    teams: [
      {
        name: "Hatay Mobilyam",
        logo: "/images/hatay-mobilyam-logo.jpeg",
        plan: "Yönetim Paneli",
      },
    ],
    navMain: [
      {
        title: "Panel",
        url: "/panel",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Anasayfa",
            url: "/panel",
          },
          {
            title: "Ürünlerim",
            url: "/panel/products",
          },
        ],
      },
      {
        title: "Hesabım",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Profilim",
            url: "/panel/profil",
          },
          {
            title: "Ayarlar",
            url: "/panel/settings",
          },
        ],
      },
    ],
    projects: [],
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth");
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} signOut={signOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
