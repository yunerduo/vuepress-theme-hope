/* eslint-disable @typescript-eslint/naming-convention */
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import {
  type MockGlobalOption,
  componentWrapper,
  resetSetup,
  setup,
} from "vuepress-test-utils";

const globals: MockGlobalOption[] = [
  [
    "COMMENT_OPTIONS",
    {
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
      delay: 0,
    },
  ],
];

describe("Giscus", () => {
  it("should render comment system", async () => {
    const mocks = setup(vi, {
      globals,
    });

    Object.entries(mocks).forEach(([module, factory]) => {
      vi.doMock(module, factory);
    });

    const Giscus = (await import("../../../src/client/components/Giscus.js"))
      .default;

    const { injectCommentConfig } = await import(
      "../../../src/client/helpers/comment.js"
    );

    const wrapper = mount(
      componentWrapper(Giscus, (app) => {
        injectCommentConfig(app);
      }),
      {
        props: {
          identifier: "/test",
        },
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    await nextTick();

    const html = wrapper.html();

    expect(html).toMatchSnapshot();
    expect(html).toContain("<giscus-widget>");

    resetSetup(vi);
  });
});
