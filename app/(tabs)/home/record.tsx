import React, { useEffect, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text, useTheme, Card, Divider, Chip } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabs } from "../../../contexts/tabContext";
import Header from "../../../components/shared/header";
import NoData from "../../../components/shared/noData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useOverlay } from "../../../contexts/overlayContext";

const MOCK_RECORDS = [
  {
    id: "ORD-7721",
    date: "Today, 12:30 PM",
    items: "Nasi Bajet Ayam, Teh O Ais",
    total: "RM 6.50",
    status: "Preparing",
    statusColor: "#FF9F43",
    icon: "clock-outline"
  },
  {
    id: "ORD-7654",
    date: "Yesterday, 1:15 PM",
    items: "Nasi Bajet Ikan, Kopi Panas",
    total: "RM 6.50",
    status: "Completed",
    statusColor: "#4CAF50",
    icon: "check-circle-outline"
  },
  {
    id: "ORD-7590",
    date: "5 Jun, 12:45 PM",
    items: "Mee Goreng Mamak, Teh O Ais",
    total: "RM 5.50",
    status: "Completed",
    statusColor: "#4CAF50",
    icon: "check-circle-outline"
  },
  {
    id: "ORD-7432",
    date: "4 Jun, 1:30 PM",
    items: "Nasi Bajet Ayam",
    total: "RM 5.00",
    status: "Cancelled",
    statusColor: "#F44336",
    icon: "close-circle-outline"
  }
];

export default function RecordPage() {
  const theme = useTheme();
  const tokens = useDesign();
  const { setHideTabBar } = useTabs();
  const { toast } = useOverlay();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, []);

  const filteredRecords = filter === "all" 
    ? MOCK_RECORDS 
    : MOCK_RECORDS.filter(r => r.status.toLowerCase() === filter.toLowerCase());

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"],
          gap: tokens.spacing.md
        }}
      >
        <Header title="Order History" subtitle="Track your past meals" showBack />
        
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: tokens.spacing.sm }}>
            {["All", "Preparing", "Completed", "Cancelled"].map((f) => (
              <Chip
                key={f}
                selected={filter === f.toLowerCase()}
                onPress={() => setFilter(f.toLowerCase())}
                style={{ 
                  backgroundColor: filter === f.toLowerCase() ? theme.colors.primaryContainer : theme.colors.surfaceVariant,
                  borderRadius: tokens.radii.pill
                }}
                textStyle={{ fontWeight: '700', fontSize: 12 }}
              >
                {f}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <Card
              key={record.id}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: tokens.radii.xl,
                borderWidth: 1,
                borderColor: theme.colors.surfaceVariant,
              }}
              mode="outlined"
            >
              <Card.Content style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: tokens.radii.md, 
                      backgroundColor: record.statusColor + '15',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MaterialCommunityIcons name={record.icon as any} size={18} color={record.statusColor} />
                    </View>
                    <Text variant="labelLarge" style={{ fontWeight: '800', letterSpacing: 0.5 }}>{record.id}</Text>
                  </View>
                  <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant, fontWeight: '600' }}>{record.date}</Text>
                </View>

                <Divider style={{ opacity: 0.5 }} />

                <View style={{ gap: 2 }}>
                  <Text variant="titleSmall" style={{ fontWeight: '700' }}>{record.items}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant="titleMedium" style={{ fontWeight: '900', color: theme.colors.primary }}>{record.total}</Text>
                    <View style={{ 
                      paddingHorizontal: 10, 
                      paddingVertical: 4, 
                      borderRadius: tokens.radii.pill, 
                      backgroundColor: record.statusColor + '10' 
                    }}>
                      <Text style={{ 
                        fontSize: 10, 
                        fontWeight: '900', 
                        color: record.statusColor, 
                        textTransform: 'uppercase',
                        letterSpacing: 0.5
                      }}>
                        {record.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <Pressable 
                  style={({ pressed }) => ({
                    marginTop: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radii.lg,
                    backgroundColor: theme.colors.surfaceVariant,
                    opacity: pressed ? 0.7 : 1
                  })}
                  onPress={() => toast(`Viewing details for ${record.id}`)}
                >
                  <Text variant="labelLarge" style={{ fontWeight: '800', color: theme.colors.onSurfaceVariant }}>VIEW DETAILS</Text>
                </Pressable>
              </Card.Content>
            </Card>
          ))
        ) : (
          <View style={{ marginTop: tokens.spacing["3xl"] }}>
            <NoData
              title="No records found"
              description="We couldn't find any orders matching this filter."
              icon="clipboard-text-off-outline"
              buttonLabel="Clear Filters"
              onPress={() => setFilter("all")}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
