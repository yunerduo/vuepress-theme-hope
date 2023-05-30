/* eslint-disable @typescript-eslint/naming-convention */
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { type MockGlobalOption, resetSetup, setup } from "vuepress-test-utils";

import { locales } from "../../../src/node/locales.js";

const appendPath = (path: string): string =>
  path === "README" ? "/" : `/${path}.html`;

const mockRoutes = [
  {
    path: "/",
    meta: {
      title: "Home",
    },
  },
  ...["a", "b", "c", "README"]
    .map((item) => ({
      path: appendPath(item),
      meta: {
        title: `Title ${item.toUpperCase()}`,
      },
    }))
    .flat(1),
  ...["a", "b", "c"]
    .map((item1) =>
      ["a", "b", "c", "README"].map((item2) => ({
        path: `/${item1}${appendPath(item2)}`,
        meta: {
          title: `Title ${item1.toUpperCase()}-${item2.toUpperCase()}`,
        },
      }))
    )
    .flat(2),
  ...["a", "b", "c"]
    .map((item1) =>
      ["a", "b", "c"].map((item2) =>
        ["a", "b", "c", "README"].map((item3) => ({
          path: `/${item1}/${item2}${appendPath(item3)}`,
          meta: {
            title: `Title ${item1.toUpperCase()}-${item2.toUpperCase()}-${item3.toUpperCase()}`,
          },
        }))
      )
    )
    .flat(3),
];

const globals: MockGlobalOption[] = [
  ["AUTO_CATALOG_LOCALES", { "/": locales["/en/"] }],
  ["AUTO_CATALOG_INDEX_META_KEY", "index"],
  ["AUTO_CATALOG_TITLE_META_KEY", "title"],
  ["AUTO_CATALOG_ICON_META_KEY", "icon"],
  ["AUTO_CATALOG_ORDER_META_KEY", "order"],
];

describe("AutoCatalog", () => {
  it("should render empty hint", async () => {
    const mocks = setup(vi, {
      globals,
    });

    Object.entries(mocks).forEach(([module, factory]) => {
      vi.doMock(module, factory);
    });

    const AutoCatalog = (
      await import("../../../src/client/components/AutoCatalog.js")
    ).default;

    const wrapper = mount(AutoCatalog);

    expect(wrapper.html()).toMatchSnapshot();

    resetSetup(vi);
  });

  it("should render whole catalog", async () => {
    const mocks = setup(vi, {
      routes: mockRoutes,
      globals,
    });

    Object.entries(mocks).forEach(([module, factory]) => {
      vi.doMock(module, factory);
    });

    const AutoCatalog = (
      await import("../../../src/client/components/AutoCatalog.js")
    ).default;

    const wrapper = mount(AutoCatalog);
    const html = wrapper.html();

    expect(html).toMatchSnapshot();
    expect(html).toContain("/a.html");
    expect(html).toContain("Title A");
    expect(html).toContain("/a/");
    expect(html).toContain("Title A-README");
    expect(html).toContain("/a/b.html");
    expect(html).toContain("Title A-B");
    expect(html).toContain("/a/b/");
    expect(html).toContain("Title A-B-README");
    expect(html).toContain("/a/b/c.html");
    // expect(html).toContain("Title A-B-C");

    resetSetup(vi);
  });

  it("should render catalog with level", async () => {
    const mocks = setup(vi, {
      routes: mockRoutes,
      globals,
    });

    Object.entries(mocks).forEach(([module, factory]) => {
      vi.doMock(module, factory);
    });

    const AutoCatalog = (
      await import("../../../src/client/components/AutoCatalog.js")
    ).default;

    const wrapper = mount(AutoCatalog, { props: { level: 2 } });
    const html = wrapper.html();

    expect(html).toMatchSnapshot();
    expect(html).toContain("/a/a.html");
    expect(html).toContain("/a/a/");
    expect(html).not.toContain("/a/b/c.html");

    resetSetup(vi);
  });

  it("should render catalog with base", async () => {
    const mocks = setup(vi, {
      routes: mockRoutes,
      globals,
    });

    Object.entries(mocks).forEach(([module, factory]) => {
      vi.doMock(module, factory);
    });

    const AutoCatalog = (
      await import("../../../src/client/components/AutoCatalog.js")
    ).default;

    const wrapper = mount(AutoCatalog, { props: { base: "/a/" } });
    const html = wrapper.html();

    expect(html).toMatchSnapshot();
    expect(html).toContain("/a/b/c.html");
    expect(html).toContain("/a/a/a.html");
    expect(html).toContain("/a/a/b.html");
    expect(html).toContain("/a/a/c.html");
    expect(html).not.toContain("/b/b/b.html");
    expect(html).not.toContain("/b/b/c.html");

    resetSetup(vi);
  });
});
