"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
}

export function Tooltip({ children, content, side = "right", className }: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        "absolute z-50 px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-md animate-in fade-in-0 zoom-in-95",
                        side === "right" && "left-full ml-2",
                        side === "left" && "right-full mr-2",
                        side === "top" && "bottom-full mb-2",
                        side === "bottom" && "top-full mt-2",
                        className
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
