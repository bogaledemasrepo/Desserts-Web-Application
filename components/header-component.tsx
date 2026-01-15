"use client"
import { useAuth } from "@/hooks/auth-context";
import Link from "next/link";
import { Button } from "./ui/button";
const navbarLink = [{
	id: 12,
	slug: "orders",
	name: "Orders"
}]
export function Navbar() {
	const {user,signOut}=useAuth();
	if (navbarLink.length === 0) {
		return null;
	}
	const handleLogout =()=>{
		signOut();
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
					href={`${collection.slug}`}
					className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
				>
					{collection.name}
				</Link>
			))}
			{user && <Link
				href="/login"
				className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
			>
				Login
			</Link>
			}
			{!user && <Button variant={"link"} onClick={handleLogout} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
				Logout
			</Button>
			}
		</nav>
	);
}
