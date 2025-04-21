import { cn } from "@/core/ui/lib/utils";
import { Link, useMatch } from "@tanstack/react-router";
import { Heart, Search } from "lucide-react";

export const RecipeNavigationMenu = () => {
	const isSearchRouteActive = useMatch({ from: "/", shouldThrow: false });
	const isFavoritesRouteActive = useMatch({
		from: "/favorites",
		shouldThrow: false,
	});
	return (
		<nav className="container mx-auto py-2 space-y-8">
			<div className="flex space-x-8">
				<Link
					to="/"
					className={cn(
						"flex items-center gap-2 px-4 py-2 font-medium text-xl",
						"cursor-pointer",
						isSearchRouteActive && "underline underline-offset-8",
					)}
					viewTransition={{ types: ["slide-right"] }}
				>
					<Search className="h-5 w-5" />
					<span>Search</span>
				</Link>
				<Link
					to="/favorites"
					className={cn(
						"flex items-center gap-2 px-4 py-2 font-medium text-xl",
						"cursor-pointer",
						isFavoritesRouteActive && "underline underline-offset-8",
					)}
					viewTransition={{ types: ["slide-right"] }}
				>
					<Heart className="h-5 w-5" />
					<span>Favorites</span>
				</Link>
			</div>
		</nav>
	);
};
