---
title: Shell编程
author: 
  name: 北斗星司
category: 
  - 运维
tag: 
  - Linux
date: 2023-4-13 15:08:32
icon: file
---



## echo命令和别名

### echo命令

#### **输出转义字符**

​      -n         &ensp;&ensp;&ensp;&ensp;输出之后不换行

​      -e         &ensp;&ensp;&ensp;&ensp;支持转义字符

​       \        &ensp;&ensp;&ensp;&ensp;&ensp;输出 \ 本身

​       \a          &ensp;&ensp;&ensp;&ensp;警告音

​       \n          &ensp;&ensp;&ensp;&ensp;换行符

​       \r           &ensp;&ensp;&ensp;&ensp;回车键

​       \t           &ensp;&ensp;&ensp;&ensp;制表符

​       \0          &ensp;&ensp;&ensp;&ensp;按照八进制ASCII码表输出字符

​       \x          &ensp;&ensp;&ensp;&ensp;按照十六进制ASCII码表输出字符

   &ensp;例：echo -e "\a"             发出警告音

####  **echo带颜色输出**

1. echo -e "\e[1;nm+输出内容"                    &ensp;&ensp;&ensp;//设置前景色，以后的输出都是该颜色 &ensp;&ensp;n的范围是30~37  

  &ensp;&ensp;&ensp;例： echo -e "\e[1;32mThis is a test."       &ensp;&ensp;//输入内容与m之间没有空格                              

2. echo -e "\e[1;nm+输出内容\e[0m"               &ensp;&ensp;//仅此次输出显示颜色

  &ensp;&ensp;&ensp;例： echo -e "\e[1;32mThis is a test.\e[0m" 

3. echo -e "\e[1;nm+输出内容"        &ensp;&ensp;//设置背景色，n的范围是40~47   

4. echo -e "\033[背景颜色;文字颜色m +字符串 \033[0m"   (centos6)

  &ensp;&ensp;&ensp;例： echo -e "\033[40;37m 黑底白字 \033[0m"

  **在脚本和命令行中，如果输出的内容最后有 ! 号，需要在 ! 之后加空格。**

​     &ensp;&ensp;例： echo "abcd! "    

### 别名

#### **在~/.bashrc 中添加别名**

alias 别名=’原命令’          &ensp;&ensp;&ensp;设置别名

 alias                               &ensp;&ensp;&ensp;查询别名

 unalias +别名                  &ensp;&ensp;&ensp;删除别名

  使修改生效：   

```sh
source ~/.bashrc     

#source ~/.bashrc  = #source .bashrc  =  #. .bashrc    (在当前目录为/root 的前提下)
```

#### **别名的优先级**

1. 用绝对路径或相对路径执行的命令

2. 别名

3. Bash内部命令

4. 按照$PATH环境变量定义的目录查找顺序找的的第一个命令

​      

## 输出重定向

 **fd：file description  &ensp;&ensp;文件描述符或文件句柄**

 标准输入：0  &ensp;&ensp;  (默认是键盘)       &ensp;&ensp;设备文件名 /dev/pts/0

 正确输出：1   &ensp;&ensp; (默认是终端)       &ensp;&ensp;设备文件名 /dev/pts/1

 错误输出：2  &ensp;&ensp;  (默认是终端)       &ensp;&ensp;设备文件名 /dev/pts/2

​        

 正确输出： 1>   1>>    等价于 >     >>

 命令 >文件                   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;以覆盖的方式，如果命令正确则输出到文件，如果错误则输出在屏幕上

 命令 >>文件                  &ensp;&ensp;&ensp;&ensp;&ensp;以追加的方式，如果命令正确则输出到文件，如果错误则输出在屏幕上

 命令 2>文件                 &ensp;&ensp;&ensp;&ensp;&ensp; 以覆盖的方式，如果命令执行错误则将错误信息输出到文件中；如果正确则执行且会清空文件

 命令 2>>文件               &ensp;&ensp;&ensp;  以覆盖的方式，如果命令执行错误则将错误信息输出到文件中；如果正确则执行但不会清空文件

