---
title: Config
icon: gears
---

## Plugin Options

You can pass these options to the plugin:

### presentation

- Type: `PresentationOptions | boolean`

  ```ts
  type RevealPlugin = "highlight" | "math" | "search" | "notes" | "zoom";
  ```

- Default: `false`

Whether to enable presentation syntax support.

You can set it with an array, which represents enabled plugins.

Acceptable values are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

### delay

- Type: `number`
- Default: `800`

The delay of operating dom, in ms.

::: tip

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

:::

## Client Config

### defineRevealConfig

```ts
export const defineRevealConfig: (options: RevealOptions) => void;
```

Define config which you want to pass to reveal.js.
