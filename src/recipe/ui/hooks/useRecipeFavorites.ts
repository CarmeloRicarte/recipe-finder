import { useCallback, useEffect, useState } from "react";
import { recipeUseCases } from "../../application/useCases";
import type { Recipe } from "../../domain/models";

export function useRecipeFavorites() {
	const [favorites, setFavorites] = useState<Recipe[]>([]);

	useEffect(() => {
		const loadFavorites = async () => {
			const favorites = await recipeUseCases.getFavoriteRecipes.execute();
			setFavorites(favorites);
		};
		loadFavorites();
	}, []);

	/**
	 * Adds a recipe to favorites
	 * @param recipe - The recipe to be added to favorites
	 */
	const addFavorite = useCallback(async (recipe: Recipe) => {
		await recipeUseCases.addFavoriteRecipe.execute(recipe);
		setFavorites((currentFavorites) => [...currentFavorites, recipe]);
	}, []);

	/**
	 * Removes a recipe from favorites
	 * @param recipeId - The ID of the recipe to be removed from favorites
	 */
	const removeFavorite = useCallback(async (recipeId: string) => {
		await recipeUseCases.removeFavoriteRecipe.execute(recipeId);
		setFavorites((currentFavorites) => currentFavorites.filter((recipe) => recipe.id !== recipeId));
	}, []);

	/**
	 * Checks if a recipe is marked as favorite
	 * @param recipeId - The ID of the recipe to check
	 * @returns boolean indicating if the recipe is in favorites
	 */
	const isFavorite = useCallback(
		(recipeId: string) => {
			return favorites.some((recipe) => recipe.id === recipeId);
		},
		[favorites],
	);

	return {
		favorites,
		addFavorite,
		removeFavorite,
		isFavorite,
	};
}
