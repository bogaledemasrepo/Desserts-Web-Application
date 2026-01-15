"use client"
import { Suspense } from "react";
import { AddToCartButton } from "@/app/product/[slug]/add-to-cart-button";
import { ImageGallery } from "@/app/product/[slug]/image-gallery";
import { ProductFeatures } from "@/app/product/[slug]/product-features";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useDesserts } from "@/hooks/desserts-context";

function ProductDetailsSkeleton() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="lg:grid lg:grid-cols-2 lg:gap-16">
				<Skeleton className="aspect-square rounded-2xl" />
				<div className="mt-8 lg:mt-0 space-y-8">
					<div className="space-y-4">
						<Skeleton className="h-12 w-3/4" />
						<Skeleton className="h-8 w-1/4" />
						<Skeleton className="h-20 w-full" />
					</div>
					<Skeleton className="h-14 w-full rounded-full" />
				</div>
			</div>
		</div>
	);
}

export default function ProductPage() {
	
	const param = useParams() as { slug: string };
	const {data} = useDesserts();
	const product = data.find((item) => item.id === param.slug);

	if (!product) {
		return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Product not found.</div>;
	}

	return (
		<Suspense fallback={<ProductDetailsSkeleton />}>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="lg:grid lg:grid-cols-2 lg:gap-16">
				{/* Left: Image Gallery (sticky on desktop) */}
				{product.thumbnail_url && <ImageGallery images={[product.thumbnail_url]} productName={product.name} variants={[]} />}

				{/* Right: Product Details */}
				<div className="mt-8 lg:mt-0 space-y-8">
					{/* Title, Price, Description */}
					<div className="space-y-4">
						<h1 className="text-4xl font-medium tracking-tight text-foreground lg:text-5xl text-balance">
							{product.name}
						</h1>
						<p className="text-2xl font-semibold tracking-tight">$ {product.price_cents.toFixed(2)}</p>
						{product.description && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}
					</div>

					{/* Variant Selector, Quantity, Add to Cart, Trust Badges */}
					<AddToCartButton
						variants={[]}
						product={product}
					/>
				</div>
			</div>

			{/* Features Section (full width below) */}
			<ProductFeatures />
		</div>
		</Suspense>
	);
};
