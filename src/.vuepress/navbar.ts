import { navbar } from "vuepress-theme-hope";

// @ts-ignore
export default navbar([
  "/",
  {
    text: "文章",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Java",
        icon: "pen-to-square",
        prefix: "java/",
        children: [
          { text: "语法基础", icon: "pen-to-square", link: "语法基础" },
          //{ text: "苹果2", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "JVM",
        icon: "pen-to-square",
        prefix: "JVM/",
        children: [
          {
            text: "上篇",
            icon: "pen-to-square",
            link: "diyi",
          },
        ],
      },
      // { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
    ],
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
  // {
  //   text: '首页',
  //   link: '/'
  // },
  // {
  //   text: '组件',
  //   link: '/componentDocs/Install'
  // },
  // {
  //   text: '博客指南',
  //   children: [{
  //     text: '掘金',
  //     link: 'https://juejin.cn/'
  //   },
  //     {
  //       text: '博客园',
  //       link: 'https://www.cnblogs.com/wangdashi/'
  //     }
  //   ]
  // },
  {
    text: '数据库',
    children: [
      {
        text: 'MySQL',
        link: '/posts/database/MySQL'
      },
      {
        text: 'redis',
        link: '/posts/database/Redis'
      }
    ]
  },
  {
    text: '作者github',
    link: 'https://github.com/mtgd106'
  },
  {
    text: '本项目地址',
    link: 'https://github.com/mtgd106/blog-vuepress-hope'
  }
]);
