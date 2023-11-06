---
title: Spring基础概念
author: 
  name: 北斗星司
category:
  - 面试题
tag:
  - Spring
date: 2023-4-22 10:08:32
icon: file
---





### Spring的优势

- 通过控制反转和依赖注入实现**松耦合**。

- 支持**面向切面**的编程，并且把应用业务逻辑和系统服务分开。
- 通过切面和模板**减少样板式代码**。
- **方便集成各种优秀框架**。内部提供了对各种优秀框架的直接支持(如：Hibernate、MyBatis等)。
- **方便程序的测试**。Spring支持Junit4，添加注解便可以测试Spring程序。

### AOP

  面向切面编程，作为面向对象的一种补充，将公共逻辑(事务管理、日志、缓存等)封装成切面，跟业务代码进行分离，

  可以减少系统的重复代码和降低模块之间的耦合度。**切面就是那些与业务无关，但所有业务模块都会调用的公共逻辑。**

### IoC

- **控制** ：指的是对象创建(实例化、管理)的权力

- **反转** ：控制权交给外部环境(Spring 框架、IoC 容器)

 控制反转，是一种设计理念，**将对象创建和组装的主动控制权交给了spring容器**，控制的动作被反转了，降低了系统的耦合度，利于系统维护和扩展。

**通过反射实现对其他对象的控制，包括初始化、创建、销毁等，解放手动创建对象的过程。**

  将对象之间的相互依赖关系交给 IoC 容器来管理，并由 IoC 容器完成对象的注入。这样可以很大程度上简化应用的开发，把应用从复杂的依赖关系中解放出来。 

  IoC容器就像是一个工厂，当需要创建一个对象的时候，只需要配置好配置文件/注解即可，完全不用考虑对象是如何被创建出来的。



### DI

   指Spring创建对象的过程中，将对象依赖属性(常量、对象、集合)通过配置传递给该对象。通过某些注入方式可以让系统更灵活。

### Spring容器/IoC容器

  程序启动的时候会创建spring容器，会给spring容器一个清单，清单中列出了需要创建的对象以及对象依赖关系，

  **spring容器会创建和组装好清单中的对象**，然后将这些对象存放在spring容器中，当程序中需要使用的时候，

  可以到容器中查找获取，然后直接使用。

  **IoC容器是具有依赖注入功能的容器**，负责对象的实例化、对象的初始化，对象和对象之间依赖关系配置、对象的销毁、对外提供对象的查找等操作，**对象的整个生命周期都是由容器来控制**。

  我们需要使用的对象都由IoC容器进行管理，不需要再去手动通过new的方式去创建对象，由IoC容器直接帮我们组装好，

   当**需要使用的时候直接从IoC容器中直接获取就可以了。**



### IoC初始化过程

1. 从XML中读取配置文件。

2. 将bean标签解析成 BeanDefinition，如解析 property 元素， 并注入到 BeanDefinition 实例中。

3. 将 BeanDefinition 注册到容器 BeanDefinitionMap 中。

4. BeanFactory 根据 BeanDefinition 的定义信息创建实例化和初始化 bean。

 单例bean的初始化以及依赖注入一般都在容器初始化阶段进行，只有懒加载(lazy-init为true)的单例bean是在应用第一次

 调用getBean()时进行初始化和依赖注入。

  **多例bean 在容器启动时不实例化，只有调用了getBean( )才进行实例化。**



### 将类声明为Bean的注解

   使用`@Configuration`与`@Bean`注解

   &ensp;`@Component` ：通用的注解，可标注任意类为 Spring组件。如果一个 Bean 不知道属于哪个层，可以使用

​    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;@Component注解标注。

   &ensp;`@Repository` : 对应持久层即 Dao 层，主要用于数据库相关操作。

   &ensp;`@Service` : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。

   &ensp;`@Controller` : 对应 Spring MVC 控制层，主要用于接收用户请求并调用 `Service` 层返回数据给前端页面。



### @Bean和@Component的区别

1. 都是使用注解定义 Bean。@Bean 是使用 Java 代码装配 Bean，@Component 是自动装配 Bean。

