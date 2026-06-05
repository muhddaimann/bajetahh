import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {
  Text,
  Button,
  Card,
  useTheme,
  Divider,
  Icon,
  Avatar,
  IconButton,
} from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import { useTabs } from "../../../../contexts/tabContext";
import { useOverlay } from "../../../../contexts/overlayContext";
import Header from "../../../../components/shared/header";
import ScrollTop from "../../../../components/shared/scrollTop";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { STATS, RECENT_ORDERS } from "../../../../constants/admin";

export default function AdminDashboard() {
  const theme = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { toast } = useOverlay();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleAction = (action: string) => {
    toast({
      message: `${action} feature coming soon!`,
      variant: "info",
    });
  };

  const renderActiveContent = () => {
    switch (activeMetric) {
      case 0: // Total Revenue
        return (
          <View style={{ marginTop: tokens.spacing.xl }}>
            <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: tokens.spacing.md }}>Revenue Analytics</Text>
            <Card style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
              <Card.Content style={{ padding: tokens.spacing.xl, alignItems: 'center', justifyContent: 'center', height: 200 }}>
                <MaterialCommunityIcons name="chart-bar" size={48} color={theme.colors.primary} style={{ opacity: 0.5 }} />
                <Text variant="bodyMedium" style={{ marginTop: tokens.spacing.md, color: theme.colors.onSurfaceVariant }}>
                  Revenue chart will be displayed here.
                </Text>
              </Card.Content>
            </Card>
          </View>
        );
      case 1: // Active Orders
        return (
          <View style={{ marginTop: tokens.spacing.xl }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tokens.spacing.md }}>
              <Text variant="titleMedium" style={{ fontWeight: "bold" }}>Pending Orders</Text>
              <Button mode="text" onPress={() => handleAction("View All Orders")}>See All</Button>
            </View>

            <Card style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
              <Card.Content style={{ padding: 0 }}>
                {RECENT_ORDERS.map((order, i) => (
                  <View key={order.id}>
                    <TouchableOpacity
                      onPress={() => handleAction(`Details for ${order.id}`)}
                      style={{
                        flexDirection: "row",
                        padding: tokens.spacing.md,
                        alignItems: "center",
                        gap: tokens.spacing.md,
                      }}
                    >
                      <Avatar.Text
                        size={40}
                        label={order.user.substring(0, 1)}
                        style={{ backgroundColor: theme.colors.primaryContainer }}
                        labelStyle={{ color: theme.colors.onPrimaryContainer }}
                      />
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <Text variant="titleSmall" style={{ fontWeight: "bold" }}>{order.user}</Text>
                          <Text variant="titleSmall" style={{ fontWeight: "bold", color: theme.colors.primary }}>{order.amount}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                          <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>{order.id} • {order.time}</Text>
                          <View
                            style={{
                              paddingHorizontal: 8,
                              paddingVertical: 2,
                              borderRadius: 4,
                              backgroundColor:
                                order.status === "Completed"
                                  ? "#E8F5E9"
                                  : order.status === "Pending"
                                  ? "#FFF3E0"
                                  : "#E3F2FD",
                            }}
                          >
                            <Text
                              variant="labelSmall"
                              style={{
                                fontSize: 10,
                                color:
                                  order.status === "Completed"
                                    ? "#2E7D32"
                                    : order.status === "Pending"
                                    ? "#EF6C00"
                                    : "#1565C0",
                              }}
                            >
                              {order.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Icon source="chevron-right" size={20} color={theme.colors.outline} />
                    </TouchableOpacity>
                    {i < RECENT_ORDERS.length - 1 && <Divider />}
                  </View>
                ))}
              </Card.Content>
            </Card>
          </View>
        );
      case 2: // Total Users
        return (
          <View style={{ marginTop: tokens.spacing.xl }}>
            <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: tokens.spacing.md }}>User Demographics</Text>
            <Card style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
              <Card.Content style={{ padding: tokens.spacing.xl, gap: tokens.spacing.md }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>New Registrations</Text>
                  <Text style={{ fontWeight: 'bold' }}>+24 today</Text>
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Active Sessions</Text>
                  <Text style={{ fontWeight: 'bold' }}>156 users</Text>
                </View>
                <Button mode="contained-tonal" style={{ marginTop: tokens.spacing.sm }}>Manage Users</Button>
              </Card.Content>
            </Card>
          </View>
        );
      case 3: // Menu Items
        return (
          <View style={{ marginTop: tokens.spacing.xl }}>
            <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: tokens.spacing.md }}>Inventory Alerts</Text>
            <View style={{ gap: tokens.spacing.sm }}>
              <Card style={{ backgroundColor: theme.colors.errorContainer, borderRadius: tokens.radii.lg }}>
                <Card.Content style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
                  <Icon source="alert-circle" size={24} color={theme.colors.error} />
                  <Text style={{ color: theme.colors.onErrorContainer }}>Ayam Goreng is running low (2 left)</Text>
                </Card.Content>
              </Card>
              <Card style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
                <Card.Content>
                  <Button mode="contained" onPress={() => handleAction("Manage Menu")}>Edit Menu Items</Button>
                </Card.Content>
              </Card>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"],
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Admin Dashboard"
          subtitle="Management & Analytics"
          showBack
        />

        {/* Statistics Grid - Pinterest Style */}
        <View style={{ flexDirection: "row", gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          {/* Left Column */}
          <View style={{ flex: 1, gap: tokens.spacing.md }}>
            {/* Taller Top Card (Metric 0) */}
            <TouchableOpacity onPress={() => setActiveMetric(0)}>
              <Card
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: tokens.radii.xl,
                  borderWidth: activeMetric === 0 ? 2 : 0,
                  borderColor: theme.colors.primary,
                }}
              >
                <Card.Content style={{ padding: tokens.spacing.md, paddingVertical: tokens.spacing.xl, gap: tokens.spacing.sm }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Avatar.Icon
                      size={40}
                      icon={STATS[0].icon}
                      style={{ backgroundColor: STATS[0].color + "20" }}
                      color={STATS[0].color}
                    />
                    <Text variant="labelSmall" style={{ color: theme.colors.primary, fontWeight: "bold" }}>{STATS[0].trend}</Text>
                  </View>
                  <View style={{ marginTop: tokens.spacing.md }}>
                    <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>{STATS[0].label}</Text>
                    <Text variant="headlineSmall" style={{ fontWeight: "bold", marginTop: 4 }}>{STATS[0].value}</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>

            {/* Shorter Bottom Card (Metric 2) */}
            <TouchableOpacity onPress={() => setActiveMetric(2)}>
              <Card
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: tokens.radii.xl,
                  borderWidth: activeMetric === 2 ? 2 : 0,
                  borderColor: theme.colors.primary,
                }}
              >
                <Card.Content style={{ padding: tokens.spacing.md, gap: tokens.spacing.xs }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Avatar.Icon
                      size={32}
                      icon={STATS[2].icon}
                      style={{ backgroundColor: STATS[2].color + "20" }}
                      color={STATS[2].color}
                    />
                    <Text variant="labelSmall" style={{ color: theme.colors.primary }}>{STATS[2].trend}</Text>
                  </View>
                  <View style={{ marginTop: tokens.spacing.xs }}>
                    <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>{STATS[2].label}</Text>
                    <Text variant="titleLarge" style={{ fontWeight: "bold" }}>{STATS[2].value}</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>

          {/* Right Column */}
          <View style={{ flex: 1, gap: tokens.spacing.md }}>
            {/* Shorter Top Card (Metric 1) */}
            <TouchableOpacity onPress={() => setActiveMetric(1)}>
              <Card
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: tokens.radii.xl,
                  borderWidth: activeMetric === 1 ? 2 : 0,
                  borderColor: theme.colors.primary,
                }}
              >
                <Card.Content style={{ padding: tokens.spacing.md, gap: tokens.spacing.xs }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Avatar.Icon
                      size={32}
                      icon={STATS[1].icon}
                      style={{ backgroundColor: STATS[1].color + "20" }}
                      color={STATS[1].color}
                    />
                    <Text variant="labelSmall" style={{ color: theme.colors.primary }}>{STATS[1].trend}</Text>
                  </View>
                  <View style={{ marginTop: tokens.spacing.xs }}>
                    <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>{STATS[1].label}</Text>
                    <Text variant="titleLarge" style={{ fontWeight: "bold" }}>{STATS[1].value}</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>

            {/* Taller Bottom Card (Metric 3) */}
            <TouchableOpacity onPress={() => setActiveMetric(3)}>
              <Card
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: tokens.radii.xl,
                  borderWidth: activeMetric === 3 ? 2 : 0,
                  borderColor: theme.colors.primary,
                }}
              >
                <Card.Content style={{ padding: tokens.spacing.md, paddingVertical: tokens.spacing.xl, gap: tokens.spacing.sm }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Avatar.Icon
                      size={40}
                      icon={STATS[3].icon}
                      style={{ backgroundColor: STATS[3].color + "20" }}
                      color={STATS[3].color}
                    />
                    <Text variant="labelSmall" style={{ color: theme.colors.primary, fontWeight: "bold" }}>{STATS[3].trend}</Text>
                  </View>
                  <View style={{ marginTop: tokens.spacing.md }}>
                    <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>{STATS[3].label}</Text>
                    <Text variant="headlineSmall" style={{ fontWeight: "bold", marginTop: 4 }}>{STATS[3].value}</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Content based on active metric */}
        {renderActiveContent()}

        {/* System Health */}
        <Card
          style={{
            marginTop: tokens.spacing.xl,
            backgroundColor: theme.colors.secondaryContainer,
            borderRadius: tokens.radii.xl,
          }}
        >
          <Card.Content style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing.md }}>
            <Avatar.Icon
              size={40}
              icon="shield-check"
              style={{ backgroundColor: "transparent" }}
              color={theme.colors.onSecondaryContainer}
            />
            <View style={{ flex: 1 }}>
              <Text variant="titleSmall" style={{ fontWeight: "bold", color: theme.colors.onSecondaryContainer }}>
                System Secure
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onSecondaryContainer, opacity: 0.8 }}>
                All services are running normally. Last backup: 2 hours ago.
              </Text>
            </View>
            <IconButton
              icon="refresh"
              iconColor={theme.colors.onSecondaryContainer}
              onPress={() => toast("System status refreshed")}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <ScrollTop visible={showScrollTop} onPress={scrollToTop} />
    </View>
  );
}
