/**
 * Spoonacular API Client
 * This client handles the communication with the Spoonacular API
 */

import { RECIPES_PER_PAGE } from "@/core/constants";
import type {
	Recipe,
	RecipeSearchRandomResult,
	RecipeSearchResult,
} from "../../domain/models";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || "YOUR_API_KEY";
const BASE_URL = "https://api.spoonacular.com";

interface SpoonacularApiOptions {
	endpoint: string;
	params?: Record<string, string | number | boolean | undefined>;
}

export class SpoonacularApiClient {
	/**
	 * Makes a request to the Spoonacular API
	 * @param endpoint - The API endpoint to call
	 * @param params - Optional query parameters for the request
	 * @returns Promise with the parsed JSON response
	 * @throws Error if the API request fails
	 */
	private async fetchFromApi<T>({
		endpoint,
		params = {},
	}: SpoonacularApiOptions): Promise<T> {
		// Filter out undefined values from params
		const filteredParams = Object.fromEntries(
			Object.entries(params).filter(([_, value]) => value !== undefined),
		);

		const searchParams = new URLSearchParams({
			...filteredParams,
		} as Record<string, string>);

		const url = `${BASE_URL}${endpoint}?${searchParams.toString()}`;

		const response = await fetch(url, {
			headers: new Headers({
				"x-api-key": API_KEY,
			}),
		});

		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${await response.text()}`,
			);
		}

		return response.json();
	}

	/**
	 * Searches for recipes based on various criteria
	 * @param query - Optional search term
	 * @param ingredients - Optional array of required ingredients
	 * @param cuisine - Optional cuisine type (e.g., Italian, Mexican)
	 * @param diet - Optional dietary restriction (e.g., vegetarian, vegan)
	 * @param type - Optional meal type (e.g., main course, dessert)
	 * @param maxReadyTime - Optional maximum preparation time in minutes
	 * @param offset - Optional pagination offset (default: 0)
	 * @param number - Optional number of results per page (default: RECIPES_PER_PAGE)
	 * @returns Promise with search results including recipe information
	 */
	async searchRecipes(
		query?: string,
		ingredients?: string[],
		cuisine?: string,
		diet?: string,
		type?: string,
		maxReadyTime?: number,
		offset = 0,
		number = RECIPES_PER_PAGE,
	): Promise<RecipeSearchResult> {
		return this.fetchFromApi({
			endpoint: "/recipes/complexSearch",
			params: {
				query,
				includeIngredients: ingredients?.join(","),
				cuisine,
				diet,
				type,
				maxReadyTime,
				addRecipeInformation: true,
				fillIngredients: true,
				offset,
				number,
			},
		});
	}

	/**
	 * Retrieves detailed information for a specific recipe
	 * @param id - The unique identifier of the recipe
	 * @returns Promise with complete recipe information
	 * @throws Error if recipe is not found or request fails
	 */
	async getRecipeById(id: string): Promise<Recipe> {
		return this.fetchFromApi({
			endpoint: `/recipes/${id}/information`,
			params: {
				includeNutrition: false,
			},
		});
	}

	/**
	 * Fetches a random selection of recipes
	 * @param number - Optional number of random recipes to return (default: RECIPES_PER_PAGE)
	 * @returns Promise with an array of random recipes
	 */
	async getRandomRecipes(
		number = RECIPES_PER_PAGE,
	): Promise<RecipeSearchRandomResult> {
		return this.fetchFromApi({
			endpoint: "/recipes/random",
			params: {
				number,
			},
		});
	}
}

// Create a singleton instance
export const spoonacularApiClient = new SpoonacularApiClient();
