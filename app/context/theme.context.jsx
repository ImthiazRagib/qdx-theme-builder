import { createContext, useContext } from "react";

const ThemeBuilderContext = createContext(null);

const useThemeBuilder = () => {
  const context = useContext(ThemeBuilderContext);
  if (!context) {
    throw new Error("useThemeBuilder must be used within ThemeBuilderProvider");
  }
  return context;
};

export default ThemeBuilderContext;
export { useThemeBuilder };
