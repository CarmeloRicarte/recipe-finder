/**
 * Recipe Card Component
 * Displays a recipe in a card format with image, title and basic info
 */

import { Button } from "@/core/ui/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/core/ui/components/card";
import { Clock, Users } from "lucide-react";
import type { Recipe } from "../../domain/models";

interface RecipeCardProps {
	recipe: Recipe;
	onViewDetails: (id: string) => void;
}

export function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
	return (
		<Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
			<CardHeader className="p-0">
				<img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
			</CardHeader>
			<CardContent className="flex-grow p-4">
				<h2 className="text-lg font-semibold mb-2 line-clamp-2">{recipe.title}</h2>
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<Clock className="w-4 h-4" />
						<span>{recipe.readyInMinutes} min</span>
					</div>
					<div className="flex items-center gap-1">
						<Users className="w-4 h-4" />
						<span>{recipe.servings} servings</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="p-4 pt-0">
				<Button variant="link" className="w-full" onClick={() => onViewDetails(recipe.id)}>
					View details
				</Button>
			</CardFooter>
		</Card>
	);
}
