import { render, screen, waitFor } from "@testing-library/react";
import { RecipeNavigationMenu } from "../RecipeNavigationMenu";

vi.mock("@tanstack/react-router", async () => ({
	...(await vi.importActual("@tanstack/react-router")),
	useMatch: vi.fn().mockImplementation((route) => ({
		pathname: route === "/favorites" ? "/favorites" : "/",
		params: {},
		search: {},
		hash: "",
		state: null,
		key: "default",
	})),
	Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}));

describe("RecipeNavigationManu", () => {
	it("should render both links correctly", () => {
		render(<RecipeNavigationMenu />);

		expect(screen.getByText("Search")).toBeInTheDocument();
		expect(screen.getByText("Favorites")).toBeInTheDocument();
	});

	it("should apply active styles when route matches", () => {
		render(<RecipeNavigationMenu />);

		const searchLink = screen.getByText("Search").closest("a");
		waitFor(() => {
			expect(searchLink).toHaveClass("underline");
			const favoritesLink = screen.getByText("Favorites").closest("a");
			expect(favoritesLink).not.toHaveClass("underline");
		});
	});

	it("should navigate to correct routes", () => {
		render(<RecipeNavigationMenu />);

		expect(screen.getByText("Search").closest("a")).toHaveAttribute("href", "/");
		expect(screen.getByText("Favorites").closest("a")).toHaveAttribute("href", "/favorites");
	});
});
