import React, { useRef, useState, useMemo } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import { useOrder } from "../../../hooks/useOrder";
import { useLocation } from "../../../hooks/useLocation";
import { CATEGORIES, MENU_ITEMS } from "../../../constants/menu";

// Shared Components
import ScrollTop from "../../../components/shared/scrollTop";

// Home Components
import Head from "../../../components/home/header";
import SpecialsCarousel from "../../../components/home/specialsCarousel";
import OrderTypeSelector from "../../../components/home/orderTypeSelector";
import CategoryFilters from "../../../components/home/categoryFilters";
import MenuList from "../../../components/home/menuList";

export default function Home() {
  const theme = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { onScroll } = useTabs();
  const { addItem } = useOrder();
  const { userLocation, openLocationSheet, openPickupSheet } = useLocation();

  const scrollViewRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [orderType, setOrderType] = useState("pickup");

  // Filtering State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  // Derived Data
  const promoItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.isPromo),
    [],
  );

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchSubCategory =
        selectedSubCategory === "all" ||
        item.subCategory === selectedSubCategory;
      return matchCategory && matchSubCategory;
    });
  }, [selectedCategory, selectedSubCategory]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 200);
    onScroll(offset);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory("all");
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("all");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing["3xl"] * 2,
          gap: tokens.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Head
            greeting={getGreeting()}
            onNotificationPress={() => router.push("home/notification")}
          />
        </View>

        <SpecialsCarousel promoItems={promoItems} addItem={addItem} />

        <OrderTypeSelector
          orderType={orderType}
          setOrderType={setOrderType}
          userLocation={userLocation}
          onLocationPress={orderType === "pickup" ? openPickupSheet : openLocationSheet}
        />

        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />

        <MenuList
          items={filteredItems}
          addItem={addItem}
          onResetFilters={handleResetFilters}
        />
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
