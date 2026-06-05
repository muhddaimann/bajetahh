import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import { useTabs } from "../../../../contexts/tabContext";
import Header from "../../../../components/shared/header";
import NoData from "../../../../components/shared/noData";
import { useRouter } from "expo-router";

export default function OrderPage() {
  const theme = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const router = useRouter();

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"],
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="My Orders"
          subtitle="Track and manage your bajet meals"
          showBack
        />

        <View style={{ flex: 1, justifyContent: "center", marginTop: tokens.spacing["3xl"] }}>
          <NoData
            title="No Active Orders"
            description="You haven't placed any orders yet. Head back to the home screen to browse our delicious bajet meals!"
            icon="basket-outline"
            buttonLabel="Browse Menu"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
