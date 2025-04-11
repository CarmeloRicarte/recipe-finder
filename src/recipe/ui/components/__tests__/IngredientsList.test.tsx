import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IngredientsList } from "../IngredientsList";

describe("IngredientsList", () => {
	const mockIngredients = [
		{ id: "1", name: "Tomato", amount: 2, unit: "pieces" },
		{ id: "2", name: "Onion", amount: 1, unit: "piece", image: "onion.jpg" },
	];

	it("renders list of ingredients", () => {
		render(<IngredientsList ingredients={mockIngredients} />);

		expect(screen.getByText("2 pieces Tomato")).toBeInTheDocument();
		expect(screen.getByText("1 piece Onion")).toBeInTheDocument();
	});

	it("displays ingredient images when available", () => {
		render(<IngredientsList ingredients={mockIngredients} />);

		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(1);
		expect(images[0]).toHaveAttribute("src", "onion.jpg");
		expect(images[0]).toHaveAttribute("alt", "Onion");
	});

	it("does not render images when not provided", () => {
		render(<IngredientsList ingredients={[mockIngredients[0]]} />);

		expect(screen.queryByRole("img")).not.toBeInTheDocument();
	});
});
