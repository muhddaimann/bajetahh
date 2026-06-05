import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, useTheme, Divider, FAB, Searchbar, Chip } from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import Header from "../../../../components/shared/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MENU_ITEMS } from "../../../../constants/menu";

export default function MenuManagementPage() {
  const theme = useTheme();
  const tokens = useDesign();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing["3xl"],
        }}
      >
        <Header
          title="Menu Management"
          subtitle="Edit & Update Food Items"
          showBack
        />

        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.md }}>
          <Searchbar
            placeholder="Search menu items..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.lg }}
          />

          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            <Chip selected>All</Chip>
            <Chip>Main</Chip>
            <Chip>Side</Chip>
            <Chip>Drinks</Chip>
          </View>

          <View style={{ gap: tokens.spacing.md }}>
            {MENU_ITEMS.map((item) => (
              <Card key={item.id} style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.lg }}>
                <Card.Content style={{ flexDirection: 'row', padding: tokens.spacing.md, gap: tokens.spacing.md }}>
                  <View 
                    style={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: tokens.radii.md, 
                      backgroundColor: item.color + '20',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MaterialCommunityIcons name={item.icon as any} size={30} color={item.color} />
                  </View>
                  
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.name}</Text>
                      <TouchableOpacity>
                        <MaterialCommunityIcons name="pencil-outline" size={20} color={theme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{item.formattedPrice}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50' }} />
                        <Text variant="labelSmall">In Stock</Text>
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
        color="white"
        onPress={() => {}}
      />
    </View>
  );
}
