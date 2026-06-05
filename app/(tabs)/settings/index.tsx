import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { Text, useTheme, List, Divider } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import { useOverlay } from "../../../contexts/overlayContext";
import ScrollTop from "../../../components/shared/scrollTop";
import Header from "../../../components/settings/header";
import { useRouter } from "expo-router";

export default function Settings() {
  const theme = useTheme();
  const tokens = useDesign();
  const { onScroll } = useTabs();
  const { toast } = useOverlay();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 200);
    onScroll(offset);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  interface MenuItem {
    id: string;
    label: string;
    icon: string;
    onPress?: () => void;
    right?: () => React.ReactNode;
  }

  const menuGroups: { title: string; items: MenuItem[] }[] = [
    {
      title: "Support",
      items: [
        {
          id: "help",
          label: "Help Center",
          icon: "help-circle-outline",
          onPress: () => toast("Support center coming soon!"),
        },
        {
          id: "terms",
          label: "Terms & Conditions",
          icon: "file-document-outline",
          onPress: () => toast("Legal docs coming soon!"),
        },
        {
          id: "about",
          label: "About BajetAhh",
          icon: "information-outline",
          onPress: () => toast("Version 1.0.0"),
        },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing["3xl"],
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
      >
        <Header onUpdateProfilePress={() => router.push("settings/update")} />

        <View style={{ gap: tokens.spacing.md }}>
          {menuGroups.map((group, groupIdx) => (
            <View key={groupIdx} style={{ gap: tokens.spacing.xs }}>
              <Text
                variant="labelLarge"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  marginLeft: tokens.spacing.xs,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {group.title}
              </Text>

              <View
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: tokens.radii.xl,
                  borderWidth: 1,
                  borderColor: theme.colors.outlineVariant,
                  overflow: "hidden",
                }}
              >
                {group.items.map((item, itemIdx) => (
                  <React.Fragment key={item.id}>
                    <List.Item
                      title={item.label}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon={item.icon}
                          color={theme.colors.onSurfaceVariant}
                        />
                      )}
                      right={item.right}
                      onPress={item.onPress}
                      titleStyle={{
                        fontWeight: "600",
                        color: theme.colors.onSurface,
                      }}
                      style={{
                        paddingVertical: tokens.spacing.xs,
                      }}
                    />
                    {itemIdx < group.items.length - 1 && (
                      <Divider
                        style={{ marginHorizontal: tokens.spacing.lg }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={{ alignItems: "center", marginTop: tokens.spacing.sm }}>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            BajetAhh v1.0.0
          </Text>
        </View>
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
