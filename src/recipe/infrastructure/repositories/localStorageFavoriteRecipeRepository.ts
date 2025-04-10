import type { Recipe } from "../../domain/models";
import type { FavoriteRecipeRepository } from "../../domain/repositories";

const FAVORITES_KEY = "favoriteRecipes";

export class LocalStorageFavoriteRecipeRepository
	implements FavoriteRecipeRepository
{
	private getFavorites(): Recipe[] {
		const favorites = localStorage.getItem(FAVORITES_KEY);
		return favorites ? JSON.parse(favorites) : [];
	}

	async getFavoriteRecipe(recipeId: string): Promise<Recipe> {
		const favorites = this.getFavorites();
		const favorite = favorites.find((f) => f.id === recipeId);
		if (!favorite) {
			throw new Error("Recipe not found");
		}
		return Promise.resolve(favorite);
	}

	async getFavoriteRecipes(): Promise<Recipe[]> {
		return this.getFavorites();
	}

	async addFavoriteRecipe(recipe: Recipe): Promise<void> {
		const favorites = this.getFavorites();
		favorites.push(recipe);
		localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
	}

	async removeFavoriteRecipe(recipeId: string): Promise<void> {
		const favorites = this.getFavorites();
		const updatedFavorites = favorites.filter((f) => f.id !== recipeId);
		localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
	}

	async isFavoriteRecipe(recipeId: string): Promise<boolean> {
		const favorites = this.getFavorites();
		return favorites.some((f) => f.id === recipeId);
	}
}

export const localStorageFavoriteRecipeRepository =
	new LocalStorageFavoriteRecipeRepository();
