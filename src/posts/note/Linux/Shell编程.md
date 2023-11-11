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

## 历史命令

####  **history  &ensp;&ensp;   查看历史命令**

   

```
-w     将本次登录使用过的命令写入文件~/.bash_history中,该文件保存在用户的家目录下,默认记录1000条,
       在配置文件/etc/profile 中可以修改,HISTSIZE=1000

-c     清空所有历史命令,包括内存中和文件中的
```

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

### 普通符号

\*          &ensp;&ensp;&ensp;&ensp;&ensp;匹配0个或任意多个任意字符   

?          &ensp;&ensp;&ensp;&ensp;&ensp;匹配任意一个字符

[]         &ensp;&ensp;&ensp;&ensp;&ensp;匹配括号中任意一个字符

​           &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例： [abc]  表示一定匹配abc中的任意一个字符

[ - ]      &ensp;&ensp;&ensp;匹配指定范围内的任意一个字符 

​           &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例：[a-z]  匹配a-z任意一个字符

[^ ]      &ensp;&ensp;&ensp;取反

​           &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例：`[^0-9]` 匹配一个不是数字的字符 

(  )       &ensp;&ensp;&ensp;&ensp;&ensp;小括号中断内容在子shell中执行

{  }       &ensp;&ensp;&ensp;&ensp;&ensp;表示一个集合

​       &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例： touch file{1..3}       &ensp;&ensp;&ensp;&ensp;//创建file1，file2，file3三个文件

​      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例： mkdir -pv /home/{aa/{11,22},bb}        &ensp;&ensp;&ensp;&ensp;//递归创建，创建aa和bb两个目录，在aa下创建11和22两个目录

​       &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;例： cp -rv /root/{aa.txt,bb.txt}                   &ensp;&ensp;&ensp;&ensp;//将/root/aa.txt拷贝为bb.txt             

### 特殊符号

‘ ‘       &ensp;&ensp;&ensp;&ensp;单引号，单引号中的内容原封不动的输出，所有的特殊符号都没有了特殊含义

