import { arraySidebar } from "vuepress-theme-hope";
export const note = arraySidebar([

    {
        text: "Java基础",
        icon: "/assets/icon/java.svg",
        prefix: 'Java/',
        collapsible: true,
        children: [
            "基础知识",
            "面向对象",
            "集合",
            "泛型",
            "反射",
            "注解",
        ]
    },

    {
        text: "MySQL",
        icon: "/assets/icon/mysql.svg",
        prefix: 'MySQL/',
        collapsible: true,
        children: [
            {
                text: "基础语法",
                prefix: '基础语法/',
                icon: "/assets/icon/basic.svg",
                collapsible: true,
                children: [
                    "10.数据类型和SQL语句",
                    "20.函数",
                    "30.临时表和派生表",
                    "40.约束",
                    "50.多表查询",
                    "60.视图和存储过程",
                    "70.触发器",
                    "80.正则表达式",
                    /*
                    {text: '数据类型和SQL语句',path: '/MySQL/基础语法/数据类型和SQL语句'},
                    {text: '函数',path: '/MySQL/基础语法/函数'},
                    {text: '临时表和派生表',path: '/MySQL/基础语法/临时表和派生表'},
                    {text: '约束',path: '/MySQL/基础语法/约束'},
                    {text: '多表查询',path: '/MySQL/基础语法/多表查询'},
                    {text: '视图和存储过程',path: '/MySQL/基础语法/视图和存储过程'},
                    {text: '触发器',path: '/MySQL/基础语法/触发器'},
                    {text: '正则表达式',path: '/MySQL/基础语法/正则表达式'},
                    {text: '朝花夕拾',link: '/MySQL/基础语法/朝花夕拾'},
                    */
                ],
            },
            {
                text: '原理',
                prefix: '原理/',
                icon: '/assets/icon/架构.svg',
                collapsible: true,
                children: [
                    "10.MySQL基础架构和存储引擎",
                    "20.事务",
                    "30.锁",
                    "40.索引",
                    "50.基础SQL优化",

                    //{text: '基础架构和存储引擎',path: '/MySQL/原理/基础架构和存储引擎'},
                    //{ text: '事务',path: '/MySQL/原理/事务'},
                ],
            },
        ],
    },

    {
        text: "Redis",
        icon: "/assets/icon/redis.svg",
        prefix: 'Redis/',
        collapsible: true,
        children: [
            "简介",
            "数据类型",
            "事务和锁",
            "持久化",
            "删除策略",
            "主从复制",
            "哨兵模式",
            "应用问题",
        ]
    },

    {
        text: "Java虚拟机",
        prefix: "JVM/",
        icon: "/assets/icon/jvm.svg",
        collapsible: true,
        children: [
            "概述",
            "类加载子系统",
            "运行时内存空间",
            "对象",
                /*
                 {text: "概述",path: "/JVM/概述"},
                 {text: "类加载子系统",path: "/JVM/类加载子系统"},
                */
        ],
    },

    {
        text: '并发编程',
        icon: '/assets/icon/高并发.svg',
        prefix: 'Concurrency/',
        collapsible: true,
        children: [
            {
                text: 'Java线程',
                icon: '/assets/icon/进程.svg',
                prefix: 'Java线程/',
                collapsible: true,
                children:[
                    "线程的创建和运行",
                    "常用方法与线程切换",
                    "线程状态",
               ]
           },
            {
                text: '并发工具类',
                icon: 'tool',
                prefix: '并发工具类/',
                collapsible: true,
                children:[
                    "线程池",
                ]
            },
        ],
    },

    {
        text: "Linux",
        icon: "/assets/icon/linux.svg",
        prefix: 'Linux/',
        collapsible: true,
        children: [
            "基础命令",
            "Vim编辑器",
            "文件处理",
            "Shell编程",
        ]
    },

    {
        text: "Docker",
        icon: "/assets/icon/docker.svg",
        prefix: 'Docker/',
        collapsible: true,
        children: [
            "概述",
            "常用命令",
            "镜像详解",
            "数据卷",
            "DockerFile",
            "Docker网络",
       ],
    },

]);
