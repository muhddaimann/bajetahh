import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, useTheme, Divider, Button, Avatar, Icon, SegmentedButtons } from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import Header from "../../../../components/shared/header";
import { RECENT_ORDERS } from "../../../../constants/admin";

export default function OrdersManagementPage() {
  const theme = useTheme();
  const tokens = useDesign();
  const [filter, setFilter] = React.useState("all");

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"],
        }}
      >
        <Header
          title="Orders Management"
          subtitle="Track & Update Customer Orders"
          showBack
        />

        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.md }}>
          <SegmentedButtons
            value={filter}
            onValueChange={setFilter}
            buttons={[
              { value: "all", label: "All" },
              { value: "pending", label: "Pending" },
              { value: "active", label: "Active" },
              { value: "done", label: "Done" },
            ]}
          />

          <View style={{ gap: tokens.spacing.md }}>
            {RECENT_ORDERS.map((order) => (
              <Card key={order.id} style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
                <Card.Content style={{ padding: tokens.spacing.md }}>
                  <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
                    <Avatar.Text 
                      size={48} 
                      label={order.user.substring(0, 1)} 
                      style={{ backgroundColor: theme.colors.primaryContainer }}
                      labelStyle={{ color: theme.colors.onPrimaryContainer }}
                    />
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{order.user}</Text>
                        <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{order.amount}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
                        <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>{order.id} • {order.time}</Text>
                        <Text variant="labelSmall" style={{ fontWeight: 'bold' }}>{order.status}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <Divider style={{ marginVertical: tokens.spacing.md }} />
                  
                  <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
                    <Button mode="outlined" style={{ flex: 1 }} onPress={() => {}}>Details</Button>
                    <Button mode="contained" style={{ flex: 1 }} onPress={() => {}}>Complete</Button>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
