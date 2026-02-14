"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function PanelHeader() {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    const breadcrumbItems = pathSegments.slice(1)

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/panel">
                                Panel
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbItems.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                        {breadcrumbItems.map((item, index) => {
                            const href = `/panel/${breadcrumbItems.slice(0, index + 1).join('/')}`
                            return (
                                <React.Fragment key={href}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index < breadcrumbItems.length - 1 && (
                                        <BreadcrumbSeparator className="hidden md:block" />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
