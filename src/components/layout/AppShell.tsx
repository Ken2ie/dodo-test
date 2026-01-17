"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type AppShellProps = {
    children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Sidebar - Responsive */}
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                className="border-r border-gray-200 bg-gray-50/50"
            />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 min-w-0">
                <Header
                    className="h-16 border-b border-gray-200 bg-white"
                    onMenuClick={() => setIsMobileOpen(true)}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}