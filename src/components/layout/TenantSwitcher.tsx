"use client";

import { useTenant } from "@/hooks/useTenant";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface TenantSwitcherProps {
    className?: string;
}

export function TenantSwitcher({ className }: TenantSwitcherProps) {
    const { tenant, tenants, setTenantId } = useTenant();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-500 transition-colors"
                aria-label="Select tenant"
                aria-expanded={open}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {tenant.avatar ? (
                        <div className="rounded-full w-5 h-5 overflow-hidden flex-shrink-0">
                            <Image
                                src={tenant.avatar}
                                alt={tenant.name}
                                width={20}
                                height={20}
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">
                            {tenant.name.substring(0, 2).toUpperCase()}
                        </div>
                    )}
                    <span className="truncate font-medium">{tenant.name}</span>
                </div>
                <ChevronsUpDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
            </button>

            {open && (
                <div className="absolute bottom-full left-0 w-full mt-1 bg-gray-100 rounded-lg shadow-lg z-50 py-1">
                    <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Switch User
                    </div>
                    {tenants.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                setTenantId(t.id);
                                setOpen(false);
                            }}
                            className={cn(
                                "flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors",
                                t.id === tenant.id ? "bg-gray-50 font-medium text-gray-900" : "text-gray-700"
                            )}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    t.id === tenant.id ? "opacity-100 text-blue-600" : "opacity-0"
                                )}
                            />
                            {t.name}
                        </button>
                    ))}
                    <div className="border-t border-gray-200 my-1"></div>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                        <div className="w-4 h-4 mr-2 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 font-normal">
                            +
                        </div>
                        Create Team
                    </button>
                </div>
            )}
        </div>
    );
}
