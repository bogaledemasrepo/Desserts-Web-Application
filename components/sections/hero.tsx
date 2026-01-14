"use client";

import { ArrowRight, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-full flex items-center overflow-hidden bg-[#fafaf9]">
      {/* Background soft glow - emphasizes the "sweet" theme */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-pink-50/50 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-medium mb-6">
              <UtensilsCrossed className="h-4 w-4" />
              <span>Handcrafted Daily in Small Batches</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-slate-900 leading-[1.1]">
              Artisanal sweets for{" "}
              <span className="text-pink-600 italic">life&apos;s finest</span>{" "}
              moments.
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              Experience the perfect balance of flavor and artistry. From
              melt-in-your-mouth macarons to decadent signature cakes, delivered
              fresh to your door.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="#menu"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-slate-900 text-white rounded-full text-md font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Order Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#gifting"
                className="inline-flex items-center justify-center h-14 px-10 border-2 border-slate-200 rounded-full text-md font-semibold text-slate-700 hover:bg-white hover:border-pink-200 transition-all"
              >
                Corporate Gifting
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  Natural
                </p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-900">Same Day</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Image Column - The "Hero" visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              {/* Replace src with your actual dessert photography */}
              <Image
                src="/assets/images/hero.jpg"
                alt="Signature Chocolate Tart"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          </div>
        </div>
      </div>
    </section>
  );
}
