import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockRecipe } from "../../../__mocks__/recipesMock";
import { IngredientsList } from "../IngredientsList";

describe("IngredientsList", () => {
	const mockIngredients = mockRecipe.extendedIngredients;
	it("renders list of ingredients", () => {
		render(<IngredientsList ingredients={mockIngredients} />);

		expect(screen.getByText("4 slices bread")).toBeInTheDocument();
		expect(screen.getByText("8 servings pepper grinder")).toBeInTheDocument();
	});

	it("displays ingredient images when available", () => {
		render(<IngredientsList ingredients={mockIngredients} />);

		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(10);
		expect(images[0]).toHaveAttribute("src", "white-bread.jpg");
		expect(images[0]).toHaveAttribute("alt", "bread");
	});

	it("does not render images when not provided", () => {
		const mockIngredientWithoutImage = {
			...mockIngredients[0],
			image: "",
		};
		render(<IngredientsList ingredients={[mockIngredientWithoutImage]} />);

		expect(screen.queryByRole("img")).not.toBeInTheDocument();
	});
});
