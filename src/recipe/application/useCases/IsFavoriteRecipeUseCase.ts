/**
 * Is Favorite Recipe Use Case
 * Handles the business logic for checking if a recipe is marked as favorite
 */

import type { FavoriteRecipeRepository } from "../../domain/repositories";

export class IsFavoriteRecipeUseCase {
	constructor(
		private readonly favoriteRecipeRepository: FavoriteRecipeRepository,
	) {}

	/**
	 * Execute the is favorite recipe use case
	 * @param recipeId The unique identifier of the recipe to check
	 */
	async execute(recipeId: string): Promise<boolean> {
		return this.favoriteRecipeRepository.isFavoriteRecipe(recipeId);
	}
}
