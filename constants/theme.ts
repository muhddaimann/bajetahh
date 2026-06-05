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

  primary: "#F97316",
  onPrimary: "#FFFFFF",
  primaryContainer: "#FFE0C2",
  onPrimaryContainer: "#7A2E00",

  secondary: "#16A34A",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#D8F5E1",
  onSecondaryContainer: "#0F3D21",

  tertiary: "#FBBF24",
  onTertiary: "#3D2A00",
  tertiaryContainer: "#FFF1C2",
  onTertiaryContainer: "#5C3B00",

  error: "#DC2626",
  onError: "#FFFFFF",
  errorContainer: "#FECACA",
  onErrorContainer: "#7F1D1D",

  surface: "#FFFFFF",
  onSurface: "#1C1917",
  surfaceVariant: "#F5F5F4",
  onSurfaceVariant: "#57534E",

  background: "#FFFBF7",
  onBackground: "#1C1917",

  outline: "#D6D3D1",
  shadow: "#A8A29E",
}
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 12,
  fonts,
colors: {
  ...MD3DarkTheme.colors,

  primary: "#FB923C",
  onPrimary: "#4A2200",
  primaryContainer: "#C2410C",
  onPrimaryContainer: "#FFFFFF",

  secondary: "#4ADE80",
  onSecondary: "#052E16",
  secondaryContainer: "#166534",
  onSecondaryContainer: "#FFFFFF",

  tertiary: "#FCD34D",
  onTertiary: "#422006",
  tertiaryContainer: "#D97706",
  onTertiaryContainer: "#FFFFFF",

  error: "#F87171",
  onError: "#450A0A",
  errorContainer: "#991B1B",
  onErrorContainer: "#FFFFFF",

  surface: "#18181B",
  onSurface: "#FAFAF9",
  surfaceVariant: "#292524",
  onSurfaceVariant: "#D6D3D1",

  background: "#0F0F0F",
  onBackground: "#FAFAF9",

  outline: "#78716C",
  shadow: "#000000",
}
};
