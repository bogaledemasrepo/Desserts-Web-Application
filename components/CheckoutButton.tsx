// components/CheckoutButton.tsx
"use client"; // This marks it as a Client Component

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutButtonProps {
  products: Product[];
}

export default function CheckoutButton({ products }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Call your API Route to create a checkout session
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: products }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Failed to create checkout session");
      }

      /** * Defines the expected shape of our API response.
       * This removes the need for 'as any'.
       */
      interface CheckoutResponse {
        url: string;
      }

      // ... inside your function ...

      const data = (await response.json()) as CheckoutResponse;
      const { url } = data;

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url; // Redirect the user to the Stripe checkout page
      } else {
        console.error("No session URL returned from API.");
      }
    } catch (error: unknown) {
      /**
       * In TypeScript, 'unknown' is safer than 'any'.
       * We check if it's a real Error object before accessing .message
       */
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("CHECKOUT_ERROR:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}
