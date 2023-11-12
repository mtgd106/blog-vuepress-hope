# blog-vuepress-hope
### 介绍
个人博客项目源代码，使用的是vuepress中的 [hope](https://theme-hope.vuejs.press/zh/) 主题。<br/>

### 主要功能
1. 根据导航栏配置了多个对应的侧边栏文件，避免单个文件过于臃肿。<br/>
2. 网站有主题换色、站内搜索等功能，文章页面会显示作者、分类、标签、文章字数以及预计的阅读时间，可以点击链接跳转到上一篇或下一篇文章。<br/>
3. 侧边栏可以设置多级子目录，每级目录都可以设置单独的readme文件，每篇博客及目录都可以单独设置作者、标签、图标等，在文章右侧会生成该篇文章的目录导航，默认读取文章中的二级标题和三级标题。<br/>
3. 首页展示作者的个人信息以及最近更新的文章，可以根据时间轴查看作者的更新日记。

### 运行
安装完依赖后，直接点击package.json文件中的`docs:dev`。
