import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDesign } from "../../contexts/designContext";
import { attendance, attendanceStatuses } from "../../constants/attendance";

export default function AttendanceCard() {
  const { colors } = useTheme();
  const tokens = useDesign();

  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const statusKeys = Object.keys(attendanceStatuses);

  const [currentStatus, setCurrentStatus] = useState(attendance.currentStatus);

  const status = attendanceStatuses[currentStatus];

  const handleNextStatus = () => {
    const currentIndex = statusKeys.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusKeys.length;

    setCurrentStatus(statusKeys[nextIndex]);
  };

  return (
    <View
      style={{
        backgroundColor: status.cardColor,
        borderRadius: 28,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.xl,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -30,
          right: -10,
          opacity: 0.08,
          transform: [{ rotate: "-12deg" }],
        }}
      >
        <MaterialCommunityIcons
          name={status.icon}
          size={140}
          color={colors.onPrimary}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: -20,
          left: -20,
          opacity: 0.05,
          transform: [{ rotate: "8deg" }],
        }}
      >
        <MaterialCommunityIcons
          name="clock-outline"
          size={120}
          color={colors.onPrimary}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            variant="headlineSmall"
            style={{
              color: colors.onPrimary,
              fontWeight: "800",
            }}
          >
            {date}
          </Text>

          <Text
            variant="bodyLarge"
            style={{
              color: "rgba(255,255,255,0.72)",
              marginTop: 4,
            }}
          >
            {attendance.department}
          </Text>
        </View>

        <Pressable
          onPress={handleNextStatus}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <View
            style={{
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 6,
              borderRadius: tokens.radii.full,
              backgroundColor: "rgba(255,255,255,0.12)",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <MaterialCommunityIcons
              name={status.icon}
              size={13}
              color={status.dotColor}
            />

            <Text
              variant="labelMedium"
              style={{
                color: colors.onPrimary,
                fontWeight: "700",
              }}
            >
              {status.label}
            </Text>
          </View>
        </Pressable>
      </View>

      {status.showShift ? (
        <View
          style={{
            flexDirection: "row",
            gap: tokens.spacing.md,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: tokens.radii.xl,
              padding: tokens.spacing.md,
              gap: 4,
            }}
          >
            <Text
              variant="bodySmall"
              style={{
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Shift Start
            </Text>

            <Text
              variant="titleMedium"
              style={{
                color: colors.onPrimary,
                fontWeight: "800",
              }}
            >
              {attendance.shiftStart}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: tokens.radii.xl,
              padding: tokens.spacing.md,
              gap: 4,
            }}
          >
            <Text
              variant="bodySmall"
              style={{
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Shift End
            </Text>

            <Text
              variant="titleMedium"
              style={{
                color: colors.onPrimary,
                fontWeight: "800",
              }}
            >
              {attendance.shiftEnd}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: tokens.radii.xl,
            padding: tokens.spacing.lg,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: colors.onPrimary,
              lineHeight: 24,
            }}
          >
            {status.message}
          </Text>
        </View>
      )}
    </View>
  );
}
