import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, useTheme, Divider } from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import Header from "../../../../components/shared/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RevenuePage() {
  const theme = useTheme();
  const tokens = useDesign();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"],
        }}
      >
        <Header
          title="Revenue Analytics"
          subtitle="Financial Overview & Trends"
          showBack
        />

        <View style={{ gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          <Card style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
            <Card.Content style={{ padding: tokens.spacing.xl, alignItems: 'center', justifyContent: 'center', height: 250 }}>
              <MaterialCommunityIcons name="chart-bar" size={64} color={theme.colors.primary} style={{ opacity: 0.5 }} />
              <Text variant="titleMedium" style={{ marginTop: tokens.spacing.md, color: theme.colors.onSurfaceVariant }}>
                Interactive Revenue Chart
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'center', marginTop: 8 }}>
                Visual representation of daily and monthly earnings will appear here.
              </Text>
            </Card.Content>
          </Card>

          <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
            <Card style={{ flex: 1, backgroundColor: theme.colors.surface, borderRadius: tokens.radii.lg }}>
              <Card.Content>
                <Text variant="labelSmall">Daily Average</Text>
                <Text variant="titleLarge" style={{ fontWeight: 'bold', color: theme.colors.primary }}>RM 150</Text>
              </Card.Content>
            </Card>
            <Card style={{ flex: 1, backgroundColor: theme.colors.surface, borderRadius: tokens.radii.lg }}>
              <Card.Content>
                <Text variant="labelSmall">Monthly Target</Text>
                <Text variant="titleLarge" style={{ fontWeight: 'bold', color: theme.colors.secondary }}>RM 5,000</Text>
              </Card.Content>
            </Card>
          </View>

          <Text variant="titleMedium" style={{ fontWeight: 'bold', marginTop: tokens.spacing.md }}>Recent Transactions</Text>
          <Card style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
            {[1, 2, 3, 4, 5].map((item, i) => (
              <View key={i}>
                <View style={{ padding: tokens.spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text variant="titleSmall">Order #ORD-00{item}</Text>
                    <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>5 June 2026, 12:30 PM</Text>
                  </View>
                  <Text variant="titleMedium" style={{ fontWeight: 'bold', color: '#4CAF50' }}>+RM 15.00</Text>
                </View>
                {i < 4 && <Divider />}
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
