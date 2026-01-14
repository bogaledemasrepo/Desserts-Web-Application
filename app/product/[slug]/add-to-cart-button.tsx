"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { QuantitySelector } from "@/app/product/[slug]/quantity-selector";
import { TrustBadges } from "@/app/product/[slug]/trust-badges";
import { useCart } from "@/hooks/cart-context";

/** * Type Definitions for Product Variants 
 */
type Variant = {
    id: string;
    price: string;
    images: string[];
    combinations: {
        variantValue: {
            id: string;
            value: string;
            colorValue: string | null;
            variantType: {
                id: string;
                type: "string" | "color";
                label: string;
            };
        };
    }[];
};

type AddToCartButtonProps = {
    variants: Variant[];
    product: {
        id: string;
        name: string;
        slug: string;
        images: string[];
    };
};

/**
 * Professional Currency Formatter
 */
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

export function AddToCartButton({ variants, product }: AddToCartButtonProps) {
    const searchParams = useSearchParams();
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    /**
     * Logic to determine which variant is currently selected based on URL params
     */
    const selectedVariant = useMemo(() => {
        if (variants.length === 1) return variants[0];
        if (searchParams.size === 0) return undefined;

        const paramsOptions: Record<string, string> = {};
        searchParams.forEach((valueName, key) => {
            paramsOptions[key] = valueName;
        });

        return variants.find((variant) =>
            variant.combinations.every(
                (combination) =>
                    paramsOptions[combination.variantValue.variantType.label] === combination.variantValue.value,
            ),
        );
    }, [variants, searchParams]);

    // Total price calculation using standard numbers
    const totalLinePrice = selectedVariant 
        ? parseFloat(selectedVariant.price) * quantity 
        : 0;

    /**
     * Handles the client-side add to cart event
     */
    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedVariant) return;

        // Perform instant client-side update
        addItem({
            id: selectedVariant.id,
            name: `${product.name} ${variants.length > 1 ? `(${selectedVariant.combinations.map(c => c.variantValue.value).join(" / ")})` : ""}`,
            price: parseFloat(selectedVariant.price),
            image: selectedVariant.images[0] || product.images[0],
        });

        // Reset local quantity state
        setQuantity(1);
    };

    return (
        <div className="space-y-8">
            {/* Quantity selection UI */}
            <QuantitySelector 
                quantity={quantity} 
                onQuantityChange={setQuantity} 
            />

            <form onSubmit={handleAddToCart}>
                <button
                    type="submit"
                    disabled={!selectedVariant}
                    className="w-full h-14 bg-slate-900 text-white py-4 px-8 rounded-full text-base font-semibold tracking-wide hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                    {!selectedVariant ? (
                        "Select Options"
                    ) : (
                        <span className="flex items-center justify-between px-2">
                            <span>Add to Cart</span>
                            <span className="h-4 w-px bg-white/20 mx-4" />
                            <span>{formatCurrency(totalLinePrice)}</span>
                        </span>
                    )}
                </button>
            </form>

            <TrustBadges />
        </div>
    );
}