"use client";
import { useContext } from "react";
import Cartwrapper from "./Cartwrapper";
import EmptySvg from "@/public/assets/images/illustration-empty-cart.svg";
import CartItem from "./CartItem";
import CarbonSvg from "@/public/assets/images/icon-carbon-neutral.svg";
import ConfirmButton from "./ConfirmButton";
import { ApiContext } from "@/hooks/apiContext";
import data from "@/data";

const Cart = () => {
  const { myCart, getPrice } = useContext(ApiContext);
  let totalPrice = 0;
  myCart.forEach((Item) => {
    totalPrice = totalPrice + getPrice(Item.name, Item.quantity);
  });
  if (myCart.length === 0) {
    // Display No order message
    return (
      <Cartwrapper>
        <div className="flex flex-col items-center">
          <div className="w-full h-[200px] flex items-center justify-center">
            <EmptySvg />
          </div>
          <p className="text-slate-400">Your added items will appear hir!</p>
        </div>
      </Cartwrapper>
    );
  } else
    return (
      <Cartwrapper>
        <div>
          {myCart.map(({ name, quantity }) => {
            const Item = data.find((Item) => Item.name === name);
            if (Item) {
              return (
                <CartItem
                  key={Item.name}
                  name={Item.name}
                  price={Item.price}
                  quantity={quantity}
                />
              );
            } else return;
          })}
          <div className="w-full flex justify-between my-2">
            <p className="text-slate-500">Total Order</p>
            <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex space-x-4 my-6">
            <CarbonSvg />{" "}
            <p className="text-slate-400">
              This is{" "}
              <span className="text-slate-600 font-semibold">
                carbon neutral
              </span>{" "}
              delivery
            </p>
          </div>
          <ConfirmButton />
        </div>
      </Cartwrapper>
    );
};

export default Cart;
