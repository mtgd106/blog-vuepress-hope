import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "",
        {
            text: "Java基础",
            icon: "book",
            prefix: "posts/java",
            collapsible: true,
           // children: "structure",
            children: [
                {
                    text: "基础面试1",
                    icon: "book",
                    collapsible: true,
                    children: [
                        {text: "基础面试2", icon: "pen-to-square", path: "posts/JVM/diyi.md"},
                    ]
                },
                {
                    text: "基础面试2",
                    icon: "pen-to-square",
                    children: [
                        {text: "基础面试2", icon: "pen-to-square", path: "posts/JVM/diyi.md"},

                   ]
                }

            ]
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
            icon: "database",
            collapsible: true,
            children: [
                {
                    text: "MySQL",
                    icon: "book",
                    prefix: "/posts/database/MySQL",
                    collapsible: true,
                    children: [
                        {
                            text: "数据类型和SQL语句",
                            icon: "cat",
                            path: "MySQL基础"
                        }
                    ]
                },
                {
                    text: "Redis",
                    icon: "book",
                    prefix: "/posts/database/Redis",
                    collapsible: true,
                    children: [
                        {
                            text: "Redis基础",
                            icon: "pen-to-square",
                            path: "MySQL基础"
                        },
                        {

                        }
                    ]
                },
                //{text: "基础面试2", icon: "pen-to-square", path: "posts/JVM/diyi.md"},
            ],
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
