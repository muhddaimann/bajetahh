import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import { useAuth } from "../../../contexts/authContext";
import ScrollTop from "../../../components/shared/scrollTop";
import Tail from "../../../components/settings/header";
import { useRouter } from "expo-router";

export default function Settings() {
  const theme = useTheme();
  const tokens = useDesign();
  const { user } = useAuth();
  const { onScroll } = useTabs();
  const router = useRouter();

  const scrollRef = useRef<ScrollView | null>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;

    setShowScrollTop(offset > 200);

    onScroll(offset);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing["3xl"] * 2,
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
      >
        <Tail
          username={user?.name}
          designation={user?.designation}
          staffId={user?.staffId}
          avatarText={user?.avatarText}
          onUpdateProfilePress={() => router.push("settings/update")}
        />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
