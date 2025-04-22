import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "../debounce";

describe("debounce", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	it("should call the function after the specified delay", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn("test");

		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1000);

		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("test");
	});

	it("should debounce multiple calls", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn("test1");
		debouncedFn("test2");
		debouncedFn("test3");

		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1000);

		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("test3");
	});

	it("should work with multiple parameters", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn("test", 123, { foo: "bar" });

		vi.advanceTimersByTime(1000);

		expect(mockFn).toHaveBeenCalledWith("test", 123, { foo: "bar" });
	});

	it("should use default timeout when not specified", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn);

		debouncedFn("test");

		vi.advanceTimersByTime(299);
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it("should cancel previous timeout when called again", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn("test1");
		vi.advanceTimersByTime(500);

		debouncedFn("test2");
		vi.advanceTimersByTime(500);

		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500);
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("test2");
	});
});
