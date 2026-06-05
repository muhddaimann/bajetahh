import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme, Avatar, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../../contexts/designContext";
import { useAuth } from "../../contexts/authContext";

type HeaderProps = {
  onUpdateProfilePress?: () => void;
};

export default function Header({ onUpdateProfilePress }: HeaderProps) {
  const theme = useTheme();
  const tokens = useDesign();
  const { user } = useAuth();

  const isCustomer = user?.role === 'customer';

  const details = [
    {
      label: "Display Name",
      value: user?.name || "Guest User",
      icon: "account-circle-outline",
    },
    {
      label: isCustomer ? "Customer ID" : "Admin ID",
      value: user?.staffId || "N/A",
      icon: isCustomer ? "card-account-details-outline" : "badge-account-outline",
    },
    {
      label: "Designation",
      value: user?.designation || "User",
      icon: "briefcase-outline",
    },
    { 
      label: "Contact Number", 
      value: "+6012 345 6789", 
      icon: "phone-outline" 
    },
  ];

  return (
    <View
      style={{
        borderRadius: tokens.radii["2xl"],
        backgroundColor: theme.colors.elevation.level1,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: theme.colors.outlineVariant,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -30,
          left: -30,
          opacity: 0.03,
          transform: [{ rotate: "-15deg" }],
        }}
      >
        <MaterialCommunityIcons
          name="food-variant"
          size={240}
          color={theme.colors.primary}
        />
      </View>

      <View
        style={{
          padding: tokens.spacing.lg,
          alignItems: "center",
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ alignItems: "center", gap: tokens.spacing.md }}>
          <View
            style={{
              padding: 6,
              borderRadius: tokens.radii.full,
              borderWidth: 2,
              borderColor: theme.colors.primaryContainer,
              backgroundColor: theme.colors.surface,
            }}
          >
            <Avatar.Text
              size={100}
              label={user?.avatarText || "??"}
              style={{
                backgroundColor: theme.colors.primaryContainer,
              }}
              labelStyle={{
                color: theme.colors.onPrimaryContainer,
                fontWeight: "900",
                fontSize: 36,
              }}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "900",
                color: theme.colors.onSurface,
                letterSpacing: -1,
              }}
            >
              {user?.name || "Guest"}
            </Text>

            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.primary,
                fontWeight: "700",
                marginTop: -4,
              }}
            >
              {isCustomer ? "Premium Member" : "Restaurant Administrator"}
            </Text>
          </View>
        </View>

        <Divider style={{ width: "100%", opacity: 0.5 }} />

        <View style={{ width: "100%", gap: tokens.spacing.md }}>
          {details.map((item, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                gap: tokens.spacing.md,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: tokens.radii.lg,
                  backgroundColor: theme.colors.surface,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.outlineVariant,
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={18}
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
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.onSurface,
                    fontWeight: "600",
                    lineHeight: 20,
                  }}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {onUpdateProfilePress && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onUpdateProfilePress}
            style={{
              width: "100%",
              height: 56,
              borderRadius: tokens.radii.xl,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.primary,
              flexDirection: "row",
              gap: tokens.spacing.sm,
              marginTop: tokens.spacing.sm,
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={20}
              color={theme.colors.onPrimary}
            />

            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onPrimary,
                fontWeight: "800",
                letterSpacing: 1,
              }}
            >
              EDIT PROFILE
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
