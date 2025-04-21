/**
 * Recipe Search Component
 * Provides search input and filters for recipe search
 */

import { Button } from "@/core/ui/components/button";
import { Input } from "@/core/ui/components/input";
import { Search } from "lucide-react";
import { useState } from "react";
import type { RecipeSearchFilters } from "../../domain/models";

interface RecipeSearchProps {
	onSearch: (filters: RecipeSearchFilters) => void;
	isLoading?: boolean;
}

export function RecipeSearch({ onSearch, isLoading = false }: RecipeSearchProps) {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch({ query });
	};

	return (
		<form data-testid="recipe-search-form" onSubmit={handleSubmit} className="w-full mx-auto space-y-4">
			<div className="flex gap-2">
				<div className="relative flex-grow">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
					<Input
						type="search"
						placeholder="Search recipes..."
						name="search-recipes-input"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Button type="submit" disabled={isLoading || !query}>
					{isLoading ? "Searching..." : "Search"}
				</Button>
			</div>
		</form>
	);
}
