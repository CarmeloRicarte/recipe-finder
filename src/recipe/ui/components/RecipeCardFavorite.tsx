import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/core/ui/components/card";
import { Heart } from "lucide-react";
import { Button } from "../../../core/ui/components/button";
import type { Recipe } from "../../domain/models";

interface RecipeCardFavoriteProps {
	recipe: Recipe;
	removeFavorite: (id: string) => void;
	navigateToDetails: () => void;
}

export function RecipeCardFavorite({ recipe, removeFavorite, navigateToDetails }: RecipeCardFavoriteProps) {
	return (
		<Card className="py-6">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-xl">{recipe.title}</CardTitle>
					<button
						type="button"
						onClick={() => removeFavorite(recipe.id)}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						title="Delete from favorites"
					>
						<Heart className="w-6 h-6 text-red-500 fill-current" />
					</button>
				</div>
				<CardDescription>
					<div className="flex gap-4 mt-2">
						<span>🕒 {recipe.readyInMinutes} minutes</span>
						<span>👥 {recipe.servings} servings</span>
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-lg" loading="lazy" />
			</CardContent>
			<CardFooter>
				<Button variant="link" className="w-full" onClick={navigateToDetails}>
					View details
				</Button>
			</CardFooter>
		</Card>
	);
}