​    

 命令 >文件名&ensp; 2>&1              &ensp;&ensp;&ensp;&ensp;&ensp;无论命令执行错误与正确都保存到文件中，如果文件不存在，则创建文件(覆盖方式)

 命令 >>文件名&ensp; 2>&1           &ensp;&ensp;&ensp;&ensp;无论错误与正确都保存到文件中，如果文件不存在，则创建文件(追加方式)

​    

命令 &>文件名                 &ensp;&ensp;&ensp;&ensp;&ensp;无论正确或错误都输出到同一个文件中(覆盖方式)

命令 &>>文件名                  &ensp;&ensp;&ensp;&ensp;无论正确或错误都输出到同一个文件中(追加方式)

命令 >>文件1&ensp;2>>文件2     &ensp;&ensp;&ensp;&ensp;正确的输出追加到文件1，错误的输出追加到文件2   



## 脚本运行方式

一般以.sh为文件后缀名，文件内容以 #!/bin/bash 开头

刚创建的脚本文件没有可执行权限，有两种方法执行shell脚本：

1. 赋予脚本文件可执行权限

  &ensp;&ensp;&ensp;chomd 744 myshell.sh

&ensp;&ensp;&ensp;然后输入相对路径 ./mysehll.sh 或绝对路径就可执行

2. 使用 sh 或 bash 命令+脚本

  &ensp;&ensp;sh myshell.sh 或 bash myshell.sh   (在当前文件夹下)  

​      

## 历史命令

####  **history  &ensp;&ensp;   查看历史命令**

   

```
-w     将本次登录使用过的命令写入文件~/.bash_history中,该文件保存在用户的家目录下,默认记录1000条,
       在配置文件/etc/profile 中可以修改,HISTSIZE=1000

-c     清空所有历史命令,包括内存中和文件中的
```

​    

 在命令行中： 

   Ctrl +p        &ensp;&ensp;&ensp;向上翻找命令

   Ctrl +n        &ensp;&ensp;&ensp;向下翻找命令

​    !n              &ensp;&ensp;执行第n条命令

​    !!               &ensp;&ensp;执行上一条命令

​    !字符串      &ensp;&ensp;&ensp;执行以该字符串开头的命令，如果有多条，则执行最后一条

   ESC+.        &ensp;&ensp;&ensp;引用上一个命令的最后一个参数&ensp;&ensp;等于!$

  ctrl +b        &ensp;&ensp;&ensp;光标向前移动

  ctrl +f         &ensp;&ensp;&ensp;光标向后移动

  ctrl +a        &ensp;&ensp;&ensp;光标移到行首

  ctrl +e        &ensp;&ensp;&ensp;光标移到行尾

  ctrl +u        &ensp;&ensp;&ensp;删除或剪切光标之前的内容

  ctrl +k        &ensp;&ensp;&ensp;删除或剪切光标之后的内容

  ctrl +y        &ensp;&ensp;&ensp;粘贴ctrl +u 或 ctrl +k 剪切的内容 

  ctrl +r         &ensp;&ensp;&ensp;通过关键字搜索历史命令



#### **多条命令执行**      

 

| 多命令执行符 |        格式        |                          作用                          |
| :----------: | :----------------: | :----------------------------------------------------: |
|      ;       |  命令1  ;   命令2  |         多个命令顺序执行，命令之间没有逻辑关系         |
|      &&      |   命令1 && 命令2   |  如果命令1正确执行，则命令2执行；如果1错误，则2不执行  |
|     \|\|     | 命令1  \|\|  命令2 | 如果命令1执行不正确，则命令2执行；如果1正确，则2不执行 |

## 通配符

\*          &ensp;&ensp;&ensp;&ensp;匹配0个或任意多个任意字符   

