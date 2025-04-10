import { useEffect, useState } from "react";
import type { Recipe } from "../../domain/models";
import { spoonacularRecipeRepository } from "../../infrastructure/repositories/spoonacularRecipeRepository";

export function useRecipeLoader(recipeId: string) {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadRecipe() {
			try {
				setIsLoading(true);
				// TODO: check if exists in favorite for getting data from local storage
				const recipeData =
					await spoonacularRecipeRepository.getRecipeById(recipeId);
				setRecipe(recipeData);
			} catch (error) {
				console.error("Error loading recipe:", error);
			} finally {
				setIsLoading(false);
			}
		}

		loadRecipe();
	}, [recipeId]);

	return { recipe, isLoading };
}
