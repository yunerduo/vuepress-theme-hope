import { defineClientConfig } from "@vuepress/client";
import SlidePage from "vuepress-plugin-revealjs/SlidePage";

export default defineClientConfig({
  layouts: {
    Slide: SlidePage,
  },
});
