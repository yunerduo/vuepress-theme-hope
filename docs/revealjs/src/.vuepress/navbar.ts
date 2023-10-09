import { createRequire } from "node:module";
import { fs, navbar } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-revealjs/package.json",
  ),
);

export const enNavbar = navbar(["/", "/guide/", "/config", "/demo"]);

export const zhNavbar = navbar([
  "/zh/",
  "/zh/guide/",
  "/zh/config",
  "/zh/demo",
]);
