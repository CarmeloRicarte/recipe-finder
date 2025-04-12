import { ThemeProvider } from "@/core/ui/theme/context/ThemeProvider";
import { Outlet } from "@tanstack/react-router";
import "./App.css";
import { RecipeNavigationMenu } from "./recipe/ui/components/RecipeNavigationMenu";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="recipe-finder-ui-theme">
			<RecipeNavigationMenu />
			<Outlet />
		</ThemeProvider>
	);
}

export default App;
