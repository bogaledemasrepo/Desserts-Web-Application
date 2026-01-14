import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Suspense } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { CartSidebar } from "@/components/cart-sidebar";
import { CartProvider } from "@/hooks/cart-context";
import { Navbar } from "@/components/header-component";
import { CartButton } from "@/components/cart-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Dessert",
  description: "Your one-stop shop for delicious desserts delivered to your door.",
};

function CartButtonFallback() {
  return (
    <div className="p-2 rounded-full w-10 h-10" aria-description="Loading cart">
      <ShoppingCartIcon className="w-6 h-6 opacity-20" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex w-full items-center gap-8 justify-between">
                      <Link href="/" className="text-xl font-bold">
                        Smart Dessert
                      </Link>
                      <Navbar />
                      <Suspense fallback={<CartButtonFallback />}>
                        <CartButton />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </header>
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
            <CartSidebar />
          </CartProvider>
        </Suspense>
      </body>
    </html>
  );
}
