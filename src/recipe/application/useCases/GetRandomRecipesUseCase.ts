/**
 * Get Random Recipes Use Case
 * Handles the business logic for fetching random recipes
 */

import type { Recipe } from "../../domain/models";
import type { RecipeRepository } from "../../domain/repositories";

export class GetRandomRecipesUseCase {
	constructor(private readonly recipeRepository: RecipeRepository) {}

	/**
	 * Execute the get random recipes use case
	 * @param number Number of random recipes to get
	 */
	async execute(number = 10): Promise<Recipe[]> {
		return this.recipeRepository.getRandomRecipes(number);
	}
}
