"use client";

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useMemo, 
  useState, 
  useCallback 
} from "react";

/** * Type Definitions 
 */
export interface CartLineItem {
  id: string; // Product/Variant ID
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartLineItem[];
  itemCount: number;
  subtotal: number;
}

interface CartContextValue {
  cart: Cart;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Omit<CartLineItem, "quantity">) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

/**
 * Professional Cart Provider
 * Handles all logic locally using state and localStorage persistence.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("dessert_cart");
    if (savedCart) {
      try {
        function parseSavedCart(data: string) {
          setItems(JSON.parse(data));
        }

        parseSavedCart(savedCart);
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }finally {
		 setIsInitialized(true);
	  }
    }
   
  }, []);

  // 2. Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("dessert_cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  /**
   * Actions
   */
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Omit<CartLineItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true); // Open cart automatically when item added
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const incrementQuantity = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  /**
   * Derived State (Memoized for performance)
   */
  const cartValue = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      cart: { items, itemCount, subtotal },
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      clearCart,
    };
  }, [items, isOpen, openCart, closeCart, addItem, removeItem, incrementQuantity, decrementQuantity, clearCart]);

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to consume the Cart Context
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}