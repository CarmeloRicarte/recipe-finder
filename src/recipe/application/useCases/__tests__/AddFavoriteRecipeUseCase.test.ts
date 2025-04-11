import { AddFavoriteRecipeUseCase } from '../AddFavoriteRecipeUseCase';
import type { FavoriteRecipeRepository } from '@/recipe/domain/repositories';
import type { Recipe } from '@/recipe/domain/models';
import { mockRecipe } from '@/recipe/__mocks__/recipesMock';


describe('AddFavoriteRecipeUseCase', () => {
	it('should add a recipe to favorites', async () => {
		const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
			addFavoriteRecipe: vi.fn(),
			removeFavoriteRecipe: vi.fn(),
			getFavoriteRecipes: vi.fn(),
			isFavoriteRecipe: vi.fn(),
			getFavoriteRecipe: vi.fn(),
		};

		const addFavoriteRecipeUseCase = new AddFavoriteRecipeUseCase(
			mockFavoriteRecipeRepository,
		);

		const recipe: Recipe = mockRecipe;

		await addFavoriteRecipeUseCase.execute(recipe);

		expect(
			mockFavoriteRecipeRepository.addFavoriteRecipe,
		).toHaveBeenCalledWith(recipe);
	});

	it('should throw an error if the repository throws an error', async () => {
		const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
			addFavoriteRecipe: vi.fn().mockRejectedValue(new Error('Repository error')),
			removeFavoriteRecipe: vi.fn(),
			getFavoriteRecipes: vi.fn(),
			isFavoriteRecipe: vi.fn(),
			getFavoriteRecipe: vi.fn(),
		};

		const addFavoriteRecipeUseCase = new AddFavoriteRecipeUseCase(
			mockFavoriteRecipeRepository,
		);

		const recipe: Recipe = mockRecipe;

		await expect(addFavoriteRecipeUseCase.execute(recipe)).rejects.toThrow(
			'Repository error',
		);
	});
});