"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { CartItem } from "./cart-item";
import { useCart } from "@/hooks/cart-context";
import { useState } from "react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function CartSidebar() {
  const {
    isOpen,
    closeCart,
    cart,
    clearCart
  } = useCart();

  const { items, itemCount, subtotal } = cart;
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, quantity: i.quantity })),
          customer_email: 'user@example.com', // Get this from Supabase Auth
        }),
      });
   
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-0 gap-0">

        {/* Header Section */}
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-xl font-serif">
              Your Sweets
              {itemCount > 0 && (
                <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 border-2 border-dashed border-slate-200">
              <ShoppingBag className="h-10 w-10 text-slate-300" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-lg font-medium text-slate-900">Your cart is empty</p>
              <p className="text-sm text-slate-500">
                Treat yourself to something delicious!
              </p>
            </div>
            <Button
              variant="outline"
              onClick={closeCart}
              className="mt-2 rounded-full px-8"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="divide-y divide-slate-100 px-6">
                {items.map((item) => (
                  // Pass the refined item structure to CartItem component
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            {/* Footer Section */}
            <SheetFooter className="border-t bg-slate-50/50 p-6">
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-slate-600 font-medium">Subtotal</span>
                    <span className="font-bold text-slate-900 text-lg">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Shipping & Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full h-12 text-base font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 transition-all shadow-md">
                    <Link href={"#"} onClick={onCheckout}>
                      {loading ? 'Processing...' : 'Confirm Order'}
                    </Link>
                  </Button>
                  {/* <Button  onClick={onCheckout} disabled={loading} asChild className="w-full h-14 text-base font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 transition-all shadow-md">{loading ? 'Processing...' : 'Checkout Now'}</Button> */}
                
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={closeCart}
                      className="flex-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-2"
                    >
                      Keep Shopping
                    </button>
                    <div className="w-px h-4 bg-slate-200" />
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Clear all items from your cart?")) clearCart();
                      }}
                      className="flex-1 text-sm font-medium text-red-400 hover:text-red-600 transition-colors py-2"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}