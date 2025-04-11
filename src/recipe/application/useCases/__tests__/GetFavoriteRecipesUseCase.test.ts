import { GetFavoriteRecipesUseCase } from '../GetFavoriteRecipesUseCase';
import type { FavoriteRecipeRepository } from '@/recipe/domain/repositories';
import type { Recipe } from '@/recipe/domain/models';
import type { Mock } from 'vitest';

describe('GetFavoriteRecipesUseCase', () => {
  it('should return an array of favorite recipes', async () => {
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      addFavoriteRecipe: vi.fn(),
      getFavoriteRecipes: vi.fn().mockResolvedValue([{ id: '1', title: 'Recipe 1' }, { id: '2', title: 'Recipe 2' }] as Recipe[]),
      getFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn(),
    };
  
    // Mock the implementation to return specific data
    (mockFavoriteRecipeRepository.getFavoriteRecipes as Mock).mockResolvedValue([{ id: '1', title: 'Recipe 1' }, { id: '2', title: 'Recipe 2' }]);
  
    const useCase = new GetFavoriteRecipesUseCase(mockFavoriteRecipeRepository);
    const result = await useCase.execute();

    expect(mockFavoriteRecipeRepository.getFavoriteRecipes).toHaveBeenCalled();
    expect(result).toEqual([{ id: '1', title: 'Recipe 1' }, { id: '2', title: 'Recipe 2' }]);
  });

  it('should return an empty array if there are no favorite recipes', async () => {
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      addFavoriteRecipe: vi.fn(),
      getFavoriteRecipes: vi.fn().mockResolvedValue([]),
      getFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn(),
    };

    // Mock the implementation to return an empty array
    (mockFavoriteRecipeRepository.getFavoriteRecipes as Mock).mockResolvedValue([]);

    const useCase = new GetFavoriteRecipesUseCase(mockFavoriteRecipeRepository);
    const result = await useCase.execute();

    expect(mockFavoriteRecipeRepository.getFavoriteRecipes).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

    it('should handle errors when fetching favorite recipes', async () => {
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      addFavoriteRecipe: vi.fn(),
      getFavoriteRecipes: vi.fn().mockRejectedValue(new Error('Failed to fetch recipes')),
      getFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn(),
    };

    // Mock the implementation to reject with an error
    (mockFavoriteRecipeRepository.getFavoriteRecipes as Mock).mockRejectedValue(new Error('Failed to fetch recipes'));

    const useCase = new GetFavoriteRecipesUseCase(mockFavoriteRecipeRepository);

    await expect(useCase.execute()).rejects.toThrow('Failed to fetch recipes');
    expect(mockFavoriteRecipeRepository.getFavoriteRecipes).toHaveBeenCalled();
  });
});