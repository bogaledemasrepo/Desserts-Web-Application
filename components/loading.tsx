
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Branded Pulsing Logo */}
      <div className="flex flex-col items-center justify-center mb-16">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 bg-red-400 rounded-2xl shadow-lg mb-4 flex items-center justify-center text-white font-bold text-2xl"
        >
          D
        </motion.div>
        <div className="h-4 w-32 bg-slate-200 rounded-full animate-pulse" />
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-slate-100 rounded-2xl animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-100 rounded-full animate-pulse" />
            <div className="h-4 w-1/3 bg-slate-100 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}