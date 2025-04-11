import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { NotFoundPage } from "../NotFoundPage";

vi.mock("@tanstack/react-router", () => ({
	...vi.importActual("@tanstack/react-router"),
	Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe("NotFoundPage", () => {
	it("renders 404 page correctly", () => {
		render(<NotFoundPage />);

		expect(screen.getByText(/404/i)).toBeInTheDocument();
		expect(screen.getByText(/¡Page not found!/i)).toBeInTheDocument();
		expect(screen.getByText(/Sorry, the page you are looking for does not exist or has been moved./i)).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /Return to home page/i })).toBeInTheDocument();
	});

	it("navigates to home when link is clicked", () => {
		render(<NotFoundPage />);
		fireEvent.click(screen.getByRole("link", { name: /Return to home page/i }));
		expect(window.location.pathname).toBe("/");
	});
});
