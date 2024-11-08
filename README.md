# @lemonneko/vitepress-plugin-breadcrumbs

A simple vitepress plugin to generate breadcrumbs for every pages.

## Get started
Install:
```shell
pnpm install @lemonneko/vitepress-plugin-breadcrumbs
# or use bun
bun install @lemonneko/vitepress-plugin-breadcrumbs
```
Generate breadcrumbs data when build your pages in `.vitepress/config.ts`:
```typescript
import { BreadcrumbsDataGenerator } from '@lemonneko/vitepress-plugin-breadcrumbs'
import { defineConfig } from 'vitepress'

const breadcrumbsGenerator = new BreadcrumbsDataGenerator('<title of your website>', '<root dir of your documents>')

export default defineConfig({
  // other config...
  transformPageData(pageData, context) {
    breadcrumbsGenerator.generate(pageData, context.siteConfig.pages)
    // other transforming...
  },
  // other config...
})
```
Add default breadcrumb vue component to each page in `.vitepress/theme/index.ts`:
```typescript
import type { Theme as ThemeConfig } from 'vitepress'
import { Breadcrumbs } from '@lemonneko/vitepress-plugin-breadcrumbs/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // add breadcrumb above document
      'doc-before': () => h(Breadcrumbs),
    })
  },
  enhanceApp({ app }) {
    app.provide<Options>(InjectionKey, {
      spotlight: {
        defaultToggle: true
      }
    })
  }
}

export default Theme
```
## Use custom breadcrumb component
If you don't like the style or other something of default breadcrumb component, you can create your own component, this plugin will inject breadcrumb data into frontmatter of the page, so you can use breadcrumb data like this:
```vue
<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()

console.log(frontmatter.breadcrumbs)
// and do something other...
</script>

<template>
  <div>
    <!-- ui of your own component -->
  </div>
</template>
```
## Development
Make sure you installed Bun 1.1.34, then install dependencies:
```shell
bun install
```
Now you are ready to code!
