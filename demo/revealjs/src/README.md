---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-revealjs
tagline: Enhancement for Markdown in VuePress
actions:
  - text: Demo
    link: ./demo.html
    type: primary

  - text: Docs
    link: https://plugin-revealjs.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

### Install

```bash
pnpm add -D vuepress-plugin-revealjs
```

### Usage

```ts
// .vuepress/config.ts
import { revealJsPlugin } from "vuepress-plugin-revealjs";

export default {
  plugins: [
    revealJsPlugin({
      // your options
    }),
  ],
};
```
