import { config, getDirname, path } from "docs-shared";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "revealjs" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Reveal.js",
        description: "Reveal.js for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "Reveal.js",
        description: "VuePress 的 Reveal.js 插件",
      },
    },

    theme,

    pagePatterns: [
      "**/*.md",
      "!**/*.snippet.md",
      "!.vuepress",
      "!node_modules",
    ],
  },
);
