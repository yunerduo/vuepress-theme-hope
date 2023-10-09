import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["@mdit/plugin-uml"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: ["index", "components/RevealJs", "SlidePage"],
    },
    {
      external: [/^reveal\.js/],
      copy: [["client/styles", "client"]],
    },
  ),
];
