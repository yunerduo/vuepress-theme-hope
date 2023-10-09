---
home: true
title: 主页
icon: home
heroImage: /logo.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-revealjs
tagline: 在 Markdown 中添加幻灯片
actions:
  - text: 快速上手 💡
    link: ./guide/
    type: primary

  - text: 配置 🛠
    link: ./config.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 安装

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

## 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { revealJsPlugin } from "vuepress-plugin-revealjs";

export default {
  plugins: [
    revealJsPlugin({
      // 你的选项
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
      // 你的选项
    }),
  ],
};
```

:::
