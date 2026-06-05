import React, { useRef, useState, useEffect } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/shared/scrollTop";
import { useTabs } from "../../../contexts/tabContext";
import Head from "../../../components/home/header";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_INTERVAL = 5000;
const PROMO_CAROUSEL = [
  {
    id: "p1",
    title: "Nasi Bajet Ayam",
    subtitle: "Crispy chicken with spicy sambal",
    price: "RM 5.00",
    icon: "food-drumstick",
    color: "#FF6B6B",
  },
  {
    id: "p2",
    title: "Nasi Bajet Ikan",
    subtitle: "Fresh fried fish with daily veggies",
    price: "RM 4.50",
    icon: "fish",
    color: "#4ECDC4",
  },
  {
    id: "p3",
    title: "Special Friday",
    subtitle: "Limited time student special",
    price: "RM 3.00",
    icon: "ticket-percent",
    color: "#FFD93D",
  },
];

export default function Home() {
  const theme = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { onScroll } = useTabs();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const carouselRef = useRef<ScrollView | null>(null);  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  // Carousel Logic
  useEffect(() => {
    const startProgress = () => {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: CAROUSEL_INTERVAL,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          const nextSlide = (activeSlide + 1) % PROMO_CAROUSEL.length;
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
  }, [activeSlide]);

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
            {PROMO_CAROUSEL.map((promo, index) => (
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
                        {promo.title}
                      </Text>
                      <Text variant="bodyMedium" style={{ color: "white" }}>
                        {promo.subtitle}
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
                        {promo.price}
                      </Text>
                      
                      {/* Minimalist Button with Integrated Progress - Absolute Positioned */}
                      <View 
                        style={{ 
                          width: 130, 
                          height: 44, 
                          borderRadius: tokens.radii.lg, 
                          backgroundColor: 'rgba(255,255,255,0.7)', // Low opacity white bg
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
                              backgroundColor: 'white', // Full opacity white progress
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
                              color: promo.color, // Static theme color for text
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
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
