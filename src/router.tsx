import { createRootRoute, createRoute } from "@tanstack/react-router";
import App from "./App";
import { NotFoundPage } from "./recipe/ui/pages/NotFoundPage";
import { RecipeSearchPage } from "./recipe/ui/pages/RecipeSearchPage";

const rootRoute = createRootRoute({
	component: App,
	notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: RecipeSearchPage,
});

const recipeDetailRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/recipe/$recipeId",
}).lazy(() =>
	import("./recipe/ui/pages/RecipeDetailPage").then(
		(r) => r.RecipeDetailPageRoute,
	),
);

const favoriteRecipesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/favorites",
}).lazy(() =>
	import("./recipe/ui/pages/FavoritesPage").then((r) => r.FavoritesPageRoute),
);

export const routeTree = rootRoute.addChildren([
	indexRoute,
	recipeDetailRoute,
	favoriteRecipesRoute,
]);
