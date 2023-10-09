---
home: true
title: Home
icon: home
heroImage: /logo.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-revealjs
tagline: Add slides in Markdown
actions:
  - text: Get Started 💡
    link: ./guide/
    type: primary

  - text: Config 🛠
    link: ./config.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-revealjs
```

@tab yarn

```bash
yarn add -D vuepress-plugin-revealjs
```

@tab npm

```bash
npm i -D vuepress-plugin-revealjs
```

:::

## Usage

::: code-tabs#language

@tab TS

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

@tab JS

```js
// .vuepress/config.js
import { revealJsPlugin } from "vuepress-plugin-revealjs";

export default {
  plugins: [
    revealJsPlugin({
      // your options
    }),
  ],
};
```

:::
