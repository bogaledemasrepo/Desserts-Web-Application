"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartLineItem, useCart } from "@/hooks/cart-context";

interface CartItemProps {
  item: CartLineItem;
}

/**
 * Formats numbers into a clean currency string.
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function CartItem({ item }: CartItemProps) {
  const { 
    removeItem, 
    incrementQuantity, 
    decrementQuantity, 
    closeCart 
  } = useCart();

  // Calculate line total locally
  const lineTotal = item.price * item.quantity;

  return (
    <div className="group flex gap-4 py-6 transition-all">
      {/* Product Image Wrapper */}
      <Link
        href={`/product/${item.id}`} // Using ID or slug as per your routing
        onClick={closeCart}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="80px"
        />
      </Link>

      {/* Details Container */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <Link
              href={`/product/${item.id}`}
              onClick={closeCart}
              className="text-sm font-semibold leading-none text-slate-900 hover:text-pink-600 transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <p className="text-xs text-slate-500">
              {formatCurrency(item.price)} each
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-end justify-between">
          {/* Professional Quantity Selector */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => decrementQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            
            <span className="w-8 text-center text-sm font-medium tabular-nums text-slate-900">
              {item.quantity}
            </span>
            
            <button
              type="button"
              onClick={() => incrementQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Line Total */}
          <div className="text-right">
            <span className="text-sm font-bold text-slate-900">
              {formatCurrency(lineTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}