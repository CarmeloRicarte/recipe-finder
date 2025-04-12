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
	let history: RouterHistory;

	beforeEach(() => {
		history = createBrowserHistory();
		expect(window.location.pathname).toBe("/");
	});
	afterEach(() => {
		history.destroy();
		window.history.replaceState(null, "root", "/");
		vi.resetAllMocks();
		cleanup();
	});

	it("should render empty state when no favorites", async () => {
		vi.mocked(useRecipeFavorites).mockReturnValue({
			favorites: [],
			removeFavorite: mockRemoveFavorite,
			addFavorite: mockAddFavorite,
			isFavorite: mockIsFavorite,
		});
		// Create test router with lazy route
		const router = initializeRouterWithFavoriteRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to favorites/i });
		await act(() => fireEvent.click(link));

		waitFor(async () => {
			expect(await screen.findByText(/You don't have any favorite recipes/)).toBeInTheDocument();
			expect(await screen.findByText(/Explore our recipes/i)).toBeInTheDocument();
			expect(await screen.findByRole("button", { name: /Explore recipes/i })).toBeInTheDocument();
		});
	});

	it("renders favorites list when there are favorites", async () => {
		vi.mocked(useRecipeFavorites).mockReturnValue({
			favorites: mockRecipes,
			removeFavorite: mockRemoveFavorite,
			addFavorite: mockAddFavorite,
			isFavorite: mockIsFavorite,
		});

		const router = initializeRouterWithFavoriteRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to favorites/i });
		await act(() => fireEvent.click(link));

		waitFor(async () => {
			expect(await screen.findByText(/My Favorite Recipes/i)).toBeInTheDocument();
			expect(await screen.findByText(mockRecipes[0].title)).toBeInTheDocument();
			expect(await screen.findByText(`${mockRecipes[0].readyInMinutes} minutes`)).toBeInTheDocument();
			expect(await screen.findByText(`${mockRecipes[0].servings} servings`)).toBeInTheDocument();
		});
	});

	it("navigates to home when Explore button is clicked", async () => {
		vi.mocked(useRecipeFavorites).mockReturnValue({
			favorites: [],
			removeFavorite: mockRemoveFavorite,
			addFavorite: mockAddFavorite,
			isFavorite: mockIsFavorite,
		});

		const router = initializeRouterWithFavoriteRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to favorites/i });
		await act(() => fireEvent.click(link));

		waitFor(async () => {
			const exploreButton = await screen.findByRole("button", { name: /Explore recipes/i });
			expect(exploreButton).toBeInTheDocument();
			await act(() => fireEvent.click(exploreButton));
		});

		await waitFor(() => {
			expect(window.location.pathname).toBe("/");
		});
	});

	it("navigates to recipe details when clicking on a favorite recipe", async () => {
		vi.mocked(useRecipeFavorites).mockReturnValue({
			favorites: mockRecipes,
			removeFavorite: mockRemoveFavorite,
			addFavorite: mockAddFavorite,
			isFavorite: mockIsFavorite,
		});

		const router = initializeRouterWithFavoriteRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to favorites/i });
		await act(() => fireEvent.click(link));

		const recipeCardLink = await screen.findAllByRole("button", { name: /View details/i });

		act(() => fireEvent.click(recipeCardLink[0]));

		await waitFor(() => {
			expect(window.location.pathname).toBe(`/recipe/${mockRecipes[0].id}`);
		});
	});
});
