import { mockRecipes } from "@/recipe/__mocks__/recipesMock";
import { recipeUseCases } from "@/recipe/application/useCases";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useRecipeSearch } from "../useRecipeSearch";

describe("useRecipeSearch", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should initialize with loading state and random recipes", async () => {
		vi.spyOn(recipeUseCases.getRandomRecipes, "execute").mockResolvedValue(mockRecipes);

		const { result } = renderHook(() => useRecipeSearch());

		expect(result.current.isLoading).toBe(true);
		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.recipes).toEqual(mockRecipes);
	});

	it("should handle search with filters", async () => {
		const mockResult = { results: mockRecipes, totalResults: 1 };
		vi.spyOn(recipeUseCases.searchRecipes, "execute").mockResolvedValue({ ...mockResult, offset: 0, number: 10 });

		const { result } = renderHook(() => useRecipeSearch());
		expect(result.current.isLoading).toBe(true);
		await waitFor(() => expect(result.current.isLoading).toBe(false));

		const filters = { query: "test" };
		await act(async () => result.current.searchRecipes(filters));

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.recipes).toEqual(mockRecipes);
		expect(result.current.error).toBeNull();
	});

	it("should handle error during search", async () => {
		const errorMessage = "Search failed";
		vi.spyOn(recipeUseCases.searchRecipes, "execute").mockRejectedValue(new Error(errorMessage));

		const { result } = renderHook(() => useRecipeSearch());

		await act(async () => result.current.searchRecipes({ query: "error" }));

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.error).toBe(errorMessage);
		expect(result.current.recipes).toEqual([]);
	});

	it("should load more recipes", async () => {
		const initialRecipes = [mockRecipes[0]];
		const moreRecipes = [mockRecipes[1]];
		const mockResult = { results: moreRecipes, totalResults: 2 };

		vi.spyOn(recipeUseCases.getRandomRecipes, "execute").mockResolvedValue(initialRecipes);
		vi.spyOn(recipeUseCases.searchRecipes, "execute").mockResolvedValue({ ...mockResult, offset: 0, number: 1 });

		const { result } = renderHook(() => useRecipeSearch());

		await waitFor(() => expect(result.current.isLoading).toBe(false));

		await act(async () => result.current.loadMore());

		await waitFor(() => expect(result.current.isLoading).toBe(false));
		expect(result.current.recipes).toEqual([...initialRecipes, ...moreRecipes]);
	});
});
