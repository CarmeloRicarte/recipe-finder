import { mockRecipe } from "@/recipe/__mocks__/recipesMock";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecipeCardDetail } from "../RecipeCardDetail";

describe("RecipeCardDetail", () => {
	it("renders recipe details correctly", () => {
		const mockToggleFavorite = vi.fn();
		const mockIsFavorite = vi.fn().mockReturnValue(false);

		render(<RecipeCardDetail recipe={mockRecipe} isFavorite={mockIsFavorite} toggleFavorite={mockToggleFavorite} />);

		expect(screen.getByText("Cucumber Mint Tea Sandwiches")).toBeInTheDocument();
		expect(screen.getByText(/🕒.*45.*min/)).toBeInTheDocument();
		expect(screen.getByText(/👥.*8.*servings/)).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Cucumber Mint Tea Sandwiches" })).toHaveAttribute(
			"src",
			"https://img.spoonacular.com/recipes/641014-556x370.jpg",
		);
		expect(screen.getByText(/1*tablespoon.*maple syrup/)).toBeInTheDocument();
		expect(screen.getByText("Instructions")).toBeInTheDocument();
		expect(screen.getByText("View Original Recipe")).toBeInTheDocument();
	});

	it("calls toggleFavorite when clicking favorite button", () => {
		const mockToggleFavorite = vi.fn();
		const mockIsFavorite = vi.fn().mockReturnValue(false);

		render(<RecipeCardDetail recipe={mockRecipe} isFavorite={mockIsFavorite} toggleFavorite={mockToggleFavorite} />);

		fireEvent.click(screen.getByRole("button"));
		expect(mockToggleFavorite).toHaveBeenCalled();
	});

	it("shows filled heart when recipe is favorite", () => {
		const mockToggleFavorite = vi.fn();
		const mockIsFavorite = vi.fn().mockReturnValue(true);

		render(<RecipeCardDetail recipe={mockRecipe} isFavorite={mockIsFavorite} toggleFavorite={mockToggleFavorite} />);

		expect(screen.getByTestId("heart-icon")).toHaveClass("text-red-500");
	});
});
