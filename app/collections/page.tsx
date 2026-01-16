"use client"
import NoProducts from "@/components/no-product"
import { ProductGrid } from "@/components/sections/product-grid"
import { useDesserts } from "@/hooks/desserts-context"

function Page() {
    const {data}=useDesserts();
    return (
        <section
            id="products"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        >
            {!(data.length) ? <NoProducts /> : (<ProductGrid title="Explore Desserts on SmartD" showViewAll={false} products={data} />)}
        </section>
    )
}

export default Page