2. **@Component注解用在类上，表明一个类会作为组件类**，并告知Spring要为这个类创建bean，每个类对应一个 Bean。

3. **@Bean注解用在方法上，表示这个方法返回一个 Bean。**

   @Bean需要在配置类中使用，即类上需要加上@Configuration注解。

4. @Bean 注解更加灵活，当需要将第三方类装配到 Spring 容器中，因为没办法直接在源代码上添加@Component注解，

   所以只能使用@Bean 注解的方式。



### 注入Bean的注解

  Spring 内置的 `@Autowired` 以及 JDK 内置的 `@Resource` 和 `@Inject` 都可以用于注入 Bean。



### @Autowired和@Resource的区别

1. @Autowired注解是默认按照类型(byType)装配依赖对象的，但是如果存在多个类型⼀致的bean，则无法通过byType

   注入时，就会再使用byName来注入，如果还是无法判断注入哪个bean则会报错：UnsatisfiedDependencyException。

​    &ensp;&ensp;例：`UserService` 接口有两个实现类: `UserServiceImpl1`和 `UserServiceImpl2`，且它们都已经被 Spring 容器所管理。

```java
@Service
public class UserServiceImpl1 implements UserService

@Service
public class UserServiceImpl2 implements UserService

/*
  报错，byName 和 byType 都无法匹配到 bean  
  因为通过类型匹配时，发现UserService有两个实现类，无法确定是哪个，然后通过name匹配，
  但userService无法匹配IoC容器中的id(此处指的是userServiceImpl1和userServiceImpl2)，于是报错。
  通过注解注入到IoC容器的id值默认是其类名首字母小写
*/  
@Autowired
private UserService userService;

// 正确注入 UserServiceImpl1 对象对应的 bean
@Autowired
private UserService userServiceImpl1;

// 正确注入  UserServiceImpl1 对象对应的 bean
// userServiceImpl1 就是上面所说的名称
@Autowired
@Qualifier(value = "userServiceImpl1")
private UserService userService;
```

2. @Resource是JDK提供的注解，它会首先按照byName来装配，如果找不到bean，会自动动按照byType再找⼀次。

   `@Resource` 有两个比较重要且常用的属性：`name`(名称)、`type`(类型)。

   如果仅指定 `name` 属性则注入方式为`byName`，如果仅指定`type`属性则注入方式为`byType`，如果同时指定`name` 和`type`属性，则注入方式为`byType`+`byName`。

- 如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常

- 如果指定了name，则从上下文中查找名称(id)匹配的bean进行装配，找不到则抛出异常
- 如果指定了type，则从上下文中找到类型匹配的唯一bean进行装配，找不到或者找到多个，都会抛出异常
- 如果既没有指定name，又没有指定type，则自动按照byName方式进行匹配；如果没有找到，则按照类型进行匹配

```java
// 报错，byName 和 byType 都无法匹配到 bean
@Resource
private UserService userService;

// 正确注入 UserServiceImpl1 对象对应的 bean
@Resource
private UserService userServiceImpl1;

// 正确注入 UserServiceImpl1 对象对应的 bean
@Resource(name = "userServiceImpl1")
private UserService userService;
```



### @Qualifier注解的作用

  当需要创建多个相同类型的 bean 并希望仅使用属性装配其中一个 bean 时，可以使用@Qualifier 注解和 @Autowired 

  通过指定应该装配哪个 bean 来消除歧义。

### Bean的作用域

  **singleton** : IoC 容器中只有唯一的 bean 实例。**Spring 中的 Bean 默认都是单例的，是对单例设计模式的应用。**

  **prototype** : 每次获取都会创建一个新的 bean 实例。也就是说，连续 `getBean()` 两次，得到的是不同的 Bean 实例。

  **request**(仅 Web 应用可用): 每次 HTTP 请求都会产生一个新的 bean(请求 bean)，该 bean 仅在当前 HTTP request 内有效

  **session**(仅 Web 应用可用): 每一次来自新 session 的 HTTP 请求都会产生一个新的 bean(会话 bean)，该 bean 仅在当前HTTP session 内有效。

  **application/global-session**(仅 Web 应用可用)：每个 Web 应用在启动时创建一个 Bean(应用 Bean)，该 bean 仅在当前应用启动时间内有效。

  **websocket** (仅 Web 应用可用)：每一次 WebSocket 会话产生一个新的 bean。

