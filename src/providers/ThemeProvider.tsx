
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "gold";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for theme in localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("fitkraft-theme");
      return (savedTheme as Theme) || "light"; // Default to light theme with cream background
    }
    return "light"; // Default to light theme with cream background
  });

  useEffect(() => {
    // Remove all previous theme classes
    document.body.classList.remove("theme-dark", "theme-light", "theme-gold");
    
    // Add the new theme class
    document.body.classList.add(`theme-${theme}`);
    
    // Save theme to localStorage
    localStorage.setItem("fitkraft-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
