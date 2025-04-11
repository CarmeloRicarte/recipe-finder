import { mockRecipes } from "@/recipe/__mocks__/recipesMock";
import type { RecipeRepository } from "@/recipe/domain/repositories";
import { GetRandomRecipesUseCase } from "../GetRandomRecipesUseCase";

describe("GetRandomRecipesUseCase", () => {
	it("should get random recipes", async () => {
		const mockRecipeRepository: RecipeRepository = {
			getRandomRecipes: vi.fn().mockResolvedValue(mockRecipes),
			getRecipeById: vi.fn(),
			searchRecipes: vi.fn(),
		};
		const useCase = new GetRandomRecipesUseCase(mockRecipeRepository);

		const result = await useCase.execute();

		expect(mockRecipeRepository.getRandomRecipes).toHaveBeenCalledWith(10);
		expect(result).toEqual(mockRecipes);
	});

	it("should get random recipes with specified number", async () => {
		const mockRecipeRepository: RecipeRepository = {
			getRandomRecipes: vi.fn().mockResolvedValue(mockRecipes),
			getRecipeById: vi.fn(),
			searchRecipes: vi.fn(),
		};
		const useCase = new GetRandomRecipesUseCase(mockRecipeRepository);

		const result = await useCase.execute(2);

		expect(mockRecipeRepository.getRandomRecipes).toHaveBeenCalledWith(2);
		expect(result).toEqual(mockRecipes);
	});
});
