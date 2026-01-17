"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chrome, PanelLeft, X } from "lucide-react";
import Image from "next/image";

import { TenantSwitcher } from "./TenantSwitcher";
import { SIDEBAR_ROUTES } from "@/config/routes";
import { Tooltip } from "../ui/Tooltip";

export function Sidebar({ className, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: any) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-white "
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div
                className={`
                    fixed md:relative z-50 h-full
                    flex flex-col justify-between 
                    bg-gray-50 dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 
                    transition-all duration-300 ease-in-out
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    ${isCollapsed ? "md:w-[70px]" : "md:w-64"}
                    w-64
                    ${className}
                `}
            >
                <div className="flex flex-col gap-4">
                    <div className={`flex items-center pb-2 p-4 ${isCollapsed ? "md:justify-center" : "justify-between"}`}>
                        <Link href="/" onClick={() => { setIsMobileOpen(false); setIsCollapsed(false); }} className="cursor-pointer hover:opacity-80 transition-opacity">
                            <Image src="/logo.svg" alt="Logo" width={30} height={30} />
                        </Link>

                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>

                        {/* Desktop Collapse Button */}
                        {!isCollapsed && (
                            <button
                                onClick={() => setIsCollapsed(true)}
                                className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                            >
                                <PanelLeft className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col gap-6">
                        <nav className="flex-1 px-4 space-y-2">
                            {!isCollapsed && <span className="text-sm font-base text-gray-500 dark:text-gray-400 block px-2">Main Menu</span>}
                            {SIDEBAR_ROUTES.mainMenu.map((route) => {
                                const Icon = route.icon;
                                const isActive = pathname === route.href;

                                const LinkComponent = (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`flex items-center text-[15px] px-3 py-1.5 rounded-lg transition-colors group ${isActive
                                            ? "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
                                            } ${isCollapsed ? "justify-center py-3" : ""}`}
                                    >
                                        <div className={`flex text-black dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white ${!isCollapsed ? "mr-3" : ""}`}>
                                            <Icon className={`!w-5 !h-5 `} />
                                        </div>
                                        {!isCollapsed && route.label}
                                    </Link>
                                );

                                if (isCollapsed) {
                                    return (
                                        <Tooltip key={route.href} content={route.label} side="right">
                                            {LinkComponent}
                                        </Tooltip>
                                    );
                                }

                                return LinkComponent;
                            })}
                        </nav>
                        {isCollapsed && <hr className="mx-2 text-gray-200" />}
                        <nav className="flex-1 px-4 space-y-2">
                            {!isCollapsed && <span className="text-sm font-base text-gray-500 dark:text-gray-400 block px-2 !mb-2">Favourites</span>}
                            {SIDEBAR_ROUTES.favorites.map((route) => {
                                const Icon = route.icon;
                                const isActive = pathname === route.href;

                                const LinkComponent = (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`flex items-center text-[15px] px-3 py-1.5 rounded-lg transition-colors group ${isActive
                                            ? "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
                                            } ${isCollapsed ? "justify-center py-3" : ""}`}
                                    >
                                        <div className={`flex text-black dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white ${!isCollapsed ? "mr-3" : ""}`}>
                                            <Icon className={`!w-5 !h-5 `} />
                                        </div>
                                        {!isCollapsed && route.label}
                                    </Link>
                                );

                                if (isCollapsed) {
                                    return (
                                        <Tooltip key={route.href} content={route.label} side="right">
                                            {LinkComponent}
                                        </Tooltip>
                                    );
                                }

                                return LinkComponent;
                            })}
                        </nav>
                    </div>
                </div>
                <div className="flex flex-col gap-3 px-4 mb-4 w-full">

                    {
                        !isCollapsed && (
                            <div className="flex items-center gap-2 hidden sm:flex p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg">
                                <Chrome className="w-7 h-7" />
                                <div className="flex flex-col">
                                    <h6 className="text-sm font-medium text-black">Get the extension</h6>
                                    <Link target="_blank" className="text-xs font-medium underline text-black" href="https://chrome.google.com/webstore/detail/dodo/">Install now</Link>
                                </div>
                            </div>
                        )
                    }
                    <TenantSwitcher isCollapsed={isCollapsed} />
                </div>
            </div>
        </>
    );
}