**配置作用域**

  1.xml方式

```xml
<bean id="..." class="..." scope="singleton"></bean>
```

  2.注解方式：

```java
@Bean
@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public Person personPrototype() {
    
    return new Person();
}

```



### 单例Bean的安全问题

  如果多个线程的业务逻辑有对单例状态的修改(体现为此单例的成员属性)，则必须考虑线程安全问题。

  若每个线程中对全局变量、静态变量只有读操作，而无写操作，那么不会有线程安全问题；

  若有多个线程同时执行写操作，一般都需要考虑线程同步，否则就可能影响线程安全。

**常见的有两种解决办法：**

1. 在 Bean 中尽量避免定义可变的成员变量。

2. 在类中定义一个 `ThreadLocal` 成员变量，将需要的可变成员变量保存在 `ThreadLocal` 中。

**无状态bean和有状态bean**

- 有实例变量的bean，称为有状态bean，可以保存数据，是非线程安全的。

- 没有实例变量的bean，称为无状态bean，不能保存数据，是线程安全的。

 **在Spring中无状态的Bean适合用单例模式，这样可以共享实例提高性能。**

 **有状态的Bean在多线程环境下不安全，一般用Prototype模式或者使用ThreadLocal解决线程安全问题。**



### Bean的生命周期

bean 的后置处理器，bean 生命周期有七步

   (1)通过构造器创建 bean 实例(无参数构造)

   (2)为 bean的属性设置值和对其他 bean 引用(调用 set 方法，即，依赖注入)

   (3)把bean实例传递给后置处理器中的方法 postProcessBeforeInitialization

   (4)调用 bean 的初始化方法(需要进行配置初始化方法)

   (5)把 bean实例传递给 bean 后置处理器中的方法 postProcessAfterInitialization

   (6)bean可以使用了(对象获取到了)

   (7)当容器关闭时候，调用 bean 的销毁方法(需要进行配置销毁方法)



### 术语

1. 连接点：类里面哪些方法可以被增强，这些方法称为连接点。

   &ensp;&ensp;连接点是在应用执行过程中能够插入切面的一个点。这个点可以是调用方法时、抛出异常时、甚至修改一个字段时。

​        &ensp;&ensp;&ensp;&ensp;**切面代码可以利用这些点插入到应用的正常流程之中，并添加新的行为。**

2. 切入点：实际被真正增强的方法，称为切入点。

3. 通知(Advice)：实际增强的逻辑部分称为通知。

4. 切面(Aspect)：切入点+通知。

5. 织入(Weaving)：

   **将通知应用到目标对象，进而生成代理对象的过程**。

   在目标对象的生命周期里有以下时间点可以进行织入：

​       &ensp;&ensp;&ensp;&ensp;编译期：切面在目标类编译时被织入。AspectJ的织入编译器是以这种方式织入切面的。

​       &ensp;&ensp;&ensp;&ensp;类加载期：切面在目标类加载到JVM时被织入。需要特殊的类加载器，它可以在目标类被引入应用之前增强该目标类

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;的字节码。AspectJ5的加载时织入就支持以这种方式织入切面。

​       &ensp;&ensp;&ensp;&ensp;运行期：切面在应用运行的某个时刻被织入。一般情况下，在织入切面时，AOP容器会为目标对象动态地创建一个

​     &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;代理对象。SpringAOP就是以这种方式织入切面。



### 通知的类型

  **Before**(前置通知)：在目标对象的方法调用之前触发。

  **After**(后置通知)：在目标对象的方法调用之后触发，此时不会关心方法的输出是什么。

  **AfterReturning**(返回通知)：目标对象的方法调用完成，在返回结果值之后触发。

  **AfterThrowing**(异常通知) ：目标对象的方法运行中抛出异常后触发。AfterReturning 和 AfterThrowing 两者互斥。

