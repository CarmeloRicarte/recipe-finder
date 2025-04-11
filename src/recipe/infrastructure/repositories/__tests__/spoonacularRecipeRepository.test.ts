import type { Recipe, RecipeSearchFilters, RecipeSearchResult } from "@/recipe/domain/models";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { spoonacularApiClient } from "../../api/spoonacularApiClient";
import { spoonacularRecipeRepository } from "../spoonacularRecipeRepository";

const mockRecipe: Recipe = {
	id: "1",
	title: "Test Recipe",
	image: "test.jpg",
	summary: "Test summary",
	instructions: "Test instructions",
	readyInMinutes: 30,
	servings: 4,
	sourceUrl: "http://test.com",
	extendedIngredients: [
		{
			id: 1,
			name: "Test Ingredient",
			amount: 2,
			unit: "cups",
			image: "test-ingredient.jpg",
		},
	],
};

const mockRecipeWithImageUrl: Recipe = {
	...mockRecipe,
	extendedIngredients: [
		{
			id: 1,
			name: "Test Ingredient",
			amount: 2,
			unit: "cups",
			image: "https://spoonacular.com/cdn/ingredients_100x100/test-ingredient.jpg",
		},
	],
};

const mockSearchResult: RecipeSearchResult = {
	results: [mockRecipeWithImageUrl],
	offset: 0,
	number: 1,
	totalResults: 1,
};

describe("SpoonacularRecipeRepository", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("searchRecipes", () => {
		it("should call API with correct parameters and return mapped results", async () => {
			const filters: RecipeSearchFilters = {
				query: "pasta",
				ingredients: ["tomato"],
				cuisine: "italian",
				diet: "vegetarian",
				type: "main course",
				maxReadyTime: 30,
			};
			const mockApiResponse = {
				results: [mockRecipe],
				offset: 0,
				number: 1,
				totalResults: 1,
			};

			vi.spyOn(spoonacularApiClient, "searchRecipes").mockResolvedValue(mockApiResponse);

			const result = await spoonacularRecipeRepository.searchRecipes(filters, 0);

			expect(spoonacularApiClient.searchRecipes).toHaveBeenCalledWith("pasta", ["tomato"], "italian", "vegetarian", "main course", 30, 0);
			expect(result).toEqual(mockSearchResult);
		});

		it("should throw error when API call fails", async () => {
			vi.spyOn(spoonacularApiClient, "searchRecipes").mockRejectedValue(new Error("API Error"));

			await expect(spoonacularRecipeRepository.searchRecipes({}, 0)).rejects.toThrow("Failed to search recipes: API Error");
		});
	});

	describe("getRecipeById", () => {
		it("should call API with correct id and return mapped recipe", async () => {
			vi.spyOn(spoonacularApiClient, "getRecipeById").mockResolvedValue(mockRecipe);

			const result = await spoonacularRecipeRepository.getRecipeById("1");

			expect(spoonacularApiClient.getRecipeById).toHaveBeenCalledWith("1");
			expect(result).toEqual(mockRecipeWithImageUrl);
		});

		it("should throw error when API call fails", async () => {
			vi.spyOn(spoonacularApiClient, "getRecipeById").mockRejectedValue(new Error("API Error"));

			await expect(spoonacularRecipeRepository.getRecipeById("1")).rejects.toThrow("Failed to get recipe with ID 1: API Error");
		});
	});

	describe("getRandomRecipes", () => {
		it("should call API with correct number and return mapped recipes", async () => {
			const mockApiResponse = {
				recipes: [mockRecipe],
			};

			vi.spyOn(spoonacularApiClient, "getRandomRecipes").mockResolvedValue(mockApiResponse);

			const result = await spoonacularRecipeRepository.getRandomRecipes(1);

			expect(spoonacularApiClient.getRandomRecipes).toHaveBeenCalledWith(1);
			expect(result).toEqual([mockRecipeWithImageUrl]);
		});

		it("should throw error when API call fails", async () => {
			vi.spyOn(spoonacularApiClient, "getRandomRecipes").mockRejectedValue(new Error("API Error"));

			await expect(spoonacularRecipeRepository.getRandomRecipes(1)).rejects.toThrow("Failed to get random recipes: API Error");
		});
	});
});
