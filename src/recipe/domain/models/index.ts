/**
 * Recipe domain models
 */

export interface Recipe {
	id: string;
	title: string;
	image: string;
	summary: string;
	instructions: string;
	readyInMinutes: number;
	servings: number;
	sourceUrl?: string;
	extendedIngredients: Ingredient[];
}

export interface Ingredient {
	id: number;
	name: string;
	amount: number;
	unit: string;
	image?: string;
}

export interface RecipeSearchFilters {
	query?: string;
	ingredients?: string[];
	cuisine?: string;
	diet?: string;
	type?: string;
	maxReadyTime?: number;
}

export interface RecipeSearchResult {
	results: Recipe[];
	offset: number;
	number: number;
	totalResults: number;
}

export interface RecipeSearchRandomResult {
	recipes: Recipe[];
}
