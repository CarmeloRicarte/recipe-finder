/**
 * Get Favorite Recipes Use Case
 * Handles the business logic for fetching favorite recipes
 */

import type { Recipe } from "../../domain/models";
import type { FavoriteRecipeRepository } from "../../domain/repositories";

export class GetFavoriteRecipesUseCase {
	constructor(private readonly favoriteRecipeRepository: FavoriteRecipeRepository) {}

	/**
	 * Execute the get favorite recipes use case
	 */
	async execute(): Promise<Recipe[]> {
		return this.favoriteRecipeRepository.getFavoriteRecipes();
	}
}
