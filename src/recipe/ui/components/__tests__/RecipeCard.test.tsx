import { fireEvent, render, screen } from "@testing-library/react";
import { mockRecipe } from "../../../__mocks__/recipesMock";
import { RecipeCard } from "../RecipeCard";

describe("RecipeCard", () => {
	it("renders recipe information correctly", () => {
		const mockViewDetails = vi.fn();
		render(<RecipeCard recipe={mockRecipe} onViewDetails={mockViewDetails} />);

		expect(screen.getByText("Cucumber Mint Tea Sandwiches")).toBeInTheDocument();
		expect(screen.getByText("45 min")).toBeInTheDocument();
		expect(screen.getByText("8 servings")).toBeInTheDocument();
		expect(screen.getByRole("img")).toHaveAttribute("src", "https://img.spoonacular.com/recipes/641014-556x370.jpg");
	});

	it("calls onViewDetails when clicking view details button", () => {
		const mockViewDetails = vi.fn();
		render(<RecipeCard recipe={mockRecipe} onViewDetails={mockViewDetails} />);

		fireEvent.click(screen.getByText("View details"));
		expect(mockViewDetails).toHaveBeenCalledWith("1");
	});
});
