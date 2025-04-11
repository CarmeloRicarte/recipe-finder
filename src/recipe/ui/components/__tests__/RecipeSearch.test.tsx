import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecipeSearch } from "../RecipeSearch";

describe("RecipeSearch", () => {
	it("renders search input and button", () => {
		const mockSearch = vi.fn();
		render(<RecipeSearch onSearch={mockSearch} />);

		expect(screen.getByPlaceholderText("Search recipes...")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
	});

	it("disables button when loading", () => {
		const mockSearch = vi.fn();
		render(<RecipeSearch onSearch={mockSearch} isLoading={true} />);

		expect(screen.getByRole("button")).toBeDisabled();
		expect(screen.getByText("Searching...")).toBeInTheDocument();
	});

	it("calls onSearch with query when form is submitted", () => {
		const mockSearch = vi.fn();
		render(<RecipeSearch onSearch={mockSearch} />);

		const input = screen.getByPlaceholderText("Search recipes...");
		fireEvent.change(input, { target: { value: "pasta" } });
		fireEvent.submit(screen.getByTestId("recipe-search-form"));

		expect(mockSearch).toHaveBeenCalledWith({ query: "pasta" });
	});

	it("disables button when query is empty", () => {
		const mockSearch = vi.fn();
		render(<RecipeSearch onSearch={mockSearch} />);

		expect(screen.getByRole("button")).toBeDisabled();
	});
});
