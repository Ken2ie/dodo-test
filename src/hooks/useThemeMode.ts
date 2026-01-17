"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeMode() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return { isDark, toggleTheme, mounted };
}
