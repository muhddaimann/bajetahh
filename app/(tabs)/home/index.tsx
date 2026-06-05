import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { Text, useTheme, Card, SegmentedButtons, Icon, Chip } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/shared/scrollTop";
import { useTabs } from "../../../contexts/tabContext";
import Head from "../../../components/home/header";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CATEGORIES, MENU_ITEMS } from "../../../constants/menu";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_INTERVAL = 5000;

export default function Home() {
  const theme = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { onScroll } = useTabs();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const carouselRef = useRef<ScrollView | null>(null);  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [orderType, setOrderType] = useState("pickup");
  const [userLocation, setUserLocation] = useState("");
  
  // Filtering State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  const progress = useRef(new Animated.Value(0)).current;

  // Derived Data
  const promoItems = useMemo(() => MENU_ITEMS.filter(item => item.isPromo), []);
  
  const currentCategory = useMemo(() => 
    CATEGORIES.find(c => c.id === selectedCategory), 
  [selectedCategory]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchSubCategory = selectedSubCategory === "all" || item.subCategory === selectedSubCategory;
      return matchCategory && matchSubCategory;
    });
  }, [selectedCategory, selectedSubCategory]);

  // Carousel Logic
  useEffect(() => {
    if (promoItems.length === 0) return;

    const startProgress = () => {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: CAROUSEL_INTERVAL,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          const nextSlide = (activeSlide + 1) % promoItems.length;
          const offset = nextSlide * SCREEN_WIDTH;
          
          carouselRef.current?.scrollTo({
            x: offset,
            animated: true,
          });
          setActiveSlide(nextSlide);
        }
      });
    };

    startProgress();
    return () => progress.stopAnimation();
  }, [activeSlide, promoItems.length]);

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

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
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
          paddingBottom: tokens.spacing["3xl"],
          gap: tokens.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: tokens.spacing.lg }}>
          <Head
            greeting={getGreeting()}
            onNotificationPress={() => router.push("home/main")}
          />
        </View>

        {/* Menu Carousel Section */}
        {promoItems.length > 0 && (
          <View style={{ gap: tokens.spacing.sm }}>
            <View style={{ paddingHorizontal: tokens.spacing.lg }}>
              <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                Today's Specials
              </Text>
            </View>

            <ScrollView
              ref={carouselRef}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 0,
              }}
            >
              {promoItems.map((promo, index) => (
                <View
                  key={promo.id}
                  style={{
                    width: SCREEN_WIDTH,
                    paddingHorizontal: tokens.spacing.lg,
                  }}
                >
                  <Card
                    style={{
                      height: 180,
                      backgroundColor: promo.color,
                      borderRadius: tokens.radii["2xl"],
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        right: -20,
                        bottom: -20,
                        opacity: 0.2,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={promo.icon as any}
                        size={180}
                        color="white"
                      />
                    </View>

                    <Card.Content
                      style={{
                        flex: 1,
                        padding: tokens.spacing.xl,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ gap: 4 }}>
                        <Text
                          variant="headlineSmall"
                          style={{ color: "white", fontWeight: "900" }}
                        >
                          {promo.name}
                        </Text>
                        <Text variant="bodyMedium" style={{ color: "white" }}>
                          {promo.promoSubtitle}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          variant="titleLarge"
                          style={{
                            color: "white",
                            fontWeight: "900",
                            paddingBottom: 4,
                          }}
                        >
                          {promo.formattedPrice}
                        </Text>
                        
                        <View 
                          style={{ 
                            width: 130, 
                            height: 44, 
                            borderRadius: tokens.radii.lg, 
                            backgroundColor: 'rgba(255,255,255,0.7)', 
                            overflow: 'hidden',
                            position: 'absolute',
                            bottom: -tokens.spacing["2xl"],
                            right: -tokens.spacing.sm,
                          }}
                        >
                          {activeSlide === index && (
                            <Animated.View 
                              style={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                backgroundColor: 'white',
                                width: progress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0%', '100%']
                                })
                              }} 
                            />
                          )}
                          <Pressable 
                            style={({ pressed }) => ({
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: pressed ? 0.8 : 1
                            })}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '900',
                                letterSpacing: 0.5,
                                color: promo.color,
                                zIndex: 2,
                              }}
                            >
                              ORDER NOW
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Pickup/Delivery Section */}
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          <SegmentedButtons
            value={orderType}
            onValueChange={setOrderType}
            buttons={[
              {
                value: "pickup",
                label: "Pickup",
                icon: "walk",
              },
              {
                value: "delivery",
                label: "Delivery",
                icon: "moped",
              },
            ]}
          />

          <Card
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              borderRadius: tokens.radii.xl,
            }}
          >
            <Card.Content
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: tokens.radii.full,
                  backgroundColor: theme.colors.primaryContainer,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  source={orderType === "pickup" ? "store-marker" : "map-marker-radius"}
                  size={24}
                  color={theme.colors.primary}
                />
              </View>

              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {orderType === "pickup" ? "Pickup Point" : "Delivery Address"}
                </Text>
                {orderType === "pickup" ? (
                  <Text variant="titleSmall" style={{ fontWeight: "700" }}>
                    BajetAhh Stall, University Malaya
                  </Text>
                ) : userLocation ? (
                  <Text variant="titleSmall" style={{ fontWeight: "700" }}>
                    {userLocation}
                  </Text>
                ) : (
                  <Pressable onPress={() => setUserLocation("Menara TM, Kuala Lumpur")}>
                    <Text
                      variant="titleSmall"
                      style={{
                        fontWeight: "700",
                        color: theme.colors.primary,
                        textDecorationLine: "underline",
                      }}
                    >
                      Set Delivery Location
                    </Text>
                  </Pressable>
                )}
              </View>

              <Icon source="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
            </Card.Content>
          </Card>
        </View>

        {/* Filters Section */}
        <View style={{ gap: tokens.spacing.sm }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.sm }}
          >
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => handleCategoryPress(cat.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radii.pill,
                  backgroundColor: selectedCategory === cat.id ? theme.colors.primary : theme.colors.surfaceVariant,
                  gap: tokens.spacing.xs,
                }}
              >
                <Icon 
                  source={cat.icon} 
                  size={18} 
                  color={selectedCategory === cat.id ? "white" : theme.colors.onSurfaceVariant} 
                />
                <Text 
                  style={{ 
                    fontWeight: "700", 
                    color: selectedCategory === cat.id ? "white" : theme.colors.onSurfaceVariant 
                  }}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {currentCategory?.subCategories && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.xs }}
            >
              <Chip
                selected={selectedSubCategory === "all"}
                onPress={() => setSelectedSubCategory("all")}
                style={{ backgroundColor: selectedSubCategory === "all" ? theme.colors.primaryContainer : 'transparent' }}
              >
                All {currentCategory.label}
              </Chip>
              {currentCategory.subCategories.map((sub) => (
                <Chip
                  key={sub.id}
                  selected={selectedSubCategory === sub.id}
                  onPress={() => setSelectedSubCategory(sub.id)}
                  style={{ backgroundColor: selectedSubCategory === sub.id ? theme.colors.primaryContainer : 'transparent' }}
                >
                  {sub.label}
                </Chip>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Food List Section */}
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="titleMedium" style={{ fontWeight: "700" }}>
              Menu Items
            </Text>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {filteredItems.length} items found
            </Text>
          </View>

          <View style={{ gap: tokens.spacing.md }}>
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                mode="elevated"
                style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.lg }}
              >
                <Card.Content style={{ flexDirection: 'row', padding: tokens.spacing.md, gap: tokens.spacing.md }}>
                  <View 
                    style={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: tokens.radii.md, 
                      backgroundColor: item.color + '20',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MaterialCommunityIcons name={item.icon as any} size={40} color={item.color} />
                  </View>
                  
                  <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                      <Text variant="titleMedium" style={{ fontWeight: '700' }}>{item.name}</Text>
                      <Text variant="bodySmall" numberOfLines={2} style={{ color: theme.colors.onSurfaceVariant }}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text variant="titleMedium" style={{ fontWeight: '900', color: theme.colors.primary }}>
                        {item.formattedPrice}
                      </Text>
                      <Pressable 
                        style={{ 
                          backgroundColor: theme.colors.primary, 
                          paddingHorizontal: tokens.spacing.md, 
                          paddingVertical: tokens.spacing.xs,
                          borderRadius: tokens.radii.pill
                        }}
                      >
                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 12 }}>ADD</Text>
                      </Pressable>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
