import { FC } from "react";
import { Button } from "../components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="rounded-full px-2">
            {theme === "dark" ? (
                <Button size="icon" variant="link" onClick={() => setTheme("light")}>
                    <Sun />
                </Button>
            ) : (
                <Button size="icon" variant="link" onClick={() => setTheme("dark")}>
                    <Moon />
                </Button>
            )}
        </div>
    );
};

export default ThemeToggle;
