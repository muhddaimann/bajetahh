import React, { useRef, useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme, Card, Button, Searchbar } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import ScrollTop from "../../../components/shared/scrollTop";
import { useTabs } from "../../../contexts/tabContext";
import Head from "../../../components/home/header";
import { useRouter } from "expo-router";
import { useAuth } from "../../../contexts/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CATEGORIES = [
  { id: "1", name: "Budget Meal", icon: "bowl-mix" },
  { id: "2", name: "Drinks", icon: "cup-water" },
  { id: "3", name: "Sides", icon: "food-apple" },
  { id: "4", name: "Promos", icon: "tag-heart" },
];

const FEATURED_ITEMS = [
  {
    id: "1",
    name: "Nasi Bajet Ayam",
    price: "RM 5.00",
    description: "Classic budget rice with fried chicken and sambal.",
    image: "food",
  },
  {
    id: "2",
    name: "Nasi Bajet Ikan",
    price: "RM 4.50",
    description: "Fried fish served with warm rice and daily veggies.",
    image: "fish",
  },
];

export default function Home() {
  const theme = useTheme();
  const tokens = useDesign();
  const router = useRouter();
  const { user } = useAuth();
  const { onScroll } = useTabs();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Head
          greeting={getGreeting()}
          onNotificationPress={() => router.push("home/main")}
        />

        {/* Search Bar */}
        <Searchbar
          placeholder="Search for nasi bajet..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: tokens.radii.lg,
            elevation: 0,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
          }}
        />

        {/* Categories */}
        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="titleMedium" style={{ fontWeight: "700" }}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: tokens.spacing.md }}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={{
                    alignItems: "center",
                    gap: tokens.spacing.xs,
                    width: 80,
                  }}
                >
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: tokens.radii.lg,
                      backgroundColor: theme.colors.primaryContainer,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={28}
                      color={theme.colors.onPrimaryContainer}
                    />
                  </View>
                  <Text variant="labelMedium" style={{ textAlign: "center" }}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Featured Section */}
        <View style={{ gap: tokens.spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text variant="titleMedium" style={{ fontWeight: "700" }}>
              Recommended for You
            </Text>
            <Button mode="text" compact>
              View All
            </Button>
          </View>

          {FEATURED_ITEMS.map((item) => (
            <Card
              key={item.id}
              mode="elevated"
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: tokens.radii.xl,
              }}
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  gap: tokens.spacing.md,
                  padding: tokens.spacing.md,
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: tokens.radii.lg,
                    backgroundColor: theme.colors.surfaceVariant,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.image as any}
                    size={40}
                    color={theme.colors.primary}
                  />
                </View>

                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <View>
                    <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                      {item.name}
                    </Text>
                    <Text
                      variant="bodySmall"
                      numberOfLines={2}
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      variant="titleSmall"
                      style={{
                        color: theme.colors.primary,
                        fontWeight: "900",
                      }}
                    >
                      {item.price}
                    </Text>
                    <Button
                      mode="contained-tonal"
                      compact
                      style={{ borderRadius: tokens.radii.md }}
                    >
                      Add
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Promo Card */}
        <Card
          mode="contained"
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            borderRadius: tokens.radii.xl,
          }}
        >
          <Card.Content
            style={{
              padding: tokens.spacing.lg,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, gap: tokens.spacing.xs }}>
              <Text
                variant="titleLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.onSecondaryContainer,
                }}
              >
                RM 3.00 Special!
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSecondaryContainer }}
              >
                Friday Student Special. Get yours today at participating
                outlets.
              </Text>
            </View>
            <MaterialCommunityIcons
              name="ticket-percent"
              size={48}
              color={theme.colors.onSecondaryContainer}
              style={{ opacity: 0.5 }}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
