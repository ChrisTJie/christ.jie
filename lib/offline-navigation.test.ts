import { describe, expect, it, vi } from "vitest";
import { isOffline, navigateOffline } from "@/lib/offline-navigation";

vi.mock("@/lib/base-path", () => ({
  withBasePath: (path: string) => `/christ.jie${path}`,
}));

describe("isOffline", () => {
  it("reflects navigator.onLine", () => {
    Object.defineProperty(navigator, "onLine", { value: false, configurable: true });
    expect(isOffline()).toBe(true);
    Object.defineProperty(navigator, "onLine", { value: true, configurable: true });
    expect(isOffline()).toBe(false);
  });
});

describe("navigateOffline", () => {
  it("assigns location with basePath", () => {
    const assign = vi.fn();
    vi.stubGlobal("window", { location: { assign } });

    navigateOffline("/projects/");
    expect(assign).toHaveBeenCalledWith("/christ.jie/projects/");
  });
});
