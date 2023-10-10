import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
// import { hopeTheme } from "vuepress-theme-hope";
export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "北斗星司",
  description: "我的学习笔记",

   theme,
  // theme: hopeTheme({
  //   navbar: [
  //     {
  //       text: "指南",
  //       link: "/zh/guide/README.md",
  //       icon: "lightbulb",
  //       // 仅在 `/zh/guide/` 激活
  //       activeMatch: "^/zh/guide/$",
  //     },
  //     { text: "配置", link: "/zh/config/README.md", icon: "config" },
  //     {
  //       text: "常见问题",
  //       link: "/zh/faq.md",
  //       icon: "circle-question",
  //       // 会在 `/zh/faq` 开头的路径激活
  //       // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
  //       activeMatch: "^/zh/faq",
  //     },
  //   ],
  // }),

  // Enable it with pwa
  // shouldPrefetch: false,
});
