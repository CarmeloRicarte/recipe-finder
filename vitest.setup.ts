import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";

expect.extend(matchers);

afterEach(() => {
	cleanup();
});

const mockObserver = vi.fn((_callback, _options) => ({
	root: null,
	rootMargin: "0px",
	thresholds: [0],
	takeRecords: () => [],
	unobserve: vi.fn(),
	disconnect: vi.fn(),
	observe: vi.fn(),
}));

global.IntersectionObserver = mockObserver;
