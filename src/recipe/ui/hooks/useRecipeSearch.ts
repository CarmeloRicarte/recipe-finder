/**
 * Recipe Search Hook
 * Manages recipe search state and infinite scrolling
 */

import { RECIPES_PER_PAGE } from "@/core/constants";
import { useCallback, useEffect, useState } from "react";
import { recipeUseCases } from "../../application/useCases";
import type { Recipe, RecipeSearchFilters } from "../../domain/models";

export function useRecipeSearch() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [currentFilters, setCurrentFilters] = useState<RecipeSearchFilters>({});

	const searchRecipes = useCallback(async (filters: RecipeSearchFilters) => {
		setIsLoading(true);
		setError(null);
		setCurrentFilters(filters);
		setCurrentPage(0);

		try {
			const result = await recipeUseCases.searchRecipes.execute(filters, 0);
			setRecipes(result.results);
			setHasMore(result.totalResults > result.results.length);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error when searching for recipes");
			setRecipes([]);
			setHasMore(false);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const loadMore = useCallback(async () => {
		if (!hasMore || isLoading) return;

		setIsLoading(true);
		const nextPage = currentPage + 1;

		try {
			const result = await recipeUseCases.searchRecipes.execute(currentFilters, nextPage);
			setRecipes((prev) => [...prev, ...result.results]);
			setHasMore(result.totalResults > recipes.length + result.results.length);
			setCurrentPage(nextPage);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error loading more recipes");
		} finally {
			setIsLoading(false);
		}
	}, [currentFilters, currentPage, hasMore, isLoading, recipes.length]);

	useEffect(() => {
		const loadInitialRecipes = async () => {
			setIsLoading(true);
			try {
				const randomRecipes = await recipeUseCases.getRandomRecipes.execute(RECIPES_PER_PAGE);
				setRecipes(randomRecipes);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error loading initial recipes");
			} finally {
				setIsLoading(false);
			}
		};

		loadInitialRecipes();
	}, []);

	return {
		recipes,
		isLoading,
		error,
		hasMore,
		searchRecipes,
		loadMore,
	};
}
