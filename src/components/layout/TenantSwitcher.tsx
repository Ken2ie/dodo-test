"use client";

import { useTenant } from "@/hooks/useTenant";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/cn";
import Image from "next/image";

export interface TenantSwitcherProps {
    className?: string;
}

export interface TenantSwitcherProps {
    className?: string;
    isCollapsed?: boolean;
}

import { Select } from "@/components/ui/Select";

export interface TenantSwitcherProps {
    className?: string;
    isCollapsed?: boolean;
}

export function TenantSwitcher({ className, isCollapsed }: TenantSwitcherProps) {
    const { tenant, tenants, setTenantId } = useTenant();

    return (
        <Select
            className={cn("w-full", className)}
            value={tenant.id}
            onChange={(val) => setTenantId(val)}
            options={tenants.map(t => ({
                label: t.name,
                value: t.id,
                // We could pass an icon component here if we had one for each tenant, 
                // but TenantSwitcher uses dynamic avatars which Select doesn't natively map to 'icon' type.
                // However, renderTrigger handles the display, and the list items...
                // Ideally Select should allow custom rendering of options too for the checkmark.
                // For now, let's stick to the default list item rendering which shows text.
            }))}
            renderTrigger={() => (
                <div className={cn(
                    "flex items-center w-full gap-2",
                    isCollapsed ? "justify-center" : "justify-between"
                )}>
                    <div className="flex items-center gap-2 overflow-hidden">
                        {tenant.avatar ? (
                            <div className="rounded-full w-6 h-6 overflow-hidden flex-shrink-0">
                                <Image
                                    src={tenant.avatar}
                                    alt={tenant.name}
                                    width={24}
                                    height={24}
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-700 dark:text-orange-400">
                                {tenant.name.substring(0, 2).toUpperCase()}
                            </div>
                        )}
                        {!isCollapsed && <span className="truncate font-medium text-gray-700 dark:text-gray-200">{tenant.name}</span>}
                    </div>
                    {!isCollapsed && <ChevronsUpDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />}
                </div>
            )}
            footer={
                <button className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors rounded-sm">
                    <div className="w-4 h-4 mr-2 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 font-normal">
                        +
                    </div>
                    Create Team
                </button>
            }
            popoverClassName={isCollapsed ? "left-full bottom-0 ml-2 w-56 transform translate-x-2" : "bottom-full left-0 w-full mb-1"}
        />
    );
}
