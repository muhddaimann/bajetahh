import React from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../../contexts/designContext";
import { useAuth } from "../../contexts/authContext";
import { useOverlay } from "../../contexts/overlayContext";
import { useRouter } from "expo-router";
import PickerModal from "../shared/pickerModal";

type HeaderProps = {
  greeting: string;
  onNotificationPress?: () => void;
};

export default function Header({
  greeting,
  onNotificationPress,
}: HeaderProps) {
  const { colors } = useTheme();
  const tokens = useDesign();
  const { user } = useAuth();
  const { showModal, hideModal, toast } = useOverlay();
  const router = useRouter();

  const handleAvatarPress = () => {
    const options = [
      {
        id: "update",
        label: "Update Details",
        icon: "account-edit-outline",
        onPress: () => router.push("settings/update"),
      },
      ...(user?.role === "admin"
        ? [
            {
              id: "admin",
              label: "Admin Dashboard",
              icon: "shield-account-outline",
              onPress: () => router.push("home/admin"),
            },
          ]
        : []),
      {
        id: "about",
        label: "About App",
        icon: "information-outline",
        onPress: () => toast({ message: "BajetAhh v1.0.0", variant: "info" }),
      },
    ];

    showModal({
      content: (
        <PickerModal
          title="Profile Menu"
          data={options}
          onSelect={(item) => {
            hideModal();
            item.onPress();
          }}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.label}
          iconExtractor={(item) => item.icon as any}
        />
      ),
    });
  };

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: tokens.spacing.lg,
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: tokens.spacing.xxs,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{
                color: colors.onSurfaceVariant,
              }}
            >
              {greeting},
            </Text>

            <Text
              variant="titleSmall"
              style={{
                fontWeight: "700",
                flexShrink: 1,
              }}
              numberOfLines={1}
            >
              {user?.name || "Guest"}
            </Text>
          </View>

          <Text
            variant="bodySmall"
            style={{
              color: colors.onSurfaceVariant,
            }}
            numberOfLines={1}
          >
            {user?.designation || "No Designation"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: tokens.spacing.sm,
          }}
        >
          <Pressable
            onPress={onNotificationPress}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: tokens.radii.full,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.surfaceVariant,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={20}
              color={colors.onSurface}
            />
          </Pressable>

          <Pressable 
            onPress={handleAvatarPress}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: tokens.radii.full,
              backgroundColor: colors.primaryContainer,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              variant="labelLarge"
              style={{
                fontWeight: "700",
                color: colors.onPrimaryContainer,
              }}
            >
              {user?.avatarText || "?"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 4 }}>
        <Text 
          style={{ 
            fontSize: 26, 
            fontWeight: "900", 
            letterSpacing: -1.5,
            textAlign: 'center',
          }}
        >
          <Text style={{ color: colors.primary }}>{`Makan Jimat. `}</Text>
          <Text style={{ color: colors.secondary }}>{`Order Cepat.`}</Text>
        </Text>
      </View>
    </View>
  );
}
