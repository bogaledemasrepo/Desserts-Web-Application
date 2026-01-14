"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

interface PaymentIntentResponse {
  clientSecret: string;
}

const StripeElement = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetches the Payment Intent secret from the server on component mount.
   */
  useEffect(() => {
    async function getStripeSecret() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 1500 }), // Amount in cents
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment intent");
        }

        const data: PaymentIntentResponse = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("STREIPE_SECRET_FETCH_ERROR:", err);
        setErrorMessage("Could not initialize payment. Please try again.");
      }
    }

    getStripeSecret();
  }, []);

  /**
   * Handles the Stripe payment confirmation flow.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      // Confirm the payment
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        },
      });

      // This point is only reached if there is an immediate error
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      console.error("PAYMENT_CONFIRMATION_ERROR:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-[#f6f7f9] py-12 min-h-screen">
      <form className="w-full max-w-md flex flex-col gap-6 px-4" onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-slate-800">Checkout</h2>
          
          {clientSecret ? (
            <PaymentElement />
          ) : (
            <div className="w-full space-y-3">
              <div className="w-full bg-gray-100 h-12 animate-pulse rounded-md" />
              <div className="w-3/4 bg-gray-100 h-12 animate-pulse rounded-md" />
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded bg-red-50 text-xs text-red-600 border border-red-100">
              {errorMessage}
            </div>
          )}

          <button
            disabled={!stripe || !clientSecret || loading}
            className="group relative flex justify-center items-center px-4 py-3 w-full text-base font-medium bg-yellow-600 hover:bg-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-md"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $15.00`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeElement;