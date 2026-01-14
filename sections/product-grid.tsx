// import type { APICollectionGetByIdResult, APIProductsBrowseResult } from "commerce-kit";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Product = {
    id: number;
    primaryImage: null;
    secondaryImage: null;
    name: string;
    price: number;
    slug: string;
};

type ProductGridProps = {
	title?: string;
	description?: string;
	products?: (Product)[];
	limit?: number;
	showViewAll?: boolean;
	viewAllHref?: string;
};

export async function ProductGrid({
	title = "Featured Products",
	description = "Handpicked favorites from our collection",
	products,
	limit = 6,
	showViewAll = true,
	viewAllHref = "/products",
}: ProductGridProps) {

	const displayProducts = products ? products.slice(0, limit) : [];									

	return (
		<section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
			<div className="flex items-end justify-between mb-12">
				<div>
					<h2 className="text-2xl sm:text-3xl font-medium text-foreground">{title}</h2>
					<p className="mt-2 text-muted-foreground">{description}</p>
				</div>
				{showViewAll && (
					<Link
						href={viewAllHref}
						className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						View all
						<ArrowRight className="h-4 w-4" />
					</Link>
				)}
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{displayProducts.map((product) => {
					const variants = "variants" in product ? product.variants : null;
						// const prices = variants?.map((v) => BigInt(v.price));
						// const minPrice = prices
						// 	? prices.length > 0
						// 		? prices.reduce((a, b) => (a < b ? a : b))
						// 		: null
						// 	: null;
						// const maxPrice = prices
						// 	? prices.length > 0
						// 		? prices.reduce((a, b) => (a > b ? a : b))
						// 		: null
						// 	: null;

						// const priceDisplay =
						// 	prices && prices.length > 1 && minPrice && maxPrice && minPrice !== maxPrice
						// 		? `${formatMoney({ amount: minPrice, currency: CURRENCY, locale: LOCALE })} - ${formatMoney({ amount: maxPrice, currency: CURRENCY, locale: LOCALE })}`
						// 		: minPrice
						// 			? formatMoney({ amount: minPrice, currency: CURRENCY, locale: LOCALE })
						// 			: null;

						// const allImages = [
						// 	...(product.images ?? []),
						// 	...(variants
						// 		?.flatMap((v) => v.images ?? [])
						// 		.filter((img) => !(product.images ?? []).includes(img)) ?? []),
						// ];
						// const primaryImage = allImages[0];
						// const secondaryImage = allImages[1];

					return (
						<Link key={product.id} href={`/product/${product.slug}`} className="group border border-gray-300 rounded-xl p-4">
							<div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden mb-4">
								{product.primaryImage && (
									<Image
										src={product.primaryImage}
										alt={product.name}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover transition-opacity duration-500 group-hover:opacity-0"
									/>
								)}
								{product.secondaryImage && (
									<Image
										src={product.secondaryImage}
										alt={`${product.name} - alternate view`}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
									/>
								)}
							</div>
							<div className="space-y-1">
								<h3 className="text-base font-medium text-foreground">{product.name}</h3>
								<p className="text-base font-semibold text-foreground">$ {product.price}</p>
							</div>
						</Link>
					);
				})}
			</div>

			{showViewAll && (
				<div className="mt-12 text-center sm:hidden">
					<Link
						href={viewAllHref}
						className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						View all products
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			)}
		</section>
	);
}
