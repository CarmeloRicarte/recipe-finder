import type { Recipe, RecipeSearchFilters, RecipeSearchResult } from "../models";

export interface RecipeRepository {
	/**
	 * Search recipes based on filters and pagination
	 * @param filters - Search filters to apply
	 * @param page - Page number for pagination
	 * @returns Promise containing search results
	 */
	searchRecipes(filters: RecipeSearchFilters, page: number): Promise<RecipeSearchResult>;

	/**
	 * Retrieves a specific recipe by its unique identifier
	 * @param id - The unique identifier of the recipe
	 * @returns Promise containing the recipe details
	 */
	getRecipeById(id: string): Promise<Recipe>;

	/**
	 * Fetches a specified number of random recipes
	 * @param number - The number of random recipes to retrieve
	 * @returns Promise containing an array of random recipes
	 */
	getRandomRecipes(number: number): Promise<Recipe[]>;
}

export interface FavoriteRecipeRepository {
	/**
	 * Retrieves all recipes marked as favorites
	 * @returns Promise containing an array of favorite recipes
	 */
	getFavoriteRecipes(): Promise<Recipe[]>;

	/**
	 * Retrieves a specific recipe from the favorites collection by its ID
	 * @param recipeId - The unique identifier of the favorite recipe to retrieve
	 * @returns Promise containing the favorite recipe details
	 */
	getFavoriteRecipe(recipeId: string): Promise<Recipe>;

	/**
	 * Saves a recipe to the favorites collection
	 * @param recipe - The recipe object to be added to favorites
	 * @returns Promise that resolves when the recipe is added
	 */
	addFavoriteRecipe(recipe: Recipe): Promise<void>;

	/**
	 * Removes a recipe from the favorites collection
	 * @param recipeId - The ID of the recipe to be removed
	 * @returns Promise that resolves when the recipe is removed
	 */
	removeFavoriteRecipe(recipeId: string): Promise<void>;

	/**
	 * Checks whether a recipe exists in the favorites collection
	 * @param recipeId - The ID of the recipe to check
	 * @returns Promise containing a boolean indicating if the recipe is a favorite
	 */
	isFavoriteRecipe(recipeId: string): Promise<boolean>;
}
