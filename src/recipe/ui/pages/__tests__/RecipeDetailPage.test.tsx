import { Alert } from "@/core/ui/components/alert";
import { Spinner } from "@/core/ui/components/spinner";
import { mockRecipe } from "@/recipe/__mocks__/recipesMock";
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
import { useRecipeLoader } from "../../hooks/useRecipeLoader";

vi.mock("../../hooks/useRecipeLoader");
vi.mock("../../hooks/useRecipeFavorites");
vi.mock("@/core/ui/components/spinner");
vi.mock("@/core/ui/components/alert");

function initializeRouterWithRecipeDetailRoute() {
	const rootRoute = createRootRoute();
	const indexRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/",
		component: () => (
			<div>
				<p>Index Route</p>
				<Link to="/recipe/$recipeId" params={{ recipeId: "1" }}>
					Link to detail
				</Link>
			</div>
		),
	});
	const recipeDetailRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/recipe/$recipeId",
	}).lazy(() => import("../RecipeDetailPage").then((r) => r.RecipeDetailPageRoute));
	const routesTree = rootRoute.addChildren([indexRoute, recipeDetailRoute]);
	const router = createRouter({ routeTree: routesTree });
	return router;
}

describe("RecipeDetailPage", () => {
	const mockAddFavorite = vi.fn();
	const mockRemoveFavorite = vi.fn();
	const mockIsFavorite = vi.fn();
	let history: RouterHistory;

	beforeEach(() => {
		history = createBrowserHistory();
		expect(window.location.pathname).toBe("/");
		vi.mocked(Spinner).mockImplementation(({ show }) => (show ? <div>Loading...</div> : <></>));
		vi.mocked(Alert).mockImplementation(({ children }) => <div>{children}</div>);

		vi.mocked(useRecipeFavorites).mockReturnValue({
			addFavorite: mockAddFavorite,
			removeFavorite: mockRemoveFavorite,
			isFavorite: mockIsFavorite,
			favorites: [],
		});
	});

	afterEach(() => {
		history.destroy();
		window.history.replaceState(null, "root", "/");
		vi.resetAllMocks();
		cleanup();
	});

	it("shows loading spinner when loading", async () => {
		vi.mocked(useRecipeLoader).mockReturnValue({
			recipe: null,
			isLoading: true,
		});

		// Create test router with lazy route
		const router = initializeRouterWithRecipeDetailRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to detail/i });
		await act(() => fireEvent.click(link));
		await waitFor(async () => {
			expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
		});
	});

	it("shows error when recipe not found", async () => {
		vi.mocked(useRecipeLoader).mockReturnValue({
			recipe: null,
			isLoading: false,
		});

		const router = initializeRouterWithRecipeDetailRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to detail/i });
		await act(() => fireEvent.click(link));
		waitFor(async () => {
			expect(await screen.findByText(/Error loading recipe detail/i)).toBeInTheDocument();
			expect(await screen.findByText(/Recipe not found/i)).toBeInTheDocument();
		});
	});

	it("renders recipe details when loaded", async () => {
		vi.mocked(useRecipeLoader).mockReturnValue({
			recipe: mockRecipe,
			isLoading: false,
		});

		const router = initializeRouterWithRecipeDetailRoute();
		render(<RouterProvider router={router} />);

		const link = screen.getByRole("link", { name: /Link to detail/i });
		await act(() => fireEvent.click(link));
		await waitFor(async () => {
			expect(await screen.findByText(mockRecipe.title)).toBeInTheDocument();
		});
	});
});
