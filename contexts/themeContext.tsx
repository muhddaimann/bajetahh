import React, { createContext, useContext, useMemo, useState } from "react";
import { View, Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { lightTheme, darkTheme } from "../constants/theme";

type Ctx = { isDark: boolean; toggle: () => void };
const ThemeCtx = createContext<Ctx>({ isDark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const insets = useSafeAreaInsets();
  
  const value = useMemo<Ctx>(
    () => ({ isDark, toggle: () => setIsDark((v) => !v) }),
    [isDark]
  );

  const theme = isDark ? darkTheme : lightTheme;

  React.useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.backgroundColor = theme.colors.background;
      
      let meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "theme-color");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", theme.colors.background);
    }
  }, [theme]);

  return (
    <ThemeCtx.Provider value={value}>
      <PaperProvider theme={theme}>
        <StatusBar
          style={isDark ? "light" : "dark"}
        />
        <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: insets.top }}>
          {children}
        </View>
      </PaperProvider>
    </ThemeCtx.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeCtx);
