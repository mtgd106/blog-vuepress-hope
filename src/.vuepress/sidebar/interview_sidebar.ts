import { arraySidebar } from "vuepress-theme-hope";

export const interview = arraySidebar( [
    {
        text: 'Java部分',
        collapsible: true,
        icon: '/assets/icon/java.svg',
        prefix: 'Java部分/',
        children: [
            "Java基础","异常和序列化","集合框架","Java中的代理",

            /*
             {
                 text: 'Java基础',
                 path: '/面试/Java/Java基础',
             },
             {
                 text: '异常和序列化',
                 path: '/面试/Java/异常和序列化',
             },
             {
                 text: '集合框架',
                 path: '/面试/Java/集合框架',
             },
             */

        ],
    },
    {
        text: 'SSM框架',
        collapsible: true,
        icon: '/assets/icon/spring.svg',
        prefix: 'SSM/',
        children: [
            "Spring基础概念",
            "SpringMVC",
            "Mybatis",
        ]
    },
    {
        text: '数据结构',
        collapsible: true,
        icon: '/assets/icon/DataStructure.svg',
        prefix: '数据结构/',
        children: [
            "堆",
            "布隆过滤器",
            "比较类排序",
            "非比较类排序",

        ]
    },
    {
        text: 'IO模型',
        icon: 'file',
        link: 'IO模型',
    },
    {
        text: '单例模式',
        icon: 'file',
        link: '单例模式',
    },

]);