​						&ensp;&ensp;&ensp;如果方法调用成功无异常，则会有返回值；如果方法抛出了异常，则不会有返回值。

  **Around**(环绕通知)：编程式控制目标对象的方法调用。环绕通知是所有通知类型中可操作范围最大的一种，

​        &ensp;&ensp;&ensp;因为它可以直接拿到目标对象，以及要执行的方法，所以环绕通知可以任意的在目标对象的方法调用前后搞事，

​      &ensp;&ensp;&ensp;甚至不调用目标对象的方法。

### 代理

  假设有类A和B实现了接口C中的方法，现在需要在不修改源代码的基础上在方法执行之前执行其他的代码。

  此时，只需要给C创建一个代理类，通过代理类去访问目标对象，需要添加的一些共有的功能都放在代理中，

  当有其他需求的时候，只需修改ServiceProxy的代码，方便系统的扩展和测试。

  **使用一个代理将对象包装起来，然后用该代理对象取代原始对象。任何对原始对象的调用都要通过代理。**

  **代理对象决定是否以及何时将方法调用转到原始对象上。**

  Spring有两种实现方式：静态代理和动态代理。

  **静态代理**

  静态代理：代理类在编译阶段生成，在编译阶段将通知织入Java字节码中，也称编译时增强。AspectJ使用的是静态代理。

  &ensp;&ensp;缺点：代理对象需要与目标对象实现一样的接口，并且实现接口的方法，有冗余代码。同时，一旦接口类中增加方法，

​             目标对象与代理对象都要维护。         

  **动态代理**

  动态代理：代理类在程序运行时创建，AOP框架不会去修改字节码，而是**在内存中临时生成一个代理对象**，

​         &ensp;&ensp;**在运行期间对业务方法进行增强，不会生成新类**。             

### 两种动态代理的区别

Spring AOP中的动态代理主要有两种方式：JDK动态代理和CGLIB动态代理。

**JDK动态代理**

 如果目标类实现了接口，Spring AOP会选择使用JDK动态代理目标类。代理类根据目标类实现的接口动态生成，

 不需要自己编写，生成的代理类和目标类都实现相同的接口。JDK动态代理的核心是`InvocationHandler`接口和`Proxy`类。

 缺点：**目标类必须有实现的接口。如果某个类没有实现接口，那么这个类就不能用JDK动态代理。**

**CGLIB(Code Generation Library)动态代理**

**通过继承实现。** 如果目标类没有实现接口，那么Spring AOP会选择使用CGLIB来动态代理目标类。

CGLIB**可以在运行时动态生成类的字节码，动态创建目标类的子类对象，在子类对象中增强目标类。**

CGLIB是通过继承的方式实现的动态代理，因此如果某个类被标记为`final`，那么它是无法使用CGLIB做动态代理的。

 CGLIB本质上是通过动态的生成一个子类去覆盖所要代理的类(非final修饰的类和方法)。

 Enhancer可能是CGLIB中最常用的一个类，和Proxy不同的是，Enhancer既能够代理普通的class，也能够代理接口。

 **Enhancer创建一个被代理对象的子类并且拦截所有的方法调用(包括从Object中继承的toString和hashCode方法)。**

 Enhancer不能够拦截final方法，例如Object.getClass()方法，这是由于Java final方法语义决定的。基于同样的道理，

   &ensp;&ensp;**Enhancer也不能对final类进行代理操作。**

优点：目标类不需要实现特定的接口，更加灵活。

什么时候采用哪种动态代理？

1. 如果目标对象实现了接口，默认情况下会采用JDK的动态代理实现AOP

2. 如果目标对象实现了接口，可以强制使用CGLIB实现AOP

3. 如果目标对象没有实现了接口，必须采用CGLIB库

**两者的区别**：

1. JDK动态代理使用jdk中的类Proxy来创建代理对象，它**使用反射技术**来实现，不需要导入其他依赖。

   **CGLIB需要引入相关依赖**：asm.jar，它使用字节码增强技术来实现。

2. 如果目标类实现了接口，Spring Aop默认使用JDK动态代理方式来增强方法，没有实现接口的时候使用CGLIB动态代理。





































