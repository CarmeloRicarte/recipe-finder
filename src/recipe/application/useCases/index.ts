/**
 * Recipe Use Cases
 * Exports all recipe-related use cases and factory
 */

import { spoonacularRecipeRepository } from "../../infrastructure/repositories/spoonacularRecipeRepository";
import { GetRandomRecipesUseCase } from "./getRandomRecipes";
import { GetRecipeDetailsUseCase } from "./getRecipeDetails";
import { SearchRecipesUseCase } from "./searchRecipes";

// Create use case instances with the Spoonacular repository
export const recipeUseCases = {
	searchRecipes: new SearchRecipesUseCase(spoonacularRecipeRepository),
	getRecipeDetails: new GetRecipeDetailsUseCase(spoonacularRecipeRepository),
	getRandomRecipes: new GetRandomRecipesUseCase(spoonacularRecipeRepository),
};

// Export use case classes for testing or different implementations
export { SearchRecipesUseCase } from "./searchRecipes";
export { GetRecipeDetailsUseCase } from "./getRecipeDetails";
export { GetRandomRecipesUseCase } from "./getRandomRecipes";
