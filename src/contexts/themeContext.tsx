import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ThemeValues {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const themeContext = createContext<ThemeValues | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("");

  return (
    <themeContext.Provider value={{ setTheme, theme }}>
      {children}
    </themeContext.Provider>
  );
}

const useThemeContext = () => {
  const context = useContext(themeContext);
  if (!context) throw new Error("...");
  return context;
};

export { ThemeProvider, useThemeContext };
