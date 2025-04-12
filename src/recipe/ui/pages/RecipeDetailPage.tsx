import { Alert, AlertDescription, AlertTitle } from "@/core/ui/components/alert";
import { Spinner } from "@/core/ui/components/spinner";
import { createLazyRoute, useParams } from "@tanstack/react-router";
import { TriangleAlertIcon } from "lucide-react";
import { RecipeCardDetail } from "../components/RecipeCardDetail";
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
			<RecipeCardDetail recipe={recipe} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
		</div>
	);
}
