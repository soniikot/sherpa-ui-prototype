import { useEffect, useState, type KeyboardEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ThemeMode, ThemeToggleProps } from "@/components/themeToggle/types";

const STORAGE_KEY = "theme";

export function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function applyThemeClass(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  useEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent("prototype-theme-change", { detail: theme }));
  }, [theme]);

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    handleToggle();
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-label={label}
      aria-pressed={theme === "dark"}
      title={label}
      className={[
        "gap-2 border-app-border text-app-text-muted hover:bg-app-hover hover:text-app-text",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
}
