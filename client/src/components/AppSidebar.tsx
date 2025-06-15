import { usePathname } from 'next/navigation';
import React from 'react'
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar';
import { BookOpen, ClipboardList, DollarSign, LayoutDashboard, LogOut, PanelLeft, Settings, Users } from 'lucide-react';
import { Sidebar } from './ui/sidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AppSidebarProps {
    userType: string;
}

const AppSidebar = ({ userType }: AppSidebarProps) => {
    const pathname = usePathname();
    const { toggleSidebar } = useSidebar();
    
    const navLinks = userType === "principal"
        ? [
            { icon: LayoutDashboard, label: "Dashboard", href: "/principal/dashboard" },
            { icon: Users, label: "Teachers", href: "/principal/teachers" },
            { icon: DollarSign, label: "Subscription", href: "/principal/subscription" },
            { icon: Settings, label: "Settings", href: "/principal/settings" }
        ]
        : [
            { icon: LayoutDashboard, label: "Dashboard", href: "/teacher/dashboard" },
            { icon: BookOpen, label: "Classes", href: "/teacher/classes" },
            { icon: ClipboardList, label: "Report History", href: "/teacher/report" },
            { icon: Settings, label: "Settings", href: "/teacher/settings" }
        ];

    const handleLogout = () => {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('userInfo');
    };

    return (
        <Sidebar
            collapsible='icon'
            style={{ height: "100vh" }}
            className='bg-white border-none shadow-lg'
        >
            <SidebarHeader>
                <SidebarMenu className='mt-5 group-data-[collapsible=icon]:mt-7'>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            onClick={() => toggleSidebar()}
                            className='group'
                        >
                            <div className='flex justify-between items-center gap-5 pl-3 pr-1 h-10 w-full group-data-[collapsible=icon]:ml-1 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0 group'>
                                <Image 
                                    src="/logo.png"
                                    alt='logo'
                                    width={100}
                                    height={60}
                                    className='app-sidebar__logo'
                                />
                                <PanelLeft className='text-gray-400 w-5 h-5 group-data-[collapsible=icon]:hidden cursor-pointer' />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className='mt-7 gap-0'>
                    {navLinks.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <SidebarMenuItem
                                key={link.href}
                                className={cn(
                                    "group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-4 hover:bg-[#6C5CE7]/50 transition-all duration-300 ease-in-out",
                                    isActive && "bg-[#6C5CE7]/20"
                                )}
                            >
                                <SidebarMenuButton
                                    asChild
                                    size="lg"
                                    className={cn(
                                        "gap-4 p-8 hover:bg-customgreys-secondarybg group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center",
                                        !isActive && "text-customgreys-dirtyGrey"
                                    )}
                                >
                                    <Link
                                        href={link.href}
                                        scroll={false}
                                        className='relative flex items-center hover:bg-customgreys-darkerGrey'
                                    >
                                        <link.icon className={isActive ? "text-white-50" : "text-gray-500"} />
                                        <span
                                            className={cn(
                                                "font-medium text-md ml-4 group-data-[collapsible=icon]:hidden",
                                                isActive ? "text-white-50" : "text-gray-500"
                                            )}
                                        >
                                            {link.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                                {isActive && <div className='absolute right-0 top-0 h-full w-[4px] bg-primary-750' />}
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                href="/login"
                                className='text-red-500 pl-8'
                                onClick={handleLogout}
                            >
                                <LogOut className='mr-2 h-6 w-6' />
                                <span>Log out</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar