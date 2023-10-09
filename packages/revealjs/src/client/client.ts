import { defineClientConfig } from "@vuepress/client";

import RevealJs from "./components/RevealJs.js";
import { injectRevealConfig } from "./helpers/index.js";

import "reveal.js/dist/reveal.css";

export default defineClientConfig({
  enhance: ({ app }) => {
    injectRevealConfig(app);
    app.component("RevealJs", RevealJs);
  },
});
