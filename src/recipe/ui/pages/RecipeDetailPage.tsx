import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/core/ui/components/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/core/ui/components/card";
import { Spinner } from "@/core/ui/components/spinner";
import { createLazyRoute, useParams } from "@tanstack/react-router";
import { Heart, HeartOff, TriangleAlertIcon } from "lucide-react";
import { sanitizeHTML } from "../../../core/ui/lib/utils";
import { useRecipeFavorites } from "../hooks/useRecipeFavorites";
import { useRecipeLoader } from "../hooks/useRecipeLoader";

export const RecipeDetailPageRoute = createLazyRoute("/recipe/$recipeId")({
	component: RecipeDetailPage,
});

export function RecipeDetailPage() {
	const { recipeId } = useParams({ from: "/recipe/$recipeId" });
	const { recipe, isLoading } = useRecipeLoader(recipeId);
	const { addFavorite, removeFavorite, isFavorite } = useRecipeFavorites();

	if (isLoading) {
		return <Spinner show={isLoading} />;
	}

	if (!recipe) {
		return (
			<div className="container mx-auto px-4 py-4">
				<Alert>
					<TriangleAlertIcon className="h-5 w-5 mr-2" />
					<AlertTitle>Error loading recipe detail</AlertTitle>
					<AlertDescription>Recipe not found</AlertDescription>
				</Alert>
			</div>
		);
	}

	const toggleFavorite = () => {
		if (isFavorite(recipe.id)) {
			removeFavorite(recipe.id);
		} else {
			addFavorite(recipe);
		}
	};

	return (
		<div className="container mx-auto px-4 py-4">
			<Card className="py-4">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-xl">{recipe.title}</CardTitle>
						<button
							type="button"
							onClick={toggleFavorite}
							className="p-2 hover:cursor-pointer"
						>
							{isFavorite(recipe.id) ? (
								<Heart className="w-6 h-6  text-red-500 fill-current" />
							) : (
								<HeartOff className="w-6 h-6" />
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
						<img
							src={recipe.image}
							alt={recipe.title}
							className="w-full h-64 object-cover rounded-lg"
						/>
						<div>
							<h3 className="text-lg font-semibold mb-2">Ingredients</h3>
							<ul className="grid grid-cols-2 gap-2">
								{recipe.extendedIngredients.map((ingredient) => (
									<li key={ingredient.id} className="flex items-center gap-2">
										{ingredient.image && (
											<img
												src={ingredient.image}
												alt={ingredient.name}
												className="w-8 h-8 object-cover rounded"
											/>
										)}
										<span>
											{ingredient.amount} {ingredient.unit} {ingredient.name}
										</span>
									</li>
								))}
							</ul>
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
		</div>
	);
}
