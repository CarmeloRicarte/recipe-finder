import { ThemeProvider } from "@/core/ui/theme/context/ThemeProvider";
import { Outlet } from "@tanstack/react-router";
import "./App.css";
import { RecipeNavigationManu } from "./recipe/ui/components/RecipeNavigationManu";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="recipe-finder-ui-theme">
			<RecipeNavigationManu />
			<Outlet />
		</ThemeProvider>
	);
}

export default App;
