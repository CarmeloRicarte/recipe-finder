import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/core/ui/components/card";
import { createLazyRoute, useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "../../../core/ui/components/button";
import { useRecipeFavorites } from "../hooks/useRecipeFavorites";

export const FavoritesPageRoute = createLazyRoute("/favorites")({
	component: FavoritesPage,
});

export function FavoritesPage() {
	const { favorites, removeFavorite } = useRecipeFavorites();
	const navigate = useNavigate();

	if (favorites.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h2 className="text-2xl font-semibold mb-4">
					You don't have any favorite recipes
				</h2>
				<p className="text-gray-500 mb-4">
					Explore our recipes and mark your favorites to find them here
				</p>
				<Button
					variant="link"
					className="w-full"
					onClick={() =>
						navigate({
							to: "/",
							viewTransition: { types: ["slide-left"] },
						})
					}
				>
					Explore recipes
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-4">
			<h1 className="text-3xl font-bold mb-6">My Favorite Recipes</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{favorites.map((recipe) => (
					<Card key={recipe.id} className="py-6">
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-xl">{recipe.title}</CardTitle>
								<button
									type="button"
									onClick={() => removeFavorite(recipe.id)}
									className="p-2 hover:bg-gray-100 rounded-full transition-colors"
									title="Delete from favorites"
								>
									<Heart className="w-6 h-6 text-red-500 fill-current" />
								</button>
							</div>
							<CardDescription>
								<div className="flex gap-4 mt-2">
									<span>🕒 {recipe.readyInMinutes} minutes</span>
									<span>👥 {recipe.servings} servings</span>
								</div>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<img
								src={recipe.image}
								alt={recipe.title}
								className="w-full h-48 object-cover rounded-lg"
							/>
						</CardContent>
						<CardFooter>
							<Button
								variant="link"
								className="w-full"
								onClick={() =>
									navigate({
										to: "/recipe/$recipeId",
										params: { recipeId: recipe.id },
										viewTransition: { types: ["slide-right"] },
									})
								}
							>
								View details
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
