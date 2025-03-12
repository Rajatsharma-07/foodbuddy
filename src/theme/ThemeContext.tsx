import { createContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";

interface ThemeContextProps {
  themeMode: "light" | "dark";
  primaryColor: string;
  toggleTheme: () => void;
  changePrimaryColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [primaryColor, setPrimaryColor] = useState("#078DEE"); // Default Ant Design Blue

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [themeMode, primaryColor]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const changePrimaryColor = (color: string) => {
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
