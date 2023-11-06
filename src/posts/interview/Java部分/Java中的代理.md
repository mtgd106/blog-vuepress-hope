---
title: Java中的代理
author: 
  name: 北斗星司
category:
  - 面试题
tag:
  - Java
date: 2023-4-22 10:08:32
icon: file
---





## Java代理模式

### 作用

  **使用代理对象来代替对真实对象的访问，这样可以在不修改原目标对象的前提下，提供额外的操作，扩展目标对象的功能**

  **主要作用是扩展目标对象的功能，比如说在目标对象的某个方法执行前后可以增加一些自定义的操作。**

### 静态代理

   静态代理中，**对目标对象的每个方法的增强都是手动完成的**，非常不灵活(比如接口一旦新增加方法，目标对象和

   代理对象都要进行修改)且麻烦(**需要对每个目标类都单独写一个代理类**)。

   实际应用场景非常非常少，日常开发几乎看不到使用静态代理的场景。

  从 JVM 层面来说， **静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。**

静态代理实现步骤：

1. 定义一个接口及其实现类；

2. 创建一个代理类同样实现这个接口

3. 将目标对象注入进代理类，然后在代理类的对应方法中调用目标类的对应方法。

   这样的话，就可以通过代理类屏蔽对目标对象的访问，并且可以在目标方法执行前后做一些自己想做的事情。

### 动态代理

   相比于静态代理来说，动态代理更加灵活。不需要针对每个目标类都单独创建一个代理类，也不需要必须实现接口，可以直接代理实现类( CGLIB 动态代理机制)。

​    **从 JVM 角度来说，动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。**

#### **JDK动态代理**

  **在 Java 动态代理机制中 `InvocationHandler` 接口和 `Proxy` 类是核心。**

  `Proxy` 类中使用频率最高的方法是：`newProxyInstance()` ，这个方法主要用来生成一个代理对象。

```java
public static Object newProxyInstance(ClassLoader loader,
                                          
                                      Class<?>[] interfaces,
                                          
                                      InvocationHandler h) throws IllegalArgumentException
    {
        ......
    }

这个方法一共有 3 个参数：

  loader :类加载器，用于加载代理对象。
    
  interfaces : 被代理类实现的一些接口；
    
  h : 实现了 InvocationHandler 接口的对象；
```

  要实现动态代理的话，还必须实现`InvocationHandler` 来自定义处理逻辑。 

  当动态代理对象调用一个方法时，这个方法的调用就会被转发到实现`InvocationHandler` 接口类的 `invoke` 方法来调用。

```java
public interface InvocationHandler {

    /**
     * 当使用代理对象调用方法的时候实际会调用到这个方法
     */
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
}

```

  `invoke()` 方法有三个参数：

1. **proxy** ：动态生成的代理类

2. **method** : 与代理类对象调用的方法相对应

3. **args** : 当前 method 方法的参数

 即，**通过Proxy 类的 newProxyInstance() 创建的代理对象在调用方法的时候，实际会调用到实现InvocationHandler** 

   &ensp;&ensp;&ensp;&ensp;**接口的类的 `invoke()`方法。** 可以在 `invoke()` 方法中自定义处理逻辑，比如在方法执行前后做什么事情。

#### **使用及代码**

1. 定义一个接口及其实现类；

2. 自定义 `InvocationHandler` 并重写`invoke`方法，在 `invoke` 方法中会调用原生方法(被代理类的方法)并自定义一些处理逻辑；

3. 通过 `Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h)` 方法创建代理对象

```java
//发送短信的接口
public interface SmsService {
    
    String send(String message);
}

//实现发送短信的接口
public class SmsServiceImpl implements SmsService {
    
    public String send(String message) {
        
        System.out.println("send message:" + message);
        
        return message;
    }
}


//定义JDK动态代理类
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class DebugInvocationHandler implements InvocationHandler {
    
    //被代理的对象
    private final Object target;

    public DebugInvocationHandler(Object target) {
        
        this.target = target;
    }


    public Object invoke(Object proxy, Method method, Object[] args) throws InvocationTargetException, 
    
    IllegalAccessException {
        
        //调用方法之前，可以添加自己的操作
        System.out.println("before method " + method.getName());
        
        Object result = method.invoke(target, args);
        
        //调用方法之后，同样可以添加自己的操作
        System.out.println("after method " + method.getName());
        
        return result;
    }
}

//获取代理对象的工厂
public class JdkProxyFactory {
    
    public static Object getProxy(Object target) {
        
        return Proxy.newProxyInstance(
                
            target.getClass().getClassLoader(), // 目标类的类加载器
                
            target.getClass().getInterfaces(),  // 代理需要实现的接口，可指定多个
                
            new DebugInvocationHandler(target)   // 代理对象对应的自定义 InvocationHandler
        );
    }
}


//使用
SmsService smsService = (SmsService) JdkProxyFactory.getProxy(new SmsServiceImpl());

smsService.send("java");

```



