"use client";
import { useCart } from "@/hooks/cart-context";
import { Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function GridCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addItem({
      id: product.id,
      name: product.name,
      price_cents: product.price_cents,
      image: product.thumbnail_url,
    });
  };
  return (
    <Link
      key={product.id}
      href={`/detail/${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border border-gray-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:border-transparent bg-white"
    >
      <div className="relative aspect-square bg-secondary rounded-xl overflow-hidden mb-4">
        {product.thumbnail_url && (
          <>
            <Image
              src={product.thumbnail_url}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* If you have an actual alternate image, swap product.image.thumbnail for it here */}
            <Image
              src={product.thumbnail_url}
              alt={`${product.name} - alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-20"
            />
          </>
        )}

        {/* Framer Motion Overlay Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-x-0 bottom-4 px-4 z-20"
            >
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-red-400 backdrop-blur-sm rounded-lg shadow-xl flex items-center justify-center gap-2 font-semibold text-sm text-white transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile-only Quick Add Button (Visible only on small screens) */}
        <button
          onClick={handleAddToCart}
          className="lg:hidden absolute top-2 right-2 z-30 bg-white/90 p-2 rounded-full shadow-md active:scale-90 transition-transform"
        >
          <ShoppingCart className="h-5 w-5 text-red-400" />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-medium text-slate-800 tracking-tight">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-slate-900">
          ${product.price_cents / 100}
        </p>
      </div>
    </Link>
  );
}

export default GridCard