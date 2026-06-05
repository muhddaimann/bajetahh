import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import { useTabs } from "../../../../contexts/tabContext";
import Header from "../../../../components/shared/header";
import NoData from "../../../../components/shared/noData";
import { useRouter } from "expo-router";
import { useOrder } from "../../../../hooks/useOrder";
import { Card, Text, Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OrderPage() {
  const theme = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const router = useRouter();
  const {
    items,
    updateQuantity,
    formattedTotalPrice,
    totalItems,
    clearOrder,
  } = useOrder();

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

        {items.length > 0 ? (
          <View style={{ gap: tokens.spacing.md }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                Order Summary
              </Text>
              <Button onPress={clearOrder} textColor={theme.colors.error}>
                Clear All
              </Button>
            </View>

            {items.map((item) => (
              <Card
                key={item.cartId}
                style={{
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: tokens.radii.lg,
                }}
              >
                <Card.Content
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: tokens.spacing.md,
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: tokens.radii.md,
                      backgroundColor: item.color + "20",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={24}
                      color={item.color}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text variant="titleSmall" style={{ fontWeight: "700" }}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Text
                        variant="labelSmall"
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {item.formattedPrice}
                      </Text>
                      {item.remarks && (
                        <Text
                          variant="labelSmall"
                          style={{
                            color: theme.colors.primary,
                            fontStyle: "italic",
                          }}
                        >
                          {` • ${item.remarks}`}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <IconButton
                      icon="minus"
                      size={18}
                      onPress={() =>
                        updateQuantity(item.cartId, item.quantity - 1)
                      }
                      style={{ margin: 0 }}
                    />
                    <Text
                      style={{
                        fontWeight: "800",
                        minWidth: 20,
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </Text>
                    <IconButton
                      icon="plus"
                      size={18}
                      onPress={() =>
                        updateQuantity(item.cartId, item.quantity + 1)
                      }
                      style={{ margin: 0 }}
                    />
                  </View>
                </Card.Content>
              </Card>
            ))}

            <Card
              style={{
                marginTop: tokens.spacing.md,
                backgroundColor: theme.colors.primary,
                borderRadius: tokens.radii.xl,
              }}
            >
              <Card.Content style={{ gap: tokens.spacing.xs }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "white", opacity: 0.8 }}>
                    Total Items
                  </Text>
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    {totalItems}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "white", opacity: 0.8 }}>
                    Total Price
                  </Text>
                  <Text
                    style={{ color: "white", fontWeight: "900", fontSize: 20 }}
                  >
                    {formattedTotalPrice}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  buttonColor="white"
                  textColor={theme.colors.primary}
                  style={{
                    marginTop: tokens.spacing.md,
                    borderRadius: tokens.radii.lg,
                  }}
                  onPress={() => {}}
                >
                  PLACE ORDER
                </Button>
              </Card.Content>
            </Card>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginTop: tokens.spacing["3xl"],
            }}
          >
            <NoData
              title="No Active Orders"
              description="You haven't placed any orders yet. Head back to the home screen to browse our delicious bajet meals!"
              icon="basket-outline"
              buttonLabel="Browse Menu"
              onPress={() => router.back()}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
