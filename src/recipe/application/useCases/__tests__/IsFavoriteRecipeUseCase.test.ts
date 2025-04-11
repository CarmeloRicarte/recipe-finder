import { IsFavoriteRecipeUseCase } from '../IsFavoriteRecipeUseCase';
import type { FavoriteRecipeRepository } from '@/recipe/domain/repositories';

describe('IsFavoriteRecipeUseCase', () => {
  it('should return true if recipe is a favorite', async () => {
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      addFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      getFavoriteRecipes: vi.fn(),
      getFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn().mockResolvedValue(true),
    };

    const useCase = new IsFavoriteRecipeUseCase(mockFavoriteRecipeRepository);
    const result = await useCase.execute('recipe1');
    expect(result).toBe(true);
    expect(mockFavoriteRecipeRepository.isFavoriteRecipe).toHaveBeenCalledWith(
      'recipe1',
    );
  });

  it('should return false if recipe is not a favorite', async () => {
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      addFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      getFavoriteRecipes: vi.fn(),
      getFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn().mockResolvedValue(false),
    };

    const useCase = new IsFavoriteRecipeUseCase(mockFavoriteRecipeRepository);
    const result = await useCase.execute('recipe2');
    expect(result).toBe(false);
    expect(mockFavoriteRecipeRepository.isFavoriteRecipe).toHaveBeenCalledWith(
      'recipe2',
    );
  });

  it('should handle repository errors', async () => {
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      addFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      getFavoriteRecipes: vi.fn(),
      getFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn().mockRejectedValue(new Error('Repository error')),
    };

    const useCase = new IsFavoriteRecipeUseCase(mockFavoriteRecipeRepository);
    await expect(useCase.execute('recipe3')).rejects.toThrow('Repository error');
    expect(mockFavoriteRecipeRepository.isFavoriteRecipe).toHaveBeenCalledWith(
      'recipe3',
    );
  });
});