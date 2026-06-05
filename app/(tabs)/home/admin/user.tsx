import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, useTheme, Divider, Avatar, IconButton, Searchbar } from "react-native-paper";
import { useDesign } from "../../../../contexts/designContext";
import Header from "../../../../components/shared/header";

const DUMMY_USERS = [
  { id: 1, name: "Ahmad", role: "Customer", email: "ahmad@example.com", initial: "A" },
  { id: 2, name: "Siti", role: "Customer", email: "siti@example.com", initial: "S" },
  { id: 3, name: "Daim", role: "Admin", email: "daim@example.com", initial: "D" },
  { id: 4, name: "Sarah", role: "Customer", email: "sarah@example.com", initial: "S" },
  { id: 5, name: "Zul", role: "Customer", email: "zul@example.com", initial: "Z" },
];

export default function UsersManagementPage() {
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
          title="User Management"
          subtitle="Manage Accounts & Permissions"
          showBack
        />

        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.md }}>
          <Searchbar
            placeholder="Search users..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.lg }}
          />

          <Card style={{ backgroundColor: theme.colors.surface, borderRadius: tokens.radii.xl }}>
            <Card.Content style={{ padding: 0 }}>
              {DUMMY_USERS.map((user, i) => (
                <View key={user.id}>
                  <View style={{ padding: tokens.spacing.md, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
                    <Avatar.Text 
                      size={40} 
                      label={user.initial} 
                      style={{ backgroundColor: user.role === 'Admin' ? theme.colors.primary : theme.colors.secondaryContainer }}
                      labelStyle={{ color: user.role === 'Admin' ? 'white' : theme.colors.onSecondaryContainer }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>{user.name}</Text>
                      <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>{user.role} • {user.email}</Text>
                    </View>
                    <IconButton icon="dots-vertical" onPress={() => {}} />
                  </View>
                  {i < DUMMY_USERS.length - 1 && <Divider />}
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
