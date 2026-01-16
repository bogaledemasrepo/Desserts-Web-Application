"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function NoProducts() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="bg-slate-50 p-8 rounded-full mb-8"
      >
        <UtensilsCrossed className="w-16 h-16 text-slate-300" />
      </motion.div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Our Kitchen is Quiet Right Now
      </h2>
      <p className="text-slate-500 max-w-sm mb-10">
        We couldn&apos;t find any desserts matching your selection. Try adjusting your filters or checking back later for fresh batches!
      </p>

      <Link 
        href="/"
        className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-all active:scale-95"
      >
        <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        Explore All Desserts
      </Link>
    </motion.div>
  );
}