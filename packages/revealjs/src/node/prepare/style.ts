import { createRequire } from "node:module";

import type { App } from "@vuepress/core";
import { path } from "@vuepress/utils";

import type { RevealJsTheme } from "../options.js";
import { CLIENT_FOLDER } from "../utils.js";

const require = createRequire(import.meta.url);

const AVAILABLE_THEMES = [
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
];

export const prepareRevealJsStyleFile = async (
  app: App,
  revealThemes: RevealJsTheme[],
): Promise<void> => {
  const styles = Array.from(
    new Set(
      revealThemes
        .map((item) => (item === "auto" ? ["white", "black"] : item))
        .flat(),
    ),
  ).filter((item) => AVAILABLE_THEMES.includes(item));

  await app.writeTemp(
    "revealjs/theme.scss",
    `\
${styles
  .map(
    (name) =>
      `@use "${path.resolve(
        require.resolve(`${CLIENT_FOLDER}styles/theme/${name}.scss`),
      )}";`,
  )
  .join("\n")}
`,
  );
};