" "          &ensp;&ensp;&ensp;&ensp;双引号，除几个特殊符号(  $&ensp;  `  &ensp;\ )有特殊作用外，其他的特殊符号都没有了特殊含义

 $()        &ensp;&ensp;&ensp;&ensp;**引用系统命令**

 ``         &ensp;&ensp;&ensp;&ensp;&ensp;反引号，**引用系统命令**    &ensp;&ensp;  例如，a=’date’   &ensp;或  &ensp;a=$(date)  &ensp;&ensp;则a=系统时间

 ( )        &ensp;&ensp;&ensp;&ensp;小括号中的命令在子shell中运行

 { }       &ensp;&ensp;&ensp;&ensp;大括号中的内容在当前shell中运行

​    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;区别：1. `()` 和 `{}` 都可以把一串的命令放在括号里面，命令之间用 `;`隔开

  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;2.`{}`中最后一个命令之后要有分号，而`()`可以不用

​     &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;3. `{}`第一个命令和左括号之间必须有一个空格，而`()`可以没有



### 正则表达式

**文件中匹配符合条件的字符串**

```sh
*   前一个字符匹配0次或任意多次
    例，grep "a*" test.txt   会匹配全部内容，无意义
        grep "aaa*" test.txt      匹配至少有两个a连续的行

?   前一个字符匹配0次或1次

+   前一个字符匹配1次或多次

.   匹配除了换行符外任意一个字符
    例，grep "s.*d" test.txt     匹配s d之间任意一个字符

^   匹配行首  
    例，grep "^hello" test.txt   会匹配以hello开头的行

$   匹配行尾   
    例，"hello$"    会匹配以hello结尾的行
        grep "^$" test.txt   会匹配空白行  

[]  匹配括号中任意一个字符
    例，grep "[qefa]"     匹配四个字母中的任意一个
        grep "[a-z]"      匹配26个字母中的任意一个

[^]  给出排除的范围  
     例，grep "[^0-9]" test.txt    匹配任意一个非数字字符
         grep "^[^a-zA-Z]" test.txt    匹配不以字母开头的行

\    将特殊符号的含义取消
     例，grep "\.$" test.txt    匹配以 . 结尾的行

\{n\}    匹配前面的字符恰好出现n次， 正则是包含匹配，如果想要匹配正好n个字符，就要在前后加上限制  
         例：^[0-9]\{4\}[a-z]    匹配以4个数字开头的行

\{n,\}   前面的字符出现不少于n次

\{n,m\}  匹配前面的字符至少出现n次，最多出现m次
         例： [a-z]\{6,8\}  匹配6到8个小写字母

\<       词首定位符

\>       词尾定位符
        
a|b      配置a或b    
```

​     

## 变量

### 变量分类

1. 用户自定义变量    

   只在当前shell中生效

2. 系统变量     

   主要保存的是和**系统操作环境相关的数据**，如，`$HOME`、`$PWD`，可改变变量的值，不可更改变量名，可新加入变量，

    在当前shell及以下所有子shell中都生效(包括用户自定义的)

3. 位置参数变量  

   一种预定义变量，**主要用于向脚本当中传递参数或数据**，可改变变量的值，不可更改变量名，不可加入新变量。

4. 预定义变量

   设计者在bash中已经定义好的变量，可以直接在shell中使用，可改变变量的值，不可更改变量名，不可加入新变量

 

#### **位置参数变量**

参数：在执行.sh文件时，跟在执行命令之后的字符，如，./first.sh 1 2 3

   `$n`    &ensp;&ensp;&ensp;n为数字，`$0`代表脚本名称，1-9代表第一个到第九个参数，十以上需要用大括号，如，`${10}`

   `$*`    &ensp;&ensp;&ensp;代表命令行中所有的参数，并把所有参数看成一个整体

   `$@`    &ensp;&ensp;&ensp;代表命令行中所有的参数，把参数区别对待

   `$#`     &ensp;&ensp;&ensp;参数的个数

   

#### **预定义变量**

   `$?`     &ensp;&ensp;&ensp;执行最后一次命令的返回状态，若变量值为0，则命令执行成功，若为非0，则失败

   `$$`      &ensp;&ensp;&ensp;当前进程的进程号(PID)

   `$!`      &ensp;&ensp;&ensp;后台运行的最后一个进程的进程号               

### 变量命名规则

1. 变量名称可以由数字，字母下划线组成，不能以数字开头

2. 在bash中，变量的默认类型为字符串型，如果要进行数值运算，必须指定变量类型为数值型

3. **用等号赋值时，等号两侧不能有空格**

4. **变量的值如果有空格，需要用单引号或双引号**    

5. 变量的值中可以有 `\` 转义符

6. 可以把命令的结果赋予变量，但要使用反引号或`$()`包含命令                   

### 定义普通变量

1. 定义：**变量=值**

2. 撤销：**unset &ensp;变量**
3. 声明只读变量：readonly&ensp; 变量    #不能unset
4. 查看：echo $变量名

### 定义环境变量

1. 定义：export 变量名=变量值   &ensp;&ensp;若变量已存在，则用&ensp;export +变量名 &ensp;可将普通变量变成环境变量

2. 在&ensp;/etc/profile 文件中添加想设置的环境变量，设置完成后需要执行`source /etc/profile` 命令以使文件生效

3. 命令

   ```shell
   set       查看所有的变量
     -e      在脚本中，如果命令执行失败，则停止执行并退出Shell
     -u      如果调用未声明变量则会报错
     -x      执行指令前，先输出指令
   
   env       查看所有环境变量
   
   unset +变量名    删除变量
   
   使用 "$变量名" 或 ${变量名}包含,可以引用和叠加变量
     例:aa=123  aa="$aa"456  或  aa=${aa}456  则aa=123456
   ```

   

### 接受键盘输入

#### **read**

 -p &ensp;"提示信息"       &ensp;&ensp;输出提示信息

 -t +秒数              &ensp;&ensp;指定等待用户输入的时间，如果没有在指定时间内输入，则不再等待 

 -n +字符数           &ensp;&ensp;接受指定的字符数，输入字符数为n时，立即执行

 -s                      &ensp;&ensp;隐藏输入的数据，不显示在屏幕上

**在read后跟一个变量，可将输入的内容赋予该变量，也可跟多个变量**

 **Linux 中变量类型全部默认为字符串型**

 

### 变量类型

declare `[+/-] [选项]` +变量名

\-              &ensp;&ensp;给变量设置类型属性

\+             &ensp;&ensp;取消变量的类型属性

-a            &ensp;&ensp;将变量声明为数组型

-i               &ensp;&ensp;将变量声明为整数型

-x             &ensp;&ensp;将变量声明为环境变量

-r               &ensp;&ensp;将变量声明为只读类型，该属性无法取消

-p              &ensp;&ensp;显示指定变量被声明的类型

 

### 变量参与运算

1. 将声明变量为整数型

```shell
a=11

b=22

declare -i c=$a+$b

 则，c=33
```

2. expr 和 let 命令      

```shell
c=$(expr $a + $b)    # "+"加号左右两侧必须有空格   

let c=$a+$b          # "="等号左右两侧不能有空格
```

3. $(( )) 和 $[ ]

```shell
c=$(($a+$b))       # 字母与括号之间可以有空格也可以没有

c=$[ $a+$b ]       # 字母与括号之间可以有空格也可以没有       
```

4. 使用运算符

   ```sh
   #例，计算 (2+3)*4
   result=$(( (2+3)*4 ))  或 result=$[ (2+3)*4 ]
   
   或：
   temp=`expr 2 + 3`         #运算符两侧要有空格
   result=`expr $temp \* 4`
   ```

   

## 文件判断

1. 按照文件类型进行判断 (在判断结构中直接使用)

   ```shell
   -b         判断文件是否存在,且为块设备文件
   
   -c         判断文件是否存在,且为字符设备文件
   
   -d         判断文件是否存在,且为目录文件(是目录为真)
   
   -e         判断文件是否存在(存在为真)
   
   -f         判断文件是否存在,且为普通文件(普通文件为真)
   
   -L         判断文件是否存在,且为符号链接文件,即软连接(符号链接文件为真)
   
   -p         判断文件是否存在,且为管道文件
   
   -s         判断文件是否存在,且为空文件(非空为真)
   
   -S         判断文件是否存在,且为套接字文件(是为真)
   ```

   例：

   ```sh
   if [ -e /home/myshell1.sh ]  # [ ] 两端有空格
   
   then echo "文件存在"
   
   fi
   ```

      

2. 按照文件权限进行判断

   ```sh
   -r        判断文件是否存在,且有读的权限(无法区分所有者和所属组,只要有w权限,就为真)
   
   -w        判断文件是否存在,且有写的权限
   
   -x        判断文件是否存在,且有执行的权限
   
   -u        判断文件是否存在,且有SUID权限
   
   -g        判断文件是否存在,且有SGID权限
   
   -k        判断文件是否存在,且有SBIT权限
   ```


3. 文件比较

   ```sh
   文件1 –nt 文件2     判断文件1的修改时间是否比文件2的新(如果新为真)
   
   文件1 –ot 文件2     判断文件1的修改时间是否比文件2的旧(如果旧为真)
   
   文件1 –ef 文件2     判断文件1和文件2的idone号是否一致(用于判断硬链接)
   ```

   

4. 整数比较

   x  参数  y

   ```sh
   -eq       判断x,y是否
          
   -ne       判断是否不等
   
   -gt       判断是否大于
   
   -lt       判断是否小于
   
   -ge       判断是否大于等于
   
   -le       判断是否小于等于
   ```

   

5. 字符串判断

   ```sh
   -z +字符串        判断字符串是否为空 (空为真)
   
   -n +字符串        是否为非空 (非空为真)
   
   ==                判断两字符串是否相等
   
   !=                判断两字符串是否不等
   ```

   

6. 多重条件判断

   ```sh
   判断1 -a 判断2       逻辑与,当两个判断都成立时,结果为真
   
   判断1 -o 判断2       逻辑或,当有一个判断时,结果为真
     
   !                    非,使原始的判断式取反
   ```



## if判断语句

### 单分支语句

```sh
if [ 条件表达式 ];then  

  程序
  
fi                   
```

或

```sh
if [ 条件表达式 ]
  
  then

     程序
     
fi
```

 例：判断 22 是否大于 23

```sh
 if [ 23 -gt 22 ]    #中括号两端要有空格

   then  

         echo "ok"

fi
```

   

### 双分支语句

```sh
if [ 条件表达式 ]

   then

       程序

else

       程序

fi
```

 

### 多分支语句

```sh
if [ 条件表达式1 ]

   then
    
        程序

elif [条件表达式2 ]

   then
    
       程序

elif [ 条件表达式3 ]

   then
    
        程序

else

     程序

fi
```

 

### 复杂条件

1.

```sh
if [ 条件判断一 ]  &&  [ 条件判断二 ]; then

          程序

elif  [ 条件判断三 ]  &&  [ 条件判断四 ]; then

          程序

else

         程序
    
fi    
```

2.

```sh
if [ 条件判断一  -a  条件判断二  -a  条件判断三 ]; then

      程序

elif [ 条件判断一  -o  条件判断二 ];then

      程序

else  

      程序

fi
```

3.

```sh
if [[ 条件判断一  &&  条件判断二 ]];then

      程序

elif [[ 条件判断三  ||  条件判断四 ]];then

      程序

else

      程序

fi      
```

####  **[[  ]]和[  ]的区别：**

```sh
1、所有的字符与逻辑运算符直接用"空格"分开，不能连到一起。

2、在[ ]表达式中，常见的>、<需要加转义符\

3、进行逻辑运算符 &&、|| 比较时；如果用的[]符号，则用在外面，如果在[ ]里面进行逻辑与或的比较，则用 -a、-o 进行表示

4、[[ ]运算符只是[ ]运算符的扩充；能够支持<、>符号运算不需要转义符；

5、[[ ]]用 && 表示逻辑"与";用 || 表示逻辑"或"

6、[[ ]]可以进行算术扩展,而[ ]不可以。

7、[[ ]]支持正则，而[ ]不行。

8、双方括号 [[]] 可用于高级字符串处理，比如"模糊匹配"  
```

## case 判断语句

```sh
case $变量名 in

    "值1") 
    
          程序
    
    ;;          #要以两个分号结尾
    
    "值2")
    
          程序
    
    ;;

    ……
     
    *)           #以上都不匹配,则执行该程序, * 两端没有双引号

          程序
      
    ;;
