/**
 * Recipe Search Page
 * Main page for searching and displaying recipes
 */

import { Alert, AlertDescription, AlertTitle } from "@/core/ui/components/alert";
import { Spinner } from "@/core/ui/components/spinner";
import { useNavigate } from "@tanstack/react-router";
import { TriangleAlertIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeSearch } from "../components/RecipeSearch";
import { useRecipeSearch } from "../hooks/useRecipeSearch";

export function RecipeSearchPage() {
	const navigate = useNavigate();
	const { recipes, isLoading, error, hasMore, searchRecipes, loadMore } = useRecipeSearch();
	const observerTarget = useRef<HTMLDivElement>(null);

	/**
	 * Effect hook to handle infinite scrolling
	 * Creates an Intersection Observer that watches for when the target element becomes visible
	 * When the target is visible and there are more recipes to load, it triggers the loadMore function
	 */
	useEffect(() => {
		// Create new IntersectionObserver instance
		const observer = new IntersectionObserver(
			(entries) => {
				// Check if target is intersecting and we can load more recipes
				if (entries[0].isIntersecting && hasMore && !isLoading && !error) {
					loadMore();
				}
			},
			{ threshold: 1.0 }, // Trigger when element is 100% visible
		);

		// Start observing the target element if it exists
		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		// Cleanup function to disconnect the observer when component unmounts
		return () => observer.disconnect();
	}, [hasMore, isLoading, loadMore, error]);

	const handleViewDetails = (id: string) => {
		navigate({
			to: "/recipe/$recipeId",
			params: { recipeId: id },
			viewTransition: { types: ["slide-right"] },
		});
	};

	return (
		<div className="container mx-auto px-4 py-4 space-y-8">
			<h1 className="text-3xl font-bold text-justify mb-8">Recipes Finder</h1>

			<RecipeSearch onSearch={searchRecipes} isLoading={isLoading} />

			{error && (
				<Alert variant="destructive">
					<TriangleAlertIcon className="h-5 w-5 text-red-500 mr-2" />
					<AlertTitle>Error searching recipes</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} onViewDetails={handleViewDetails} />
				))}
			</div>

			{isLoading && <Spinner show={isLoading} />}

			<div ref={observerTarget} className="h-4" />
		</div>
	);
}
