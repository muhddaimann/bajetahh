import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { design } from "../../constants/design";

const recommendation = {
  title: "Smart Recommendation",
  description:
    "Frequent late arrivals detected on Tuesdays between 8:50AM - 9:10AM. Consider flexible check-in or earlier commute timing.",
  icon: "creation-outline",
  color: "#8B5CF6",
};

export default function AttendanceInsight() {
  const { spacing, radii, typography } = design;

  return (
    <View
      style={{
        gap: spacing.md,
      }}
    >
      <Text
        style={{
          fontSize: typography.sizes.xs,
          fontWeight: typography.weights.semibold,
          opacity: typography.opacities.muted,
          letterSpacing: 1,
        }}
      >
        ATTENDANCE INSIGHTS
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: spacing.sm,
        }}
      >
        <View
          style={{
            flex: 1.2,
            borderRadius: radii["2xl"],
            padding: spacing.lg,
            backgroundColor: "#6366F110",
            borderWidth: 1,
            borderColor: "#6366F120",
            justifyContent: "space-between",
            minHeight: 220,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              position: "absolute",
              right: -20,
              top: -20,
              opacity: 0.08,
            }}
          >
            <MaterialCommunityIcons name="orbit" size={120} color="#6366F1" />
          </View>

          <View>
            <Text
              style={{
                fontSize: typography.sizes.xs,
                opacity: typography.opacities.muted,
                letterSpacing: 0.5,
              }}
            >
              Attendance Rate
            </Text>

            <Text
              style={{
                marginTop: spacing.sm,
                fontSize: 56,
                lineHeight: 62,
                fontWeight: typography.weights.bold,
                color: "#6366F1",
              }}
            >
              96%
            </Text>
          </View>

          <Text
            style={{
              fontSize: typography.sizes.sm,
              opacity: 0.72,
              lineHeight: 22,
            }}
          >
            Excellent monthly consistency and punctuality trend.
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            gap: spacing.sm,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: radii.xl,
              padding: spacing.md,
              backgroundColor: "#F59E0B10",
              borderWidth: 1,
              borderColor: "#F59E0B20",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                position: "absolute",
                right: -10,
                top: -10,
                opacity: 0.08,
              }}
            >
              <MaterialCommunityIcons
                name="vector-polyline"
                size={90}
                color="#F59E0B"
              />
            </View>

            <Text
              style={{
                fontSize: typography.sizes.xs,
                opacity: typography.opacities.muted,
                letterSpacing: 0.5,
              }}
            >
              Late Trend
            </Text>

            <Text
              style={{
                fontSize: 34,
                lineHeight: 38,
                fontWeight: typography.weights.bold,
                color: "#F59E0B",
              }}
            >
              3
            </Text>

            <Text
              style={{
                fontSize: typography.sizes.xs,
                opacity: 0.72,
              }}
            >
              Days this month
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              borderRadius: radii.xl,
              padding: spacing.md,
              backgroundColor: "#22C55E10",
              borderWidth: 1,
              borderColor: "#22C55E20",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                position: "absolute",
                right: -10,
                top: -10,
                opacity: 0.08,
              }}
            >
              <MaterialCommunityIcons
                name="creation"
                size={90}
                color="#22C55E"
              />
            </View>

            <Text
              style={{
                fontSize: typography.sizes.xs,
                opacity: typography.opacities.muted,
                letterSpacing: 0.5,
              }}
            >
              Current Streak
            </Text>

            <Text
              style={{
                fontSize: 34,
                lineHeight: 38,
                fontWeight: typography.weights.bold,
                color: "#22C55E",
              }}
            >
              12
            </Text>

            <Text
              style={{
                fontSize: typography.sizes.xs,
                opacity: 0.72,
              }}
            >
              Consecutive days
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderRadius: radii["2xl"],
          padding: spacing.lg,
          backgroundColor: `${recommendation.color}10`,
          borderWidth: 1,
          borderColor: `${recommendation.color}20`,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            right: -20,
            bottom: -20,
            opacity: 0.08,
          }}
        >
          <MaterialCommunityIcons
            name="creation"
            size={120}
            color={recommendation.color}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: spacing.lg,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.semibold,
                color: recommendation.color,
                opacity: typography.opacities.muted,
                letterSpacing: 0.8,
              }}
            >
              SMART RECOMMENDATION
            </Text>

            <Text
              style={{
                marginTop: spacing.sm,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                lineHeight: 30,
              }}
            >
              Improve Tuesday punctuality with flexible check-in timing.
            </Text>

            <Text
              style={{
                marginTop: spacing.sm,
                fontSize: typography.sizes.sm,
                lineHeight: 22,
                opacity: 0.78,
              }}
            >
              Frequent late arrivals detected between 8:50AM - 9:10AM during
              morning commute hours.
            </Text>
          </View>

          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: radii.full,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `${recommendation.color}16`,
            }}
          >
            <MaterialCommunityIcons
              name={recommendation.icon as any}
              size={24}
              color={recommendation.color}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
