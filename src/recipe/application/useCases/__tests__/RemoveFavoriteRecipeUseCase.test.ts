import type { FavoriteRecipeRepository } from "@/recipe/domain/repositories";
import { RemoveFavoriteRecipeUseCase } from "../RemoveFavoriteRecipeUseCase";

describe("RemoveFavoriteRecipeUseCase", () => {
	it("should remove a favorite recipe", async () => {
		const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
			addFavoriteRecipe: vi.fn(),
			removeFavoriteRecipe: vi.fn(),
			getFavoriteRecipes: vi.fn(),
			getFavoriteRecipe: vi.fn(),
			isFavoriteRecipe: vi.fn(),
		};
		const useCase = new RemoveFavoriteRecipeUseCase(mockFavoriteRecipeRepository);
		const recipeId = "recipe1";

		await useCase.execute(recipeId);

		expect(mockFavoriteRecipeRepository.removeFavoriteRecipe).toHaveBeenCalledWith(recipeId);
	});

	it("should handle errors when removing a favorite recipe", async () => {
		const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
			addFavoriteRecipe: vi.fn(),
			removeFavoriteRecipe: vi.fn().mockRejectedValue(new Error("Error")),
			getFavoriteRecipes: vi.fn(),
			getFavoriteRecipe: vi.fn(),
			isFavoriteRecipe: vi.fn(),
		};
		const useCase = new RemoveFavoriteRecipeUseCase(mockFavoriteRecipeRepository);
		const recipeId = "recipe1";

		await expect(useCase.execute(recipeId)).rejects.toThrow("Error");
	});
});
