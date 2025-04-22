// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function debounce<T extends (...args: any[]) => void>(func: T, timeout = 300): (...args: Parameters<T>) => void {
	let timer: NodeJS.Timeout | undefined;

	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}
