---
title: Mybatis
author: 
  name: 北斗星司
category:
  - 面试题
tag:
  - Mybatis
date: 2023-4-22 10:08:32
icon: file
---





## Mybatis

### ORM

  Object Relationship Mapping：对象关系映射。对象指面向对象，关系指关系型数据库。

  Java 到 MySQL 的映射，开发者可以以面向对象的思想来管理数据库。

  **为什么说 MyBatis 是半自动 ORM 映射工具？它与全自动的区别在哪里？**

  Hibernate 属于全自动 ORM 映射工具，使用 Hibernate 查询关联对象或者关联集合对象时，可以根据对象关系模型直接

  获取，所以它是全自动的。而 **MyBatis 在查询关联对象或关联集合对象时，需要手动编写 sql 来完成**，所以，称之为半自动 ORM 映射工具。

### Executor执行器

  MyBatis 有三种基本的 Executor执行器：

- **SimpleExecutor：** 每执行一次 update 或 select，就开启一个 Statement 对象，用完立刻关闭 Statement 对象。

- **ReuseExecutor：** 执行 update 或 select，以 sql 作为 key 查找 Statement 对象，存在就使用，不存在就创建，用完后，

  不关闭Statement 对象，而是放置于 Map<String, Statement>内，供下一次使用。

   即，**重复使用 Statement 对象**。

- **BatchExecutor：** 执行 update(没有 select，JDBC 批处理不支持 select)，将所有 sql 都添加到批处理中(addBatch())，

  等待统一执行(executeBatch())，它缓存了多个 Statement 对象，每个 Statement 对象都是 addBatch()完毕后，

  等待逐一执行 executeBatch()批处理。与 JDBC 批处理相同。

作用范围：Executor 的这些特点，都严格限制在 SqlSession 生命周期范围内。



### 动态SQL

  MyBatis 动态 sql 可以在 xml 映射文件内，以标签的形式编写动态 sql，完成逻辑判断和动态拼接 sql 的功能。

  原理：使用 OGNL 从 sql 参数对象中计算表达式的值，根据表达式的值动态拼接 sql，以此来完成动态 sql 的功能。

  MyBatis 提供了 9 种动态 sql 标签:

- `<if></if>`
- `<where></where>(trim,set)`
- `<choose></choose>(when, otherwise)`
- `<foreach></foreach>`
- `<bind/>`

### 不同的 xml 映射文件，id 是否可以重复

 不同的 xml 映射文件，如果配置了 namespace，那么 id 可以重复；如果没有配置 namespace，那么 id 不能重复；

 原因是 namespace+id 是作为 `Map<String, MappedStatement>` 的 key 使用的，如果没有 namespace，就剩下 id，

 那么id 重复会导致数据互相覆盖。有了 namespace，自然 id 就可以重复，namespace 不同，namespace+id 也就不同。

### 延迟加载

 不同的业务需求需要查询不同的表，根据具体的业务需求来动态减少数据表查询的工作就是延迟加载。

 MyBatis 仅支持 association 关联对象和 collection 关联集合对象的延迟加载，association 指的是一对一，collection 

 指的是一对多查询。在 MyBatis 配置文件中，可以配置是否启用延迟加载 `lazyLoadingEnabled=true|false。`

 它的原理是，使用 `CGLIB` 创建目标对象的代理对象，当调用目标方法时，进入拦截器方法，比如调用 `a.getB().getName()` ，拦截器 

`invoke()` 方法发现 `a.getB()` 是 null 值，那么就会单独发送事先保存好的查询关联 B 对象的 sql，把 B 查询上来，

 然后调用a.setB(b)，于是 a 的对象 b 属性就有值了，接着完成 `a.getB().getName()` 方法的调用。



### 返回查询结果

映射形式：

   &ensp;&ensp;第一种是使用 `<resultMap>` 标签，逐一定义列名和对象属性名之间的映射关系。

   &ensp;&ensp;第二种是使用 sql 列的别名功能，将列别名书写为对象属性名。

有了列名与属性名的映射关系后，MyBatis 通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，

那些找不到映射关系的属性，是无法完成赋值的。



### 参数

  在SQL语句中，只能使用 #{arg0} 或 #{arg1} 或者使用 #{param1} 或 #{param2}  来指代第一个参数和第二个参数

  获取参数的两种方式：

```
${}   本质是字符串拼接

#{}   本质是占位符赋值

${}	  使用字符串拼接的方式拼接sql，给字符串类型或日期类型的字段进行赋值时，需要手动加单引号

#{}   使用占位符赋值的方式拼接sql，给字符串类型或日期类型的字段进行赋值时，不需要手动加单引号
```

 如果只有一个参数，则两种方式都可以获取参数。

 如果有多个参数，则会将这些参数放在map集合中，可使用arg或param代表参数，arg从0开始，param从1开始。

 如果需要多个参数，此时可以手动创建map集合，将这些数据放在map中，只需要通过${}或 #{}访问map集合的键

 &ensp;&ensp;就可以获取相对应的值。

 如果参数为实体类对象，此时可以使用${}和#{}，通过访问实体类对象中的属性名获取属性值。

### 缓存

  使用缓存可以减少 Java 应用与数据库的交互次数，从而提升程序的运行行效率。

####   **一级缓存**

​    SqlSession 级别，默认开启，并且不能关闭。

​    操作数据库时需要创建 SqlSession 对象，在对象中有一个 HashMap 用于存储缓存数据，

​    不同的SqlSession 之间缓存数据区域是互不影响的。

​    一级缓存的作用域是 SqlSession 范围的，当在同一个 SqlSession 中执行两次相同的 SQL 语句时，

​      &ensp;&ensp;第一次执行完毕会将结果保存到缓存中，第二次查询时直接从缓存中获取。

   如果 SqlSession 执行了 DML 操作(insert、update、delete)，MyBatis 必须将缓存清空以保证数据的准确性。

**使一级缓存失效的四种情况：**  

1. 不同的SqlSession对应不同的一级缓存  

2. 同一个SqlSession但是查询条件不同

3. 同一个SqlSession两次查询期间执行了任何一次增删改操作

4. 同一个SqlSession两次查询期间手动清空了缓存

#### **二级缓存**

​    Mapper 级别，默认关闭，可以开启。

​    使用二级缓存时，多个 SqlSession 使用同一个 Mapper 的 SQL 语句操作数据库，得到的数据会存在二级缓存区，

​    同样是使用 HashMap 进行数据存储，相比较于一级缓存，二级缓存的范围更大，多个SqlSession 可以共用二级缓存。

​    二级缓存是多个 SqlSession 共享的，其作用域是 Mapper 的同一个 namespace，

​        &ensp;&ensp;不同的 SqlSession两次执行相同的 namespace 下的 SQL 语句，且参数也相等，则第一次执行成功之后会将数据保存到

​           &ensp;&ensp;&ensp;二级缓存中，第二次可直接从二级缓存中取出数据。

#### **缓存查询的顺序**

   • 先查询二级缓存，因为二级缓存中可能会有其他程序已经查出来的数据，可以拿来直接使用

   • 如果二级缓存没有命中，再查询一级缓存

   • 如果一级缓存也没有命中，则查询数据库

   • SqlSession关闭之后，一级缓存中的数据会写入二级缓存























