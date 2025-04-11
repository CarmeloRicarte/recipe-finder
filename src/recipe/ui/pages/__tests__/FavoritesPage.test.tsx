import { mockRecipes } from "@/recipe/__mocks__/recipesMock";
import {
	Link,
	type RouterHistory,
	RouterProvider,
	createBrowserHistory,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRecipeFavorites } from "../../hooks/useRecipeFavorites";

// Mock useRecipeFavorites
vi.mock("../../hooks/useRecipeFavorites");

function initializeRouterWithFavoriteRoute() {
	const rootRoute = createRootRoute();
	const indexRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/",
		component: () => (
			<div>
				<p>Index Route</p>
				<Link to="/favorites">Link to favorites</Link>
			</div>
		),
	});
	const favoriteRecipesRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/favorites",
	}).lazy(() => import("../FavoritesPage").then((r) => r.FavoritesPageRoute));
	const routesTree = rootRoute.addChildren([indexRoute, favoriteRecipesRoute]);
	const router = createRouter({ routeTree: routesTree });
	return router;
}

describe("FavoritesPage", () => {
	const mockRemoveFavorite = vi.fn();
	const mockAddFavorite = vi.fn();
	const mockIsFavorite = vi.fn();
	const mockNavigate = vi.fn();
	let history: RouterHistory;

	beforeEach(() => {
		history = createBrowserHistory();
		expect(window.location.pathname).toBe("/");
	});
	afterEach(() => {
		history.destroy();
		window.history.replaceState(null, "root", "/");
		vi.clearAllMocks();
		vi.resetAllMocks();
		cleanup();
	});

	it("should render empty state when no favorites", () => {
		// Create test router with lazy route
		const router = initializeRouterWithFavoriteRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to favorites/i });
		act(() => fireEvent.click(link));

		waitFor(() => {
			expect(screen.getByText(/You don't have any favorite recipes/)).toBeInTheDocument();
			expect(screen.getByText(/Explore our recipes/i)).toBeInTheDocument();
			expect(screen.getByRole("button", { name: /Explore recipes/i })).toBeInTheDocument();
		});
	});

	it("renders favorites list when there are favorites", () => {
		vi.mocked(useRecipeFavorites).mockReturnValue({
			favorites: mockRecipes,
			removeFavorite: mockRemoveFavorite,
			addFavorite: mockAddFavorite,
			isFavorite: mockIsFavorite,
		});

		const router = initializeRouterWithFavoriteRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to favorites/i });
		act(() => fireEvent.click(link));

		waitFor(() => {
			expect(screen.getByText(/My Favorite Recipes/i)).toBeInTheDocument();
			expect(screen.getByText(mockRecipes[0].title)).toBeInTheDocument();
			expect(screen.getByText(`${mockRecipes[0].readyInMinutes} minutes`)).toBeInTheDocument();
			expect(screen.getByText(`${mockRecipes[0].servings} servings`)).toBeInTheDocument();
		});
	});

	it("navigates to home when Explore button is clicked", () => {
		vi.mocked(useRecipeFavorites).mockReturnValue({
			favorites: [],
			removeFavorite: mockRemoveFavorite,
			addFavorite: mockAddFavorite,
			isFavorite: mockIsFavorite,
		});

		const router = initializeRouterWithFavoriteRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to favorites/i });
		act(() => fireEvent.click(link));

		waitFor(() => {
			act(() => fireEvent.click(screen.getByRole("button", { name: /Explore recipes/i })));
			expect(mockNavigate).toHaveBeenCalledWith({
				to: "/",
				viewTransition: { types: ["slide-left"] },
			});
		});
	});
});
