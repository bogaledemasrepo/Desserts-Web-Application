"use client";

import Image from "next/image";
import AddToCart from "./AddToCart";
import MiniButton from "./MiniButton";
import MaxiButton from "./MaxiButton";
import { useContext } from "react";
import { ApiContext } from "@/hooks/apiContext";

const Item = ({
  name,
  catagory,
  price,
  image,
}: {
  name: string;
  catagory: string;
  price: number;
  image: string;
}) => {
  const { isInCartChecker, addItem, maximaiseQuantity, minimaiseQuantity } =
    useContext(ApiContext);
  return (
    <div className="">
      <div className="relative rounded-lg ">
        <Image
          height={500}
          width={500}
          className="block w-full rounded-lg"
          src={image}
          alt={image}
        />
        {isInCartChecker(name) === 0 ? (
          <AddToCart
            addItemHandler={() => {
              addItem(name);
            }}
          />
        ) : (
          <div className="absolute px-8 py-3  w-fit -bottom-6 left-[50%] translate-x-[-50%] flex gap-8 items-center justify-center text-nowrap rounded-full bg-myred transition-colors">
            <MiniButton clickHandler={() => minimaiseQuantity(name)} />
            <span className="flex-1 text-white font-semibold text-nowrap">
              {isInCartChecker(name)}
            </span>
            <MaxiButton clickHandler={() => maximaiseQuantity(name)} />
          </div>
        )}
      </div>
      <div className="pt-8">
        <p className="text-slate-400">{name}</p>
        <h2 className="text-slate-950 font-bold">{catagory}</h2>
        <p className="text-myred font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Item;
