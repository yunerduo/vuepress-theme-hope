import type { PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteOptimizeDepsExclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
  checkVersion,
  detectPackageManager,
  getBundlerName,
} from "vuepress-shared/node";

import type { RevealJsOptions } from "./options.js";
import {
  prepareRevealJsPluginFile,
  prepareRevealJsStyleFile,
} from "./prepare/index.js";
import { revealJs } from "./revealjs.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const revealJsPlugin =
  (options: RevealJsOptions): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.67");

    if (app.env.isDebug) logger.info("Options:", options);

    const revealPlugins = options.plugins ?? [];

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        REVEAL_JS_DELAY: options.delay || 800,
      }),

      alias: (app): Record<string, string> => ({
        // we can not let vite force optimize deps with pnpm, so we use a full bundle in devServer here
        "@mermaid":
          app.env.isDev &&
          detectPackageManager() === "pnpm" &&
          getBundlerName(app) === "vite"
            ? "mermaid/dist/mermaid.esm.min.mjs"
            : "mermaid",
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "fflate",
          "vuepress-shared",
        ]);

        addViteOptimizeDepsExclude(bundlerOptions, app, [
          "reveal.js/dist/reveal.esm.js",
          "reveal.js/plugin/markdown/markdown.esm.js",
          ...revealPlugins.map(
            (plugin) => `reveal.js/plugin/${plugin}/${plugin}.esm.js`,
          ),
        ]);

        addViteSsrExternal(bundlerOptions, app, "reveal.js");
      },

      extendsMarkdown: (md): void => {
        md.use(revealJs);
      },

      onPrepared: async (app): Promise<void> => {
        await Promise.all([
          prepareRevealJsPluginFile(app, revealPlugins),
          prepareRevealJsStyleFile(app, options.themes ?? ["auto"]),
        ]);
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };
