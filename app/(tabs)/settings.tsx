import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { useTheme, Text, List, Button } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import { useTabs } from "../../contexts/tabContext";
import { useAuth } from "../../contexts/authContext";
import ScrollTop from "../../components/scrollTop";
import Header from "../../components/header";

export default function Settings() {
  const theme = useTheme();
  const tokens = useDesign();
  const { onScroll } = useTabs();
  const { signOut, user } = useAuth();

  const scrollRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
    onScroll(offset);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"],
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Settings" subtitle="Manage your account" />

        <List.Section style={{ marginTop: tokens.spacing.md }}>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Profile"
            description={user ? `Logged in as ${user}` : "Not logged in"}
            left={(props) => <List.Icon {...props} icon="account" />}
            style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.md }}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Security</List.Subheader>
          <Button
            mode="contained"
            onPress={() => signOut()}
            style={{ 
              marginTop: tokens.spacing.md, 
              borderRadius: tokens.radii.pill,
              backgroundColor: theme.colors.errorContainer,
            }}
            textColor={theme.colors.onErrorContainer}
            icon="logout"
          >
            Sign Out
          </Button>
        </List.Section>
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </>
  );
}
