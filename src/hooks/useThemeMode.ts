"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeMode = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return {
        theme,
        setTheme,
        isDark: mounted && currentTheme === 'dark',
        toggleTheme: () => setTheme(currentTheme === 'dark' ? 'light' : 'dark'),
        mounted
    };
};