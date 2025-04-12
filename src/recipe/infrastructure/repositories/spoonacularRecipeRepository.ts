/**
 * Spoonacular Recipe Repository
 * This repository implements the RecipeRepository interface using the Spoonacular API
 */

import { RECIPES_PER_PAGE } from "@/core/constants";
import type { Ingredient, Recipe, RecipeSearchFilters, RecipeSearchResult } from "../../domain/models";
import type { RecipeRepository } from "../../domain/repositories";
import { spoonacularApiClient } from "../api/spoonacularApiClient";

export class SpoonacularRecipeRepository implements RecipeRepository {
	/**
	 * Search for recipes based on provided filters and pagination
	 * @param filters - Object containing search criteria (query, ingredients, cuisine, diet, type, maxReadyTime)
	 * @param page - Page number for pagination (0-based)
	 * @returns Promise containing search results with recipes, pagination info and total count
	 * @throws Error if the API request fails
	 */
	async searchRecipes(filters: RecipeSearchFilters, page: number): Promise<RecipeSearchResult> {
		try {
			const { query, ingredients, cuisine, diet, type, maxReadyTime } = filters;
			const offset = page * RECIPES_PER_PAGE;

			const response = await spoonacularApiClient.searchRecipes(query, ingredients, cuisine, diet, type, maxReadyTime, offset);

			return {
				results: this.mapApiRecipesToDomainRecipes(response.results),
				offset: response.offset,
				number: response.number,
				totalResults: response.totalResults,
			};
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to search recipes: ${error.message}`);
			}
			throw new Error("Failed to search recipes: An unknown error occurred");
		}
	}

	/**
	 * Retrieve detailed recipe information by its unique identifier
	 * @param id - Recipe unique identifier
	 * @returns Promise containing the complete recipe information
	 * @throws Error if the recipe is not found or the API request fails
	 */
	async getRecipeById(id: string): Promise<Recipe> {
		try {
			const recipe = await spoonacularApiClient.getRecipeById(id);
			return this.mapApiRecipeToDomainRecipe(recipe);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to get recipe with ID ${id}: ${error.message}`);
			}
			throw new Error(`Failed to get recipe with ID ${id}: An unknown error occurred`);
		}
	}

	/**
	 * Fetch a specified number of random recipes
	 * @param number - Number of random recipes to retrieve
	 * @returns Promise containing an array of random recipes
	 * @throws Error if the API request fails
	 */
	async getRandomRecipes(number: number): Promise<Recipe[]> {
		try {
			const response = await spoonacularApiClient.getRandomRecipes(number);
			return this.mapApiRecipesToDomainRecipes(response.recipes);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to get random recipes: ${error.message}`);
			}
			throw new Error("Failed to get random recipes: An unknown error occurred");
		}
	}

	/**
	 * Transform an array of API recipes into domain model recipes
	 * @param apiRecipes - Array of recipes from the API
	 * @returns Array of transformed recipes matching the domain model
	 */
	private mapApiRecipesToDomainRecipes(apiRecipes: Recipe[]): Recipe[] {
		return apiRecipes.map((recipe) => this.mapApiRecipeToDomainRecipe(recipe));
	}

	/**
	 * Transform a single API recipe into a domain model recipe
	 * @param apiRecipe - Recipe data from the API
	 * @returns Transformed recipe matching the domain model
	 */
	private mapApiRecipeToDomainRecipe(apiRecipe: Recipe): Recipe {
		if (!apiRecipe) {
			throw new Error("Invalid recipe data received from API");
		}

		return {
			id: apiRecipe.id.toString(),
			title: apiRecipe.title,
			image: apiRecipe.image,
			summary: apiRecipe.summary,
			instructions: apiRecipe.instructions || "",
			readyInMinutes: apiRecipe.readyInMinutes,
			servings: apiRecipe.servings,
			sourceUrl: apiRecipe.sourceUrl,
			extendedIngredients: this.extractIngredients(apiRecipe),
		};
	}

	/**
	 * Extract and transform ingredients from API recipe data
	 * @param apiRecipe - Recipe data containing ingredients information
	 * @returns Array of transformed ingredients matching the domain model
	 */
	private extractIngredients(apiRecipe: Recipe): Recipe["extendedIngredients"] {
		if (!apiRecipe.extendedIngredients) {
			return [];
		}

		return apiRecipe.extendedIngredients.map((ingredient: Ingredient) => ({
			id: ingredient.id,
			name: ingredient.name,
			amount: ingredient.amount,
			unit: ingredient.unit,
			image: this.buildIngredientImageUrl(ingredient.image),
		}));
	}

	/**
	 * Build the complete URL for an ingredient image
	 * @param imageName - Name of the ingredient image file
	 * @returns Complete URL for the ingredient image or undefined if no image
	 */
	private buildIngredientImageUrl(imageName?: string): string | undefined {
		return imageName ? `https://spoonacular.com/cdn/ingredients_100x100/${imageName}` : undefined;
	}
}
// Create a singleton instance
export const spoonacularRecipeRepository = new SpoonacularRecipeRepository();
