import type { Ingredient } from "../../domain/models";

interface IngredientsListProps {
	ingredients: Ingredient[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
	return (
		<ul className="grid grid-cols-2 gap-2">
			{ingredients.map((ingredient) => (
				<li key={ingredient.id} className="flex items-center gap-2">
					{ingredient.image && (
						<img
							src={ingredient.image}
							alt={ingredient.name}
							className="w-8 h-8 object-cover rounded"
							loading="lazy"
						/>
					)}
					<span>
						{ingredient.amount} {ingredient.unit} {ingredient.name}
					</span>
				</li>
			))}
		</ul>
	);
}
