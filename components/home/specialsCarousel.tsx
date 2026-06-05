import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "../../constants/menu";
import { useDesign } from "../../contexts/designContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_INTERVAL = 5000;

interface SpecialsCarouselProps {
  promoItems: MenuItem[];
  addItem: (item: MenuItem) => void;
}

export default function SpecialsCarousel({
  promoItems,
  addItem,
}: SpecialsCarouselProps) {
  const tokens = useDesign();
  const carouselRef = useRef<ScrollView | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

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

  if (promoItems.length === 0) return null;

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <View style={{ paddingHorizontal: tokens.spacing.lg }}>
        <Text variant="titleMedium" style={{ fontWeight: "700" }}>
          {`Today's Specials`}
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
                      backgroundColor: "rgba(255,255,255,0.7)",
                      overflow: "hidden",
                      position: "absolute",
                      bottom: -tokens.spacing["2xl"],
                      right: -tokens.spacing.sm,
                    }}
                  >
                    {activeSlide === index && (
                      <Animated.View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          backgroundColor: "white",
                          width: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"],
                          }),
                        }}
                      />
                    )}
                    <Pressable
                      onPress={() => addItem(promo)}
                      style={({ pressed }) => ({
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: pressed ? 0.8 : 1,
                      })}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "900",
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
  );
}