esac
```

 例：当命令行参数是1时输出周一，是2时输出周二，是3时输出周三，其他输出other

```sh
#!/bin/bash

case $1 in 

   "1")

       echo "周一"

   ;;

   "2")

       echo "周二"

   ;;

   "3")

       echo "周三"

   ;;

   *)

       echo "other"

    ;;
esac
```

## for循环

1.

```sh
for 变量 in 值1 值2 值3…

do

      程序
      
done
```

 例：打印命令行输入的参数

```sh
#!/bin/bash

for i in "$*"

do

   echo "the num is $i"

done

echo "-------------------------------"

for j in "$@"

do

   echo "the num is $j"

done

#测试
./test.sh 1 2 3

the num is 1 2 3
-------------------------------
the num is 1
the num is 2
the num is 3
```

 

 2.

```sh
for (( 初始值;结束条件;变量的变化 ))

do 

     程序

done 
```

例：计算从1加到100

```sh
#!/bin/bash

sum=0

for((i=1;i<=100;i++))

do

    sum=$[$sum+$i]     #可以有空格也可以没有,因为是变量参与运算，所以用 $[ ]

done

echo "sum=$sum"
```

 **break       跳出整个循环**

 **continue    跳过本次循环，继续下次循环**



## while循环

```sh
while [ 条件判断式 ]  

