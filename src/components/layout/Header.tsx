"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { usePathname } from "next/navigation";

export type HeaderProps = {
    className?: string;
};

import { TenantSwitcher } from "@/components/layout/TenantSwitcher";
import { Search, Sun, Moon } from "lucide-react";
import { useThemeMode } from "@/hooks/useThemeMode";

export function Header({ className }: HeaderProps) {
    const pathname = usePathname();
    const { isDark, toggleTheme, mounted } = useThemeMode();

    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbItems = paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const label = path.replace(/-/g, " ");
        return { label, href };
    });

    return (
        <header className={className}>
            <div className="p-4 flex items-center justify-between h-16 bg-white/50 backdrop-blur-sm px-6">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="search"
                            placeholder="Search"
                            className="h-9 w-[200px] lg:w-[300px] rounded-md border border-gray-200 bg-gray-50 pl-8 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Toggle Theme"
                        >
                            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}