import React, { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, useTheme, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { design } from "../../constants/design";
import { useOverlay } from "../../contexts/overlayContext";
import {
  LeaveItem,
  LeaveStatus,
  leaveFilters,
  leaves,
} from "../../constants/leave";

export default function LeaveList() {
  const theme = useTheme();
  const { showSheet } = useOverlay();
  const { spacing, radii, typography } = design;

  const [activeFilter, setActiveFilter] = useState<LeaveStatus>("All");

  const filteredLeaves = useMemo(() => {
    if (activeFilter === "All") return leaves;
    return leaves.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case "Pending": return "#F59E0B";
      case "Approved": return "#10B981";
      case "Rejected": return "#EF4444";
      case "Cancelled": return "#94A3B8";
      default: return theme.colors.primary;
    }
  };

  const handleShowDetails = (item: LeaveItem) => {
    const statusColor = getStatusColor(item.status);
    
    showSheet({
      title: "Leave Details",
      content: (
        <View style={{ gap: spacing.lg, paddingBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View style={{ 
              backgroundColor: statusColor + "15", 
              padding: spacing.md, 
              borderRadius: 16 
            }}>
              <MaterialCommunityIcons name={item.icon as any} size={32} color={statusColor} />
            </View>
            <View>
              <Text variant="titleLarge" style={{ fontWeight: "800" }}>{item.type}</Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>{item.days} • {item.status}</Text>
            </View>
          </View>

          <Divider />

          <View style={{ gap: spacing.sm }}>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: "700" }}>DURATION</Text>
            <Text variant="titleMedium" style={{ fontWeight: "700" }}>{item.duration}</Text>
          </View>

          <View style={{ gap: spacing.sm }}>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: "700" }}>REASON</Text>
            <View style={{ backgroundColor: theme.colors.surfaceVariant + "40", padding: spacing.md, borderRadius: radii.lg }}>
              <Text variant="bodyMedium" style={{ lineHeight: 22 }}>{item.reason}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ gap: 4 }}>
              <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: "700" }}>APPLIED ON</Text>
              <Text variant="bodyMedium">{item.appliedAt}</Text>
            </View>
            <View style={{ alignItems: "flex-end", gap: 4 }}>
              <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, fontWeight: "700" }}>REFERENCE ID</Text>
              <Text variant="bodyMedium">#LV-{item.id.padStart(4, '0')}</Text>
            </View>
          </View>
        </View>
      ),
    });
  };

  return (
    <View style={{ gap: spacing.md }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.sm, paddingVertical: 2 }}
      >
        {leaveFilters.map((item) => {
          const active = activeFilter === item;
          const statusColor = getStatusColor(item);

          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(item)}
              style={{
                paddingHorizontal: spacing.md,
                height: 36,
                borderRadius: radii.full,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: active ? statusColor : theme.colors.surfaceVariant,
                borderWidth: active ? 0 : 1,
                borderColor: `${theme.colors.outline}15`,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: active ? "800" : "600",
                  color: active ? "#FFF" : theme.colors.onSurfaceVariant,
                }}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

        {filteredLeaves.map((item) => {
          const statusColor = getStatusColor(item.status);

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => handleShowDetails(item)}
              style={{
                borderRadius: 28,
                padding: spacing.lg,
                backgroundColor: theme.colors.surface,
                elevation: 1,
                overflow: "hidden",
                gap: spacing.xs,
              }}
            >
              {/* Background Decorative Icon */}
              <View
                style={{
                  position: "absolute",
                  right: -15,
                  top: -15,
                  opacity: 0.06,
                  transform: [{ rotate: "-15deg" }],
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={110}
                  color={statusColor}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: radii.full,
                    backgroundColor: `${statusColor}15`,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <View 
                    style={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: 3, 
                      backgroundColor: statusColor 
                    }} 
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "800",
                      color: statusColor,
                      letterSpacing: 0.5,
                    }}
                  >
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: spacing.xs }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: theme.colors.onSurface,
                  }}
                >
                  {item.type}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: theme.colors.onSurfaceVariant,
                    marginTop: 2,
                    fontWeight: "600",
                  }}
                >
                  {item.duration} • {item.days}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
  );
}
