/**
 * Search Recipes Use Case
 * Handles the business logic for searching recipes
 */

import type { RecipeSearchFilters, RecipeSearchResult } from "../../domain/models";
import type { RecipeRepository } from "../../domain/repositories";

export class SearchRecipesUseCase {
	constructor(private readonly recipeRepository: RecipeRepository) {}

	/**
	 * Execute the search recipes use case
	 * @param filters Search filters
	 * @param page Page number
	 */
	async execute(filters: RecipeSearchFilters, page = 0): Promise<RecipeSearchResult> {
		return this.recipeRepository.searchRecipes(filters, page);
	}
}
