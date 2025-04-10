import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Sanitizes HTML string by removing potentially dangerous tags and their contents
 * @param html - The HTML string to sanitize
 * @returns The sanitized HTML string with dangerous tags removed
 */
export function sanitizeHTML(html: string) {
	return html
		.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "")
		.replace(
			/<\/?(script|iframe|frame|object|embed|style|link|meta)[^>]*>/gim,
			"",
		);
}
