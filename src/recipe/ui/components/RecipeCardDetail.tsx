import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/core/ui/components/card";
import { Heart, HeartOff } from "lucide-react";
import { sanitizeHTML } from "../../../core/ui/lib/utils";
import type { Recipe } from "../../domain/models";
import { IngredientsList } from "./IngredientsList";

interface RecipeCardDetailProps {
	recipe: Recipe;
	isFavorite: (id: string) => boolean;
	toggleFavorite: () => void;
}

export function RecipeCardDetail({ recipe, isFavorite, toggleFavorite }: RecipeCardDetailProps) {
	return (
		<Card className="py-4">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-xl">{recipe.title}</CardTitle>
					<button type="button" onClick={toggleFavorite} className="p-2 hover:cursor-pointer">
						{isFavorite(recipe.id) ? (
							<Heart data-testid="heart-icon" className="w-6 h-6 text-red-500 fill-current" />
						) : (
							<HeartOff data-testid="heart-off-icon" className="w-6 h-6" />
						)}
					</button>
				</div>
				<CardDescription>
					<div className="flex gap-4 mt-2">
						<span>🕒 {recipe.readyInMinutes} min</span>
						<span>👥 {recipe.servings} servings</span>
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg" />
					<div>
						<h3 className="text-lg font-semibold mb-2">Ingredients</h3>
						<IngredientsList ingredients={recipe.extendedIngredients} />
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2">Instructions</h3>
						<div
							className="prose max-w-none"
							/* biome-ignore lint/security/noDangerouslySetInnerHtml: the API in some cases returns the data in HTML */
							dangerouslySetInnerHTML={{
								__html: sanitizeHTML(recipe.instructions),
							}}
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				{recipe.sourceUrl && (
					<a
						href={recipe.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-stone-500 dark:text-stone-300 hover:underline"
					>
						View Original Recipe
					</a>
				)}
			</CardFooter>
		</Card>
	);
}