?          &ensp;&ensp;&ensp;&ensp;匹配任意一个字符

[]         &ensp;&ensp;&ensp;&ensp;匹配括号中任意一个字符

​           &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例: [abc]  表示一定匹配abc中的任意一个字符

[ - ]      &ensp;&ensp;匹配指定范围内的任意一个字符 

​           &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例:[a-z]  匹配a-z任意一个字符

[^ ]      &ensp;&ensp;取反

​           &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例:`[^0-9]` 匹配一个不是数字的字符 

(  )       &ensp;&ensp;&ensp;&ensp;小括号中断内容在子shell中执行

{  }       &ensp;&ensp;&ensp;&ensp;表示一个集合

​       &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例: touch file{1..3}       &ensp;&ensp;&ensp;&ensp;//创建file1,file2,file3三个文件

​      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例: mkdir -pv /home/{aa/{11,22},bb}        &ensp;&ensp;&ensp;&ensp;//递归创建,创建aa和bb两个目录,在aa下创建11和22两个目录

​       &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例: cp -rv /root/{aa.txt,bb.txt}                   &ensp;&ensp;&ensp;&ensp;//将/root/aa.txt拷贝为bb.txt

​              

特殊符号

‘ ‘                 单引号中的内容原封不动的输出,所有的特殊符号都没有特殊含义

“ “                除几个特殊符号(  $  `  \ )有特殊作用:外,其他的特殊符号都没有特殊含义

$()               引用系统命令

` `               反引号引用系统命令      a=’date’   或  a=$(date)  则a=系统时间

( )                小括号中的命令在子shell中运行

{ }               大括号中的内容在当前shell中运行

​    区别:1.()和{}都可以把一串的命令放在括号里面,命令之间用 ; 隔开

​            \2. {}最后一个命令之后要有分号,而()可以不用

​            \3. {}第一个命令和左括号之间必须有一个空壳,()可以没有



正则表达式----在文件中匹配符合条件的字符串

\*        前一个字符匹配0次或任意多次

​             grep “a*” test.txt         会匹配全部内容,无意义

​             grep “aaa*” test.txt      匹配至少有两个a连续的行

?        前一个字符匹配0次或1次

\+       前一个字符匹配1次或多次

.         匹配除了换行符外任意一个字符

​            grep “s.*d” test.txt        匹配s d之间任意一个字符

^      匹配行首  

​            grep “^hello” test.txt     会匹配以hello开头的行

$       匹配行尾   

​            "hello$"    会匹配以hello结尾的行

​            grep “^$” test.txt         会匹配空白行  

[]      匹配括号中任意一个字符

​            grep “[qefa]”     匹配四个字母中的任意一个

​            grep “[a-z]”       匹配26个字母中的任意一个

[^]    给出排除的范围  

​            grep "[^0-9]" test.txt    匹配任意一个非数字字符

​            grep “^[^a-zA-Z]” test.txt    匹配不以字母开头的行

\       将特殊符号的含义取消

​            grep “\.$” test.txt        匹配以 . 结尾的行

\{n\}   匹配前面的字符恰好出现n次, 正则是包含匹配,如果想要匹配正好n个字符,就要在前后加上限制  

​                 例:^[0-9]\{4\}[a-z]     匹配以4个数字开头的行

\{n,\}     前面的字符出现不少于n次

\{n,m\}  匹配前面的字符至少出现n次,最多出现m次

​                例: [a-z]\{6,8\}  匹配6到8个小写字母

 \<          词首定位符

 \>           词尾定位符

 \(...\)      

​                例: \(10.18.20.\)100\1200         将 10.18.20.100 改为10.18.20.200         

 a|b         配置a或b         

​          

​          

​          

​          

​          

​          

​          

​          

​          

​          

​          

​          

​          

​          

​          

​          

​                

​      

​      

​      

​      

​      

​      

​      

​      

​      

​      

​      
