"use client";
import data from "@/data";
import { createContext, ReactNode, useState } from "react";

export const ApiContext = createContext({
  paymentStatus: "",
  setPaymentStatus: (value: string): void => {},
  myCart: [{ name: "", quantity: 1 }],
  getPrice: (val: string, quantity: number): number => 1,
  addItem: (name: string): void => {},
  removeItem: (name?: string): void => {},
  minimaiseQuantity: (name: string): void => {},
  maximaiseQuantity: (name: string): void => {},
  isInCartChecker: (val: string): number => 1,
});

const ApiContextProvider = ({ children }: { children: ReactNode }) => {
  const dd: { name: string; quantity: number }[] = [];
  const [cartData, setCartData] = useState(dd);
  const [paymentStatus, setPaymentStatus] = useState("");
  const addItem = (name: string) => {
    const ItemToAdd = data.find((Item) => Item.name === name);
    if (ItemToAdd) {
      setCartData((prevState) => {
        return [...prevState, { name: name, quantity: 1 }];
      });
    }
  };
  const removeItem = (name?: string) => {
    if (!name) {
      setCartData([]);
    }
    setCartData((prevState) => {
      return [...prevState.filter((Item) => Item.name !== name)];
    });
  };
  const isInCartChecker = (name: string) => {
    return cartData.find((Item) => Item.name === name)?.quantity || 0;
  };

  const getPrice = (name: string, quantity: number) => {
    return data.find((Item) => Item.name === name)?.price || 0 * quantity;
  };
  const minimaiseQuantity = (name: String) => {
    const itemTomini = cartData.find((Item) => Item.name === name);
    if (!itemTomini) {
      return;
    }
    if (itemTomini?.quantity === 1) {
      removeItem(itemTomini.name);
      return;
    }
    setCartData((prevState) => {
      const unmuteted = prevState.filter(
        (Item) => Item.name !== itemTomini.name
      );
      return [
        ...unmuteted,
        { name: itemTomini.name, quantity: itemTomini.quantity - 1 },
      ];
    });
  };
  const maximaiseQuantity = (name: String) => {
    const itemTomini = cartData.find((Item) => Item.name === name);
    if (itemTomini) {
      setCartData((prevState) => {
        const unmuteted = prevState.filter(
          (Item) => Item.name !== itemTomini.name
        );
        return [
          ...unmuteted,
          { name: itemTomini.name, quantity: itemTomini.quantity + 1 },
        ];
      });
    }
  };
  return (
    <ApiContext.Provider
      value={{
        paymentStatus,
        setPaymentStatus,
        myCart: cartData,
        addItem,
        getPrice,
        removeItem,
        minimaiseQuantity,
        maximaiseQuantity,
        isInCartChecker,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
