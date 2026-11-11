"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // menuItemId
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  notes?: string;
  isVeg: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number, notes?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedTable: number | null;
  setSelectedTable: (tableNum: number | null) => void;
  orderType: "DINE_IN" | "TAKEAWAY";
  setOrderType: (type: "DINE_IN" | "TAKEAWAY") => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [orderType, setOrderType] = useState<"DINE_IN" | "TAKEAWAY">("DINE_IN");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("dinedesk_cart");
      const savedTable = localStorage.getItem("dinedesk_table");
      const savedType = localStorage.getItem("dinedesk_order_type");
      if (savedCart) setItems(JSON.parse(savedCart));
      if (savedTable) setSelectedTable(Number(savedTable));
      if (savedType === "DINE_IN" || savedType === "TAKEAWAY") setOrderType(savedType);
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("dinedesk_cart", JSON.stringify(items));
      if (selectedTable !== null) {
        localStorage.setItem("dinedesk_table", String(selectedTable));
      } else {
        localStorage.removeItem("dinedesk_table");
      }
      localStorage.setItem("dinedesk_order_type", orderType);
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, selectedTable, orderType, isLoaded]);

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1, notes = "") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity, notes: notes || i.notes }
            : i
        );
      }
      return [...prev, { ...item, quantity, notes }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const updateNotes = (id: string, notes: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, notes } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("dinedesk_cart");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST / tax
  const grandTotal = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        totalItems,
        subtotal,
        tax,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        selectedTable,
        setSelectedTable,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

