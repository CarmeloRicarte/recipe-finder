/**
 * Add Favorite Recipe Use Case
 * Handles the business logic for adding a recipe to favorites
 */

import type { Recipe } from "../../domain/models";
import type { FavoriteRecipeRepository } from "../../domain/repositories";

export class AddFavoriteRecipeUseCase {
	constructor(private readonly favoriteRecipeRepository: FavoriteRecipeRepository) {}

	/**
	 * Execute the add favorite recipe use case
	 * @param recipe The Recipe object to be added to favorites
	 */
	async execute(recipe: Recipe): Promise<void> {
		return this.favoriteRecipeRepository.addFavoriteRecipe(recipe);
	}
}
