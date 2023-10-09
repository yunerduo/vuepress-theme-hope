import type { App } from "@vuepress/core";
import { getRealPath } from "vuepress-shared/node";

import type { RevealJsPlugin } from "../options.js";

const { url } = import.meta;

export const prepareRevealJsPluginFile = async (
  app: App,
  revealPlugins: RevealJsPlugin[],
): Promise<void> => {
  await app.writeTemp(
    "revealjs/plugins.js",
    `\
export const useRevealJs = () => [
  import(/* webpackChunkName: "reveal" */ "${getRealPath(
    "reveal.js/dist/reveal.esm.js",
    url,
  )}"),
  import(/* webpackChunkName: "reveal" */ "${getRealPath(
    "reveal.js/plugin/markdown/markdown.esm.js",
    url,
  )}"),
  ${revealPlugins
    .map(
      (plugin) =>
        `import(/* webpackChunkName: "reveal" */ "${getRealPath(
          `reveal.js/plugin/${plugin}/${plugin}.esm.js`,
          url,
        )}")`,
    )
    .join(",\n")}];
`,
  );
};
