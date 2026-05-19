import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { Card, Text, useTheme, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { design } from "../../constants/design";
import {
  AttendanceDay,
  AttendanceStatus,
  weeklyAttendanceData,
  monthlyAttendanceData,
} from "../../constants/attendance";

export default function AttendanceOverview({ view }: { view: "Weekly" | "Monthly" }) {
  const theme = useTheme();
  const today = 19; // Today's date based on session context

  const { spacing, radii, typography, sizes, elevation, opacity } = design;

  const data = useMemo(
    () => (view === "Weekly" ? weeklyAttendanceData : monthlyAttendanceData),
    [view],
  );

  const [selected, setSelected] = useState<AttendanceDay>(() => {
    return (
      weeklyAttendanceData.find((item) => item.date === today) ||
      weeklyAttendanceData[0]
    );
  });

  useEffect(() => {
    const todayItem = data.find((item) => item.date === today);
    setSelected(todayItem || data[0]);
  }, [view, data]);

  const firstDayOffset = 4;

  const calendarData = [
    ...Array.from({ length: firstDayOffset }).map((_, index) => ({
      id: `empty-${index}`,
      empty: true,
    })),
    ...monthlyAttendanceData.map((item) => ({
      ...item,
      empty: false,
    })),
  ];

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return "#22C55E";
      case "Late":
        return "#F59E0B";
      case "Absent":
        return "#EF4444";
      case "Leave":
        return "#8B5CF6";
      case "Weekend":
        return theme.colors.outline;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <Card
      style={{
        borderRadius: 28,
        overflow: "hidden",
        elevation: elevation.level1,
        backgroundColor: theme.colors.surface,
      }}
    >
      {/* Top Section - Status Detail (Glassmorphism Style) */}
      <View
        style={{
          backgroundColor: getStatusColor(selected.status),
          padding: spacing.lg,
          gap: spacing.md,
          overflow: "hidden",
        }}
      >
        {/* Background Decorative Icons */}
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
            name={
              selected.status === "Present"
                ? "check-decagram"
                : selected.status === "Late"
                ? "clock-alert"
                : selected.status === "Absent"
                ? "close-octagon"
                : selected.status === "Weekend"
                ? "sofa"
                : "calendar"
            }
            size={140}
            color="#FFF"
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
            color="#FFF"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              variant="titleLarge"
              style={{
                color: "#FFF",
                fontWeight: "800",
              }}
            >
              {selected.day
                ? `${selected.day}, ${selected.date} May`
                : `${selected.date} May`}
            </Text>

            <View
              style={{
                alignSelf: "flex-start",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: radii.full,
                backgroundColor: "rgba(255,255,255,0.15)",
                marginTop: 8,
              }}
            >
              <Text
                variant="labelSmall"
                style={{
                  color: "#FFF",
                  fontWeight: "700",
                }}
              >
                {selected.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: spacing.sm,
            marginTop: spacing.xs,
          }}
        >
          {[
            { label: "Check In", value: selected.checkIn || "--" },
            { label: "Check Out", value: selected.checkOut || "--" },
            { label: "Hours", value: selected.workingHours || "--" },
          ].map((item, idx) => (
            <View
              key={idx}
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: radii.xl,
                padding: spacing.md,
                gap: 4,
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {item.label}
              </Text>

              <Text
                variant="titleSmall"
                style={{
                  color: "#FFF",
                  fontWeight: "800",
                }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Section - Interactive Selection (Calendar/List) */}
      <View style={{ padding: spacing.md }}>
        {view === "Weekly" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: spacing.sm,
            }}
          >
            {weeklyAttendanceData.map((item) => {
              const active = selected.date === item.date;
              const isToday = item.date === today;
              return (
                <View
                  key={item.date}
                  style={{ flex: 1, alignItems: "center", gap: spacing.xs }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: isToday ? "900" : "700",
                      color: isToday
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                      opacity: isToday ? 1 : 0.6,
                    }}
                  >
                    {item.day.charAt(0).toUpperCase()}
                  </Text>
                  <Pressable
                    onPress={() => setSelected(item)}
                    style={{
                      width: "100%",
                      alignItems: "center",
                      paddingVertical: spacing.md,
                      borderRadius: radii.xl,
                      backgroundColor: active
                        ? theme.colors.primary
                        : theme.colors.background,
                      borderWidth: isToday ? 2 : 0,
                      borderColor: active
                        ? "rgba(255,255,255,0.5)"
                        : theme.colors.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "800",
                        color: active
                          ? theme.colors.onPrimary
                          : theme.colors.onSurface,
                      }}
                    >
                      {item.date}
                    </Text>
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        marginTop: 8,
                        backgroundColor: active
                          ? theme.colors.onPrimary
                          : getStatusColor(item.status),
                      }}
                    />
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={{ gap: spacing.md }}>
            <View style={{ flexDirection: "row" }}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <View
                  key={i}
                  style={{ width: `${100 / 7}%`, alignItems: "center" }}
                >
                  <Text
                    variant="labelSmall"
                    style={{ opacity: 0.5, fontWeight: "700" }}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {calendarData.map((item: any, index) => {
                const isToday = !item.empty && item.date === today;
                const active = !item.empty && selected.date === item.date;

                return (
                  <View key={index} style={{ width: `${100 / 7}%`, padding: 2 }}>
                    {!item.empty ? (
                      <Pressable
                        onPress={() => setSelected(item)}
                        style={{
                          aspectRatio: 1,
                          borderRadius: radii.lg,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: active
                            ? theme.colors.primary
                            : theme.colors.background,
                          borderWidth: isToday ? 2 : 0,
                          borderColor: active
                            ? "rgba(255,255,255,0.5)"
                            : theme.colors.primary,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "700",
                            color: active
                              ? theme.colors.onPrimary
                              : theme.colors.onSurface,
                          }}
                        >
                          {item.date}
                        </Text>
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            marginTop: 4,
                            backgroundColor: active
                              ? theme.colors.onPrimary
                              : getStatusColor(item.status),
                          }}
                        />
                      </Pressable>
                    ) : (
                      <View style={{ aspectRatio: 1 }} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </Card>
  );
}
