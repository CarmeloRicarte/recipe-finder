import { mockRecipe } from "@/recipe/__mocks__/recipesMock";
import { recipeUseCases } from "@/recipe/application/useCases";
import { spoonacularRecipeRepository } from "@/recipe/infrastructure/repositories/spoonacularRecipeRepository";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRecipeLoader } from "../useRecipeLoader";

describe("useRecipeLoader", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should set initial loading state", () => {
		const { result } = renderHook(() => useRecipeLoader("1"));
		expect(result.current.isLoading).toBe(true);
		expect(result.current.recipe).toBeNull();
	});

	it("should load favorite recipe", async () => {
		vi.spyOn(recipeUseCases.isFavoriteRecipe, "execute").mockResolvedValue(true);
		vi.spyOn(recipeUseCases.getFavoriteRecipe, "execute").mockResolvedValue(mockRecipe);

		const { result } = renderHook(() => useRecipeLoader("1"));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.recipe).toEqual(mockRecipe);
		});
	});

	it("should load recipe from API when not in favorites", async () => {
		vi.spyOn(recipeUseCases.isFavoriteRecipe, "execute").mockResolvedValue(false);
		vi.spyOn(spoonacularRecipeRepository, "getRecipeById").mockResolvedValue(mockRecipe);

		const { result } = renderHook(() => useRecipeLoader("1"));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.recipe).toEqual(mockRecipe);
		});
	});

	it("should handle error when loading recipe fails", async () => {
		const error = new Error("Failed to load recipe");
		vi.spyOn(recipeUseCases.isFavoriteRecipe, "execute").mockRejectedValue(error);
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const { result } = renderHook(() => useRecipeLoader("1"));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.recipe).toBeNull();
			expect(consoleSpy).toHaveBeenCalledWith("Error loading recipe:", error);
		});
	});
});
