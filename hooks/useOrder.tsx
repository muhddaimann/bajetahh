import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, IconButton, TextInput, useTheme } from "react-native-paper";
import { useOrderContext } from "../contexts/orderContext";
import { useOverlay } from "../contexts/overlayContext";
import { useDesign } from "../contexts/designContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function useOrder() {
  const context = useOrderContext();
  const { toast, showSheet, hideSheet } = useOverlay();
  const theme = useTheme();
  const tokens = useDesign();

  const OrderSheet = ({ item, onConfirm }: { item: any; onConfirm: (q: number, r: string) => void }) => {
    const [qty, setQty] = useState(1);
    const [remarks, setRemarks] = useState("");

    return (
      <View style={{ gap: tokens.spacing.xl, paddingBottom: tokens.spacing.xl, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', gap: tokens.spacing.sm }}>
          <View 
            style={{ 
              width: 80, 
              height: 80, 
              borderRadius: tokens.radii.xl, 
              backgroundColor: item.color + '15',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: tokens.spacing.xs
            }}
          >
            <MaterialCommunityIcons name={item.icon} size={44} color={item.color} />
          </View>
          <Text variant="headlineSmall" style={{ fontWeight: '900', textAlign: 'center' }}>{item.name}</Text>
          <Text variant="titleLarge" style={{ color: theme.colors.primary, fontWeight: '800' }}>{item.formattedPrice}</Text>
        </View>

        <View style={{ width: '100%', alignItems: 'center', gap: tokens.spacing.md }}>
          <Text variant="labelLarge" style={{ fontWeight: '800', color: theme.colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 }}>Select Quantity</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xl }}>
            <IconButton 
              icon="minus" 
              mode="contained-tonal"
              size={28}
              onPress={() => setQty(Math.max(1, qty - 1))} 
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            />
            <View style={{ minWidth: 60, alignItems: 'center' }}>
              <Text variant="displaySmall" style={{ fontWeight: '900' }}>{qty}</Text>
            </View>
            <IconButton 
              icon="plus" 
              mode="contained"
              size={28}
              onPress={() => setQty(qty + 1)} 
            />
          </View>
        </View>

        <View style={{ width: '100%', gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: '700', marginLeft: 4 }}>Special Remarks</Text>
          <TextInput
            placeholder="e.g. No spicy, extra gravy..."
            value={remarks}
            onChangeText={setRemarks}
            mode="outlined"
            multiline
            numberOfLines={3}
            outlineStyle={{ borderRadius: tokens.radii.lg }}
            style={{ backgroundColor: theme.colors.surface }}
          />
        </View>

        <Button 
          mode="contained" 
          contentStyle={{ height: 64 }}
          style={{ width: '100%', borderRadius: tokens.radii.xl, marginTop: tokens.spacing.sm }}
          onPress={() => onConfirm(qty, remarks)}
          labelStyle={{ fontSize: 18, fontWeight: '900' }}
        >
          {`ADD TO ORDER • RM ${(item.price * qty).toFixed(2)}`}
        </Button>
      </View>
    );
  };

  const addItemWithSheet = (item: any) => {
    showSheet({
      content: (
        <OrderSheet 
          item={item} 
          onConfirm={(quantity, remarks) => {
            context.addItem(item, quantity, remarks);
            hideSheet();
            toast({
              message: `Added ${quantity}x ${item.name} to order`,
              variant: "success",
            });
          }} 
        />
      )
    });
  };

  return {
    ...context,
    addItem: addItemWithSheet,
  };
}