#### **CGLIB代理**

JDK 动态代理有一个最致命的问题是**其只能代理实现了接口的类。**

为了解决这个问题，可以用 CGLIB 动态代理机制来避免。

**在 CGLIB 动态代理机制中 `MethodInterceptor` 接口和 `Enhancer` 类是核心。**

需要自定义 `MethodInterceptor` 并重写 `intercept` 方法，`intercept` 用于拦截增强被代理类的方法。

```java
public interface MethodInterceptor extends Callback{
    // 拦截被代理类中的方法
    public Object intercept(Object obj, java.lang.reflect.Method method, Object[] args,MethodProxy proxy) 
        
        throws Throwable;

}

obj : 被代理的对象(需要增强的对象)
    
method : 被拦截的方法(需要增强的方法)
    
args : 方法入参
    
proxy : 用于调用原始方法
```

可以通过 `Enhancer`类来动态获取被代理类，当代理类调用方法的时候，实际调用的是 `MethodInterceptor` 中的 `intercept` 方法。

**使用步骤**

1. 定义一个类；

2. 自定义 `MethodInterceptor` 并重写 `intercept` 方法，`intercept` 用于拦截增强被代理类的方法，和 JDK 动态代理中的 `invoke` 方法类似；

3. 通过 `Enhancer` 类的 `create()`方法创建代理类

代码(需要添加依赖)：

```xml
<dependency>
  <groupId>cglib</groupId>
  <artifactId>cglib</artifactId>
  <version>3.3.0</version>
</dependency>
```

```java
//1.实现一个使用阿里云发送短信的类
package com.vkls.dynamicProxy.cglibDynamicProxy;

public class AliSmsService {
    
    public String send(String message) {
        
        System.out.println("send message:" + message);
        
        return message;
    }
}

//2.自定义 MethodInterceptor(方法拦截器)
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * 自定义MethodInterceptor
 */
public class DebugMethodInterceptor implements MethodInterceptor {


    /**
     * @param o           被代理的对象(需要增强的对象)
     * @param method      被拦截的方法(需要增强的方法)
     * @param args        方法入参
     * @param methodProxy 用于调用原始方法
     */
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws 
        Throwable {
        
        //调用方法之前，可以添加自己的操作
        System.out.println("before method " + method.getName());
        
        Object object = methodProxy.invokeSuper(o, args);
        
        //调用方法之后，同样可以添加自己的操作
        System.out.println("after method " + method.getName());
        
        return object;
    }
}


//3、获取代理类
import net.sf.cglib.proxy.Enhancer;

public class CglibProxyFactory {

    public static Object getProxy(Class<?> clazz) {
        
        // 创建动态代理增强类
        Enhancer enhancer = new Enhancer();
        
        // 设置类加载器
        enhancer.setClassLoader(clazz.getClassLoader());
        
        // 设置被代理类
        enhancer.setSuperclass(clazz);
        
        // 设置方法拦截器
        enhancer.setCallback(new DebugMethodInterceptor());
        
        // 创建代理类
        return enhancer.create();
    }
}

//4.使用
AliSmsService aliSmsService = (AliSmsService) CglibProxyFactory.getProxy(AliSmsService.class);

aliSmsService.send("java");

```



#### **两种代理对比**

  **JDK 动态代理只能代理实现了接口的类或者直接代理接口，而 CGLIB 可以代理未实现任何接口的类。** 

  另外， CGLIB 动态代理是通过生成一个被代理类的子类来拦截被代理类的方法调用，因此不能代理声明为 final 类型的类和方法。

  就二者的效率来说，大部分情况都是 JDK 动态代理更优秀，随着 JDK 版本的升级，这个优势更加明显。



### 对比

**灵活性** ：动态代理更加灵活，不需要必须实现接口，可以直接代理实现类，并且可以不需要针对每个目标类都创建一个代理类。另外，静态代理中，接口一旦新增加方法，目标对象和代理对象都要进行修改，这是非常麻烦的！

**JVM 层面** ：静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。而动态代理是在运行时动态生成类字节码，并加载到 JVM 中的。





















