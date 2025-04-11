import { describe, it, expect, vi } from 'vitest';
import { GetFavoriteRecipeUseCase } from '../GetFavoriteRecipeUseCase';
import type { FavoriteRecipeRepository } from '@/recipe/domain/repositories';
import { mockRecipe } from '@/recipe/__mocks__/recipesMock';

describe('GetFavoriteRecipeUseCase', () => {
  it('should get a favorite recipe by id', async () => {
    
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      getFavoriteRecipe: vi.fn().mockResolvedValue(mockRecipe),
      getFavoriteRecipes: vi.fn(),
      addFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn()
    };
    const useCase = new GetFavoriteRecipeUseCase(mockFavoriteRecipeRepository);

    const result = await useCase.execute('1');

    expect(mockFavoriteRecipeRepository.getFavoriteRecipe).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockRecipe);
  });

  it('should throw an error if the repository throws an error', async () => {
    const mockFavoriteRecipeRepository: FavoriteRecipeRepository = {
      getFavoriteRecipe: vi.fn().mockRejectedValue(new Error('Repository error')),
      getFavoriteRecipes: vi.fn(),
      addFavoriteRecipe: vi.fn(),
      removeFavoriteRecipe: vi.fn(),
      isFavoriteRecipe: vi.fn()
    };
    const useCase = new GetFavoriteRecipeUseCase(mockFavoriteRecipeRepository);

    await expect(useCase.execute('1')).rejects.toThrow('Repository error');
    expect(mockFavoriteRecipeRepository.getFavoriteRecipe).toHaveBeenCalledWith('1');
  });
});