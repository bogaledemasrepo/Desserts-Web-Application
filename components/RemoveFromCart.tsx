"use client";
import { ApiContext } from "@/hooks/apiContext";
import RemoveSvg from "@/public/assets/images/icon-remove-item.svg";
import { useContext } from "react";
const RemoveFromCart = ({ name }: { name: string }) => {
  const { removeItem } = useContext(ApiContext);
  return (
    <button
      className="p-1 rounded-full border-2 border-slate-400 flex items-center justify-center hover:border-slate-600 text-slate-600 cursor-pointer transition-colors"
      onClick={() => removeItem(name)}
    >
      <RemoveSvg />
    </button>
  );
};

export default RemoveFromCart;
