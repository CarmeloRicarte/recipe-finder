import { mockRecipe } from "@/recipe/__mocks__/recipesMock";
import { localStorageFavoriteRecipeRepository } from "../localStorageFavoriteRecipeRepository";

describe("LocalStorageFavoriteRecipeRepository", () => {
	beforeEach(() => {
		vi.spyOn(Storage.prototype, "getItem");
		vi.spyOn(Storage.prototype, "setItem");
		localStorage.clear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getFavoriteRecipe", () => {
		it("should return a recipe if found", async () => {
			localStorage.setItem("favoriteRecipes", JSON.stringify([mockRecipe]));
			const result = await localStorageFavoriteRecipeRepository.getFavoriteRecipe("1");
			expect(result).toEqual(mockRecipe);
		});

		it("should throw error if recipe not found", async () => {
			await expect(localStorageFavoriteRecipeRepository.getFavoriteRecipe("1")).rejects.toThrow("Recipe not found");
		});
	});

	describe("getFavoriteRecipes", () => {
		it("should return empty array if no favorites", async () => {
			const result = await localStorageFavoriteRecipeRepository.getFavoriteRecipes();
			expect(result).toEqual([]);
		});

		it("should return all favorite recipes", async () => {
			localStorage.setItem("favoriteRecipes", JSON.stringify([mockRecipe]));
			const result = await localStorageFavoriteRecipeRepository.getFavoriteRecipes();
			expect(result).toEqual([mockRecipe]);
		});
	});

	describe("addFavoriteRecipe", () => {
		it("should add recipe to favorites", async () => {
			await localStorageFavoriteRecipeRepository.addFavoriteRecipe(mockRecipe);
			expect(localStorage.setItem).toHaveBeenCalledWith("favoriteRecipes", JSON.stringify([mockRecipe]));
		});
	});

	describe("removeFavoriteRecipe", () => {
		it("should remove recipe from favorites", async () => {
			localStorage.setItem("favoriteRecipes", JSON.stringify([mockRecipe]));
			await localStorageFavoriteRecipeRepository.removeFavoriteRecipe("1");
			expect(localStorage.setItem).toHaveBeenCalledWith("favoriteRecipes", JSON.stringify([]));
		});
	});

	describe("isFavoriteRecipe", () => {
		it("should return false if recipe not in favorites", async () => {
			const result = await localStorageFavoriteRecipeRepository.isFavoriteRecipe("1");
			expect(result).toBe(false);
		});

		it("should return true if recipe is in favorites", async () => {
			localStorage.setItem("favoriteRecipes", JSON.stringify([mockRecipe]));
			const result = await localStorageFavoriteRecipeRepository.isFavoriteRecipe("1");
			expect(result).toBe(true);
		});
	});
});
