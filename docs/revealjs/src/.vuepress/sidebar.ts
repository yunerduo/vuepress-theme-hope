import { sidebar } from "docs-shared";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Guide",
      icon: "lightbulb",
      prefix: "guide/",
      children: ["", "demo", "themes"],
    },
    "config",
    "demo",
  ],
});

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "指南",
      icon: "lightbulb",
      prefix: "guide/",
      children: ["", "demo", "themes"],
    },
    "config",
    "demo",
  ],
});
