import { mockRecipes } from "@/recipe/__mocks__/recipesMock";
import type {
	RecipeSearchFilters,
	RecipeSearchResult,
} from "@/recipe/domain/models";
import type { RecipeRepository } from "@/recipe/domain/repositories";
import { SearchRecipesUseCase } from "../SearchRecipesUseCase";

describe("SearchRecipesUseCase", () => {
	it("should search recipes successfully", async () => {
		const mockRecipeRepository: RecipeRepository = {
			searchRecipes: vi.fn().mockResolvedValue({
				results: mockRecipes,
				totalResults: 2,
			} as RecipeSearchResult),
			getRandomRecipes: vi.fn(),
			getRecipeById: vi.fn(),
		};

		const searchRecipesUseCase = new SearchRecipesUseCase(mockRecipeRepository);
		const filters: RecipeSearchFilters = { query: "test" };
		const page = 0;

		const result = await searchRecipesUseCase.execute(filters, page);

		expect(mockRecipeRepository.searchRecipes).toHaveBeenCalledWith(
			filters,
			page,
		);
		expect(result).toEqual({
			results: mockRecipes,
			totalResults: 2,
		});
	});

	it("should handle empty search results", async () => {
		const mockRecipeRepository: RecipeRepository = {
			searchRecipes: vi.fn().mockResolvedValue({
				results: [],
				totalResults: 0,
			} as unknown as RecipeSearchResult),
			getRandomRecipes: vi.fn(),
			getRecipeById: vi.fn(),
		};

		const searchRecipesUseCase = new SearchRecipesUseCase(mockRecipeRepository);
		const filters: RecipeSearchFilters = { query: "empty" };
		const page = 0;

		const result = await searchRecipesUseCase.execute(filters, page);

		expect(mockRecipeRepository.searchRecipes).toHaveBeenCalledWith(
			filters,
			page,
		);
		expect(result).toEqual({
			results: [],
			totalResults: 0,
		});
	});

	it("should use default page number if not provided", async () => {
		const mockRecipeRepository: RecipeRepository = {
			searchRecipes: vi.fn().mockResolvedValue({
				results: [
					{ id: "1", title: "Recipe 1" },
					{ id: "2", title: "Recipe 2" },
				],
				totalResults: 2,
			} as RecipeSearchResult),
			getRandomRecipes: vi.fn(),
			getRecipeById: vi.fn(),
		};

		const searchRecipesUseCase = new SearchRecipesUseCase(mockRecipeRepository);
		const filters: RecipeSearchFilters = { query: "test" };

		await searchRecipesUseCase.execute(filters);

		expect(mockRecipeRepository.searchRecipes).toHaveBeenCalledWith(filters, 0);
	});
});
