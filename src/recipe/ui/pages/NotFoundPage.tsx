import { Link } from "@tanstack/react-router";

export const NotFoundPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center px-4">
				<h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
				<h2 className="text-3xl font-semibold text-gray-700 mb-6">
					¡Page not found!
				</h2>
				<p className="text-gray-600 mb-8">
					Sorry, the page you are looking for does not exist or has been moved.
				</p>
				<Link
					to="/"
					className="inline-block bg-stone-400 text-white px-6 py-3 rounded-lg hover:bg-stone-600 transition-colors duration-300"
					viewTransition={{ types: ["slide-left"] }}
				>
					Return to home page
				</Link>
			</div>
		</div>
	);
};
