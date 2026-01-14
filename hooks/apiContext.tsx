"use client";

import data from "@/data";
import { createContext, ReactNode, useState, useMemo } from "react";

/** * Type definitions for Cart and Context 
 */
export interface CartItem {
  name: string;
  quantity: number;
}

interface CartContextType {
  paymentStatus: string;
  setPaymentStatus: (status: string) => void;
  cart: CartItem[];
  addItem: (name: string) => void;
  removeItem: (name?: string) => void;
  incrementQuantity: (name: string) => void;
  decrementQuantity: (name: string) => void;
  getItemQuantity: (name: string) => number;
  getTotalPrice: (name: string, quantity: number) => number;
}

export const ApiContext = createContext<CartContextType | undefined>(undefined);

const ApiContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  /**
   * Adds a new item to the cart if it exists in the source data.
   */
  const addItem = (name: string) => {
    const existsInSource = data.some((item) => item.name === name);
    const existsInCart = cart.some((item) => item.name === name);

    if (existsInSource && !existsInCart) {
      setCart((prev) => [...prev, { name, quantity: 1 }]);
    }
  };

  /**
   * Removes a specific item or clears the entire cart if no name is provided.
   */
  const removeItem = (name?: string) => {
    if (!name) {
      setCart([]);
      return;
    }
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  /**
   * Returns the current quantity of an item in the cart.
   */
  const getItemQuantity = (name: string): number => {
    return cart.find((item) => item.name === name)?.quantity || 0;
  };

  /**
   * Calculates total price for a specific item quantity.
   */
  const getTotalPrice = (name: string, quantity: number): number => {
    const item = data.find((i) => i.name === name);
    return item ? item.price * quantity : 0;
  };

  /**
   * Increases quantity of an existing item.
   */
  const incrementQuantity = (name: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /**
   * Decreases quantity. If quantity reaches 0, the item is removed.
   */
  const decrementQuantity = (name: string) => {
    setCart((prev) => {
      const targetItem = prev.find((item) => item.name === name);
      if (targetItem?.quantity === 1) {
        return prev.filter((item) => item.name !== name);
      }
      return prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // Memoizing value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    paymentStatus,
    setPaymentStatus,
    cart,
    addItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    getItemQuantity,
    getTotalPrice,
  }), [cart, paymentStatus]);

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;