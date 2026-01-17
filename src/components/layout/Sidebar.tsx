"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chrome, PanelLeft } from "lucide-react";
import Image from "next/image";

type SidebarProps = {
    className?: string;
};

import { TenantSwitcher } from "./TenantSwitcher";
import { SIDEBAR_ROUTES } from "@/config/routes";

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`flex flex-col justify-between h-full bg-gray-50 dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 transition-all duration-300 ${isCollapsed ? "w-[70px]" : "w-64"
                } ${className}`}
        >
            <div className="flex flex-col gap-4">
                <div className={`flex items-center p-4 ${isCollapsed ? "justify-center" : "justify-between"}`}>
                    <Link href="/" onClick={() => setIsCollapsed(false)} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
                    </Link>
                    {!isCollapsed && (
                        <button
                            onClick={() => setIsCollapsed(true)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <PanelLeft className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <nav className="flex-1 px-4 space-y-2">
                        {!isCollapsed && <span className="text-sm font-base text-gray-500 dark:text-gray-400 block px-2">Main Menu</span>}
                        {SIDEBAR_ROUTES.mainMenu.map((route) => {
                            const Icon = route.icon;
                            const isActive = pathname === route.href;

                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    title={isCollapsed ? route.label : ""}
                                    className={`flex items-center text-[15px] px-3 py-1.5 rounded-lg transition-colors group ${isActive
                                        ? "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
                                        } ${isCollapsed ? "justify-center py-3" : ""}`}
                                >
                                    <Icon className={`!w-5 !h-5 text-black dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white ${!isCollapsed ? "mr-3" : ""}`} />
                                    {!isCollapsed && route.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <nav className="flex-1 px-4 space-y-2">
                        {!isCollapsed && <span className="text-sm font-base text-gray-500 dark:text-gray-400 block px-2 !mb-2">Favourites</span>}
                        {SIDEBAR_ROUTES.favorites.map((route) => {
                            const Icon = route.icon;
                            const isActive = pathname === route.href;

                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    title={isCollapsed ? route.label : ""}
                                    className={`flex items-center text-[15px] px-3 py-1.5 rounded-lg transition-colors group ${isActive
                                        ? "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
                                        } ${isCollapsed ? "justify-center py-3" : ""}`}
                                >
                                    <Icon className={`w-5 h-5 text-black dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white ${!isCollapsed ? "mr-3" : ""}`} />
                                    {!isCollapsed && route.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
            <div className="flex flex-col gap-3 px-4 mb-4 w-full">
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                    <Chrome className="w-7 h-7" />
                    <div className="flex flex-col">
                        <h6 className="text-sm font-medium text-black">Get the extension</h6>
                        <Link target="_blank" className="text-xs font-medium underline text-black" href="https://chrome.google.com/webstore/detail/dodo/">Install now</Link>
                    </div>
                </div>
                <TenantSwitcher />
            </div>
        </div>
    );
}
