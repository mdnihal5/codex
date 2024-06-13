import { createContext, useContext, useEffect, useState, FC } from "react";
import PropTypes from "prop-types";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: "dark" | "light" | "system";
    storageKey?: string;
}

interface ThemeProviderValue {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeProviderContext = createContext<ThemeProviderValue | undefined>(undefined);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) => {
    const [theme, setTheme] = useState<string>(() => localStorage.getItem(storageKey) || defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
            return;
        }

        const trimmedTheme = theme.trim().replace(/\s/g, "");
        root.classList.add(trimmedTheme);
    }, [theme]);

    const value: ThemeProviderValue = {
        theme,
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    defaultTheme: PropTypes.oneOf(["dark", "light", "system"]),
    storageKey: PropTypes.string,
};

export const useTheme = (): ThemeProviderValue => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
