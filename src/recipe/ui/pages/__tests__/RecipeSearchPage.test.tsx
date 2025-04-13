import { Alert, AlertDescription, AlertTitle } from "@/core/ui/components/alert";
import { Spinner } from "@/core/ui/components/spinner";
import { mockRecipes } from "@/recipe/__mocks__/recipesMock";
import { RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRecipeSearch } from "../../hooks/useRecipeSearch";
import { RecipeSearchPage } from "../RecipeSearchPage";

vi.mock("../../hooks/useRecipeSearch");
vi.mock("@/core/ui/components/spinner");
vi.mock("@/core/ui/components/alert");

function initializeRouterWithSearchRoute() {
	const rootRoute = createRootRoute();
	const indexRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: "/",
		component: RecipeSearchPage,
	});

	const routesTree = rootRoute.addChildren([indexRoute]);
	const router = createRouter({ routeTree: routesTree });
	return router;
}

describe("RecipeSearchPage", () => {
	const mockSearchRecipes = vi.fn();
	const mockLoadMore = vi.fn();

	beforeEach(() => {
		vi.mocked(Spinner).mockImplementation(({ show }) => (show ? <div>Loading...</div> : <></>));
		vi.mocked(Alert).mockImplementation(({ children }) => <div>{children}</div>);
		vi.mocked(AlertTitle).mockImplementation(({ children }) => <div>{children}</div>);
		vi.mocked(AlertDescription).mockImplementation(({ children }) => <div>{children}</div>);
		vi.mocked(useRecipeSearch).mockReturnValue({
			recipes: [],
			isLoading: false,
			error: null,
			hasMore: false,
			searchRecipes: mockSearchRecipes,
			loadMore: mockLoadMore,
		});
		cleanup();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("renders search page with title and search input", () => {
		const router = initializeRouterWithSearchRoute();
		render(<RouterProvider router={router} />);

		expect(screen.getByText(/Recipes Finder/i)).toBeInTheDocument();
		expect(screen.getByRole("searchbox")).toBeInTheDocument();
	});

	it("calls searchRecipes when searching", async () => {
		const router = initializeRouterWithSearchRoute();
		render(<RouterProvider router={router} />);

		const searchInput = screen.getByRole("searchbox");
		await act(() => fireEvent.change(searchInput, { target: { value: "test" } }));
		await act(() => fireEvent.submit(screen.getByTestId("recipe-search-form")));

		expect(mockSearchRecipes).toHaveBeenCalledWith({ query: "test" });
	});

	it("shows loading spinner when loading", () => {
		vi.mocked(useRecipeSearch).mockReturnValue({
			recipes: [],
			isLoading: true,
			error: null,
			hasMore: false,
			searchRecipes: mockSearchRecipes,
			loadMore: mockLoadMore,
		});

		const router = initializeRouterWithSearchRoute();
		render(<RouterProvider router={router} />);
		expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
	});

	it("shows error message when there is an error", () => {
		const errorMessage = "Test error message";
		vi.mocked(useRecipeSearch).mockReturnValue({
			recipes: [],
			isLoading: false,
			error: errorMessage,
			hasMore: false,
			searchRecipes: mockSearchRecipes,
			loadMore: mockLoadMore,
		});

		const router = initializeRouterWithSearchRoute();
		render(<RouterProvider router={router} />);
		screen.debug();
		expect(screen.getByText(/Error searching recipes/i)).toBeInTheDocument();
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it("renders recipes when loaded", () => {
		vi.mocked(useRecipeSearch).mockReturnValue({
			recipes: mockRecipes,
			isLoading: false,
			error: null,
			hasMore: false,
			searchRecipes: mockSearchRecipes,
			loadMore: mockLoadMore,
		});

		const router = initializeRouterWithSearchRoute();
		render(<RouterProvider router={router} />);
		expect(screen.getByText(mockRecipes[0].title)).toBeInTheDocument();
		expect(screen.getByText(mockRecipes[1].title)).toBeInTheDocument();
	});

	it("calls loadMore when scrolling to bottom and has more recipes", () => {
		const mockObserver = vi.fn((_callback, _options) => ({
			root: null,
			rootMargin: "0px",
			thresholds: [0],
			takeRecords: () => [],
			unobserve: vi.fn(),
			disconnect: vi.fn(),
			observe: vi.fn(),
		}));

		global.IntersectionObserver = mockObserver;

		vi.mocked(useRecipeSearch).mockReturnValue({
			recipes: mockRecipes,
			isLoading: false,
			error: null,
			hasMore: true,
			searchRecipes: mockSearchRecipes,
			loadMore: mockLoadMore,
		});

		const router = initializeRouterWithSearchRoute();
		render(<RouterProvider router={router} />);

		// Verify that IntersectionObserver was called
		expect(mockObserver).toHaveBeenCalled();

		// Simulate that the element of observation is visible
		const mockEntry = { isIntersecting: true };
		const mockCallback = mockObserver.mock.calls[0][0];
		act(() => mockCallback([mockEntry]));

		expect(mockLoadMore).toHaveBeenCalled();
	});

	it("does not call loadMore when scrolling to bottom but no more recipes", () => {
		const mockObserver = vi.fn((_callback, _options) => ({
			root: null,
			rootMargin: "0px",
			thresholds: [0],
			takeRecords: () => [],
			unobserve: vi.fn(),
			disconnect: vi.fn(),
			observe: vi.fn(),
		}));

		global.IntersectionObserver = mockObserver;

		vi.mocked(useRecipeSearch).mockReturnValue({
			recipes: mockRecipes,
			isLoading: false,
			error: null,
			hasMore: false,
			searchRecipes: mockSearchRecipes,
			loadMore: mockLoadMore,
		});

		const router = initializeRouterWithSearchRoute();
		render(<RouterProvider router={router} />);

		// Simulate that the element of observation is visible
		const mockEntry = { isIntersecting: true };
		const mockCallback = mockObserver.mock.calls[0][0];
		act(() => mockCallback([mockEntry]));

		expect(mockLoadMore).not.toHaveBeenCalled();
	});
});
