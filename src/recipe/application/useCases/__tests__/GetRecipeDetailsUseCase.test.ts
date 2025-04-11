import { describe, it, expect, vi } from 'vitest';
import { GetRecipeDetailsUseCase } from '../GetRecipeDetailsUseCase';
import type { RecipeRepository } from '@/recipe/domain/repositories';
import { mockRecipe } from '@/recipe/__mocks__/recipesMock';

describe('GetRecipeDetailsUseCase', () => {
  it('should get recipe details by id', async () => {
    

    const mockRecipeRepository: RecipeRepository = {
      getRecipeById: vi.fn().mockResolvedValue(mockRecipe),
      getRandomRecipes: vi.fn(),
      searchRecipes: vi.fn()
    };

    const useCase = new GetRecipeDetailsUseCase(mockRecipeRepository);
    const recipe = await useCase.execute('1');

    expect(mockRecipeRepository.getRecipeById).toHaveBeenCalledWith('1');
    expect(recipe).toEqual(mockRecipe);
  });

  it('should throw an error if getRecipeById fails', async () => {
    const mockRecipeRepository: RecipeRepository = {
      getRecipeById: vi.fn().mockRejectedValue(new Error('Failed to get recipe')),
      getRandomRecipes: vi.fn(),
      searchRecipes: vi.fn()
    };

    const useCase = new GetRecipeDetailsUseCase(mockRecipeRepository);

    await expect(useCase.execute('1')).rejects.toThrow('Failed to get recipe');
    expect(mockRecipeRepository.getRecipeById).toHaveBeenCalledWith('1');
  });
});