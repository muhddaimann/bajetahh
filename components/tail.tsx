import React from "react";
import { View } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { useDesign } from "../contexts/designContext";

type TailProps = {
  avatarText: string;
  username: string;
  staffId: string;
  designation: string;
  onUpdateProfilePress?: () => void;
};

export default function Tail({
  avatarText,
  username,
  staffId,
  designation,
  onUpdateProfilePress,
}: TailProps) {
  const { colors } = useTheme();
  const tokens = useDesign();

  return (
    <View
      style={{
        alignItems: "center",
        gap: tokens.spacing.md,
      }}
    >
      <View
        style={{
          width: 92,
          height: 92,
          borderRadius: tokens.radii.full,
          backgroundColor: colors.primaryContainer,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          variant="headlineMedium"
          style={{
            fontWeight: "700",
            color: colors.primary,
          }}
        >
          {avatarText}
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          gap: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: tokens.spacing.sm,
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "700",
            }}
          >
            {username}
          </Text>

          <Text
            variant="bodyMedium"
            style={{
              color: colors.onSurfaceVariant,
            }}
          >
            #{staffId}
          </Text>
        </View>

        <Text
          variant="bodySmall"
          style={{
            color: colors.onSurfaceVariant,
          }}
        >
          {designation}
        </Text>
      </View>

      <Button
        mode="outlined"
        onPress={onUpdateProfilePress}
        style={{
          borderRadius: tokens.radii.full,
          borderColor: colors.primary,
        }}
        labelStyle={{
          fontWeight: "600",
        }}
      >
        Update Profile
      </Button>
    </View>
  );
}
