"use client";

import { useCart } from "@/hooks/cart-context";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center max-w-md"
      >
        <motion.div
          initial={{ rotate: -45, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="bg-green-100 p-4 rounded-full mb-6"
        >
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Sweet Success!</h1>
        <p className="text-slate-600 mb-8">
          Your order has been placed. We&apos;re getting your desserts ready for delivery!
        </p>

        <Link
          href="/"
          className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}