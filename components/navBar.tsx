import React, { useEffect, useRef } from "react";
import { Animated, View, Pressable, Easing } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, router } from "expo-router";
import { useDesign } from "../contexts/designContext";
import { useAuth } from "../contexts/authContext";
import { useTabs } from "../contexts/tabContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function NavBar() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const tokens = useDesign();
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { hideTabBar } = useTabs();

  const isHome =
    pathname.startsWith("/home") || pathname.startsWith("/(tabs)/home");

  const isSettings =
    pathname.startsWith("/settings") || pathname.startsWith("/(tabs)/settings");

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: hideTabBar ? 120 : 0,
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();
  }, [hideTabBar]);

  const handleActionButton = () => {
    if (isHome) {
      router.push("/(tabs)/home/main");
    } else {
      signOut();
    }
  };

  const navigateTo = (route: string) => {
    if (pathname === route || pathname === `/(tabs)${route}`) return;
    router.navigate(route as any);
  };

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: "home-variant",
      active: isHome,
      onPress: () => navigateTo("/home"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: "cog-outline",
      active: isSettings,
      onPress: () => navigateTo("/settings"),
    },
  ];

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      style={{
        position: "absolute",
        bottom:
          (insets.bottom > 0 ? insets.bottom : tokens.spacing.md) +
          tokens.spacing.lg,
        left: tokens.spacing["2xl"],
        right: tokens.spacing["2xl"],
        flexDirection: "row",
        alignItems: "center",
        gap: tokens.spacing.lg,
        transform: [{ translateY }],
      }}
    >
      <View
        style={{
          flex: 1,
          height: 60,
          borderRadius: 30,
          flexDirection: "row",
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        }}
      >
        {navItems.map((item) => (
          <Pressable
            key={item.key}
            onPress={item.onPress}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.96 : 1 }],
            })}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={item.active ? 26 : 22}
              color={
                item.active
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant
              }
            />
            <Text
              variant="labelSmall"
              style={{
                marginTop: 2,
                fontWeight: item.active ? "600" : "400",
                color: item.active
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={handleActionButton}
        style={({ pressed }) => ({
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: isHome ? theme.colors.primary : theme.colors.error,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale: pressed ? 0.95 : 1 }],
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        })}
      >
        <MaterialCommunityIcons
          name={isHome ? "plus" : "logout"}
          size={26}
          color={isHome ? theme.colors.onPrimary : theme.colors.onError}
        />
      </Pressable>
    </Animated.View>
  );
}
