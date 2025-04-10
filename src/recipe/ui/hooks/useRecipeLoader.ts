import { useEffect, useState } from "react";
import { recipeUseCases } from "../../application/useCases";
import type { Recipe } from "../../domain/models";
import { spoonacularRecipeRepository } from "../../infrastructure/repositories/spoonacularRecipeRepository";

export function useRecipeLoader(recipeId: string) {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadRecipe() {
			try {
				setIsLoading(true);
				const recipeData = await getRecipeData(recipeId);
				setRecipe(recipeData);
			} catch (error) {
				console.error("Error loading recipe:", error);
			} finally {
				setIsLoading(false);
			}
		}

		loadRecipe();
	}, [recipeId]);

	/**
	 * Retrieves recipe data by ID, checking favorites first then external API
	 * @param recipeId - The ID of the recipe to fetch
	 * @returns Promise containing the recipe data
	 */
	const getRecipeData = async (recipeId: string) => {
		const isRecipeInFavorites =
			recipeUseCases.isFavoriteRecipe.execute(recipeId);
		if (await isRecipeInFavorites) {
			return recipeUseCases.getFavoriteRecipe.execute(recipeId);
		}
		return await spoonacularRecipeRepository.getRecipeById(recipeId);
	};

	return { recipe, isLoading };
}
