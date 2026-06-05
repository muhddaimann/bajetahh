import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text, Chip, Icon, useTheme } from "react-native-paper";
import { CATEGORIES, Category } from "../../constants/menu";
import { useDesign } from "../../contexts/designContext";

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (subCategoryId: string) => void;
}

export default function CategoryFilters({
  selectedCategory,
  onCategoryChange,
  selectedSubCategory,
  setSelectedSubCategory,
}: CategoryFiltersProps) {
  const theme = useTheme();
  const tokens = useDesign();

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <View style={{ gap: tokens.spacing.sm }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        }}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => onCategoryChange(cat.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
              borderRadius: tokens.radii.pill,
              backgroundColor:
                selectedCategory === cat.id
                  ? theme.colors.primary
                  : theme.colors.surfaceVariant,
              gap: tokens.spacing.xs,
            }}
          >
            <Icon
              source={cat.icon}
              size={18}
              color={
                selectedCategory === cat.id
                  ? "white"
                  : theme.colors.onSurfaceVariant
              }
            />
            <Text
              style={{
                fontWeight: "700",
                color:
                  selectedCategory === cat.id
                    ? "white"
                    : theme.colors.onSurfaceVariant,
              }}
            >
              {cat.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {currentCategory?.subCategories && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: tokens.spacing.lg,
            gap: tokens.spacing.xs,
          }}
        >
          <Chip
            selected={selectedSubCategory === "all"}
            onPress={() => setSelectedSubCategory("all")}
            style={{
              backgroundColor:
                selectedSubCategory === "all"
                  ? theme.colors.primaryContainer
                  : "transparent",
            }}
          >
            All {currentCategory.label}
          </Chip>
          {currentCategory.subCategories.map((sub) => (
            <Chip
              key={sub.id}
              selected={selectedSubCategory === sub.id}
              onPress={() => setSelectedSubCategory(sub.id)}
              style={{
                backgroundColor:
                  selectedSubCategory === sub.id
                    ? theme.colors.primaryContainer
                    : "transparent",
              }}
            >
              {sub.label}
            </Chip>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
