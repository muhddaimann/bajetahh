import React from "react";
import { View, Pressable } from "react-native";
import { Text, Card, Icon, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../../contexts/designContext";

interface OrderTypeSelectorProps {
  orderType: string;
  setOrderType: (type: string) => void;
  userLocation: string;
  onLocationPress: () => void;
}

export default function OrderTypeSelector({
  orderType,
  setOrderType,
  userLocation,
  onLocationPress,
}: OrderTypeSelectorProps) {
  const theme = useTheme();
  const tokens = useDesign();

  return (
    <View style={{ paddingHorizontal: tokens.spacing.lg }}>
      <Card
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: tokens.radii.xl,
          overflow: "hidden",
        }}
      >
        {/* Custom Switcher Header */}
        <View
          style={{
            flexDirection: "row",
            padding: 4,
            backgroundColor: "rgba(0,0,0,0.05)",
            borderRadius: tokens.radii.xl,
          }}
        >
          <Pressable
            onPress={() => setOrderType("pickup")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 10,
              borderRadius: tokens.radii.lg,
              backgroundColor:
                orderType === "pickup" ? theme.colors.surface : "transparent",
            }}
          >
            <MaterialCommunityIcons
              name="walk"
              size={18}
              color={
                orderType === "pickup"
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant
              }
            />
            <Text
              style={{
                fontWeight: "800",
                fontSize: 13,
                color:
                  orderType === "pickup"
                    ? theme.colors.primary
                    : theme.colors.onSurfaceVariant,
              }}
            >
              PICKUP
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setOrderType("delivery")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 10,
              borderRadius: tokens.radii.lg,
              backgroundColor:
                orderType === "delivery" ? theme.colors.surface : "transparent",
            }}
          >
            <MaterialCommunityIcons
              name="moped"
              size={18}
              color={
                orderType === "delivery"
                  ? theme.colors.primary
                  : theme.colors.onSurfaceVariant
              }
            />
            <Text
              style={{
                fontWeight: "800",
                fontSize: 13,
                color:
                  orderType === "delivery"
                    ? theme.colors.primary
                    : theme.colors.onSurfaceVariant,
              }}
            >
              DELIVERY
            </Text>
          </Pressable>
        </View>

        {/* Location Info Body */}
        <Pressable 
          onPress={onLocationPress}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Card.Content
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: tokens.radii.lg,
                backgroundColor: theme.colors.surface,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.05)",
              }}
            >
              <Icon
                source={
                  orderType === "pickup" ? "store-marker" : "map-marker-radius"
                }
                size={22}
                color={theme.colors.primary}
              />
            </View>

            <View style={{ flex: 1, gap: 1 }}>
              <Text
                variant="labelSmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: "700",
                }}
              >
                {orderType === "pickup"
                  ? "Your Pickup Point"
                  : "Delivery Address"}
              </Text>
              {orderType === "pickup" ? (
                <Text variant="titleSmall" style={{ fontWeight: "700" }}>
                  BajetAhh Stall, University Malaya
                </Text>
              ) : (
                <Text 
                  variant="titleSmall" 
                  style={{ 
                    fontWeight: "700",
                    color: userLocation ? theme.colors.onSurface : theme.colors.primary
                  }}
                >
                  {userLocation || "Set your location"}
                </Text>
              )}
            </View>

            <Icon
              source="chevron-right"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
          </Card.Content>
        </Pressable>
      </Card>
    </View>
  );
}
