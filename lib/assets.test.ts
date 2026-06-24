import { describe, expect, it, vi } from "vitest";
import {
  profileAsset,
  projectAsset,
  resolveAssetSrc,
} from "@/lib/assets";

vi.mock("@/lib/base-path", () => ({
  basePath: "/christ.jie",
  withBasePath: (path: string) => `/christ.jie${path}`,
}));

describe("projectAsset", () => {
  it("builds repo-local project paths", () => {
    expect(projectAsset("my-app", "thumbnail.jpg")).toBe(
      "/projects/my-app/thumbnail.jpg",
    );
  });
});

describe("profileAsset", () => {
  it("builds repo-local profile paths", () => {
    expect(profileAsset("avatar.jpg")).toBe("/profile/avatar.jpg");
  });
});

describe("resolveAssetSrc", () => {
  it("prefixes local asset paths with basePath", () => {
    expect(resolveAssetSrc("/projects/demo/thumbnail.jpg")).toBe(
      "/christ.jie/projects/demo/thumbnail.jpg",
    );
  });

  it("leaves external URLs unchanged", () => {
    expect(resolveAssetSrc("https://github.com/christjie")).toBe(
      "https://github.com/christjie",
    );
  });
});
