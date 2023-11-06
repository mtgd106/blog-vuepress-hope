import { arraySidebar } from "vuepress-theme-hope";

export const tools = arraySidebar( [
    {
        text: 'Git',
        prefix: 'git/',
        collapsible: true,
        icon: '/assets/icon/git.svg',
        children: [
            "git简介和使用",
            "撤销和分支",
            "朝花夕拾",
        ]
    },
    {
        text: 'Maven',
        icon: '/assets/icon/maven.svg',
        link: 'Maven'
    },

]);
