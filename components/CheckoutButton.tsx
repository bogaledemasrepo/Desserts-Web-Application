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
        throw new Error("Failed to create checkout session");
      }

      const { url } = (await response.json()) as any;

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url; // Redirect the user to the Stripe checkout page
      } else {
        console.error("No session URL returned from API.");
      }
    } catch (error: any) {
      console.error("Error during checkout:", error.message);
      alert(`Error: ${error.message}`);
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
