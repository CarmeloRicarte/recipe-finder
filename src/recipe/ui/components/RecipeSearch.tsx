/**
 * Recipe Search Component
 * Provides search input and filters for recipe search
 */

import { Input } from "@/core/ui/components/input";
import { debounce } from "@/core/utils/debounce";
import { Search } from "lucide-react";
import type { FormEvent } from "react";
import type { RecipeSearchFilters } from "../../domain/models";

interface RecipeSearchProps {
	onSearch: (filters: RecipeSearchFilters) => void;
	isLoading?: boolean;
}

export function RecipeSearch({ onSearch, isLoading = false }: RecipeSearchProps) {
	const debouncedOnSearch = debounce((e: FormEvent, value: string) => {
		e.preventDefault();
		onSearch({ query: value });
	}, 1000);

	return (
		<form data-testid="recipe-search-form" className="w-full mx-auto space-y-4">
			<div className="flex gap-2">
				<div className="relative flex-grow">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
					<Input
						type="search"
						placeholder="Search recipes..."
						onChange={(e) => debouncedOnSearch(e, e.target.value)}
						className="pl-10"
						disabled={isLoading}
					/>
				</div>
			</div>
		</form>
	);
}
