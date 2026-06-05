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
      <View style={{ gap: tokens.spacing.lg, paddingBottom: tokens.spacing.xl }}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
          <View 
            style={{ 
              width: 60, 
              height: 60, 
              borderRadius: tokens.radii.lg, 
              backgroundColor: item.color + '20',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" style={{ fontWeight: '900' }}>{item.name}</Text>
            <Text variant="titleMedium" style={{ color: theme.colors.primary, fontWeight: '700' }}>{item.formattedPrice}</Text>
          </View>
        </View>

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: '700' }}>Quantity</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xl }}>
            <IconButton 
              icon="minus" 
              mode="contained-tonal"
              onPress={() => setQty(Math.max(1, qty - 1))} 
            />
            <Text variant="headlineSmall" style={{ fontWeight: '900', minWidth: 40, textAlign: 'center' }}>{qty}</Text>
            <IconButton 
              icon="plus" 
              mode="contained"
              onPress={() => setQty(qty + 1)} 
            />
          </View>
        </View>

        <View style={{ gap: tokens.spacing.sm }}>
          <Text variant="labelLarge" style={{ fontWeight: '700' }}>Special Remarks</Text>
          <TextInput
            placeholder="e.g. No spicy, extra gravy..."
            value={remarks}
            onChangeText={setRemarks}
            mode="outlined"
            multiline
            numberOfLines={3}
            outlineStyle={{ borderRadius: tokens.radii.lg }}
          />
        </View>

        <Button 
          mode="contained" 
          contentStyle={{ height: 56 }}
          style={{ borderRadius: tokens.radii.lg, marginTop: tokens.spacing.md }}
          onPress={() => onConfirm(qty, remarks)}
        >
          {`ADD TO ORDER • RM ${(item.price * qty).toFixed(2)}`}
        </Button>
      </View>
    );
  };

  const addItemWithSheet = (item: any) => {
    showSheet({
      title: "Customize Order",
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
