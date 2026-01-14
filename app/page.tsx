import { Hero } from "@/sections/hero";
import { ProductGrid } from "@/sections/product-grid";
import { Suspense } from "react";

function ProductGridSkeleton() {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
			<div className="flex items-end justify-between mb-12">
				<div>
					<div className="h-8 w-48 bg-secondary rounded animate-pulse" />
					<div className="mt-2 h-5 w-64 bg-secondary rounded animate-pulse" />
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={`skeleton-${i}`}>
						<div className="aspect-square bg-secondary rounded-2xl mb-4 animate-pulse" />
						<div className="space-y-2">
							<div className="h-5 w-3/4 bg-secondary rounded animate-pulse" />
							<div className="h-5 w-1/4 bg-secondary rounded animate-pulse" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default function Home() {
	return (
		<main>
			<Hero />
			<Suspense fallback={<ProductGridSkeleton />}>
				<ProductGrid title="Featured Products" limit={6} />
			</Suspense>
		</main>
	);
}

// import Item from "@/components/Item";
// import data from "@/data";

// export default function Home() {
//   return (
//     <div className="flex flex-col min-[670px]:flex-row gap-16">
//       <div className="flex-1 grow grid w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 overflow-y-scroll">

//       </div>
//     </div>
//   );
// }
