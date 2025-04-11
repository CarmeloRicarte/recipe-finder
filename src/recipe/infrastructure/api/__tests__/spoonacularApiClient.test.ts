import { RECIPES_PER_PAGE } from "@/core/constants";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SpoonacularApiClient } from "../spoonacularApiClient";

// Mock global fetch
vi.stubGlobal("fetch", vi.fn());

describe("SpoonacularApiClient", () => {
	let apiClient: SpoonacularApiClient;

	beforeEach(() => {
		apiClient = new SpoonacularApiClient();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("fetchFromApi", () => {
		it("should make a request with the correct URL and headers", async () => {
			const mockResponse = {
				ok: true,
				json: () => Promise.resolve({ data: "test" }),
			};
			(fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
				mockResponse,
			);

			// @ts-expect-error: Accessing private method for testing
			const result = await apiClient.fetchFromApi({
				endpoint: "/test",
				params: { param1: "value1", param2: "value2" },
			});

			expect(fetch).toHaveBeenCalledWith(
				"https://api.spoonacular.com/test?param1=value1&param2=value2",
				expect.objectContaining({
					headers: expect.any(Headers),
				}),
			);
			expect(result).toEqual({ data: "test" });
		});

		it("should filter out undefined parameters", async () => {
			const mockResponse = {
				ok: true,
				json: () => Promise.resolve({}),
			};
			(fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
				mockResponse,
			);

			// @ts-expect-error: Accessing private method for testing
			await apiClient.fetchFromApi({
				endpoint: "/test",
				params: { param1: "value1", param2: undefined },
			});

			expect(fetch).toHaveBeenCalledWith(
				"https://api.spoonacular.com/test?param1=value1",
				expect.objectContaining({
					headers: expect.any(Headers),
				}),
			);
		});

		it("should throw an error when the response is not ok", async () => {
			const mockResponse = {
				ok: false,
				status: 404,
				text: () => Promise.resolve("Not found"),
			};
			(fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
				mockResponse,
			);

			await expect(
				// @ts-expect-error: Accessing private method for testing
				apiClient.fetchFromApi({
					endpoint: "/test",
				}),
			).rejects.toThrow("API request failed with status 404: Not found");
		});
	});

	describe("searchRecipes", () => {
		it("should call fetchFromApi with correct parameters", async () => {
			const mockSearchResult = {
				results: [],
				offset: 0,
				number: 10,
				totalResults: 0,
			};
			const fetchSpy = vi
				// biome-ignore lint/suspicious/noExplicitAny: necessary for testing
				.spyOn(apiClient as any, "fetchFromApi")
				.mockResolvedValue(mockSearchResult);

			const result = await apiClient.searchRecipes(
				"pasta",
				["tomato", "cheese"],
				"italian",
				"vegetarian",
				"main course",
				30,
				10,
				20,
			);

			expect(fetchSpy).toHaveBeenCalledWith({
				endpoint: "/recipes/complexSearch",
				params: {
					query: "pasta",
					includeIngredients: "tomato,cheese",
					cuisine: "italian",
					diet: "vegetarian",
					type: "main course",
					maxReadyTime: 30,
					addRecipeInformation: true,
					fillIngredients: true,
					offset: 10,
					number: 20,
				},
			});
			expect(result).toEqual(mockSearchResult);
		});

		it("should use default values when parameters are not provided", async () => {
			const mockSearchResult = {
				results: [],
				offset: 0,
				number: RECIPES_PER_PAGE,
				totalResults: 0,
			};
			const fetchSpy = vi
				// biome-ignore lint/suspicious/noExplicitAny: necessary for testing
				.spyOn(apiClient as any, "fetchFromApi")
				.mockResolvedValue(mockSearchResult);

			await apiClient.searchRecipes();

			expect(fetchSpy).toHaveBeenCalledWith({
				endpoint: "/recipes/complexSearch",
				params: {
					query: undefined,
					includeIngredients: undefined,
					cuisine: undefined,
					diet: undefined,
					type: undefined,
					maxReadyTime: undefined,
					addRecipeInformation: true,
					fillIngredients: true,
					offset: 0,
					number: RECIPES_PER_PAGE,
				},
			});
		});
	});

	describe("getRecipeById", () => {
		it("should call fetchFromApi with correct parameters", async () => {
			const mockRecipe = { id: "123", title: "Test Recipe" };
			const fetchSpy = vi
				// biome-ignore lint/suspicious/noExplicitAny: necessary for testing
				.spyOn(apiClient as any, "fetchFromApi")
				.mockResolvedValue(mockRecipe);

			const result = await apiClient.getRecipeById("123");

			expect(fetchSpy).toHaveBeenCalledWith({
				endpoint: "/recipes/123/information",
				params: {
					includeNutrition: false,
				},
			});
			expect(result).toEqual(mockRecipe);
		});

		it("should propagate errors from fetchFromApi", async () => {
			const fetchSpy = vi
				// biome-ignore lint/suspicious/noExplicitAny: necessary for testing
				.spyOn(apiClient as any, "fetchFromApi")
				.mockRejectedValue(new Error("API error"));

			await expect(apiClient.getRecipeById("123")).rejects.toThrow("API error");
			expect(fetchSpy).toHaveBeenCalled();
		});
	});

	describe("getRandomRecipes", () => {
		it("should call fetchFromApi with correct parameters", async () => {
			const mockRandomResult = { recipes: [] };
			const fetchSpy = vi
				// biome-ignore lint/suspicious/noExplicitAny: necessary for testing
				.spyOn(apiClient as any, "fetchFromApi")
				.mockResolvedValue(mockRandomResult);

			const result = await apiClient.getRandomRecipes(5);

			expect(fetchSpy).toHaveBeenCalledWith({
				endpoint: "/recipes/random",
				params: {
					number: 5,
				},
			});
			expect(result).toEqual(mockRandomResult);
		});

		it("should use default number of recipes when not specified", async () => {
			const mockRandomResult = { recipes: [] };
			const fetchSpy = vi
				// biome-ignore lint/suspicious/noExplicitAny: necessary for testing
				.spyOn(apiClient as any, "fetchFromApi")
				.mockResolvedValue(mockRandomResult);

			await apiClient.getRandomRecipes();

			expect(fetchSpy).toHaveBeenCalledWith({
				endpoint: "/recipes/random",
				params: {
					number: RECIPES_PER_PAGE,
				},
			});
		});
	});
});
