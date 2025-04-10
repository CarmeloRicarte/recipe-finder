/**
 * Recipe Use Cases
 * Exports all recipe-related use cases and factory
 */

import { localStorageFavoriteRecipeRepository } from "../../infrastructure/repositories/localStorageFavoriteRecipeRepository";
import { spoonacularRecipeRepository } from "../../infrastructure/repositories/spoonacularRecipeRepository";
import { AddFavoriteRecipeUseCase } from "./AddFavoriteRecipeUseCase";
import { GetFavoriteRecipesUseCase } from "./GetFavoriteRecipesUseCase";
import { GetRandomRecipesUseCase } from "./GetRandomRecipesUseCase";
import { GetRecipeDetailsUseCase } from "./GetRecipeDetailsUseCase";
import { IsFavoriteRecipeUseCase } from "./IsFavoriteRecipeUseCase";
import { RemoveFavoriteRecipeUseCase } from "./RemoveFavoriteRecipeUseCase";
import { SearchRecipesUseCase } from "./SearchRecipesUseCase";

export const recipeUseCases = {
	searchRecipes: new SearchRecipesUseCase(spoonacularRecipeRepository),
	getRecipeDetails: new GetRecipeDetailsUseCase(spoonacularRecipeRepository),
	getRandomRecipes: new GetRandomRecipesUseCase(spoonacularRecipeRepository),
	addFavoriteRecipe: new AddFavoriteRecipeUseCase(
		localStorageFavoriteRecipeRepository,
	),
	removeFavoriteRecipe: new RemoveFavoriteRecipeUseCase(
		localStorageFavoriteRecipeRepository,
	),
	getFavoriteRecipes: new GetFavoriteRecipesUseCase(
		localStorageFavoriteRecipeRepository,
	),
	isFavoriteRecipe: new IsFavoriteRecipeUseCase(
		localStorageFavoriteRecipeRepository,
	),
};

// Export use case classes for testing or different implementations
export { AddFavoriteRecipeUseCase } from "./AddFavoriteRecipeUseCase";
export { GetFavoriteRecipesUseCase } from "./GetFavoriteRecipesUseCase";
export { GetRandomRecipesUseCase } from "./GetRandomRecipesUseCase";
export { GetRecipeDetailsUseCase } from "./GetRecipeDetailsUseCase";
export { IsFavoriteRecipeUseCase } from "./IsFavoriteRecipeUseCase";
export { RemoveFavoriteRecipeUseCase } from "./RemoveFavoriteRecipeUseCase";
export { SearchRecipesUseCase } from "./SearchRecipesUseCase";
