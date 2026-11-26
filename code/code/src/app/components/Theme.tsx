import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeContext = createContext({ dark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => localStorage.getItem("govexam-theme") === "dark");
  useLayoutEffect(() => {
    document.documentElement.dataset.govTheme = dark ? "dark" : "light";
    localStorage.setItem("govexam-theme", dark ? "dark" : "light");
  }, [dark]);
  return <ThemeContext.Provider value={{ dark, toggle: () => setDark(value => !value) }}>
    {children}
  </ThemeContext.Provider>;
}

export function ThemeToggle() {
  const { dark, toggle } = useContext(ThemeContext);
  const label = dark ? "Light mode" : "Dark mode";
  return <button className="theme-button" type="button" aria-label={label} onClick={toggle}>
    {dark ? <Sun /> : <Moon />}<span>{label}</span>
  </button>;
}
