import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../../contexts/designContext";

type RowTwoItem = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  color?: string;
};

type RowTwoProps = {
  left: RowTwoItem;
  right: RowTwoItem;
};

function Card({ icon, label, value, color }: RowTwoItem) {
  const { colors } = useTheme();
  const tokens = useDesign();

  const accent = color || colors.primary;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 30,
        padding: tokens.spacing.lg,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: accent + "16",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -28,
          right: -18,
          opacity: 0.05,
          transform: [{ rotate: "-10deg" }],
        }}
      >
        <MaterialCommunityIcons name={icon} size={130} color={accent} />
      </View>

      <View
        style={{
          gap: 4,
        }}
      >
        <Text
          variant="displaySmall"
          style={{
            fontWeight: "900",
            color: accent,
            lineHeight: 42,
          }}
        >
          {value}
        </Text>

        <Text
          variant="bodyMedium"
          style={{
            color: colors.onSurfaceVariant,
            lineHeight: 22,
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

export default function RowTwo({ left, right }: RowTwoProps) {
  const tokens = useDesign();

  return (
    <View
      style={{
        flexDirection: "row",
        gap: tokens.spacing.md,
      }}
    >
      <Card {...left} />
      <Card {...right} />
    </View>
  );
}
