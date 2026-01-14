import Link from "next/link";
const navbarLink = [{
    id:12,
    slug:"accessories",
    name:"Accessories"
}]
export async function Navbar() {
	if (navbarLink.length === 0) {
		return null;
	}

	return (
		<nav className="hidden sm:flex items-center gap-6">
			<Link
				href="/"
				className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
			>
				Home
			</Link>
			{navbarLink.map((collection) => (
				<Link
					key={collection.id}
					href={`/collection/${collection.slug}`}
					className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
				>
					{collection.name}
				</Link>
			))}
		</nav>
	);
}
