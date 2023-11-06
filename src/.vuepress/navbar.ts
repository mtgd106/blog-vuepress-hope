import { navbar } from "vuepress-theme-hope";

// @ts-ignore
export default navbar([
  {
    text: '首页',
    icon: 'home',
    link: "/"
  },
  {
    text: "笔记",
    icon: "note",
    link: "/posts/note/",
  },
  {
    text: '面试题',
    icon: 'autumn',
    link: "/posts/interview/",
  },
  {
    text: '工具',
    icon: 'tool',
    link: "/posts/tools/",
  },

  // {
  //   text: '力扣',
  //   icon: 'leetcode',
  //   link: "/posts/leetCode/",
  // },
  {
    text: '作者github',
    icon: 'github',
    link: "https://github.com/mtgd106",
  },
]);
