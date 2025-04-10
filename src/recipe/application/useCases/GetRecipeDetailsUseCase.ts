/**
 * Get Recipe Details Use Case
 * Handles the business logic for fetching recipe details
 */

import type { Recipe } from "../../domain/models";
import type { RecipeRepository } from "../../domain/repositories";

export class GetRecipeDetailsUseCase {
	constructor(private readonly recipeRepository: RecipeRepository) {}

	/**
	 * Execute the get recipe details use case
	 * @param id Recipe ID
	 */
	async execute(id: string): Promise<Recipe> {
		return this.recipeRepository.getRecipeById(id);
	}
}
