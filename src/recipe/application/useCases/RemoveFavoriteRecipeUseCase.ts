/**
 * Remove Favorite Recipe Use Case
 * Handles the business logic for removing a recipe from favorites
 */

import type { FavoriteRecipeRepository } from "../../domain/repositories";

export class RemoveFavoriteRecipeUseCase {
	constructor(
		private readonly favoriteRecipeRepository: FavoriteRecipeRepository,
	) {}

	/**
	 * Execute the remove favorite recipe use case
	 * @param recipeId The unique identifier of the recipe to be removed
	 */
	async execute(recipeId: string): Promise<void> {
		return this.favoriteRecipeRepository.removeFavoriteRecipe(recipeId);
	}
}