do  

     程序

done
```

 例：从命令行输入一个数，计算从1加到n 的值为多少

```sh
#!/bin/bash

sum=0

i=0

while [ $i -le $1 ]

do

   sum=$(($sum+$i))        

   i=$[$i+1]

done

echo  "sum=$sum" 
```

 

## until 循环

**当条件不成立时则执行程序**

```sh
until [ 条件表达式 ]  #中括号两边不能没有空格

do

    程序

done
```

 例：计算从1加到100的值

```sh
#!/bin/bash

i=1

s=0

until [ $i -gt 100 ]  #中括号两边不能没有空格

do

   s=$(( $s+$i ))   #可以没有空格

   i=$[ $i+1 ]    #可以没有空格

done

echo "the sum is $s"
```

 

## exit语句

#### **exit 返回值**

&ensp;&ensp;&ensp;在脚本中如果碰到了exit语句，则后续的程序就不再执行，而是直接退出脚本

&ensp;&ensp;&ensp;如果exit命令之后定义了返回值，那么这个脚本执行之后的返回值就是自己定义的返回值，可以通过`$?`查看

&ensp;&ensp;&ensp;如果exit之后没有定义返回值，那么脚本执行之后的返回值是执行exit命令之前，最后一条命令的返回值

 

## 自定义函数

```sh
function 函数名()

{

  …

}
```

调用：函数名 [值]



例：输入两个数计算和 

```sh
function getsum()

{

     sum=$[ $n1+$n2 ]

     echo "和=$num"

}

read -p "请输入第一个数:" n1

read -p "请输入第二个数:" n2

getsum $n1 $n2
```

 

 

 

 

 

 

 

   

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

​      

​      

​      

​      

​      

​      

​      
