import { createContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";

interface ThemeContextProps {
  themeMode: "light" | "dark";
  primaryColor: string;
  toggleTheme: () => void;
  changePrimaryColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

const getInitialThemeMode = (): "light" | "dark" => {
  const saved = window.localStorage.getItem('themeMode');
  return saved === "dark" ? "dark" : "light";
};

const getInitialPrimaryColor = (): string => {
  return window.localStorage.getItem('primaryColor') || "#078DEE";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(getInitialThemeMode);
  const [primaryColor, setPrimaryColor] = useState(getInitialPrimaryColor);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [themeMode, primaryColor]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    window.localStorage.setItem('themeMode', themeMode)
  }, [themeMode])

  const changePrimaryColor = (color: string) => {
    window.localStorage.setItem('primaryColor', color);
    setPrimaryColor(color);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, primaryColor, toggleTheme, changePrimaryColor }}>
      <ConfigProvider
        theme={{
            token: { 
                colorPrimary: primaryColor,
                colorBgBase: themeMode === "dark" ? "var(--bg-color)" : "#fff", // Apply bg color
                colorTextBase: themeMode === "dark" ? "var(--text-color)" : "#000", // Apply text color
            },
          algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
