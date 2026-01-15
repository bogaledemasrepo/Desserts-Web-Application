"use client";

import { Product } from "@/types";
import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Define the shape of the context
interface DessertContextType {
    data: Product[];
    isLoading: boolean; // Added for better UX
}

// 2. Initialize context with 'undefined' to enforce Provider usage
const DessertsContext = createContext<DessertContextType | undefined>(undefined);

export function DessertsProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/desserts") // Ensure this matches your actual API route or local path
            .then((res) => {
                if (!res.ok) {
					console.log("Network response was not ok", res);
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(({data}) => {
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
        <DessertsContext.Provider value={{ data, isLoading }}>
            {children}
        </DessertsContext.Provider>
    );
}

// 3. Custom hook for consuming the context
export function useDesserts() {
    const context = useContext(DessertsContext);
    if (context === undefined) {
        throw new Error("useDesserts must be used within a DessertsProvider");
    }
    return context;
}