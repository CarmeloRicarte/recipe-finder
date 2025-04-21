import { createLazyRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../../../core/ui/components/button";
import { RecipeCardFavorite } from "../components/RecipeCardFavorite";
import { useRecipeFavorites } from "../hooks/useRecipeFavorites";

export const FavoritesPageRoute = createLazyRoute("/favorites")({
	component: FavoritesPage,
});

export function FavoritesPage() {
	const { favorites, removeFavorite } = useRecipeFavorites();
	const navigate = useNavigate();

	const navigateToDetails = (recipeId: string) =>
		navigate({
			to: "/recipe/$recipeId",
			params: { recipeId },
			viewTransition: { types: ["slide-right"] },
		});

	const navigateToHome = () =>
		navigate({
			to: "/",
			viewTransition: { types: ["slide-left"] },
		});

	if (favorites.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-2xl font-semibold mb-4">You don't have any favorite recipes</h1>
				<p className="text-gray-500 mb-4">Explore our recipes and mark your favorites to find them here</p>
				<Button variant="link" className="w-full" onClick={navigateToHome}>
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
					<RecipeCardFavorite
						key={recipe.id}
						recipe={recipe}
						removeFavorite={removeFavorite}
						navigateToDetails={() => navigateToDetails(recipe.id)}
					/>
				))}
			</div>
		</div>
	);
}
