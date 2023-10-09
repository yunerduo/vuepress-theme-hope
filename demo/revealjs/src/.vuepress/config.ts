import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { revealJsPlugin } from "vuepress-plugin-revealjs";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Reveal.js Plugin",

  description: "Reveal.js plugin for VuePress",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/revealjs/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Demo", link: "/demo.html" },
      { text: "Slide Page", link: "/slide-page.html" },
    ],
  }),

  plugins: [
    revealJsPlugin({
      plugins: ["highlight", "math", "search", "notes", "zoom"],
      themes: [
        "auto",
        "beige",
        "black",
        "blood",
        "league",
        "moon",
        "night",
        "serif",
        "simple",
        "sky",
        "solarized",
        "white",
      ],
    }),
  ],
});
