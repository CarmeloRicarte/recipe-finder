/**
 * Get Favorite Recipe Use Case
 * Handles the business logic for fetching favorite recipe
 */

import type { Recipe } from "../../domain/models";
import type { FavoriteRecipeRepository } from "../../domain/repositories";

export class GetFavoriteRecipeUseCase {
	constructor(private readonly favoriteRecipeRepository: FavoriteRecipeRepository) {}

	/**
	 * Execute the get favorite recipe use case
	 * @param recipeId - The ID of the recipe to be fetched
	 * @returns Promise containing an array of favorite recipes
	 */
	async execute(recipeId: string): Promise<Recipe> {
		return this.favoriteRecipeRepository.getFavoriteRecipe(recipeId);
	}
}
