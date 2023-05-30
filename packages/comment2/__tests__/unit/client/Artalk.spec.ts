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
    { site: "artalk-demo", server: "https://artalk.qwqaq.com", delay: 0 },
  ],
];

describe("Artalk", () => {
  it.skip("should render comment system", async () => {
    const mocks = setup(vi, {
      globals,
    });

    Object.entries(mocks).forEach(([module, factory]) => {
      vi.doMock(module, factory);
    });

    const Artalk = (await import("../../../src/client/components/Artalk.js"))
      .default;

    const { injectCommentConfig } = await import(
      "../../../src/client/helpers/comment.js"
    );

    const wrapper = mount(
      componentWrapper(Artalk, (app) => {
        injectCommentConfig(app);
      }),
      {
        props: {
          identifier: "/test",
        },
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await nextTick();

    const html = wrapper.html();

    expect(html).toMatchSnapshot();

    resetSetup(vi);
  });
});
