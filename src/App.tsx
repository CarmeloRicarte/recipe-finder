import { ThemeProvider } from "@/core/ui/theme/context/ThemeProvider";
import "./App.css";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="recipe-finder-ui-theme">
			App
		</ThemeProvider>
	);
}

export default App;
