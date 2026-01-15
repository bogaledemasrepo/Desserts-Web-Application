"use client";

import { motion } from "framer-motion";
import { XCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center max-w-md"
      >
        <motion.div
          animate={{ x: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-red-100 p-4 rounded-full mb-6"
        >
          <XCircle className="w-16 h-16 text-red-600" />
        </motion.div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Cancelled</h1>
        <p className="text-slate-600 mb-8">
          No worries! Your cart is still saved. You can try again whenever you&apos;re ready.
        </p>

        <Link 
          href="/cart"
          className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" /> Return to Cart
        </Link>
      </motion.div>
    </div>
  );
}