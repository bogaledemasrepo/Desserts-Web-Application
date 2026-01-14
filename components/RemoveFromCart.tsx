"use client";
import { useCart } from "@/hooks/cart-context";
import RemoveSvg from "@/public/assets/images/icon-remove-item.svg";
const RemoveFromCart = ({ id }: { id: string }) => {
  const { dispatch } = useCart();
  return (
    <button
      className="p-1 rounded-full border-2 border-slate-400 flex items-center justify-center hover:border-slate-600 text-slate-600 cursor-pointer transition-colors"
      onClick={() => dispatch({ type: "REMOVE", id: id })}
    >
      <RemoveSvg />
    </button>
  );
};

export default RemoveFromCart;
