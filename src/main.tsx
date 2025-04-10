import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./router.tsx";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint/style/noNonNullAssertion: root element is always present
createRoot(document.getElementById("root")!).render(
	<>
		<RouterProvider router={router} />
		<TanStackRouterDevtools router={router} />
	</>,
);
