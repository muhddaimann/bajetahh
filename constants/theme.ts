import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
  type MD3Theme,
} from "react-native-paper";

const make = (
  family: string,
  weight: "400" | "700",
  fontSize: number,
  lineHeight: number,
  letterSpacing = 0,
) => ({
  fontFamily: family,
  fontWeight: weight,
  fontSize,
  lineHeight,
  letterSpacing,
});

const fontConfig = {
  displayLarge: make("SourceSansPro_700Bold", "700", 57, 64),
  displayMedium: make("SourceSansPro_700Bold", "700", 45, 52),
  displaySmall: make("SourceSansPro_700Bold", "700", 36, 44),

  headlineLarge: make("SourceSansPro_700Bold", "700", 32, 40),
  headlineMedium: make("SourceSansPro_700Bold", "700", 28, 36),
  headlineSmall: make("SourceSansPro_700Bold", "700", 24, 32),

  titleLarge: make("SourceSansPro_700Bold", "700", 22, 28),
  titleMedium: make("SourceSansPro_700Bold", "700", 16, 24, 0.1),
  titleSmall: make("SourceSansPro_700Bold", "700", 14, 20, 0.1),

  labelLarge: make("SourceSansPro_700Bold", "700", 14, 20, 0.1),
  labelMedium: make("SourceSansPro_400Regular", "400", 12, 16, 0.5),
  labelSmall: make("SourceSansPro_400Regular", "400", 11, 16, 0.5),

  bodyLarge: make("SourceSansPro_400Regular", "400", 16, 24),
  bodyMedium: make("SourceSansPro_400Regular", "400", 14, 20),
  bodySmall: make("SourceSansPro_400Regular", "400", 12, 16),
};

const fonts = configureFonts({ config: fontConfig });

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#F59E0B",
    onPrimary: "#FFFFFF",
    primaryContainer: "#FFE7B0",
    onPrimaryContainer: "#5F3A00",

    secondary: "#8B5E3C",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E8D7C8",
    onSecondaryContainer: "#3E2715",

    tertiary: "#4F46E5",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#D9D7FF",
    onTertiaryContainer: "#1F1A78",

    error: "#D14343",
    onError: "#FFFFFF",
    errorContainer: "#F3BDBD",
    onErrorContainer: "#5C1A1A",

    surface: "#FFFFFF",
    onSurface: "#1F1B16",
    surfaceVariant: "#F4EEE6",
    onSurfaceVariant: "#4D463F",

    background: "#FFFDF8",
    onBackground: "#1F1B16",
    outline: "#C9B9A8",
    shadow: "#000000",
    scrim: "#000000",
    surfaceDisabled: "rgba(31,27,22,0.12)",
    onSurfaceDisabled: "rgba(31,27,22,0.38)",
    backdrop: "rgba(0,0,0,0.4)",

    elevation: {
      ...MD3LightTheme.colors.elevation,
      level0: "#FFFFFF",
      level1: "#FFF8EE",
      level2: "#FFF3E3",
      level3: "#FFEED8",
      level4: "#FFE9CD",
      level5: "#FFE4C2",
    },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 12,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FFC857",
    onPrimary: "#4A2F00",
    primaryContainer: "#B87400",
    onPrimaryContainer: "#FFF4D8",

    secondary: "#C69A72",
    onSecondary: "#3E2715",
    secondaryContainer: "#6D472B",
    onSecondaryContainer: "#F8E7D8",

    tertiary: "#A5A1FF",
    onTertiary: "#211C7C",
    tertiaryContainer: "#4F46E5",
    onTertiaryContainer: "#FFFFFF",

    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",

    surface: "#181511",
    onSurface: "#F3EFE8",
    surfaceVariant: "#2D261F",
    onSurfaceVariant: "#D1C4B6",

    background: "#12100D",
    onBackground: "#F3EFE8",
    outline: "#8B7B6D",
    shadow: "#000000",
    scrim: "#000000",
    surfaceDisabled: "rgba(243,239,232,0.12)",
    onSurfaceDisabled: "rgba(243,239,232,0.38)",
    backdrop: "rgba(0,0,0,0.4)",

    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level0: "#12100D",
      level1: "#1B1712",
      level2: "#221C15",
      level3: "#2A2118",
      level4: "#31261B",
      level5: "#382B1E",
    },
  },
};
