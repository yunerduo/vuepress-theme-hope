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
      serverURL: "https://waline-comment.vuejs.press",
      delay: 0,
    },
  ],
  ["WALINE_LOCALES", {}],
  ["WALINE_META", false],
];

describe("Waline", () => {
  it.skip("should render comment system", async () => {
    const mocks = setup(vi, {
      globals,
    });

    Object.entries(mocks).forEach(([module, factory]) => {
      vi.doMock(module, factory);
    });

    const Waline = (await import("../../../src/client/components/Waline.js"))
      .default;

    const { injectCommentConfig } = await import(
      "../../../src/client/helpers/comment.js"
    );

    const wrapper = mount(
      componentWrapper(Waline, (app) => {
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
