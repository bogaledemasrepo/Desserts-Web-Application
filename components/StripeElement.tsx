"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
interface Responce {
  clientSecret: string;
}
const StripeElement = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStripeSecrete() {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1500 }),
        }
      );
      if (responce.ok) {
        const data: Responce = await responce.json();
        const { clientSecret } = data;
        setClientSecret(clientSecret);
      }
      console.log(responce);
      console.log("INTERNAL SERVER ERROR");
    }
    getStripeSecrete();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!stripe || !elements) return;

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        },
      });
      setErrorMessage(error?.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center bg-[#f6f7f9] py-6 h-screen">
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
          {clientSecret ? (
            <PaymentElement />
          ) : (
            <div className="w-full bg-gray-200 h-10 animate-pulse"></div>
          )}
          {errorMessage && (
            <div className="text-xs text-red-600">{errorMessage}</div>
          )}

          <button
            disabled={!stripe || loading}
            className="px-4 py-2 w-fit text-sm md:text-base bg-yellow-600 hover:bg-yellow-800 transition-all disabled:opacity-50 text-white rounded-md"
          >
            {!loading ? `Pay $${15}` : "Processing..."}
          </button>
        </div>
      </form>
    </div>
  );
};
export default StripeElement;
