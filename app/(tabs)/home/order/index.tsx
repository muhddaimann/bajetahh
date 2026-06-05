import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import {
  Text,
  useTheme,
  IconButton,
  Button,
  Divider,
} from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import { useTabs } from "../../../../contexts/tabContext";
import Header from "../../../../components/shared/header";
import NoData from "../../../../components/shared/noData";
import { useRouter } from "expo-router";
import { useOrder } from "../../../../hooks/useOrder";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useOverlay } from "../../../../contexts/overlayContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PAYMENT_METHODS = [
  { id: "cash", label: "Cash", icon: "cash-marker" },
  { id: "ewallet", label: "E-Wallet", icon: "wallet-outline" },
  { id: "fpx", label: "Banking", icon: "bank-outline" },
];

export default function OrderPage() {
  const theme = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const router = useRouter();
  const { showLoader, hideLoader, toast, confirm } = useOverlay();
  const { items, updateQuantity, formattedTotalPrice, clearOrder } = useOrder();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsItemsExpanded(!isItemsExpanded);
  };

  const handleCheckout = () => {
    confirm({
      title: "Place Order?",
      message: `Total amount ${formattedTotalPrice} will be paid via ${PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}.`,
      confirmText: "Confirm Order",
      onConfirm: async () => {
        showLoader("Processing order...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        hideLoader();
        clearOrder();
        toast({
          message: "Order placed successfully!",
          variant: "success",
        });
        router.replace("/(tabs)/home");
      },
    });
  };

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Header title="Checkout" showBack />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: tokens.spacing.xl,
          }}
        >
          <NoData
            title="Cart is empty"
            description="Add some delicious meals to get started."
            icon="cart-outline"
            buttonLabel="Back to Menu"
            onPress={() => router.back()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"] * 2,
          gap: tokens.spacing.md,
        }}
      >
        <Header title="Checkout" subtitle="Check before Checkout" showBack />

        {/* Collapsible Order Items */}
        <View>
          <Pressable
            onPress={toggleExpand}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: tokens.spacing.xs,
            }}
          >
            <Text
              variant="titleMedium"
              style={{ fontWeight: "800", letterSpacing: 0.5 }}
            >
              ORDER DETAILS
            </Text>
            <IconButton
              icon={isItemsExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              style={{ margin: 0 }}
            />
          </Pressable>

          {isItemsExpanded && (
            <View style={{ gap: tokens.spacing.md }}>
              {items.map((item) => (
                <View
                  key={item.cartId}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: tokens.spacing.md,
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: tokens.radii.md,
                      backgroundColor: item.color + "10",
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
                    <Text
                      variant="labelSmall"
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      {item.quantity}x • {item.formattedPrice}
                    </Text>
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
                      size={14}
                      mode="contained-tonal"
                      onPress={() =>
                        updateQuantity(item.cartId, item.quantity - 1)
                      }
                      style={{ margin: 0, width: 28, height: 28 }}
                    />
                    <Text
                      style={{
                        fontWeight: "900",
                        width: 20,
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </Text>
                    <IconButton
                      icon="plus"
                      size={14}
                      mode="contained"
                      onPress={() =>
                        updateQuantity(item.cartId, item.quantity + 1)
                      }
                      style={{ margin: 0, width: 28, height: 28 }}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Horizontal Payment Methods */}
        <View style={{ gap: tokens.spacing.md }}>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "800", letterSpacing: 0.5 }}
          >
            PAYMENT
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: tokens.spacing.sm }}
          >
            {PAYMENT_METHODS.map((method) => (
              <Pressable
                key={method.id}
                onPress={() => setPaymentMethod(method.id)}
                style={({ pressed }) => ({
                  width: 110,
                  height: 90,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: tokens.radii.xl,
                  borderWidth: 2,
                  borderColor:
                    paymentMethod === method.id
                      ? theme.colors.primary
                      : theme.colors.surfaceVariant,
                  backgroundColor:
                    paymentMethod === method.id
                      ? theme.colors.primary + "05"
                      : theme.colors.surface,
                  gap: tokens.spacing.xs,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <MaterialCommunityIcons
                  name={method.icon as any}
                  size={28}
                  color={
                    paymentMethod === method.id
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant
                  }
                />
                <Text
                  variant="labelMedium"
                  style={{
                    fontWeight: paymentMethod === method.id ? "900" : "700",
                    color:
                      paymentMethod === method.id
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                  }}
                >
                  {method.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Price Breakdown */}
        <View style={{ gap: tokens.spacing.sm }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                fontWeight: "600",
              }}
            >
              Subtotal
            </Text>
            <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
              {formattedTotalPrice}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                fontWeight: "600",
              }}
            >
              Service Fee
            </Text>
            <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
              RM 0.00
            </Text>
          </View>
          <Divider style={{ marginVertical: tokens.spacing.xs }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text variant="titleLarge" style={{ fontWeight: "900" }}>
              Total
            </Text>
            <Text
              variant="headlineSmall"
              style={{ fontWeight: "900", color: theme.colors.primary }}
            >
              {formattedTotalPrice}
            </Text>
          </View>
        </View>

        {/* Place Order Button - Now inside ScrollView */}
        <Button
          mode="contained"
          onPress={handleCheckout}
          contentStyle={{ height: 64 }}
          style={{
            borderRadius: tokens.radii.xl,
            marginTop: tokens.spacing.md,
          }}
          labelStyle={{ fontSize: 18, fontWeight: "900", letterSpacing: 1 }}
        >
          PLACE ORDER
        </Button>
      </ScrollView>
    </View>
  );
}
