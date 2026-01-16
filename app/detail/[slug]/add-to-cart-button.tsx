"use client";

import { useState } from "react";
import { QuantitySelector } from "@/app/product/[slug]/quantity-selector";
import { TrustBadges } from "@/app/product/[slug]/trust-badges";
import { useCart } from "@/hooks/cart-context";

/** * Type Definitions for Product Variants
 */
type Variant = {
  id: string;
  price: string;
  images: string[];
  combinations: {
    variantValue: {
      id: string;
      value: string;
      colorValue: string | null;
      variantType: {
        id: string;
        type: "string" | "color";
        label: string;
      };
    };
  }[];
};

type AddToCartButtonProps = {
  variants: Variant[];
  product: {
    id: string;
    name: string;
    slug: string;
    price_cents: number;
    images: string[];
  };
};

/**
 * Professional Currency Formatter
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform instant client-side update
    addItem({
      id: product.id,
      name: product.name,
      price_cents: product.price_cents, // Default price, adjust as needed
      image: product.images[0] || "",
    }, quantity);

    // Reset local quantity state
    setQuantity(1);
  };

  // Total price calculation using standard numbers
  const totalLinePrice =  quantity * product.price_cents; // Default price, adjust as needed
  return (
    <div className="space-y-8">
      {/* Quantity selection UI */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <form onSubmit={handleAddToCart}>
        <button
          type="submit"
          className="w-full h-14 bg-slate-900 text-white py-4 px-8 rounded-full text-base font-semibold tracking-wide hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          <span className="flex items-center justify-between px-2">
            <span>Add to Cart</span>
            <span className="h-4 w-px bg-white/20 mx-4" />
            <span>{formatCurrency(totalLinePrice)}</span>
          </span>
        </button>
      </form>

      <TrustBadges />
    </div>
  );
}
