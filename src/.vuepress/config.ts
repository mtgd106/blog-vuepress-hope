import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from "@vuepress/plugin-search";
export default defineUserConfig({

  base: '/',

  lang: "zh-CN",
  title: "北斗星司",
  description: "Java学习笔记",

  theme,

  plugins: [
    // 搜索插件
    searchPlugin({
      // https://vuejs.press/zh/reference/plugin/search.html#getextrafields
      // 排除首页
      isSearchable: (page) => page.path !== "/",
      maxSuggestions: 10,
      // 按下s或 / 时，搜索框会被聚焦
      hotKeys: ["s", "/"],

      // 默认情况下，该插件会将页面标题和小标题作为搜索索引。
      // 该配置项可以帮助你添加更多的可搜索字段。
      getExtraFields: () => [],
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),
  ]

});
