import { mockRecipe } from "@/recipe/__mocks__/recipesMock";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecipeCardFavorite } from "../RecipeCardFavorite";

describe("RecipeCardFavorite", () => {
	it("renders favorite recipe information correctly", () => {
		const mockRemoveFavorite = vi.fn();
		const mockNavigateToDetails = vi.fn();
		render(<RecipeCardFavorite recipe={mockRecipe} removeFavorite={mockRemoveFavorite} navigateToDetails={mockNavigateToDetails} />);

		expect(screen.getByText("Cucumber Mint Tea Sandwiches")).toBeInTheDocument();
		expect(screen.getByText(/🕒.*45.*minutes/)).toBeInTheDocument();
		expect(screen.getByText(/👥.*8.*servings/)).toBeInTheDocument();
		expect(screen.getByRole("img")).toHaveAttribute("src", "https://img.spoonacular.com/recipes/641014-556x370.jpg");
		expect(screen.getByTitle("Delete from favorites")).toBeInTheDocument();
	});

	it("calls removeFavorite when clicking delete button", () => {
		const mockRemoveFavorite = vi.fn();
		const mockNavigateToDetails = vi.fn();
		render(<RecipeCardFavorite recipe={mockRecipe} removeFavorite={mockRemoveFavorite} navigateToDetails={mockNavigateToDetails} />);

		fireEvent.click(screen.getByTitle("Delete from favorites"));
		expect(mockRemoveFavorite).toHaveBeenCalledWith("1");
	});

	it("navigates to recipe details when clicking view details button", () => {
		const mockRemoveFavorite = vi.fn();
		const mockNavigateToDetails = vi.fn();
		render(<RecipeCardFavorite recipe={mockRecipe} removeFavorite={mockRemoveFavorite} navigateToDetails={mockNavigateToDetails} />);
		const viewDetailsButton = screen.getByText("View details");
		fireEvent.click(viewDetailsButton);

		expect(mockNavigateToDetails).toHaveBeenCalledTimes(1);
	});
});
