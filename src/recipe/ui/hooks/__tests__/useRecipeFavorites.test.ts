import { mockRecipe } from "@/recipe/__mocks__/recipesMock";
import { recipeUseCases } from "@/recipe/application/useCases";
import { act, renderHook } from "@testing-library/react";
import { useRecipeFavorites } from "../useRecipeFavorites";

describe("useRecipeFavorites", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should initialize with empty favorites", async () => {
		vi.spyOn(recipeUseCases.getFavoriteRecipes, "execute").mockResolvedValue([]);

		const { result } = renderHook(() => useRecipeFavorites());

		await vi.waitFor(() => {
			expect(result.current.favorites).toEqual([]);
		});
	});

	it("should add a recipe to favorites", async () => {
		vi.spyOn(recipeUseCases.getFavoriteRecipes, "execute").mockResolvedValue([]);
		vi.spyOn(recipeUseCases.addFavoriteRecipe, "execute").mockResolvedValue(undefined);

		const { result } = renderHook(() => useRecipeFavorites());

		await act(async () => {
			await result.current.addFavorite(mockRecipe);
		});

		expect(recipeUseCases.addFavoriteRecipe.execute).toHaveBeenCalledWith(mockRecipe);
		expect(result.current.favorites).toEqual([mockRecipe]);
	});

	it("should remove a recipe from favorites", async () => {
		vi.spyOn(recipeUseCases.getFavoriteRecipes, "execute").mockResolvedValue([mockRecipe]);
		vi.spyOn(recipeUseCases.removeFavoriteRecipe, "execute").mockResolvedValue(undefined);

		const { result } = renderHook(() => useRecipeFavorites());

		await act(async () => {
			await result.current.removeFavorite(mockRecipe.id);
		});

		expect(recipeUseCases.removeFavoriteRecipe.execute).toHaveBeenCalledWith(mockRecipe.id);
		expect(result.current.favorites).toEqual([]);
	});

	it("should check if a recipe is favorite", async () => {
		vi.spyOn(recipeUseCases.getFavoriteRecipes, "execute").mockResolvedValue([mockRecipe]);

		const { result } = renderHook(() => useRecipeFavorites());

		await vi.waitFor(() => {
			expect(result.current.isFavorite(mockRecipe.id)).toBe(true);
			expect(result.current.isFavorite("non-existent-id")).toBe(false);
		});
	});
});
