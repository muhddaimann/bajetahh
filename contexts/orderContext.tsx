import React, { createContext, useContext, useState, useMemo } from "react";
import { MenuItem } from "../constants/menu";

export type OrderItem = MenuItem & {
  cartId: string;
  quantity: number;
  remarks?: string;
};

type OrderContextType = {
  items: OrderItem[];
  addItem: (item: MenuItem, quantity?: number, remarks?: string) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearOrder: () => void;
  totalItems: number;
  totalPrice: number;
  formattedTotalPrice: string;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = (item: MenuItem, quantity: number = 1, remarks: string = "") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.remarks === remarks);
      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, cartId: `${item.id}-${Date.now()}`, quantity, remarks }];
    });
  };

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
    );
  };

  const clearOrder = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const formattedTotalPrice = useMemo(
    () => `RM ${totalPrice.toFixed(2)}`,
    [totalPrice]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearOrder,
    totalItems,
    totalPrice,
    formattedTotalPrice,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
}
