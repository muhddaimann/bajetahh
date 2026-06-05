import React from "react";
import { View, Pressable } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "../../constants/menu";
import { useDesign } from "../../contexts/designContext";
import NoData from "../shared/noData";

interface MenuListProps {
  items: MenuItem[];
  addItem: (item: MenuItem) => void;
  onResetFilters: () => void;
}

export default function MenuList({
  items,
  addItem,
  onResetFilters,
}: MenuListProps) {
  const theme = useTheme();
  const tokens = useDesign();

  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing.lg,
        gap: tokens.spacing.md,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant="titleMedium" style={{ fontWeight: "700" }}>
          {`Menu Items`}
        </Text>
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          {`${items.length} items found`}
        </Text>
      </View>

      <View style={{ gap: tokens.spacing.md }}>
        {items.length > 0 ? (
          items.map((item) => (
            <Card
              key={item.id}
              mode="elevated"
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: tokens.radii.lg,
              }}
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  padding: tokens.spacing.md,
                  gap: tokens.spacing.md,
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: tokens.radii.md,
                    backgroundColor: item.color + "20",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={40}
                    color={item.color}
                  />
                </View>

                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <View>
                    <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                      {item.name}
                    </Text>
                    <Text
                      variant="bodySmall"
                      numberOfLines={2}
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      variant="titleMedium"
                      style={{
                        fontWeight: "900",
                        color: theme.colors.primary,
                      }}
                    >
                      {item.formattedPrice}
                    </Text>
                    <Pressable
                      onPress={() => addItem(item)}
                      style={{
                        backgroundColor: theme.colors.primary,
                        paddingHorizontal: tokens.spacing.md,
                        paddingVertical: tokens.spacing.xs,
                        borderRadius: tokens.radii.pill,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: 12,
                        }}
                      >
                        ADD
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <View style={{ paddingVertical: tokens.spacing["2xl"] }}>
            <NoData
              title="No Items Found"
              description="We couldn't find any items matching your current filters. Try selecting a different category."
              icon="food-off"
              buttonLabel="Reset Filters"
              onPress={onResetFilters}
            />
          </View>
        )}
      </View>
    </View>
  );
}
