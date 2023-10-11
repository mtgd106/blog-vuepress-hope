import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "",
        {
            text: "java基础",
            icon: "book",
            prefix: "posts/java",
            collapsable: true,
            children: "structure",
        },
        {
            text: "JVM",
            icon: "book",
            prefix: "posts/JVM/",
            //link: "/Java基础/jichu",
            collapsable: true,
            children: [
                {text: "基础面试", icon: "pen-to-square", path: "diyi"},
            ]
        },
        {
            text: "数据库",
            icon: "book",
            prefix: "posts/database",
            //link: "/posts/JVM",
            collapsible: true,
            children: "structure",
        },
        // {
        //   text: "数据库",
        //   icon: "book",
        //   prefix: "posts/",
        //   children: "structure",
        // },
        {
            text: "运维",
            icon: "book",
            prefix: "posts/运维",
            //link: "/posts/JVM",
            collapsible: true,
            children: "structure",
        },
    ],

});
