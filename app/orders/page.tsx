"use client";

import { motion } from "framer-motion";
import { Package, Calendar, ReceiptText } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Order } from "@/types";
import Loading from "@/components/loading";
import NoProducts from "@/components/no-product";

export default function OrdersPage() {
    // Use your real Supabase data here later
    // const orders = MOCK_ORDERS;
    const [data, setData] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/orders") // Ensure this matches your actual API route or local path
            .then((res) => {

                if (!res.ok) {
                    console.log("Network response was not ok", res);
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(({ data }) => {
                console.log(data)
                // Adjust this based on your JSON structure (e.g., fetchedData or fetchedData.data)
                setData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching products:", error);
                setIsLoading(false);
            });
    }, []);
    return (
        <section
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        >

            {isLoading ? <Loading /> :
                (<>{!data.length ? <NoProducts /> : <>
                    <header className="mb-8 px-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Orders</h1>
                        <p className="text-sm sm:text-base text-slate-500">Track your treats and order history</p>
                    </header>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        {data.length && data.map((order) => (
                            <motion.div
                                key={order.id}
                                whileTap={{ scale: 0.98 }} // Haptic feedback for mobile
                                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <div className="p-4 sm:p-6">
                                    {/* Header: ID and Status */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="hidden sm:block bg-slate-100 p-2 rounded-lg text-slate-600">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                                                <p className="font-mono text-xs sm:text-sm text-slate-700">{order.id}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-tight ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    {/* Items List: Clean & Scannable */}
                                    <div className="space-y-2 mb-4">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items Purchased</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                    <span className="text-xs font-bold text-red-400 mr-1.5">{item.quantity}x</span>
                                                    <span className="text-xs text-slate-600 truncate max-w-[120px] sm:max-w-none">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Date Info */}
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span className="text-xs">Ordered on {format(new Date(order.created_at), 'MMM dd, yyyy')}</span>
                                    </div>
                                </div>

                                {/* Bottom Bar: Total & View Link */}
                                <div className="bg-slate-50/50 border-t border-slate-100 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Paid</p>
                                        <p className="text-slate-900 font-extrabold text-base sm:text-lg">
                                            ${(order.total_amount_cents / 100).toFixed(2)}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-white border border-red-100 px-3 py-2 rounded-xl shadow-sm hover:bg-red-50 transition-colors active:bg-red-100"
                                    >
                                        <ReceiptText size={14} /> Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div></>
                }</>)}
        </section>
    );
}