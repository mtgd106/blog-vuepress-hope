---
icon: pen-to-square
date: 2022-01-09
category:
  - java
tag:
  - 面试题
---



## jichu

### 1.重写和重载

####     重写(override)

​    子类对父类方法的实现过程进行重新编写

​       1.参数列表必须完全相同,返回类型可以不相同,但必须是父类返回值的派生类

​	   2.访问权限不能比父类的访问权限更低

​	   3.只有父类的成员方法能被它的子类重写,构造方法不能重写

​	   4.声明为final的方法不能重写,声明为static的方法不能重写,但可以再次声明

​       5.重写方法不能抛出新的检查异常或比被重写方法申明更加宽泛的异常

####     重载(overload)

​      1.一个类中可以定义多个名称相同,但参数列表不同的方法，返回值类型可以相同也可以不同

​             **不同的含义:形参类型不同,形参个数不同,形参顺序不同**

​      2.可以改变返回值类型和访问修饰符

​      3.可以声明新的或更广的检查异常

​      4.方法能在同一个类中或者在一个子类中被重载

| 区别点     | 重写方法                           | 重载方法 |
| ---------- | ---------------------------------- | -------- |
| 方法名     | 不能修改                           | 不能修改 |
| 参数列表   | 不能修改                           | 必须修改 |
| 返回类型   | 和父类相同或者是父类返回类型的子类 | 可以修改 |
| 访问修饰符 | 可以扩大但不能缩小                 | 可以修改 |
| 异常       | 不能抛出新的或者更大的异常         | 可以修改 |



### 2.类

​    每个源文件必须有且只有一个public class,并且类名和文件名保持一致

​    类有三种成员：属性field，方法method，构造器constructor

### 3.构造器

​    创建对象分为四步：

​        1.分配对象空间,并将对象成员初始化为0或空

​        2.执行属性值的显式初始化

​        3.执行构造方法

​        4.返回对象的地址给相关变量

​    构造器声明格式：

​        [修饰符] 类名(形参列表){

​             语句;

​         }

​       1.构造器通过new关键字调用

​	   2.构造器虽然有返回值，但是不能定义返回值类型，不能在构造器中使用return返回某个值

​	   3.如果没有定义构造器，则编译器会自动定义一个无参的构造方法；如果已经定义，则编译器不再自动定义

​	   4.构造器的名称必须和类名一致



### 4.内存

   Java虚拟机的内存分为三个区域：栈stack，堆heap，方法区method area

####    栈

  栈描述的是方法执行的内存模型。每个方法被调用时都用创建一个栈帧(存储局部变量,操作数等)

  JVM为每个线程创建一个栈，用于存放该线程执行方法的信息(实参,局部变量等)

  栈属于线程私有，不能实现线程间的共享

  栈由系统自动分配,速度快

####   堆

 **堆用于存储创建好的对象**和数组(数组也是对象)

  JVM只有一个堆，被所有线程所共享

  堆是一个不连续的存储空间，分配灵活，速度慢

  堆的区域会被垃圾回收器做进一步划分，例如新生代，老年代的划分

####   方法区

 方法区(也是堆)是java虚拟机的规范,有不同的实现方法

 JVM只有一个方法区,被所有线程所共享

 方法区也是堆，用于存储永远不变或唯一的内容(类信息，静态变量，字符串常量等)

 常量池主要存放常量，如文本字符串，final常量值



### 5.垃圾回收机制(Garbage Collection)

 1.Java的内存管理很大程度上是对堆中对象的管理，其中包括对象空间的分配和释放

​    对象空间的分配：使用new关键字创建对象即可

​    对象空间的释放：将对象赋值为null即可

 2.垃圾回收过程

​    1.发现无用的对象(是指：没有任何变量引用的对象)

​    2.回收无用对象占用的内存空间

3.堆内存模型

​		 ![image-20230426095915581](Java基础.assets/image-20230426095915581.png)

​     不同的对象的生命周期是不一样的，所以会对不同的对象存取不同的回收算法，以提高回收效率。

​     将对象分为三种状态：年轻态，年老态，永久代。同时,将处于不同状态的对象放到堆中不同的区域

​     1.年轻态

​         所有新生成的对象首先都是放在Eden区。年轻代区域的目标就是尽可能快速的回收掉那些生命周期短的对象，对应的是

​             Minor GC， 每次Minor GC算法采用效率较高的复制算法，频繁的操作，但是会浪费内存空间。

​         当“年轻代”区域存放满对象后，就将对象存放到年老代区域。

​    2.年老代

​        在年轻代中经历了N(默认15)次垃圾回收后仍然存活的对象，就会被放到年老代中。

​        可以认为年老代中存放的都是一些生命周期较长的对象。

​        随着年老代对象越来越多，我们就需要启动Major GC和Full GC(全量回收)，来一次大扫除，全面清理年轻代区域和年老代

​            区域。

​    3.永久代

​       用于存放静态文件，如Java类、方法等。永久代对垃圾回收没有显著影响。

​       JDK7以前就是“方法区”的一种实现。JDK8以后已经没有“永久代”了，使用metaspace元数据空间和堆替代。

​    Minor GC:

​      用于清理年轻代区域。Eden区满了就会触发一次Minor GC。清理无用对象，将有用对象复制

​          到“Survivor1""Survivor2”区中。

​    Major GC:

​      用于清理老年代区域。

​    Full GC:

​      用于清理年轻代、年老代区域。成本较高，会对系统性能产生影响。    

   **在对JVM调优的过程中，很大一部分工作就是对于Full GC的调节。**

​      有如下原因可能导致Full GC:

​         1.年老代( Tenured)被写满

​         2.永久代(Perm)被写满

​         3.System.gc( )被显式调用

​         4.上一次GC之后Heap的各域分配策略动态变化



### 6.数组

   1.特点

​      1.数组被创建后,大小是不可以改变的

​      2.元素的类型必须是相同类型

​      3.数组类型可以是任何数据类型,包括基本类型和引用类型

​      4.数组变量属于引用类型

   2.声明

​       ElementType[ ]  arr_name;

​       ElementType  arr_name[ ];

   3.初始化

​      静态初始化

​          int[] a={1,2,3,4};

​      动态初始化(数组定义与为数组元素分配空间并赋值的操作分开进行)

​         int[ ] a=new int[2];

​         a[0]=10;

​         a[1]=20; 

​      默认初始化 

​         数组是对象,元素相等于对象的属性,每个元素也按照属性的方法被默认初始化

​         int a[ ]=new int[2];              //默认值:0  0

​         String[ ] s=new String[2];   //默认值:null  null

   4.数组的拷贝

​       System.arraycopy(src,srcpos,dest,destpos,length)

​           src:源数组

​           srcpos:原数组中开始复制的位置

​           dest:目标数组

​           destpos:复制的目标数组中的起始位置

​           length:要复制的数组元素的个数   		

   5.Arrays类中对数组的常用操作

```java
import java.util.Arrays   
 
System.out.println(Arrays.toString(arr));   //打印数组元素
  
Arrays.sort(arr);                 //对数组元素进行排序(从小到大)
  
Arrays.binarySearch(arr,num)     //使用二分法查找指定元素   成功则返回索引值,失败则返回负数
  
Arrays.fill(arr,2,6,100);       //将数组arr中从arr[2]到arr[6]的值改变为100  
  
数组名.length;                  //获取数组元素个数
```

 6.二维数组

```java
int[][] arr=new int[3][3]  //或int[] arr[]  或int arr[][]
     
arr[0]=new int[3];

arr[1]=new int[2];

arr[2]=new int[4];      //二维数组声明
```

​              ![image-20230426095923699](Java基础.assets/image-20230426095923699.png)



## 面向对象

### 1.修饰符

#### 1.访问修饰符

| 修饰符    | 类的使用范围                                                 |
| --------- | ------------------------------------------------------------ |
| private   | 只能在本类中调用                                             |
| default   | 只要是在同一个包中就可以调用                                 |
| protected | 在同一个包中的类可以调用；在其他包中，如果是其子类，也可以调用 |
| public    | 任何地方都可以调用                                           |

 注意：

​    1.对class的权限修饰只能用public或default

​    2.public类可以在任意地方被访问，default类只能被同一个包内部的类访问  

#### 2.非访问修饰符

   1.static

​         修饰变量-----静态变量

​             static用来声明独立于对象的静态变量，无论一个类实例化多少对象，它的静态变量都只有一份拷贝。

​			 **静态变量也被称为类变量；局部变量不能被声明为static变量**

​             类变量可以通过类名访问，也可以通过对象名访问。

​         修饰方法-----静态方法

​             static用来声明独立于对象的静态方法，静态方法可以通过类名访问，也可以通过对象名访问。

​			 静态方法不能使用类的非静态变量，静态方法从参数列表获得数据

   2.finial

​         用来修饰类、方法和变量

​         final 修饰的类不能够被继承

​         final修饰的方法可以被子类继承，但不能被子类重写

​         final修饰的变量为常量，不可修改; 被final修饰的实例变量必须显式指定初始值

   3.abstract 

​         修饰类-----抽象类

​             抽象类不能用来实例化对象，声明抽象类的唯一目的是为了将来对该类进行扩充

​             如果一个类包含抽象方法，那么该类一定要声明为抽象类，否则将出现编译错误

​             抽象类可以包含抽象方法和非抽象方法。抽象类也可以不包含抽象方法。

​         修饰方法----抽象方法

​             抽象方法是一种没有任何实现的方法，该方法的具体实现由子类提供。

​             抽象方法不能被声明为final 和 static。

​             任何继承抽象类的子类必须实现父类的所有抽象方法，除非该子类也是抽象类。



### 2.成员变量和局部变量

   成员变量(属性)

​       1.实例变量

​          声明在一个类中,但在方法和语句块之外,不以static修饰

​          当一个对象被实例化之后,每个实例变量的值就随之确定

​          访问修饰符可以用于实例变量

​       2.类变量(静态变量)

​          声明在一个类中,但在方法和语句块之外,以static修饰

​          无论一个类创建了多少个对象,类只拥有类变量的一份拷贝

​          静态变量存储在静态储存区,初始化后不可改变;在第一次被访问时创建,在程序结束时销毁

​    局部变量

​        声明在方法或语句块中

​		**访问修饰符不能用于修饰局部变量** 

| 区别           | 成员变量                                   | 局部变量                                     |
| -------------- | ------------------------------------------ | -------------------------------------------- |
| 类中位置不同   | 类中方法外                                 | 方法内或者方法声明上                         |
| 内存中位置不同 | 堆内存                                     | 栈内存                                       |
| 生命周期不同   | 随着对象的创建而存在，随着对象的消失而消失 | 随着方法的调用而存在，随着方法的结束而消失   |
| 初始化值不同   | 有默认的初始化值                           | 没有默认的初始化值，必须先定义赋值，才能使用 |



### 3.this和super    

| 关键字 | 访问成员变量   | 访问构造方法 | 访问成员方法        |
| ------ | -------------- | ------------ | ------------------- |
| this   | this.成员变量  | this(...)    | this.成员方法(...)  |
| super  | super.成员变量 | super(...)   | super.成员方法(...) |

​     

### 4.继承中构造方法的访问特点

​    子类中所有的构造方法都会默认访问父类中无参的构造方法

​        1.因为子类会继承父类中的数据，可能还会使用父类的数据。所以初始化之前，先完成父类数据的初始化。     

​        2.每一个子类构造方法的第一条语句默认都是super( );

​    如果父类中没有无参构造方法,只有带参构造方法,则

​        1.通过使用super关键字显式调用父类的带参构造方法

​        2.在父类中自己提供一个无参构造方法              

​      

### 5.多态

####    1.多态的形式

​    具体类多态；抽象类多态；接口类多态

####    2.实现多态的前提

​    1.有继承/实现的关系

​    2.有方法重写

​    3.有父类/接口类引用指向子类/实现类对象   

​       例：Animal  A=new Cat( );    //Cat类是Animal类的子类

####    3.多态中成员访问特点

​    1.成员变量

​       编译看左边，执行看左边 (即，如果Animal类中有该变量,则编译成功,且执行时也是用的Animal中该变量的值)

​     2.成员方法

​        编译看左边，执行看右边 (即，如果Animal类中有该方法，则编译成功；但执行时是看Cat类中该方法的具体实现；

​                                       如果Cat类中没有该方法，则执行父类中的方法)    

   例：

```java
public class Animal{     //定义一个动物类
                       
  public int age=10;
                        
  public void eat(){
                                   
    System.out.println("动物吃东西");                        
  }
}                

//定义一个Cat类继承Animal类,且重写了eat方法
public class Cat extends Animal{    
                               
  public int age=20;
                                
  public int weight=30;
                                                    
  @Override                                 
  public void eat(){
                                          
    System.out.println("猫吃鱼");
  }
                                                                
  public void playGame(){
                                          
    System.out.println("猫捉迷藏");  
  }
}                   
  
Animal a=new Cat();           //父类引用指向子类对象    
  
System.out.println(a.age);    //输出结果为10   
                    
System.out.println(a.weight); //报错  Animal类中没有weight变量
                    
a.eat();        //输出:猫吃鱼
                   
a.playGame();  //报错 
```

####      4.多态中的转型

​    多态的好处：提高了程序的扩展性，定义方法的时候，使用父类型作为参数，将来在使用的时候，使用具体的子类型参与操作

​    多态的弊端：实例化的对象不能使用子类的特有功能，而多态的转型可以解决这个问题。

​    1.向上转型

​       从子到父，父类引用指向子类对象

​       例:Animal a=new Cat();  //这种情况下，a可以调用父类中的所有成员(有权限的前提下)，但不能调用Cat类中的特有成员

​    2.向下转型

​       从父到子,父类引用转为子类对象

​       例:Cat c=(Cat)a;       //将a强制转为Cat类，且堆中不会创建新的对象



### 6.抽象类

​    一个没有方法体的方法应该定义为抽象方法，如果类中有抽象方法，则该类必须定义为抽象类。

​       1.抽象类中可以只有非抽象方法，如果有抽象方法，一定要定义为抽象类。

​       2.抽象类不能直接实例化，但可以参照多态的方式，通过父类引用指向子类对象的方式实现实例化。

​       3.抽象类的子类必须重写父类中的所有抽象方法，除非子类也是个抽象类。

​    抽象类的成员特点

​       1.成员变量可以是变量，也可以是常量

​       2.可以有无参和带参构造方法

​       3.有抽象方法，限定子类必须完成某些动作



### 7.接口类

​    1.子类继承接口类时使用implements关键字

​          public class 类名 implements 接口名{ }

​    2.接口类也需要通过多态的方式进行实例化

​          例：Animal a=new Cat( );    //Animal是接口类,Cat类继承Animal类

​    3.接口的实现类

​          要么重写接口中的所有抽象方法，要么本身是抽象类。**接口中的所有方法默认被abstract修饰。**

​    4.接口类中的成员变量

​          1.成员变量只能是常量，默认被public static final 修饰, 可以通过接口类名直接访问。

​          2.接口类没有构造方法，如果有子类继承接口类，则该子类的super()方法调用的是Object类的构造方法。

​          3.接口类的成员方法只能是抽象方法，默认被public abstract 修饰，且变量和方法不能用private和protected修饰。

​    5.类和接口的关系

​          1.类和类的关系

​             继承关系，只能单继承，但是可以多层继承

​          2.类和接口的关系

​             实现关系；可以单实现，也可以多实现；还可以在继承一个类的同时实现多个接口

​             例：public class InterImpl implements Inter1,Inter2,Inter3{ }

​          3.接口和接口的关系 

​              继承关系，可以单继承，也可以多继承

​              例：public interface Inter3 extends Inter1,Inter2 { }

​    6.接口中的默认方法(Java8新增)

​        1.定义格式

​            public default 返回值类型 方法名称(参数列表) {  } 

​            例：public default void show() { 可以定义具体的实现 }       //**public关键字可以省略**

​         2.特点

​            1.默认方法不是抽象方法，所以不强制重写，但也可以被子类继承、重写，重写时去掉default关键字

​            2.如果有个类继承了多个接口，且这些接口中有重名的默认方法，则该类必须重写该方法。但可以有重名的抽象方法。

​    7.接口中的静态方法

​          1.定义格式

​             public static 返回值类型 方法名 (参数列表) {  }

​             例：public static void show() { 具体实现  }         

​          2.特点

​             1.**静态方法只能通过接口名调用，不能通过实现类或对象名调用。**

​              2.public可以省略，但static不能省略。   

​           3.因为静态方法只能通过接口名调用，所以即使类继承了多个接口，这些接口中也可以有重名的静态方法。

​    8.私有方法

​        当两个默认方法或者静态方法中包含一段相同的代码时,就可以将这段代码封装成一个共性的方法,而这个方法是不需要让别人使用的,

​         因此用私有隐藏起来，所以Java9引入了私有方法.  

​             1.定义格式

​                   1.private 返回值类型 方法名 (参数列表) {  }

​                        private void show( ) {  }

​           	   2.private static 返回值类型 方法名(参数列表) {  }

​                 	  private static void method( ) {  }

​        	2.特点

​           	   默认方法可以调用静态的私有方法和非静态的私有方法。

​           	   静态方法只能调用静态的私有方法。  

**对比：**

   接口中的方法默认是抽象方法，但也可以定义默认方法和静态方法。

   默认方法可以由接口的实现类直接调用，静态方法可以通过接口名直接调用。

   抽象类中可以定义默认方法和静态方法。

   静态方法可以被继承类直接调用，默认方法只能通过实例化对象进行调用。

### 8.内部类

​    在一个类中再定义一个类

```java
 public class Outer{
         
     public class Inner{
          
     }
      
 }  
```

​    1.内部类可以访问外部类的成员，包括私有的

​    2.外部类要访问内部类成员，必须创建对象

​    成员内部类

​        在类中定义一个类,可以看做外部类的成员

​        创建对象:外部类名.内部类名 对象名=外部类对象.内部类对象

​                   例:Outer.Inner a=new Outer().new Inner()      //前提是Inner的权限是public   不常使用

​         一般是在外部类的成员方法中直接创建内部类的对象,然后调用内部类的方法

​      局部内部类

​         在外部类的方法中再定义一个类，外界无法直接使用，需要在方法内部创建对象并使用

​         该类可以直接访问外部类的成员，也可以访问方法内的局部成员变量。

​    

## 集合

​        ![image-20230426095936899](Java基础.assets/image-20230426095936899.png)

### Collection                 

​    1.使用多态的方式创建对象

```java
 Collection<String> s=new ArrayList<String>();
```

​    2.常用方法           

```java
boolean add(E e)              //添加元素  例: s.add("hello");   在集合s中添加元素hello
           
boolean remove(Object o)     //从集合中移除指定元素
           
void clear()                //清空集合中的元素
           
boolean contain(Object o)  //判断集合中是否存在指定元素
           
boolean isEmpty()         //判断集合是否为空
           
 int size()              //求集合的长度,即集合中元素的个数
```

​    3.Collection集合的遍历

​           Iterator:迭代器，集合专用遍历方法

​           Iterator<E> iterator()     返回此集合中元素的迭代器，通过集合的iterator()方法实现

​           Iterator中的常用方法:

​              1.E next()                       //返回迭代器中的下一个元素

​              2.boolean hasNext()    //如果迭代器中有更多的元素,则返回true 

​           例:

```java
Collection<String> s=new ArrayList<String>();   //通过多态创建Collection对象
                
s.add("hello");   //添加元素
                
s.add("world");
                
Iterator<String> it=s.iterator();   //通过Collection对象的iterator方法创建迭代器对象
                
while(it.hasNext()){
                    
    System.out.println(it.next()); //输出迭代器中的下一个元素
                
}
```



#### 1.List

   1.特点

​      有序，可以通过索引访问元素

​      相对于Set来说，list中存储的元素可以重复

   2.特有方法(Collection没有,但ArrayList中有)      

```java
void add(int index,E element)   //在指定索引处插入指定元素

E remove(int index)            //删除指定索引处的元素,返回被删除的元素

E set(int index,E element)    //修改指定索引处的元素,返回被修改的元素

E get(int index)             //返回指定索引处的元素
```

   3.列表迭代器

​      ListIterator:列表迭代器

​      通过List集合的listIterator()方法得到,是List集合特有的迭代器

​      可以沿任一方向遍历列表迭代器,可在迭代期间修改列表,并获取列表中迭代器的当前位置

​      常用方法          

```java
E next()            //返回迭代中的下一个元素
               
boolean hasNext()  //如果迭代具有更多的元素,则返回true
    
E previous()      //返回列表中的上一个元素
    
boolean hasPrevious()    //如果此列表迭代器在相反方向遍历列表时具有更多的元素,则返回true
    
void add(E e)           //将指定元素插入列表   
```

​    例:三种方式遍历list集合     

```java
List<Student> list=new ArrayList<>(); //Student为学生类,有姓名和年龄两个变量
                
Student s1=new Student("vkls",22);         
                
Student s2=new Student("mtgd",22);
                
Student s3=new Student("cly",22);
                
list.add(s1);
                
list.add(s2);
                
list.add(s3);
```

​       1.迭代器方式             

```java
 Iterator<Student> it=list.Iterator();
                   
while(it.hasNext()){
                        
    Student s=it.next();
                        
    System.out.println(s.getName()+s.getAge());
                   
}
```

​        2.普通for循环                   

```java
for(int i=0;i<list.size();i++){
                        
    Student s=list.get(i);
                        
    System.out.println(s.getName()+s.getAge());
                   
}
```

​       3.增强for循环                 

```java
 for(Student s:list){
                        
     System.out.println(s.getName()+s.getAge());
                   
 }
```

   4.LinkedList的特有方法(LinkedList底层是通过链表实现)            

```java
public void addFirst(E e)     //在该列表开头插入指定元素
    
public void addLast(E e)     //将指定的元素追加到此列表的末尾
    
public E getFirst()         //返回此列表中的第一个元素
    
public E getLast()         //返回此列表中的最后一个元素
    
public E removeFirst()    //删除并返回第一个元素
    
public E removeLast()    // 删除并返回最后一个用时 
```



​    5.ArrayList的常用方法

```java
1.public ArrayList();              //创建一个空的集合对象[]

   ArrayList<Integer> array=new ArrayList<>(); //创建一个空的int型集合对象(使用int的包装类)

2.public boolean add(E e);                 //将指定的元素追加到此集合的末尾,元素之间以逗号分隔

3.public void add(int index,E element);   //在此集合的指定位置插入指定的元素

4.public boolean remove(Object o);       //删除指定的元素

5.public E remove(int index);           //删除指定索引处的元素并返回该元素

6.public E set(int index,E element);   //修改指定索引处的元素并返回被修改的元素

7.public int size();                  //返回集合中元素的个数  
```



#### 2.Set集合

​     1.特点

​           不包含重复的元素

​            没有带索引的方法,不能使用for循环遍历

​     2.哈希值

​           JDK根据对象的地址或者字符串或者数字算出来的int类型的数值

​           Object类中有一个方法可以获取对象哈希值

​                public int hashCode():      返回对象的哈希值 

​           同一个对象多次调用hashCode()方法返回的哈希值是相同的

​           默认情况下,不同对象的哈希值是不同的.而重写hashCode()方法,可以实现让不同对象的哈希值相同

​     3.HashSet 

​           底层数据结构是哈希表

​           对集合的迭代顺序不做保证,即不保证存储和取出的元素顺序一致

​           没有带索引的方法,不能使用普通的for循环遍历

​          不包含重复元素

​     4.TreeSet

​          1.元素会按照一定的规则自动排序,具体排序方法取决于构造方法

​                TreeSet()                                            //无参构造方法,根据其元素的自然排序进行排序

​                TreeSet(Comparator comparator)    //根据指定的比较器进行排序

​          2.没有带索引的方法,所以不能使用普通for循环遍历

​          3.不包含重复的元素

​          4.自然比较器Comparable的使用

​                要想使用自然比较器,必须实现Comparable接口,然后重写comparableTo()方法            

```java
 public class Student implements Comparable<Student>{
                        
     ...
                                                
     @Override
                        
     public int comparableTo(Students){
                                 
         return 0;      //该元素与上一个元素相同
                                 
         return 1;      //该元素比上一个元素大
                                 
         return -1;    //该元素比上一个元素小
                                 
     }              
 }
```

 

### MAP集合

#### 1.简介

​      1.定义

​     		Interface Map<K,V>

​          		K:键的类型   V:值的类型

​      2.将键映射到值的对象,不能包含重复的键,每个键可以映射到最多一个值

​      3.使用多态形式的创建Map集合的对象,具体的实现类为HashMap

​             例:Map<String,String> map=new HashMap<String,String>();

#### 2.基本功能 

```java
1.V put(K key,V value)    //添加元素,将指定的值与键相关联

	例:map.put("001","vkls");

2.V remove(Object key)   //根据键删除键值对元素;如果没有,则返回null

3.void clear()          //移除所有的键值对元素

4.boolean containsKey(Object key)         //判断集合是否包含指定的键

5.boolean containsValue(Object value)    //判断集合是否包含指定的值

6.boolean isEmpty()  //判断集合是否为空

7.int size()        //求集合的长度,即键值对的个数               
```

####  3.获取功能      

```java
1.V get(Object key)        //根据键获取值

2.Set<K> keySet()         //获取所有键的值

3.Collection<V> values()           //获取所有值的集合

4.Set<Map.Entry<K,V>> entrySet()  //获取所有键值对对象的集合 
```

####   4.Map集合的遍历

​       1.获取所有键的集合,用keySet( )方法实现

```java
Set<String> keyset=map.keySet();
```

​          遍历键的集合,获取每个键对应的值   

```java
 for(String key:keyset){
                  
     String value=map.get(key);             //根据key获取对应的value
                  
     System.out.println(key +","+ value);  //输出键值对
             
 }    
```

​       2.获取所有键值对对象的集合             

```java
Set<Map.Entry<String,String>> entrySet=map.entrySet();
```

​          遍历键值对对象的集合,得到每一个键值对对象           

```java
for(Map.Entry<String,String> me:entrySet){
                    
    String key=me.getKey();
                    
    String value=me.getValue();
                    
    System.out.println(key +","+ value);  //输出键值对
              
}                 
```



## 泛型

   ![泛型类、泛型接口、泛型方法](./Java基础.assets/javase-32.png)

### 1.泛型类的定义  

​     修饰符 class 类名<类型>{  }

​     如果想在类中定义泛型变量或在类的方法中使用泛型，则类必须定义为泛型类。

​     例1：简单类

```java
public class Student<T>{		//此处的T是任意标识,常见的有T,E,K,V等用于表示泛型
    
    private T var;
    
    public T getVar(){
        
        return var;
    }
    
    public void setVar(T var){  // 设置的类型也由外部决定  
        
        this.var = var ;  
    }  
    
    
}      
            
Student<String> s1=new Student<String>();       //创建对象s1,T就变成了String类型
            
Student<Integer> s2=new Student<Integer>();   //创建对象s2,T就变成了Integer类型
```

例2：多元泛型

```java
class Notepad<K,V>{       // 此处指定了两个泛型类型  
    
    private K key ;     // 此变量的类型由外部决定  
   
    private V value ;   // 此变量的类型由外部决定  
    
    public K getKey(){  
        return this.key ;  
    }  
    
    public V getValue(){  
        return this.value ;  
    }  
    
    public void setKey(K key){  
        this.key = key ;  
    }  
    
    public void setValue(V value){  
        this.value = value ;  
    }  
} 

public class GenericsDemo{  
    public static void main(String args[]){  
       
        Notepad<String,Integer> t = null ;    // 定义两个泛型类型的对象  
        
        t = new Notepad<String,Integer>() ;  // 里面的key为String，value为Integer  
        
        t.setKey("汤姆") ;  // 设置第一个内容  
        
        t.setValue(20) ;   // 设置第二个内容  
        
        System.out.print("姓名；" + t.getKey()) ;      // 取得信息  
        
        System.out.print("，年龄；" + t.getValue()) ;  // 取得信息  
  
    }  
}
```



### 2.泛型方法的定义

 修饰符  <类型>  返回值类型  方法名(类型 变量名){ }

 例：

```java
public  <T>  T  show(T t){    }
```

  定义：

​      ![image-20230426095949485](Java基础.assets/image-20230426095949485.png)

​     在执行newInstance方法时，会调用传入的类的无参构造方法，如果类没有无参构造方法，则会报错。

​     例如，如果实参传入Integer.class则会报错，因为Integer类没有无参构造方法。

​     调用：

​     ![image-20230426095955171](Java基础.assets/image-20230426095955171.png)

  **定义泛型方法时，必须在返回值前边加一个<T>来声明这是一个泛型方法，持有一个泛型T，然后才可以用泛型T作为方法的返回值。**

  `Class<T>`的作用就是指明泛型的具体类型，而`Class<T>`类型的变量c，可以用来创建泛型类的对象。

  为什么要用变量c来创建对象？

​	  既然是泛型方法，就代表着我们不知道具体的类型是什么，也不知道构造方法如何，因此没有办法去new一个对象，但可以利用变量c

​      的newInstance方法去创建对象，也就是利用反射创建对象。



 在调用泛型方法时，可以指定泛型，也可以不指定泛型:

- 在不指定泛型的情况下，泛型变量的类型为该方法中的几种类型的同一父类的最小级，直到Object
- 在指定泛型的情况下，该方法的几种类型必须是该泛型的实例的类型或者其子类

```java
public class Test {  
    
    public static void main(String[] args) {  

        
        /**不指定泛型的时候*/          
        int i = Test.add(1, 2); //这两个参数都是Integer，所以T为Integer类型  
        
        Number f = Test.add(1, 1.2); //这两个参数一个是Integer，一个是Float，所以取同一父类的最小级，为Number  
        //这两个参数一个是Integer，一个是String，所以取同一父类的最小级，为Object  
        Object o = Test.add(1, "asd"); 

        /**指定泛型的时候*/  
        int a = Test.<Integer>add(1, 2); //指定了Integer，所以只能为Integer类型或者其子类  
        
        int b = Test.<Integer>add(1, 2.2); //编译错误，指定了Integer，不能为Float  
        
        Number c = Test.<Number>add(1, 2.2); //指定为Number，所以可以为Integer和Float  
    }  

    //这是一个简单的泛型方法  
    public static <T> T add(T x,T y){  
        return y;  
    }  
}
```



### 3.泛型接口的定义

​    修饰符  interfac  接口名<类型> {    }

​    例: 

```java
1.public interface Iter<T>{        //定义泛型接口
                       
    void show(T t);
                   
  }
                 
2.public class IterImpl<T> implements Iter<T>{  //定义接口的实现类
                            
      @Override                 //重写接口中的方法                          
      public void show(T t){
                                  
          System.out.println(t);                             
      }                     
  }
                 
3.Iter<String> s1=new IterImpl<String>();          //创建对象
                    
  s1.show("vkls");        //输出vkls
```

### 4.类型通配符

  <?>   表示元素可以匹配任何类型

  <? extends 类型>  类型通配符上限

  <? super 类型>     类型通配符下限   

  例1：  

```java
List<? extends Number>    //表示的类型是Number或者其子类
                
List<? extends Number> list1=new ArrayList<Object>();    //程序报错,Object不是Number的子类

List<? extends Number> list2=new ArrayList<Integer>();   //正确,Integer是Number的子类

List<? super Number>    //表示的类型是Number或者其父类       
```

   例2：在方法中使用

```java
public <T> T test(T c) throws IllegalAccessException, InstantiationException {
        
    return c;    
}
//如果对实参的类型没有限制，则在public之后使用<T>

//但，如果希望传入的实参类型是Collection类的子类，则在public后面使用通配符,即：
public <T extends Collection> T test(T t) thorws IllegalAccessException, InstantiationException {
    
    return t;
}

//如果希望是两个类型的子类，即：
public <T extends Collection & Serializable> T test(T t) thorws IllegalAccessException, 

																				InstantiationException {
    
    return t;
}
```



### 5.可变参数

 即参数个数可变

 格式:修饰符  返回值类型  方法名(数据类型...变量名) {    }

 例：public static int sum(int...a) {   }

​    1.这里的变量a其实是一个数组

​    2.如果一个方法有多个参数,且还有可变参数,则可变参数要放在最后

 例：public static int sum(int a,int...b){    }

 应用：

 1.

```java
//1.Arrays工具类中有一个静态方法

//返回由指定数组支持的固定大小的列表
//该列表不能进行添加和删除操作,但可以进行修改操作
public static <T> List<T> aslist(T...a)    

例:
   List<String> list=Arrays.aslist("hello","world");

   System.out.println(list);   //输出[hello,world]

   list.add("java");     //报错,不能改变数组大小

   list.set(0,"java");  //正确,list中的内容为[java,world];
```

   2.

```java
//2.List接口中有一个静态方法
public static <E> List<E> of (E...elements)   //返回包含任意数量元素的不可变列表

例:
       
List<String> list=List.of("hello","world","hello");  
//list中的内容为[hello,world,hello],可以有重复元素,但不可更改
```

   3.

```java
//3.Set接口中有一个静态方法
public static <E> Set<E> of(E...elements);   //返回包含任意数量元素的不可变集合
        
例:
       
 Set<String> set=Set.of("hello","world");  //set中的内容为[hello,world],不能有重复元素,且不可更改 
```

 

### 6.类型擦除

   定义：Java在语法上支持泛型，但是在编译阶段会进行所谓的“**类型擦除**”（Type Erasure），将所有的泛型表示（尖括号中的内容）

​			 都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。

  **类型擦除的原则**：

- 消除类型参数声明，即删除`<>`及其包围的部分。

- 根据类型参数的上下界推断并替换所有的类型参数为原生态类型：如果类型参数是无限制通配符或没有上下界限定则替换为Object，

   ​    如果存在上下界限定则根据子类替换原则取类型参数的最左边限定类型（即父类）。

- 为了保证类型安全，必要时插入强制类型转换代码。

- 自动产生“桥接方法”以保证擦除类型后的代码仍然具有泛型的“多态性”。

**类型擦除方式：**

1. 擦除类定义中的类型参数 - 无限制类型擦除

   当类定义中的类型参数没有任何限制时，在类型擦除中直接被替换为Object，即形如`<T>`和`<?>`的类型参数都被替换为Object。

​	       ![image-20230426100003668](Java基础.assets/image-20230426100003668.png)

2. 擦除类定义中的类型参数 - 有限制类型擦除

​      当类定义中的类型参数存在限制（上下界）时，在类型擦除中替换为类型参数的上界或者下界，比如形如`<T extends Number>`

​       和`<? extends Number>`的类型参数被替换为`Number`，`<? super Number>`被替换为Object。

​			![image-20230426100008738](Java基础.assets/image-20230426100008738.png)

3. 擦除方法定义中的类型参数

​	  擦除方法定义中的类型参数原则和擦除类定义中的类型参数是一样的，这里仅以擦除方法定义中的有限制类型参数为例。

​		  ![image-20230426100015386](Java基础.assets/image-20230426100015386.png)

 证明：

```java
public class Test {

    public static void main(String[] args) throws Exception {

        ArrayList<Integer> list = new ArrayList<Integer>();

        list.add(1);  //这样调用 add 方法只能存储整形，因为泛型类型的实例为 Integer

        list.getClass().getMethod("add", Object.class).invoke(list, "asd");

        for (int i = 0; i < list.size(); i++) {
            
            System.out.println(list.get(i));
        }
    }
}
```

​	  在程序中定义了一个`ArrayList`泛型类型实例化为`Integer`对象，如果直接调用`add()`方法，那么只能存储整数数据，不过当利用反

​      射调用`add()`方法的时候，却可以存储字符串，这说明了`Integer`泛型实例在编译之后被擦除掉了，只保留了原始类型。



### 7.泛型的编译期检查

 问题：

​    既然说类型变量会在编译的时候擦除掉，那为什么往 ArrayList 创建的对象中添加整数会报错呢？不是说泛型变量String会在编译的时

​    候变为Object类型吗？为什么不能存别的类型呢？既然类型擦除了，如何保证只能使用泛型变量限定的类型呢？

​    J**ava编译器是通过先检查代码中泛型的类型，然后再进行类型擦除，再进行编译。**

例：

```java
public static  void main(String[] args) {  

    ArrayList<String> list = new ArrayList<String>();  
    
    list.add("123");  
    
    list.add(123); //编译错误  
}

在上面的程序中，使用add方法添加一个整型，在IDE中，直接会报错，说明这就是在编译之前的检查，因为如果是在编译之后检查，类型擦除
    
后，原始类型为Object，是应该允许任意引用类型添加的。可实际上却不是这样的。

```

类型检查的针对对象

```java
//定义ArrayList的话可以有两种方法：
ArrayList<String> list1 = new ArrayList(); //第一种 情况

ArrayList list2 = new ArrayList<String>(); //第二种 情况

/*
 这样是没有错误的，不过会有个编译时警告。
 
 第一种情况下，可以实现与完全使用泛型参数一样的效果，第二种则没有效果。
 
 因为类型检查就是编译时完成的，new ArrayList()只是在内存中开辟了一个存储空间，可以存储任何类型对象，而真正涉及类型检查的是它
 
 的引用，因为我们是使用它引用list1来调用它的方法，比如说调用add方法，所以list1引用能完成泛型类型的检查。
 
 而引用list2没有使用泛型，所以不行。
*/
```

   例：

```java
public class Test {      
    public static void main(String[] args) {  

        ArrayList<String> list1 = new ArrayList();  
        
        list1.add("1"); //编译通过  
        
        list1.add(1); //编译错误  
        
        String str1 = list1.get(0); //返回类型就是String  

        
        ArrayList list2 = new ArrayList<String>();  
        
        list2.add("1"); //编译通过  
        
        list2.add(1); //编译通过  
        
        Object object = list2.get(0); //返回类型就是Object  

        
        new ArrayList<String>().add("11"); //编译通过  
        
        new ArrayList<String>().add(22); //编译错误  

        String str2 = new ArrayList<String>().get(0); //返回类型就是String  
    }  
} 
```

​    **类型检查就是针对引用的，谁是一个引用，用这个引用调用泛型方法，就会对这个引用调用的方法进行类型检测，而无关它真正引用**

​    **的对象**。



### 8.静态方法和静态变量

   **泛型类中的静态方法和静态变量不可以使用泛型类所声明的泛型类型参数。**

  例：

```java
public class Test2<T> {    
    
    public static T one;   //编译错误    
    
    public static T show(T one){ //编译错误    
        
        return null;    
    }    
}
```

​     因为泛型类中的泛型参数的实例化是在定义对象的时候指定的，而静态变量和静态方法不需要使用对象来调用。

​     对象都没有创建，是无法确定这个泛型参数是何种类型的，所以是错误的。

```java
//但这种情况是可以的
public class Test2<T> {    

    public static <T> T show(T one){ //这是正确的    
        
        return null;    
    }    
}

因为这是一个泛型方法，在泛型方法中使用的T是自己在方法中定义的 T，而不是泛型类中的T
```



## 反射

### 1.反射机制

​     **指的是可以于运行时加载、探知、使用编译期间完全未知的类。**

​     JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一

​     个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。

​        例: Class c = Class. forName ("com.vkls.User");

​    加载完类之后，在堆内存中，就产生了一个 Class 类型的对象（一个类只有一个 Class 对象），

​    这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构。

​    这个对象就像一面镜子(或者可以认为它给类拍了一个x光，这样类里面的属性和方法就像人体内部的器官一样能被看到了)，

​    透过这个镜子看到类的结构，所以，我们形象的称之为：反射。

### 2.Class类

​    Class类也是一个实实在在的类，存在于JDK的java.lang包中，与class关键字是不一样的。

​    Class类的实例表示java应用运行时的类(class and enum)或接口(interface and annotation)（每个java类运行时都在JVM里表现为一

​       个class对象，可通过类名.class、类型.getClass()、Class.forName("类名")等方法获取class对象）。

​    数组同样也被映射为class 对象的一个类，所有具有相同元素类型和维数的数组都共享该 Class 对象。基本类型boolean，byte，

​    char，short，int，long，float，double和关键字void同样表现为 class 对象。

   到这我们也就可以得出以下几点信息：

- 手动编写的类被编译后会产生一个Class对象，其表示的是创建的类的类型信息，而且这个Class对象保存在同名.class的文件中(字节码

     文件)

- **每个通过关键字class标识的类，在内存中有且只有一个与之对应的Class对象来描述其类型信息，无论创建多少个实例对象，其依据的**

      **都是用一个Class对象。**

- Class类只存私有构造函数，因此对应Class对象只能由JVM创建和加载

- **Class类的对象作用是运行时提供或获得某个对象的类型信息**，这点对于反射技术很重要。



### 3.获取Class对象

​     1.使用类固有的class属性来获取该类对应的class对象      

```java
 Class<Student> c1=Student.class
```

​     2.调用对象的getClass( )方法，返回该对象所属类对应的Class对象

```java
Student s=new Student();

Class<? extends Student> c2=s.getClass();
```

​     3.使用Class类中的静态方法forName(String className)   //className为某个类的全路径             

```java
Class<?> c3=Class.forName("com.vkls.Student");
```

​     4.通过类加载器获取

```java
ClassLoader.getSystemClassLoader().loadClass("com.vkls.User");
```

​	 5.当元素类型和维度数一样时,得到的class对象是一样的         

```java
int[] arr01=new int[10];
               
int[] arr02=new int[20];           //arr01.getClass().hashCode()等于arr02.getClass().hashCode()
               
int[] arr03=new int[30][10];     //arr03的hashCode和01,02不一样
               
double[] arr04=new double[10]; //arr04和上面的都不一样
```

 **通过类加载器获取 Class 对象不会进行初始化。**     

### 4.Class类的方法

| 方法名             | 作用                                                         |
| ------------------ | ------------------------------------------------------------ |
| getName()          | 取全限定的类名(包括包名)，即类的完整名字。                   |
| getSimpleName()    | 获取类名(不包括包名)                                         |
| getCanonicalName() | 获取全限定的类名(包括包名)                                   |
| isInterface()      | 判断Class对象是否是表示一个接口                              |
| getInterfaces()    | 返回Class对象数组，表示Class对象所引用的类所实现的所有接口。 |
| getSupercalss()    | 返回Class对象，表示Class对象所引用的类所继承的直接基类。应用该方法可在运行时发现一个对象完整的继承结构。 |
| newInstance()      | 返回一个Oject对象，是实现“虚拟构造器”的一种途径。使用该方法创建的类，必须带有无参的构造器。 |
| getFields()        | 获得某个类的所有的公共（public）的字段，包括继承自父类的所有公共字段。 类似的还有getMethods和getConstructors。 |
| getDeclaredFields  | 获得某个类的自己声明的字段，即包括public、private和proteced，默认但是不包括父类声明的任何字段 |

```java
package com.cry;
import java.lang.reflect.Field;

interface I1 {
}

interface I2 {
}

class Cell{
    public int mCellPublic;
}

class Animal extends  Cell{
    private int mAnimalPrivate;
    protected int mAnimalProtected;
    int mAnimalDefault;
    public int mAnimalPublic;
    private static int sAnimalPrivate;
    protected static int sAnimalProtected;
    static int sAnimalDefault;
    public static int sAnimalPublic;
}

class Dog extends Animal implements I1, I2 {
    private int mDogPrivate;
    public int mDogPublic;
    protected int mDogProtected;
    private int mDogDefault;
    private static int sDogPrivate;
    protected static int sDogProtected;
    static int sDogDefault;
    public static int sDogPublic;
}

public class Test {
    
    public static void main(String[] args) throws IllegalAccessException, InstantiationException {
        
        Class<Dog> dog = Dog.class;
        
        //类名打印
        System.out.println(dog.getName()); //com.cry.Dog
        System.out.println(dog.getSimpleName()); //Dog
        System.out.println(dog.getCanonicalName());//com.cry.Dog
        
        //接口
        System.out.println(dog.isInterface()); //false
        for (Class iI : dog.getInterfaces()) {
            System.out.println(iI);
        }
         /*
          interface com.cry.I1
          interface com.cry.I2
         */

        //父类
        System.out.println(dog.getSuperclass());//class com.cry.Animal
        
        //创建对象
        Dog d = dog.newInstance();
        
        //字段
        for (Field f : dog.getFields()) {
            System.out.println(f.getName());
        }
        /*
            mDogPublic
            sDogPublic
            mAnimalPublic
            sAnimalPublic
            mCellPublic  //父类的父类的公共字段也打印出来了
         */
        System.out.println("---------");
        
        for (Field f : dog.getDeclaredFields()) {
            System.out.println(f.getName());
        }
        /** 只有自己类声明的字段
         mDogPrivate
         mDogPublic
         mDogProtected
         mDogDefault
         sDogPrivate
         sDogProtected
         sDogDefault
         sDogPublic
         */
    }
}
```



### 5.通过反射获取构造方法

​     1.Constructor<?>[ ]  getConstructors( )     

​        返回一个包含Constructor对象的数组，每一个Constructor对象代表类的一个公共构造方法

   例:

```java
Class<?> c=Class.forName("com.vkls.Student");       //获取Class对象
              
Constructor<?>[] cons=c.getConstructors();  
              
for(Constructor con:cons){
                 
    System.out.println(con);  //输出Student类所有公共构造方法的方法名
}
```

​    2.其他方法

```java
  //获取所有的构造方法
2.Constructor<?>[ ]  getDeclareConstructors( )   

  //返回单个公共构造方法,通过参数类型确定返回哪个构造方法  
3.Constructor<T> getConstructor(Class<?>...parameterTypes)     
  
  //返回单个构造方法  
4.Constructor<T> getDeclaredConstructor(Class<?>...parameterTypes)   

 //调用无参构造器创建此Class对象所表示的类的一个新实例。所表示的类必须有无参构造方法。
5.T newInstance()
```

​      例：   

```java
Class<?> c=Class.forName("com.vkls.Student");    

//该方法的参数应与获得的构造方法所需要的参数相匹配  
Constructor<?> con=c.getConstructor(String.class,int.class);  

//使用获取的构造函数创建对象   
//Object是所有类的父类,实际开发中这里可以使用具体的类 如 User user=con.newInstance("vkls",22);
Object obj=con.newInstance("vkls",22);     


//暴力反射,当参数为true时,程序可以使用私有的构造方法创建对象
//方法原型:public void setAccessible(boolean flag)
con.setAccessible(true);    
                                               
```
 例：

```java
public class ConstructionTest implements Serializable {
    
    public static void main(String[] args) throws Exception {

        Class<?> clazz = null;

        //获取Class对象的引用
        clazz = Class.forName("com.example.javabase.User");

        //第一种方法，实例化默认构造方法，User必须无参构造函数,否则将抛异常
        User user = (User) clazz.newInstance();
        
        user.setAge(20);
        
        user.setName("Jack");
        
        System.out.println(user);

        System.out.println("--------------------------------------------");

        
        //获取带String参数的public构造函数
        Constructor cs1 =clazz.getConstructor(String.class);
        
        //通过获取的构造方法创建User
        User user1= (User) cs1.newInstance("vkls");
        user1.setAge(22);
        System.out.println("user1:"+user1.toString());

        System.out.println("--------------------------------------------");

        
        //取得指定带int和String参数构造函数,该方法是私有构造方法
        Constructor cs2=clazz.getDeclaredConstructor(int.class,String.class);
        //由于是private必须设置可访问
        cs2.setAccessible(true);
        
        //创建user对象
        User user2= (User) cs2.newInstance(25,"mtgd");
        System.out.println("user2:"+user2.toString());

        System.out.println("--------------------------------------------");

        
        //获取所有构造方法
        Constructor<?> cons[] = clazz.getDeclaredConstructors();
        
        // 查看每个构造方法需要的参数
        for (int i = 0; i < cons.length; i++) {
            //获取构造函数参数类型
            Class<?> clazzs[] = cons[i].getParameterTypes();
            
            System.out.println("构造函数["+i+"]:"+cons[i].toString() );
            
            System.out.print("参数类型["+i+"]:(");
            
            for (int j = 0; j < clazzs.length; j++) {
                
                if (j == clazzs.length - 1)
                    System.out.print(clazzs[j].getName());
                else
                    System.out.print(clazzs[j].getName() + ",");
            }
            System.out.println(")");
        }
    }
}

@Data
class User {
    private int age;
    private String name;
    
    public User() {
        super();
    }
   
    public User(String name) {
        super();
        this.name = name;
    }

    /**
     * 私有构造
     * @param age
     * @param name
     */
    private User(int age, String name) {
        super();
        this.age = age;
        this.name = name;
    }
}

//结果：

User{age=20, name='Jack'}
--------------------------------------------
user1:User{age=22, name='vkls'}
--------------------------------------------
user2:User{age=25, name='mtgd'}
--------------------------------------------
构造函数[0]:private com.example.javabase.User(int,java.lang.String)
参数类型[0]:(int,java.lang.String)

构造函数[1]:public com.example.javabase.User(java.lang.String)
参数类型[1]:(java.lang.String)

构造函数[2]:public com.example.javabase.User()
参数类型[2]:()
```

**Constructor类本身一些常用方法**

| 方法返回值  | 名称                            | 方法说明                                                     |
| ----------- | ------------------------------- | ------------------------------------------------------------ |
| Class       | getDeclaringClass()             | 返回 Class 对象，该对象表示声明由此 Constructor 对象表示的构造方法的类,其实就是返回真实类型（不包含参数） |
| Type[]      | getGenericParameterTypes()      | 按照声明顺序返回一组 Type 对象，返回的就是 Constructor对象构造函数的形参类型。 |
| String      | getName()                       | 以字符串形式返回此构造方法的名称。                           |
| Class<?>[ ] | getParameterTypes()             | 按照声明顺序返回一组 Class 对象，即返回Constructor 对象所表示构造方法的形参类型 |
| T           | newInstance(Object... initargs) | 使用此 Constructor对象表示的构造函数来创建新实例             |
| String      | toGenericString()               | 返回描述此 Constructor 的字符串，其中包括类型参数。          |

 例：

```java
Constructor cs3 = clazz.getDeclaredConstructor(int.class,String.class);

System.out.println("-----getDeclaringClass-----");

Class uclazz=cs3.getDeclaringClass();

//Constructor对象表示的构造方法的类
System.out.println("构造方法的类:"+uclazz.getName());


System.out.println("-----getGenericParameterTypes-----");

//对象表示此 Constructor 对象所表示的方法的形参类型
Type[] tps=cs3.getGenericParameterTypes();

for (Type tp:tps) {
    System.out.println("参数名称tp:"+tp);
}


System.out.println("-----getParameterTypes-----");

//获取构造函数参数类型
Class<?> clazzs[] = cs3.getParameterTypes();

for (Class claz:clazzs) {
    System.out.println("参数名称:"+claz.getName());
}


System.out.println("-----getName-----");

//以字符串形式返回此构造方法的名称
System.out.println("getName:"+cs3.getName());


System.out.println("-----getoGenericString-----");

//返回描述此 Constructor 的字符串，其中包括类型参数。
System.out.println("getoGenericString():"+cs3.toGenericString());


结果：
-----getDeclaringClass-----
构造方法的类:com.example.javabase.User
-----getGenericParameterTypes-----
参数名称tp:int
参数名称tp:class java.lang.String
-----getParameterTypes-----
参数名称:int
参数名称:java.lang.String
-----getName-----
getName:com.example.javabase.User
-----getoGenericString-----
getoGenericString():private com.example.javabase.User(int,java.lang.String)
```



### 6.通过反射获取成员变量      

```java
1.Field[] getFields()                //返回一个包含Filed对象的数组,获取所有的公共成员变量    
    
2.Field[] getDeclareFields()        //获取所有的成员变量
    
3.Field getField(String name)      //获取指定的公共成员变量
    
4.Field getDeclaredField(String name)    //返回指定的成员变量
```

 **Field类方法:**

​	![image-20230329140845248](F:\Typora_Images\java基础\image-20230329140845248.png)

例： 

```java
  
Class<?> c=Class.forName("com.vkls.Student");
  
Field addressField=c.getField("address");  //获取成员变量address
  
Constructor<?> con=c.getConstructor();    //假设获取无参构造方法创建对象
  
Object obj=con.newInstance();      //该处的object根据实际情况可以是具体的类  
  
addressField.set(obj,"杭州");     //给对象obj的成员变量addressField赋值为杭州  
                                //原型:void set(Object obj,Object value)  //给obj的成员变量赋值为value
```
### 7.通过反射获取成员方法

```java
1.Method[] getMethods()     //返回一个包含方法对象的数组,获取所有公共方法(包括从父类中继承的)
    
2.Method[] getDeclareMethods()    //获取所有方法(不包括父类的)
  
//获取一个 定的公共方法,name为方法名称,再加上方法所需参数的类型 
3.Method getMethod(String name,Class<?>...parameterTypes)
    
4.Method getDeclareMethod(String name,Class<?>...parameterTypes)   //可以获取该类的一个指定的方法
  
5.Object invoke(Object obj,Object...args)    //调用obj对象的成员方法,参数是args,返回值是Object类型
```

  **Method类方法：**

​     ![image-20230426100032873](Java基础.assets/image-20230426100032873.png)



例：

```java
例1:通过反射调用普通方法
    
    //有一个Student类(有姓名和年龄两个属性),获取其Class对象
    Class<?> cls=Class.forName("com.vkls.Student");  
      
	Student s1=cls.newInstance();    //调用Student类的无参构造方法生成s1
    
	//获取class对象的setName方法,传入setName所需的参数类型
	Method m1=cls.getMethod("setName",String.class);

	//调用m1,设置Student类s1的姓名属性   该函数返回值类型为void
    //这两行代码等同于  s1.setName("vkls");
    //如果setName是私有方法,则使用 m1.setAccessible(true); 语句
    m1.invoke(s1,"vkls");  


例2.通过反射操作属性
    
      
    Student s2=cls.newInstance();
      
	Field f=cls.getDeclareField("name");   //获取Student类的name属性
      
    f.set(s2,"mtgd");   //设置s2的name的值为mtgd    如果name是私有属性,则使用 f.setAccessible(true); 语句
      
    f.get(s2);         //获取s2的name属性值  打印输出为mtgd
```

​         

### 8.获取包名和类名

```java
Class cls=Class.forName(Student);  //有一个Student类,获取它的Class对象

cls.getName();          //获取包名+类名
   
cls.getSimpleName();   //只获取类名                                                
                                                
```

### 9.反射操作泛型                                                

​     Java采用泛型擦除的机制来引入泛型。

​     Java中的泛型仅仅是给编译器javac使用的，确保数据的安全性和免去强制类型转换的麻烦。

​     但是，一旦编译完成，所有和泛型有关的类型全部擦除。

​     为了通过反射操作这些类型以迎合实际开发的需要，Java就新增了ParameterizedType，GenericArrayType，TypeVariable

​        和 WildcardType几种类型来代表不能被归一到Class类中但是又和原始类型齐名的类型。    

   	 ParameterizedType: 表示一种参数化的类型，比如Collection<String>
   	
   	 GenericArrayType: 表示一种元素类型是参数化类型或者类型变量的数组类型
   	
   	 TypeVariable: 是各种类型变量的公共父接口
   	
   	 WildcardType: 代表一种通配符类型表达式， 比如 ?, ? extends Number, ? super Integer               

```java
public class Test {
    
     public static void main(String[] args){
      
         try{
            
             Method m1=Test.class.getMethod("test1",Map.class,List.class);
            
             Type[] t=m1.getGenericParameterTypes();
            
             for(Type paramType:t){
                
                 System.out.println(paramType);
                
                 if(paramType instanceof ParameterizedType){
                    
                     Type[] genericTypes=((ParameterizedType)paramType).getActualTypeArguments();
                    
                     for(Type genericType:genericTypes){
                        
                         System.out.println("泛型类型"+genericType);
                    
                     }
                 }            
             }
            
             System.out.println("--------------------");
 
             Method m2=Test.class.getMethod("test2",null);
        
             Type returnType=m2.getGenericReturnType();
        
             if(returnType instanceof ParameterizedType){
            
                 Type[] genericTypes=((ParameterizedType) returnType).getActualTypeArguments();
            
                 for(Type genericType:genericTypes){
                
                     System.out.println("返回值,泛型类型:"+genericType);
            
                 }      
             }
         }
  
         catch(Exception e){
      
             e.printStackTrace();
  
         }

     }

     public void test1(Map<String,User> map,List<User> list){
    
         System.out.println("我是test1");

     }

     public Map<Integer,User> test2(){
    
         System.out.println("我是test2");
    
         return null;
     }
}
```


### 10.反射获取注解  

```java
Class cls=Class.forName("com.vkls.Student");   //获取类的Class对象
    
//获得类的所有有效注解    
Annotation[] annotations=cls.getAnnotations();
    
for (Annotation a : annotations) {   //打印输出会得到该注解类所在的位置以及在使用时value的取值
         
    System.out.println(a);
     
}

    
    
//根据注解名称获得指定注解    
MyAnnotation1  a1 = (MyAnnotation1) cls.getAnnotation(MyAnnotation1.class);
    
System.out.println(st.value());   //打印输出该注解的value值

    
//获得类的属性的注解    
Field f = cls.getDeclaredField("studentName");
    
MyAnnotation2  a2 = f.getAnnotation(MyAnnotation2.class);
    
System.out.println(MyAnnotation2.columnName()+"----"+MyAnnotation2.type()+"----
                   "+MyAnnotation2.length()); 
                   
//输出MyAnnotation2的各个属性的取值    假设注解MyAnnotation2有columnName,type,length三个属性


```



## IO流

​               ![image-20230426100045668](Java基础.assets/image-20230426100045668.png)



​	        ![image-20230426100053086](Java基础.assets/image-20230426100053086.png)

### 1.分类

​     按照数据的流向

​         输入流：读数据

​         输出流：写数据

​     按照数据类型分

​         字节流：字节输入流,字节输出流

​         字符流：字符输入流,字符输出流

​     **如果数据可以用Windows自带的记事本软件打开,并且可以读懂里面的内容,就用字符流;否则使用字节流**

​     4个抽象基类：

​                        InputStream(字节输入流，其子类为FileInputStream)

​                       OutputStream(字节输出流，其子类为FileOutputStream)

​                       Reader(字符输入流)

​                       Writer(字符输出流)

​    4个文件流：

​                      FileInputStream、FileOutputStream、

​                      FileReader(为InputStreamReader的子类)、FileWriter(为OutputStreamWriter的子类)

​    4个缓冲流：

​					  BufferedInputStream(字节输入缓冲流)、BufferedOutputStream(字节输出缓冲流)

​                      BufferedReader(字符输入缓冲流)、BufferedWriter(字符输出缓冲流)
​                      

​                      InputStreamReader和BufferedReader为Reader子类 

​                      OutputStreamWriter和BufferedWriter为Writer子类

### 2.字节流

#### 1.字节流抽象基类

​     InputStream：表示字节输入流的所有类的超类(抽象类)

​     OutputStream：表示字节输出流的所有类的超类(抽象类)

​     子类名特点：都以其父类名作为子类名的后缀

 **InputStream常用方法 ：**

- `read()` ：返回输入流中下一个字节的数据。返回的值介于 0 到 255 之间。如果未读取任何字节，则代码返回 `-1` ，表示文件结束。

- `read(byte b[ ])` : 从输入流中读取一些字节存储到数组 `b` 中。如果数组 `b` 的长度为零，则不读取。

   ​								如果没有可用字节读取，返回 `-1`。如果有可用字节读取，则读取的字节数最多等于 `b.length` ， 返回读取的字

   ​								节数。这个方法等价于 `read(b, 0, b.length)`。

- `read(byte b[], int off, int len)` ：在`read(byte b[ ])` 方法的基础上增加了 `off` 参数（偏移量）和 `len` 参数（要读取的最

   ​																大字节数）。

- `skip(long n)` ：忽略输入流中的 n 个字节 ,返回实际忽略的字节数。

- `available()` ：返回输入流中可以读取的字节数。

- `close()` ：关闭输入流释放相关的系统资源。

从 Java 9 开始，`InputStream` 新增加了多个实用的方法：

- `readAllBytes()` ：读取输入流中的所有字节，返回字节数组。

- `readNBytes(byte[] b, int off, int len)` ：阻塞直到读取 `len` 个字节。

- `transferTo(OutputStream out)` ： 将所有字节从一个输入流传递到一个输出流。

   

**`OutputStream` 常用方法**

- `write(int b)` ：将特定字节写入输出流。

- `write(byte b[ ])` : 将数组`b` 写入到输出流，等价于 `write(b, 0, b.length)` 。

- `write(byte[] b, int off, int len)` : 在`write(byte b[ ])` 方法的基础上增加了 `off` 参数（偏移量）和 `len` 参数（要读取的

   ​																最大字节数）。

- `flush()` ：刷新此输出流并强制写出所有缓冲的输出字节。

- `close()` ：关闭输出流释放相关的系统资源。



#### 2.FileOutputStream

#####     1.作用

​         文件输出流  用于将数据写入File

#####      2.构造方法

​         FileOutputStream(String name)      //创建文件输出流以指定的名称写入文件

#####      3.字节流写数据的步骤

```java
//1.创建字节输出流对象(调用系统功能创建了文件,创建字节输出流对象,让字节输出流对象指向文件)

    FileOutputStream fos=new FileOutputStream("D:\\desktop\\java.txt");

//2.调用字节输出流对象的写数据方法

    fos.write(97);     //以ASCII码的形式写入,文件中的内容为a(a的ASCII码为97);也可直接写入汉字

//3.释放资源

    fos.close();      //关闭文件输出流并释放与此流相关联的所有系统资源    
```

#####        4.字节流写数据的方式

```java
1.void write(int b)      //将指定的字节写入此文件输出流,一次写一个字节数据(ASCII码形式)
    
2.void write(byte[] b)   //将指定长度的字节数据写入此文件输出流,一次写 一个字节数组的 数据
    
  例:
	 FileOutputStream fos1=new FileOutputStream("D:\\desktop\\java.txt");

	 //也可以写成:byte[] bys1="abcd".getBytes(); 使用String类中的getBytes()方法
     byte[] bys={97,98,99,100}; 

     fos1.write(bys);   //文件中的数据为abcd
           
3.void write(byte[] b,int off,int len)   //将字节数组b中，从偏移量off开始将len长度的字节数据写入此文件输出流
                                                          
  fos1.write(bys,1,2);    //文件中的数据为bc
           
4.换行写入
              
  window使用\r\n   Linux使用\n   macOS使用\r
    
  fos1.write("\r\n".getBytes());  

5.追加写入
    
   //使用该构造方法创建文件输出流,第二个参数为true时,则可以追加写入;如果没有,则默认不追加           
   public FileOutputStream(String name,boolean append)
             
```

#####        5.字节流读数据的步骤

```java
//1.创建字节输入流对象

    FileInputStream fis=new FileInputStream("D:\\desktop\\java.txt");
    
//2.调用读数据方法

    fis.read();   //不可直接读取汉字,read函数一次读取一个字节,而一个汉字占用两个或三个字节
          
    例1:
        int by=fis.read();     //读出来的数据为文件中数据的ASCII码
        
        while(by!=-1){        //当文件为空时,函数返回值为-1
                                        
            System.out.print((char)by);  //使用print方法,println方法会自动换行;将ASCII码强转成字符形式
                    
            by=fis.read();  //继续读取下一个字符,一次读取一个字符
                 
        }

    例2.复制文本文件(可带有汉字)
                        
        FileInputStream fis=new FileInputStream("D:\\desktop\\java.txt");  //创建字节输入流对象
                
		FileOutputStream fos=new FileOutputStream("E:\\vkls\\java.txt");   //创建字节输出流对象
                
		int by;
                
		while((by=fis.read())!=-1){
                        
    		fos.write(by);
                
		}
                
		fos.close();
                
		fis.close();
       
       
```

#####       6.字节流读数据的方法

```java
1.int read()           //一次读取一个字节的数据,文件为空时返回值为-1
    
2.int read(byte[] b)  //读取b.length个字节的数据到一个字节数组中,返回值为实际读取到的字符个数,文件为空时返回-1
    
3.int read(byte[] b,int off,int len) //读取len个字节的数据到b中,返回值为实际读取到的字符个数,文件为空时返回-1
    
  例:
     FileInputStream fis=new FileInputStream("D:\\desktop\\java.txt");
     
	 byte[] bys=new byte[5];

     int len=fis.read(bys);      //len的值为read函数实际读取到的字符的个数

	 //调用String的一种构造方法:String(byte[] bytes)  //将byte数组中的ASCII码转换为字符
	 //文件中的换行(\r\n)也会被当做两个字符读取
     System.out.println(new String(bys));  
                                                                   
     System.out.println(new String(bys,0,len);   
     /* 但读取到的字符个数不一定是5个(可能是4个或3个),所以应使用该构造方法:
     
         String(byte[] bytes,int offset,int length)  //从指定位置,将指定个数的ASCII码转换为字符
     */
 
   for循环实现:
            
        byte[] bys=new byte[1024];
                        
        int len;
                        
         while((len=fis.read(bys))!=-1){
                
                    System.out.println(new String(bys,0,len);                          
          }
                                       
         fis.close();                     
```

##### 7.其他

​	`DataInputStream` 用于读取指定类型数据，不能单独使用，必须结合 `FileInputStream` 。

```java
FileInputStream fileInputStream = new FileInputStream("input.txt");

//必须将fileInputStream作为构造参数才能使用
DataInputStream dataInputStream = new DataInputStream(fileInputStream);

//可以读取任意具体的类型数据
dataInputStream.readBoolean();

dataInputStream.readInt();

dataInputStream.readUTF();

```

​    `ObjectInputStream` 用于从输入流中读取 Java 对象（反序列化），`ObjectOutputStream` 用于将对象写入到输出流(序列化)。

```java
ObjectInputStream input = new ObjectInputStream(new FileInputStream("object.data"));

MyClass object = (MyClass) input.readObject();

input.close();

//用于序列化和反序列化的类必须实现 Serializable 接口，对象中如果有属性不想被序列化，使用 transient 修饰
```

   **`DataOutputStream`** 用于写入指定类型数据，不能单独使用，必须结合 `FileOutputStream`

```java
// 输出流
FileOutputStream fileOutputStream = new FileOutputStream("out.txt");

DataOutputStream dataOutputStream = new DataOutputStream(fileOutputStream);

// 输出任意数据类型
dataOutputStream.writeBoolean(true);

dataOutputStream.writeByte(1);

```

​	`ObjectOutputStream`将对象写入到输出流(`ObjectOutputStream`，序列化)。

```java
ObjectOutputStream output = new ObjectOutputStream(new FileOutputStream("file.txt"));
                                                   
Person person = new Person("Guide哥", "JavaGuide作者");
                                                   
output.writeObject(person);
```



#####  7.字节缓冲流

​    IO 操作是很消耗性能的，缓冲流将数据加载至缓冲区，一次性读取/写入多个字节，从而避免频繁的 IO 操作，提高流的传输效率。

​    BufferOutputStream：实现缓冲输出流  应用程序可向底层输出流写入字节,而不必为每个字节使用底层系统调用

​    BufferedInputStream：从源头（通常是文件）读取数据（字节信息）到内存的过程中不会一个字节一个字节的读取，而是会先将读取

​									     到的字节存放在缓存区，并从内部缓冲区中单独读取字节。这样大幅减少了 IO 次数，提高了读取效率。  

​    构造方法:

​       BufferedOutputStream(OutputStream out)

​       BufferedInputStream(InputStream in)

  例：

```java
  
BufferedOutputStream bos=new  BufferedOutputStream(new FileOutputStream("D:\\desktop\\java.txt"));
           
bos.write("hello\r\n".getBytes());    //写入数据
           
bos.close();
```



### 3.字符流

​     **字符流的底层还是用字节流实现的**

#### 1.字符串的编码与解码

​      编码:

​             byte[ ] getBytes()     //使用平台默认编码方式将该String编码为一系列字节,将结果存储到字节数组中

​             byte[] getBytes(String charsetName)  //使用指定编码方式将字符串编码

​                例：String s="中国";

​                       byte[ ] bys=s.getBytes();   //得到使用UTF-8编码方式将"中国"编码后的字节[-28,-72,-83,-27,-101,-67]
​      解码:

​             String(byte[ ] bytes)         //使用平台默认解码方式进行解码

​             String(byte[ ] bytes,String charsetName)     //使用指定解码方式进行解码

​                例：String ss=new String(bys);    //输出ss的内容为"中国"

#### 2.字符流抽象类

​     Reader：字符输入流的抽象类

​     Writer：字符输出流的抽象类

  **Reader常用方法 **

- `read()` : 从输入流读取一个字符。

- `read(char[] cbuf)` : 从输入流中读取一些字符，并将它们存储到字符数组 `cbuf`中，等价于 `read(cbuf, 0, cbuf.length)` 。

- `read(char[] cbuf, int off, int len)` ：在`read(char[] cbuf)` 方法的基础上增加了 `off` 参数（偏移量）和 `len` 参数（要读

   ​															          取的最大字符数）。

- `skip(long n)` ：忽略输入流中的 n 个字符 ,返回实际忽略的字符数。

- `close()` : 关闭输入流并释放相关的系统资源。

   

  **Writer 常用方法 **

- `write(int c)` : 写入单个字符。

- `write(char[] cbuf)` ：写入字符数组 `cbuf`，等价于`write(cbuf, 0, cbuf.length)`。

- `write(char[] cbuf, int off, int len)` ：在`write(char[] cbuf)` 方法的基础上增加了 `off` 参数（偏移量）和 `len` 参数（要

   ​																		读取的最大字符数）。

- `write(String str)` ：写入字符串，等价于 `write(str, 0, str.length())` 。

- `write(String str, int off, int len)` ：在`write(String str)` 方法的基础上增加了 `off` 参数（偏移量）和 `len` 参数（要读

   ​																		取的最大字符数）。

- `append(CharSequence csq)` ：将指定的字符序列附加到指定的 `Writer` 对象并返回该 `Writer` 对象。

- `append(char c)` ：将指定的字符附加到指定的 `Writer` 对象并返回该 `Writer` 对象。

- `flush()` ：刷新此输出流并强制写出所有缓冲的输出字符。

- `close()`:关闭输出流释放相关的系统资源。



  InputStreamReader：

​     是从字节流到字符流的桥梁,它读取字节,并使用指定的编码将其解码为字符;

​     其子类 `FileReader` 是基于该基础上的封装，可以直接操作字符文件。

   构造方法:

​      InputStreamReader(InputStream in)     //创建一个使用默认解码方式的InputStreamReader

​      InputStreamReader(InputStream in,String charsetName)     //创建一个使用指定解码方式的InputStreamReader            

  OutputStreamWriter：

​    是从字符流到字节流的桥梁,使用指定的编码将写入的字符编码为字节。

​	其子类 `FileWriter` 是基于该基础上的封装，可以直接将字符写入到文件。

​    构造方法:

​        OutputStreamWriter(OutputStream out)        //创建一个使用默认字符编码的OutputStreamWriter

​        OutputStreamWriter(OutputStream out,String charsetName)   //创建一个使用指定编码的OutputStreamWriter

​     例：                

```java
FileOutputStream fos=new FileOutputStream("E:\\vkls\\java.txt");   //创建字节输出流对象
                
OutputStreamWriter osw=new OutputStreamWriter(fos,"GBK");//创建字符输出流对象使用GBK编码方式将字符写入文件
                
osw.write("中国");
                
osw.close();
                

FileInputStream fis=new FileInputStream("D:\\desktop\\java.txt");  //创建字节输入流对象
                
InputStreamReader isr=new InputStreamReader(fis,"GBK");   //创建字符输入流对象,读入数据,使用GBK的解码方式
                
isr.reade();     //一次读取一个字符
                
isr.close();
```

#### 3.字符流写数据方式     

```java
1.void write(int c)           //写一个字符
      
2.void write(char[] cbuf)    //写入一个字符数组
    
3.void write(char[] cbuf,int off,int len)    //写入字符数组的一部分
    
4.void write(String str)   //写入一个字符串,也可以直接写入汉字
    
5.void write(String str,int off,int len)    //写入一个字符串的一部分 
    
  例1:
     char[] chs={'a','b','c','d'};

     osw.write(chs);  //写入一个字符数组

     osw.flush();    //刷新,刷新之后还可以继续写数据
```

#### 4.字符流读数据的方式

```java
1.int read()                //一次读一个字符数据(可直接读取汉字);当文件为空时返回-1
          
2.int read(char[] cbuf)    //一次读一个字符数组的数据 
          
  例1:
     int ch;
                
	 while((ch=isr.read()!=-1){
                    
    	System.out.print((char)ch);
                 
	 }
          

  例2:
      char[] chs=new char[1024];
           
      int len;
           
       while((len=isr.read(chs)!=-1){
                    
             System.out.print(new String(chs,0,len));
                
       }
             
       isr.close();  
          
  例3.复制文件(简单方式)
             
      FileReader fr=new FileReader("E:\\java.txt");    //创建字符输入流的简单方式
             
      FileWriter fw=new FileWriter("E:\\java.txt");      //创建字符输出流的简单方式
             
      char[] chs=new char[1024];
             
      int len;
             
      while((len=fr.read(chs))!=-1){
                    
              fw.writer(chs,0,len);
      }      
             
      fr.close();
             
      fw.close();
```

#### 5.字符缓冲流

​     BufferedWriter

​          将文本写入字符输出流,缓冲字符,以提供单个字符,数组和字符串的高效写入，可以指定缓冲区大小,或者接受默认大小

​           构造方法

​              BufferedWriter(Writer out)       //Writer为字符输出流抽象类

​     BufferedReader

​          从字符输入流读取文本,缓冲字符,以提供字符,数组和行的高效读取，可以指定缓冲区大小,或者使用默认大小  

​          构造方法:BufferedReader(Reader in)    //Reader为字符输入流抽象类

​    例:

```java
FileWriter fw=new FileWriter("E:\\java.txt");  //创建字符输出流
              
BufferedWriter bw=new BufferedWriter(fw);    //创建字符输出流的缓冲区
              
bw.writer("hello\r\n");
              
bw.writer("world\r\n");
              
FileReader fr=new FileReader("E:\\java.txt");  //创建字符输出流
              
BufferedReader br=new BufferedReader(fr);    //创建字符输出流的缓冲区
              
char[] chs=new char[1024];
              
int len;
              
while((len=br.read(chs))!=-1){
                   
    System.out.print(new Stirng(chs,0,len));
               
}
```

#### 6.字符缓冲流特有方法

 	BufferedWriter中有一函数:

​            void newLine()      实现文件换行,行分隔符字符串由系统属性定义

​     BufferedReader中有一函数:

​            public String readLine()   读一行文字,结果不包含任何行终止字符;如果读取到文件结尾,则返回null

​     例：

```java
BufferedReader br=new BufferedReader(new FileReader("E:\\java.txt"));
                   
String line;
                    
while((line=br.readLine())!=null){
                            
    System.out.println(line);          //因为不读取换行符,所以使用println实现自动换行
                     
}                    
```

#### 7.复制单级文件夹    

```java

File srcFolder= new File("F:\javatest");            //获取源文件夹句柄
    
String destFloderName=srcFolder.getName();         //获取文件夹名称
    
File destFloder=new File("F:\0",destFloderName);  //在F:\0下创建同名文件夹并返回句柄

if(!destFloder.exists()){
    
    destFloder.mkdirs();    //因为0文件夹不存在,所以使用递归创建
}

File[] listFiles=srcFolder.listFiles();    //获取源文件夹中的所有文件对象

for(File srcFile:listFiles){
    
    String srcFileName=srcFile.getName();             //遍历,获取每个文件的名称
    
    File destFile=new File(destFloder,srcFileName);  //创建同名文件
    
    copy(srcFile,destFile);

}
 
private static void copy(File srcFile, File destFile) throws IOException {     //复制文件内容
    
    //创建字节输入缓冲区
    BufferedInputStream bis=new BufferedInputStream(new FileInputStream(srcFile));  
    
    //创建字节输出缓冲区
    BufferedOutputStream bos=new BufferedOutputStream(new FileOutputStream(destFile));  
        
    byte[] bys=new byte[1024];     //复制文件
        
    int len;
        
    while((len=bis.read(bys))!=-1){
        
        bos.write(bys,0,len);     

    }

    bos.close();

    bis.close();
} 
```



### 4.随机访问流

  随机访问流指的是支持随意跳转到文件的任意位置进行读写的 `RandomAccessFile` 。

  `RandomAccessFile` 的实现依赖于 `FileDescriptor` (文件描述符) 和 `FileChannel` （内存映射文件）。

  `RandomAccessFile` 的构造方法如下，我们可以指定 `mode`（读写模式）。

```java
// openAndDelete 参数默认为 false 表示打开文件并且这个文件不会被删除
public RandomAccessFile(File file, String mode)
    
    throws FileNotFoundException {
    
    this(file, mode, false);
}

// 私有方法
private RandomAccessFile(File file, String mode, boolean openAndDelete)  throws FileNotFoundException{
  
    // 省略大部分代码
}

```

 读写模式主要有下面四种：

- `r` : 只读模式。
- `rw`: 读写模式
- `rws`: 相对于 `rw`，`rws` 同步更新对“文件的内容”或“元数据”的修改到外部存储设备。
- `rwd` : 相对于 `rw`，`rwd` 同步更新对“文件的内容”的修改到外部存储设备。

  文件内容指的是文件中实际保存的数据，元数据则是用来描述文件属性比如文件的大小信息、创建和修改时间。

`RandomAccessFile` 中有一个文件指针用来表示下一个将要被写入或者读取的字节所处的位置。

可以通过 `RandomAccessFile` 的 `seek(long pos)` 方法来设置文件指针的偏移量（距文件开头 `pos` 个字节处）。

如果想要获取文件指针当前的位置的话，可以使用 `getFilePointer()` 方法。

代码示例：

```java
RandomAccessFile randomAccessFile = new RandomAccessFile(new File("input.txt"), "rw");

System.out.println("读取之前的偏移量：" + randomAccessFile.getFilePointer() + ",当前读取到的字符" + (char) 
                   randomAccessFile.read() + "，读取之后的偏移量：" + randomAccessFile.getFilePointer());

// 指针当前偏移量为 6
randomAccessFile.seek(6);

System.out.println("读取之前的偏移量：" + randomAccessFile.getFilePointer() + ",当前读取到的字符" + (char) 
                   randomAccessFile.read() + "，读取之后的偏移量：" + randomAccessFile.getFilePointer());

// 从偏移量 7 的位置开始往后写入字节数据
randomAccessFile.write(new byte[]{'H', 'I', 'J', 'K'});

// 指针当前偏移量为 0，回到起始位置
randomAccessFile.seek(0);

System.out.println("读取之前的偏移量：" + randomAccessFile.getFilePointer() + ",当前读取到的字符" + (char) 
                   randomAccessFile.read() + "，读取之后的偏移量：" + randomAccessFile.getFilePointer());

//txt文本内容:ABCDEFG
//输出：
读取之前的偏移量：0,当前读取到的字符A，读取之后的偏移量：1
读取之前的偏移量：6,当前读取到的字符G，读取之后的偏移量：7
读取之前的偏移量：0,当前读取到的字符A，读取之后的偏移量：1
    
input.txt 文件内容变为 ABCDEFGHIJK 
```

   **RandomAccessFile的 write 方法在写入对象的时候如果对应的位置已经有数据的话，会将其覆盖掉。**

  `RandomAccessFile` 比较常见的一个应用就是实现大文件的 **断点续传** 。

  简单来说就是上传文件中途暂停或失败（比如遇到网络问题）之后，不需要重新上传，只需要上传那些未成功上传的文件分片即可。

  **分片（先将文件切分成多个文件分片）上传是断点续传的基础。**




## 网络编程

###  1.InetAddress类的使用

​      该类没有构造方法

​       static InetAddress getByName(String host)      //获得一个InetAddress对象,host可以是计算机名称,也可以是IP地址

​       String getHostName()      //获取此IP地址的主机名

​       String getHostAddress()   //返回文本显示中的IP地址字符串   

​        例:

```java
InetAddress address=InetAddress.getByName("vkls1220");
            
String name=address.getHostName();   //获取主机名 vkls1220
            
String ip=address.getHostAddress(); //获取IP地址  198.126.20.16 
```

### 2.UDP发送数据   

​     1.创建发送端的Socket对象(DatagramSocket)

​        使用构造方法:DatagramSocket()     //构造数据报套接字并将其绑定到本地主机上的任何可用端口

​    2.创建数据,并将数据打包

​       DatagramPacket(byte[ ] buf,int length,InetAddress address,int port)

​          buf：将要发送的字节数据数组

​          length：将要发送的数据的长度

​          address：接收机的IP地址

​          port：接收机上的端口号

​    3.调用DatagramSocket对象的send方法发送数据

​        void send(DatagramPacket p)

​    4.关闭发送端

​        void close()     //关闭此数据报套接字 

​    例：  

```java
DatagramSocket ds=new DatagramSocket(); //创建socket对象
         
byte[] bys="hello,udp".getBytes();    //要发送的数据
         
InetAddress address=InetAddress.getByName("vkls1220");     //创建接收机IP地址对象
         
int port=8080;
         
DatagramPacket dp=new DatagramPacket(bys,bys.length,address,port);   //将数据打包
         
ds.send(dp);    //调用send方法发送数据
         
ds.close();    //关闭发送端                                          
```

###  3.UDP接收数据

​      1.创建接收端的Socket对象

   		 DatagramSocket(int port)    //使用带参构造方法

​	  2.创建一个数据包,用于接收数据

   		DatagramPacket(byte[ ] buf,int length)    //buf为接收到的数据要存放的位置

​	  3.调用DatagramSocket对象的receive方法接收数据

   		void receive(DatagramPacket p)

​	  4.解析数据包,并把数据在控制台显示

   		byte[ ] getData()    //解析数据包,返回类型为字节型数组
   	
   		int getLength()     //得到实际发送或接收的数据的长度

​	  5.关闭接收端

   	   void close()       

​      例：

```java
DatagramSocket ds=new DatagramSocket(8080);   
         
byte[] bys=new byte[1024];   //创建数组用于接收数据
         
DatagramPacket dp=new DatagramPacket(bys,bys.length);   //创建一个数据包
         
ds.receive(dp);   //调用receive方法接收数据
         
byte[] datas=dp.getData();   //解析数据包,此时datas中得到的数据为字符对应的ASCII码
         
int len=dp.getLength();       //得到实际接收的数据的长度
         
String dataString=new String(datas,0,len);   //转换为String类型
         
System.out.println(dataString);  //输出
         
ds.close();  
```



### 4.TCP发送数据

​     1.创建客户端的Socket对象

​         Socket(String host,int port);

​     2.获取输出流,写数据

​         OutputStream getOutputStream()

​    3.释放资源

​        void close()

​    例:           

```java
Socket s=new Socket("192.168.42.48",8080);
           
OutputStream os=s.getOutputStream();
           
os.wirte("hello,tcp".getBytes());     //将想要发送的字符串转换为对应的ASCII码发送


//获取来自服务器端的反馈       
InputStream is=s.getInputStream();   //获取输入流
       
byte[] bys=new byte[1024];
       
int len=is.read(bys);            //读取数据
       
String data=new String(bys,0,len);   //转换为String形式
       
System.out.println(data);      //打印输出
              
s.close();   
```

### 5.TCP接收数据

​    1.创建服务器端的Socket对象(ServerSocket)

​       ServerSocket(int port)

​    2.监听客户端连接,返回一个Socket对象

​       Socket accept()

​    3.获取输入流,读数据,并把数据显示在控制台

​       InputStream getInputStream()

​    4.释放资源        

​       void close()

​    例:        

```java
ServerSocket ss=new ServerSocket(8080);   //创建服务器端socket对象
        
Socket s=ss.accept();      //监听客户端的连接,返回一个socket对象
        
InputStream is=s.getInputStream();   //获取输入流
        
byte[] bys=new byte[1024];
        
int len=is.read(bys);            //读取数据
        
String data=new String(bys,0,len);   //转换为String形式
        
System.out.println(data);   //打印输出
    
    
//可用于服务器端向客户端发送数据
    
OutputStream os=s.getOutputStream();     
    
os.write("数据已收到".getBytes());
    
    
ss.close();    //释放资源   因为Socket对象s也是由ServerSocket对象ss创建的,所以关闭ss时,s也会被关闭
```

 

### 6.案列  

```java
1.客户端发送的数据来自于键盘输入  服务器端将接收到的数据写入文件
        
    public class Client{        //客户端
                
        public static void main(String[] args) throws IOException{
                        
            Socket s=new Socket("192.168.23.66",8080);   //创建客户端socket对象 
  
            BufferedReader br=new BufferedReader(new InputStreamReader(Systme.in));
             
            
            //s.getOutputStream()的返回类型为OutputStream(字节输出流)型,将其封装为OutputStreamWriter对象          
            //然后将OutputStreamWriter对象封装为BufferedWriter(字符输出缓冲流)对象
                    
            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
                    
            String line;
                    
            while((line=br.readLine()!=null){
                            
                if("end".equals(line))     //如果输入end,则代表输入结束
                                    
                    break;                            
                             
                bw.write(line);       //传输数据
                             
                bw.newLine();
                             
                bw.flush();                    
            }
                    
            s.close();                         
        }     
    }        
     
        
    public class Server{                //服务器端
                                  
        public static void main(String[] args) throws IOException{   
                    
            ServerSocket ss=new ServerSocket(8080);
                    
            Socket s=ss.accept();
                    
                    
            //获取输入流接收数据
                    
            BufferedReader br=new BufferedReader(new InputStreamReader(s.getInputStream()));   
                    
            //把数据写入文本文件
                    
            BufferedWriter bw=new BufferedWriter(new FileWriter("d:\\test.txt"));
                    
            String line;
                    
            while((line=br.readLine()!=null){
                            
                bw.write(line);
                            
                bw.newLine();
                            
                bw.flush();                                 
                    
            }
                    
            ss.close();
                    
            bw.close();
            
        }           
   } 
```



## 多线程

### 1.创建线程的两种方法

####  1.继承Thread类

​      1.定义一个子类MyThread继承Thread类

​      2.在MyThread类中重写run( )方法(run方法用来封装被线程执行的代码)

​      3.创建MyThread类的对象

​      4.使用对象的start方法启动线程(start方法用于启动线程,然后由JVM调用此线程的run方法)

​         例：

```java
public class MyThread extends Thread{
              
    @Override              
    public void run(){
                   
        ...
              
    }
             
    MyThread my1=new MyThread();
             
    MyThread my2=new MyThread();
             
    my1.start();
             
    my2.start();
```

####  2.实现Runnable类    

​     1.定义一个类MyRunnable实现Runnable接口

​     2.在MyRunnable类中重写run()方法

​     3.创建MyRunnable类的对象

​     4.创建Thread类的对象,把MyRunnable对象作为构造方法的参数

​     5.启动线程 

​     例：

```java
public class MyRunnable implements Runnable{     //实现Runnable接口
                
    @Override                
    public void run(){
                       
        ...
                
    }          
}
          
public class MyRunnableTest{
                
    public static void main(String[] args){
                    
        MyRunnable myrun=new MyRunnalbe();
                    
        Thread t1=new Thread(myrun);     //调用的构造方法:Thread(Runnable target)
                    
        Thread t2=new Thread(myrun); 
        
        //另有构造方法:Thread(Runnable target,String name)  可以在创建线程的同时为线程命名
                    
        t1.start();                                
                    
        t2.start();                
    }          
}                         
```
​     好处:

​         1.避免了Java单继承的局限性

​         2.适合多个相同程序的代码去处理同一个资源的情况,把线程和程序代码,数据有效分离,较好的体现了面向对象的设计思想
​         

### 2.设置和获取线程名称

​     void setName(String name)     将此线程的名称改为name

​     String getName()                    返回此线程的名称

​     public static Thread currentThread()     返回对当前正在执行的线程对象的引用 

​       也可在创建对象时设置线程名称,但需要在线程中提供带参构造方法,且调用父类的带参构造方法

​       例：

```java
public MyThread(String name){     //提供带参构造方法
                    
    super(name);   //调用父类的带参构造方法
               
}  
               
MyThread my1=new MyThread("thread_1");
```

### 3.设置和获取线程的优先级

​      1.public final int getPriority( )      返回此线程的优先级

​      2.public final void setPriority(int newPriority)   更改线程的优先级

​         优先级从低到高为1到10,默认为5,线程创建时继承父线程的优先级

### 4.线程控制

​      static void sleep(long millis)        使当前正在执行的线程停留(暂停执行)指定的毫秒数

​      void join()                                    等待线程死亡(当该线程结束后,才能执行其他的线程)

​      static void yield()                         释放CPU使用权,线程进入就绪状态

​      void setDaemon(boolean on)     将此线程标记为守护线程,当运行的线程都是守护线程时,java虚拟机将退出

​      void stop()                                   强制结束线程

​      boolean isAlive()                         判断线程是否还活着

### 5.同步代码块

​      synchronized(任意对象){

​           操作共享数据的代码

​     } 

​     在使用第一种方法创建的线程中使用同步代码块需要将任意对象声明为静态的,否则该对象是不唯一的   

### 6.同步方法

​      就是把synchronized关键字加到方法或静态方法上:

​          修饰符 synchronized 返回值类型 方法名(参数){ }

​          修饰符 static synchronized 返回值类型 方法名(参数){ }

​      同步方法锁的对象是this

​      同步静态方法的锁对象是类名.class(静态方法又称类方法,所以静态同步方法的默认锁为这个类)

​      如果想同时使用同步方法和同步代码块是保护对共享数据的操作,则因为同步方法的锁为this,所以同步代码块为

​      synchronized(this){

​           多条语句操作共享数据的代码

​      } 
​    



## Lambda表达式

### 1.定义

​     组成lambda表达式的三要素：形式参数，箭头，代码块

​     例：用lambda表达式的方式启动一个线程

​            new Thread( ( ) -> {

​    	         System.out.println("线程启动了");

​            } ).start( );

​           ( )：里面没有内容,可以认为是方法的形式参数为空

​           ->：用箭头指向后面要做的事情

​           { }：包含一段代码,称之为代码块,可以看做是方法体中的内容

### 2.练习

​     **Lambda表达式的使用前提：有一个接口且接口中有且仅有一个抽象方法，但可以有默认方法和静态方法。**

​      例1：接口中的抽象方法无参无返回值

```java
public interface Eatable{     //定义一个接口,接口中有且仅有一个抽象方法
	
    void eat();     //接口类的方法默认被 public abstract 修饰

}

public class EatableImpl implements Eatable{  //定义一个EatableImpl类继承Eatable接口
	
    @Override	
    public void eat(){                     //重写Eatable接口中的eat()方法
		
        System.out.println("一天一个苹果");
	
    }
}

public class EatableDemo{    //测试类
	
    public static void main(String[] args){
	    
        //用创建对象的方式调用接口中的方法
		
        Eatable e=new EatableImpl();  //用多态的方式创建接口类的对象
		
        useEatable(e);  //普通调用
		
		
        //用匿名内部类的方式调用接口中的方法		
        useEatable(new Eatable(){
			
            @Override
            public void eat(){
				
                System.out.println("一天一个苹果");
			
            }
		
        });
		
        
        //使用Lambda表达式的方式调用接口中的方法		
        useEatable( ()-> {     //如果抽象方法的参数为String s,则小括号中的内容为String s
			
            System.out.println("一天一个苹果"); //如果有多个参数,则用逗号分开 例:int a,int b
		
        });
			
    }
	
    private static void useEatable(Eatable e){
		
        e.eat();        //如果抽象方法的参数为String s,相应的,这里调用时就需要传入一个字符串	
    }
}       
```



### 3.省略模式

​     1.在小括号中,参数的类型可以省略不写；但如果有多个参数,不能只省略一个


​     2.如果只有一个参数，则小括号也可以省略

​     3.如果大括号中代码块的语句只有一条，则可以省略大括号和这条语句后面的分号；如果这条语句有return关键字，则return也要省略 

### 4.Lambda表达式与匿名内部类的区别

​     1.所需类型不同

​        Lambda表达式：方法的参数只能是接口类

​        匿名内部类：方法的参数可以是接口类、抽象类、具体类

​        即，在上面的例子中，如果使用lambda表达式实现Eatable接口中的方法，则useEatable的参数只能是接口类;

​              如果使用匿名内部类实现，则参数可以是接口类,抽象类和具体类。

​    2.使用限制不同

​       如果接口中仅有一个抽象方法,则Lambda表达式和匿名内部类都可以使用。

​       如果接口中有多个抽象方法，只能使用匿名内部类。

​    3.实现原理不同

​       Lambda表达是在编译之后没有一个单独的.class文件.对应的字节码文件在运行的时候动态生成

​       匿名内部类在编译之后会产生一个单独的.class字节码文件

### 5.方法引用

####  定义

​    如果在使用Lambda表达式时，在大括号中定义的操作已经在其他地方存在相同的操作，那么就可以通过方法引用使用已经存在的操作  

​    而不需要重复定义这个操作。

#### 1.引用类方法


​    引用类方法，就是引用类的静态方法

​    格式：类名::静态方法名

​    例：Integer::parseInt

​           Integer类中有个静态方法:public static int parseInt(String s)    该方法将String类型转换为int类型  

```java
public interface Converter{      //定义一个接口,里面有一个抽象方法  
        
    int convert(String s);   
   
}
   
public class ConverterDemo{
        
    public static void main(String[] args){
        
          	
        useConverter((String s) -> {
          		
            return Integer.parseInt(s);
            
        });
            
        //根据Lambda表达式的省略规则,可有
            
        useConverter( s -> Integer.parseInt(s));
            
            
        //引用类方法,可有
            
        useConverter(Integer::parseInt);
            
        //Lambda表达式被类方法替代时,它的形式参数全部传递给静态方法作为静态方法的参数
        
    }
    
    //useConverter方法的参数为接口类，且在方法内调用了接口类中的抽象方法
    //所以在使用useConverter方法时，就要用lambda表示式实现接口中的抽象方法，参数“1220”就会传给lambda表达式中实现的抽象方
    //法，lambda表达式中实现的抽象方法的返回值赋给number。
    private static void useConverter(Converter c){
        	
        int number=c.convert("1220");
        	
        System.out.println(number);
        
    }   
}            
```

例2：集合的迭代

```java
void lamndaFor() {
        
    List<String> strings = Arrays.asList("1", "2", "3");
        
    //传统foreach        
    for (String s : strings) {
            
        System.out.println(s);        
    }
        
    //Lambda foreach        
    strings.forEach((s) -> System.out.println(s));
        
    //or        
    strings.forEach(System.out::println);
     
    //map        
    Map<Integer, String> map = new HashMap<>();
        
    map.forEach((k,v)->System.out.println(v));
}
```



#### 2.引用对象的实例方法

​    引用对象的实例方法就是引用类中的成员方法

​    格式：对象名::成员方法                //需要先实例化一个对象

​    范例："helloworld"::toUpperCase

​              String类中的方法:public String toUpperCase()     //将字符串中的所有字符转换为大写

​    Lambda表达式被对象的实例方法替代时，它的形式参数全部传递给实例方法作为该方法的参数  



#### 3.引用类的实例方法 

​    引用类的实例方法就是引用类中的成员方法

​    格式：类名::成员方法

​    范例：String::substring

​	Lambda表达式被类的实例方法替代时,第一个参数作为方法的调用者,后面的参数传递给该方法作为参数。

####  4.引用构造器

​     引用构造器就是引用构造方法

​     格式：类名::new

​     范例：Student::new     //Student是一个类

​               Lambda表达式被构造方法替代时,它的形式参数全部传递给构造方法作为参数

```java
public class Student{      //定义一个Student类
	
    private String name;
	
    private int age;
	
    public Student(){    //无参构造方法
		
    }     
	
    public Student(String name,int age){    //带参构造方法
		this.name=name;
		this.age=age;
	}
	...
	...
	get和set方法
	...
}

public interface StudentBuilder{         //定义一个接口,含有一个抽象方法
	
    Student build(String name,int age);

}

public class StudentDemo{
	
    public static void main(String[] args){
		
        //调用useStudentBuilder方法
		
        useStudentBuilder( (String name,int age) -> {
			
            return new Student(name,age);
		
        });
		
        //简化
		
        useStudentBuilder( (name,age) -> new Student(name,age));
		
        //引用构造器
		
        useStudentBuilder(Student::new);
	
    }
	
    private static void useStudentBuilder(StudentBuilder sb){
		
        Student s=sb.build("mtgd",18);
		
        System.out.println(s.getName()+ "," + s.getAge());   //打印输出姓名和年龄
	}
}
```



### 6.函数式接口

####  1.定义

​     函数式接口：有且仅有一个抽象方法(但可能含有其他方法)的接口

​     Java中的函数式编程的体现就是Lambda表达式，所以函数式接口就是适用于Lambda表达式使用的接口

​     **只有确保接口只有一个抽象方法，Java中的Lambda表达式才能顺利进行推导**

​     判断：

​      将@FunctionalInterface 放在接口定义的上方

​      例:        

```java
@FunctionalInterface           
public interface MyInterface{
       		   
    void show();           
}
```

#### 2.函数式接口作为方法的参数

​    如果方法的参数是一个函数式接口，那么可以使用Lambda表达式作为参数传递

```java
public class Test {
    
    public static void main(String[] args){
            
        //使用匿名内部类调用startThread方法
        startThread(new Runnable(){
            
            @Override            
            public void run(){
                
                System.out.println("线程启动了");           
            }        
        });
        
        //使用Lambda表达式作为参数        
        startThread( () ->  System.out.println("线程启动了") );
    
    }
    
    private static void startThread(Runnable r) {   //该方法的参数是一个函数式接口  
        
        new Thread(r).start();     //启动一个线程 等价于 Thread a=new Thread(r); a.start()
    
    }                           //将光标放在Runnable处,按下Ctrl+b 可以看到Runnable接口的定义
}
```

#### 3.函数式接口作为方法的返回值 

```java
public class Test {
    
    public static void main(String[] args){
        
        ArrayList<String> array=new ArrayList<String>();
        array.add("cccc");
        array.add("aa");
        array.add("b");
        array.add("ddd");
        
        Collections.sort(array,getComparator());   //对集合中的字符串按照长度进行排序

    }
    
    private static Comparator<String> getComparator(){ //返回值为Comparator接口的实现类对象
        //使用匿名内部类创建Comparator接口的对象
//        Comparator<String> comp=new Comparator<String>(){
//            @Override
//            public int compare(String s1,String s2){    //重写抽象方法
//                return s1.length()-s2.length();
//            }
//        };
//        return comp;
        //使用Lambda表达式生成Comparator接口的对象
//        return (String s1,String s2) -> {
//            return s1.length()-s2.length();
//        };
        //简化
        return (s1,s2) -> s1.length()-s2.length();

    }
}   
```

#### 4.常用的函数式接口

#####     1.Supplier接口

​       定义：public interface Supplier<T>

​      		  T get()           //一个无参方法，该方法不需要参数，会按照某种逻辑(通常由Lambda表达式实现)返回一个数据

​      		  Supplier<T>  接口也称为生成型接口,如果指定了接口的泛型是什么类型,get方法就会产生什么类型的数据
​      例:

```java
 public c1ass SupplierDemo {
				
     public static void main(string[] args) {
					 
         String s = getString( () -> {
						 
             return "mtgd";      //重写get方法  返回一个字符串
					 
         } );
				
         System.out.println(s);
           
     }
          
     //定义一个方法,返回一个字符串数据    
     private static String getString(Supplier<String> sup){
             
         return sup.get();
         
     }
 }
```

##### 2.Consumer接口

   1.定义

​     public interface Consumer<T>

​     方法:

​        1.void accept(T t)         对给定的参数执行此操作(由lambda表达式定义)

​        2.default Consumer<T> andThen(Consumer<? super T> after)   //需要一个Consumer类型的参数,然后依次执行

​                                          																		accept方法
​      例：

```java
public class Test {
    
    public static void main(String[] args){
        
        operatorString("mtgd",s-> System.out.println(s),         //直接打印输出
                
                       //将字符串反转再输出
                       s-> System.out.println(new StringBuilder(s).reverse().toString())   
                );    
    }
    
    private static void operatorString(String name, Consumer<String> con1,Consumer<String> con2){
        
        con1.andThen(con2).accept(name);  //先对name执行con1的accept操作,再对name执行con2的accept操作
                                          //输出结果为 mtgd  dgtm
    }
```

​                                                                                               

##### 3.Predicate接口

   1.定义

​     public interface Predicate<T>

​     通常用于判断参数是否满足给定的条件

  2.方法

​     1.boolean test(T t)        //对给定的参数进行判断,返回一个布尔结果,判断逻辑由Lambda表达式实现

​     2.default Predicate<T> negate()        //返回一个逻辑的否定

​     3.default Predicate<T> and(Predicate other)   //进行逻辑与判断

​     4.default Predicate<T> or(Predicate other)     //进行逻辑或判断

   例1：

```java
public class Test {
    
    public static void main(String[] args){
        
        boolean b1=checkString("hello", (String s) ->  {
            
            return s.length()>8;          //抽象方法test的逻辑实现由Lambda表达式给出
        
        });                               //判断插入的字符串的长度是否大于8
        
        //输出b1的值应为false
        //可简化为:
        // boolean b1=checkString("hello", s -> s.length()>8 );
    }
    
    private static boolean checkString(String s, Predicate<String> pre){
        
        return pre.test(s);
        //对上面的判断结果实现取反操作
        //return pre.negate().test(s);     //negate()方法取反,逻辑非
    }
}
```

​     例2：

```java
public class Test {
    
    public static void main(String[] args){
        
        boolean b1=checkString("hello,world", (String s) ->  {
            
            return s.length()>8;         //抽象方法test的逻辑实现由Lambda表达式给出
        
        },(String s) -> {
            
            return s.length()<15;
        
        });
        
        //可简化为:
       // boolean b1=checkString("hello", s -> s.length()>8, s -> s.length()<15 );
    }
    
    private static boolean checkString(String s, Predicate<String> pre1,  
                                                   Predicate<String> pre2){
        
        return pre1.and(pre2).test(s);   //对字符串进行两次判断,然后将两个结果作与操作
        //等同于:
        //boolean b1=pre1.test(s);
        //boolean b2=pre2.test(s);
        //boolean b=b1 && b2;
        //return b;
    }
}
```

##### 4.Function接口

   1.定义

​     public interface Function<T,R> 

​     通常用于对参数进行处理(处理逻辑由Lambda表达式实现)，然后返回一个新的值

  2.方法

​     1.R apply(T t)     //将此函数应用于给定的参数，函数的逻辑由Lambda表达式给出

​     2.default <V> Function andThen(Function after)    //

```java
main() {
                 
    convert("100", s -> Integer.parseInt(s), i -> String.valueOf(i+556) );
              
}
            
//将一个字符串转换为int类型,把int类型的数据加上一个数后转换为字符串,然后输出该字符串
            
private static void convert(String s,Function<String,Integer> fun1,Function<Integer,String> fun2){
            	
    Integer i=fun1.apply(s);      //字符串转int   具体的逻辑由Lambda表达式实现
                
    String ss=fun2.apply(i);      //int转为字符串
                
    System.out.println(ss);       //结果应为666
                
    //使用andThen方法
                
    //String ss=fun1.andThen(fun2).apply(s);    //先使用fun1的apply方法，然后对结果再使用fun2的apply方法
            
}
```



## Stream流

### 1.Stream流的使用

​     生成流：通过数据源(集合，数组等)生成流    例如：list.stream( )

​     中间操作：一个流后面可以跟随零个或多个中间操作，其目的主要是打开流，做出某种程度的数据过滤/映射

​                      然后返回一个新的流，交给下一个操作使用。

​     终结操作：一个流只能有一个终结操作，当这个操作执行后，流就无法再操作了，所以这是流的最后一个操作。

常用方法：

```java
/**
* 返回一个串行流
*/
default Stream<E> stream()

/**
* 返回一个并行流
*/
default Stream<E> parallelStream()

/**
* 返回T的流
*/
public static<T> Stream<T> of(T t)

/**
* 返回其元素是指定值的顺序流。
*/
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}


/**
* 过滤，返回由与给定predicate匹配的该流的元素组成的流
*/
Stream<T> filter(Predicate<? super T> predicate);

/**
* 此流的所有元素是否与提供的predicate匹配。
*/
boolean allMatch(Predicate<? super T> predicate)

/**
* 此流任意元素是否有与提供的predicate匹配。
*/
boolean anyMatch(Predicate<? super T> predicate);

/**
* 返回一个 Stream的构建器。
*/
public static<T> Builder<T> builder();

/**
* 使用 Collector对此流的元素进行归纳
*/
<R, A> R collect(Collector<? super T, A, R> collector);

/**
 * 返回此流中的元素数。
*/
long count();

/**
* 返回由该流的不同元素（根据 Object.equals(Object) ）组成的流。
*/
Stream<T> distinct();

/**
 * 遍历
*/
void forEach(Consumer<? super T> action);

/**
* 用于获取指定数量的流，截短长度不能超过 maxSize 。
*/
Stream<T> limit(long maxSize);

/**
* 用于映射每个元素到对应的结果
*/
<R> Stream<R> map(Function<? super T, ? extends R> mapper);

/**
* 根据提供的 Comparator进行排序。
*/
Stream<T> sorted(Comparator<? super T> comparator);

/**
* 在丢弃流的第一个 n元素后，返回由该流的 n元素组成的流。
*/
Stream<T> skip(long n);

/**
* 返回一个包含此流的元素的数组。
*/
Object[] toArray();

/**
* 使用提供的 generator函数返回一个包含此流的元素的数组，以分配返回的数组，以及分区执行或调整大小可能需要的任何其他数组。
*/
<A> A[] toArray(IntFunction<A[]> generator);

/**
* 合并流
*/
public static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)
```



### 2.Stream流的生成方式

​    1.Collection体系的集合可以使用默认方法stream( )生成流

​        default Stream<E> stream()

  例: 

```java
List<String> list=new ArrayList<>();
             
Stream<String> listStream=list.stream();
```

​    2.Map体系的集合间接的生成流

   例: 

```java
Map<String,Integer> map=new HashMap<>();              //创建一个map对象
            
Stream<String> keyStream=map.keySet().stream();      //生成键的流
            
Stream<Integer> valueStream=map.values().stream();  //生成值的流
            
Stream<Map.Entry<String,Integer>> entryStream=map.entrySet().stream();  //生成键值对对象的流
```

​    3.数组可以通过Stream接口的静态方法 of(T...values)生成流

​         例: 

```java
String[] strArray={"hello","world"};             //创建一个字符数组

//生成流  等同于Stream<String> strStream=Stream.of("hello","world");
Stream<String> strStream=Stream.of(strArray);  
                                                                                                   //对于int型数组则可以使用 Stream<Integer> intStream=Stream.of(10,20,30);
```

### 3.常见中间操作

​     1.filter()方法

​         Stream<T> filter(Predicate<? super T> predicate)          //对流中的数据进行过滤

​         Predicate接口中的方法：boolean test(T t)    				 //对给定的参数进行判断，返回一个布尔值

​         例: 

```java
ArrayList<String> list=new ArrayList<String>();
           
list.add("林青霞");
           
list.add("张曼玉");
           
list.add("张无忌");
           
//要求:将list集合中以张开头的元素输出           
list.stream().filter( (String s) -> {
           		
    return s.startwith("张");          //判断字符串是否以张开头
           
}).forEach( System.out::println);  

```

​     

​     2.Stream<T> limit(long n)           //截取前n个数据并返回

​     3.Stream<T> skip(long n)           //跳过指定个数的数据，将剩余元素返回

​      例:          

```java
ArrayList<String> list=new ArrayList<String>();
           
list.add("林青霞");
           
list.add("张曼玉");
           
list.add("张无忌");
           
list.add("北斗星司");
           
//要求:跳过前两个元素，将剩余元素的第一个元素输出           
list.stream().skip(2).limit(1).forEach(System.out::prinln)    //输出结果为张无忌
```

   

​      4.static <T> Stream<T> concat(Stream a,Stream b)      //合并a和b两个流为一个流

​      5.Stream<T> distinct( )    //返回由该流的不同元素组成的流，即去掉一个流的重复元素并返回

​         例:         

```java
 ArrayList<String> list=new ArrayList<String>();
           
list.add("林青霞");
           
list.add("张曼玉");
           
list.add("张无忌");
           
list.add("北斗星司");
             
//1.取前3个数据组成一个流
           
Stream<String> s1=list.stream().limit(3);          
             
//2.跳过两个数据，将剩余的数据组成一个流
           
Stream<String> s2=list.stream().skip(2);
             
//3.将前两步得到的流合并并输出
            
Stream.concat(s1,s2).forEach(System.out::println);    //林青霞，张曼玉，张无忌，张无忌，北斗星司
             
//4.去掉第三步得到的流中重复的数据
             
Stream.concat(s1,s2).distinct().forEach(System.out::println);  ////林青霞,张曼玉,张无忌,北斗星司
```

   

​    6.Stream<T> sorted()       //返回由该流的元素组成的流，根据自然顺序排序

​    7.Stream<T> sorted(Comparator comparator)     //返回由该流的元素组成的流，根据提供的Comparator进行排序

​        Comparator接口中的抽象方法: int comparator(T a, T b)

​         例:

```java
ArrayList<String> list=new ArrayList<String>();
           
list.add("linqingxia");    //第一个 1
           
list.add("zhangmanyu");   //2
           
list.add("zhangwuji");    //3
           
list.add("beidouxingsi"); //4   
           
//按照字母顺序把数据输出
//在该方法中,如果第一个字母相同,则继续比较后面的字母,直到比较到不同的字母    结果应为4,1,2,3           
list.stream().sorted().forEach(System.out::println);    
                                      
//按照字符串长度输出           
list.stream().sorted( (s1,s2) -> s1.length() - s2.length() ).forEach(System.out::println);
```

​    

​     8.<R> Stream<R> map(Function mapper)

​     9.IntStream mapTolnt(TolntFunction mapper)

​         IntStream：表示原始int流

​         TolntFunction接口中的方法：int applyAslnt(T value) 

​    

### 4.常见的终结操作

​     1.void forEach(Consumer action)     //对此流中的每个元素执行此操作

​         Consumer接口中的方法: void accept(T t)   //对给定的参数执行该操作(操作逻辑由Lambda表达式给出)

​     2.long count()     //返回此流中的元素个数

### 5.Stream流的收集操作

​     方法: R collect(Collector collector)       //该收集方法的参数是一个Collector接口

​     工具类Collectors提供了具体的收集方法

​        1.public static <T> Collector toList()       //把元素收集到List集合中  因为返回类型为泛型，所以可以作为collect的参数

​        2.public static <T> Collector toSet()       //把元素收集到Set集合中   

​        3.public static <T> Collector toMap(Function keyMapper,Function valueMapper)      //把元素收集到Map集合中 

​           例:

```java
ArrayList<String> list=new ArrayList<String>();
           
list.add("林青霞");
           
list.add("张曼玉");
           
list.add("王迪");
           
list.add("北斗星司");
           
//1.得到名字为三个字的流
           
Stream<String> listStream=list.stream().filter( s -> s.length()==3 );
           
//2.将1中得到的流收集到list集合中
           
List<String> names=listStream.collect( Collectors.toList() );
```

​    



## 注解(Annotation)

### 1.定义

​     1.不是程序本身，可以对程序作出解释，与注释类似

​     2.可以被其他程序(如:编译器)读取。如果没有注解信息处理流程，则注解毫无意义

​     3.可以附加在package，class，method，field等上面，相等于给它们添加了额外的辅助信息，可以通过反射机制编程访问这些元数据

   作用：

​	  生成文档，通过代码里标识的元数据生成javadoc文档。

​	  编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。

​	  编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。

​	  运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。

 

### 2.格式

​     注解以 @注解名 的形式在代码中存在，还可以添加一些参数值 例: @SuppressWarnings(value="unchecked");

### 3.内置注解

​     @Override

​         定义在java.lang.Override中，此注解只适用于修辞方法，表示打算重写超类中的一个方法。

​     @Deprecated

​         定义在java.lang.Deprecated中，此注解可用于修辞方法、属性、类，表示不鼓励程序员使用这样的元素，通常是因为它很危险或

​         存在更好的选择。

​     @SuppressWarnings

​         定义在java.lang.SuppressWarnings中，作用是不显示编译时的警告信息。该注解需要添加一个参数才能使用: 

| 参数        | 说明                                                   |
| ----------- | ------------------------------------------------------ |
| deprecation | 使用了过时的类或方法时的警告                           |
| unchecked   | 执行了未检查的转换时的警告。例如，使用集合时未指定泛型 |
| fallthrough | 当在switch语句使用时发生case穿透                       |
| path        | 在类路径、源文件路径等中有不存在路径时的警告           |
| serial      | 当在可序列化的类上缺少serialVersionUID定义时的警告     |
| finally     | 任何finally子句不能完成时的警告                        |
| all         | 关于以上所有情况的警告                                 |

 例: 

​      @SuppressWarnings("unchecked")

​      @SuppressWarnings(value={"unchecked", "deprecation"})

### 4.元注解

​     **元注解的作用是负责注解其他注解。**

​     Java定义了四个标准的meta-annotation类型，它们被用来对其它 annotation类型作说明。

​     这些类型和它们所支持的类在java.lang.annotation包中可以找到

​     1.@Target

​           用于描述注解的使用范围（即:被描述的注解可以用在什么地方），取值范围定义在ElementType 枚举中。

| 可使用的地方                          | 取值                                              |
| ------------------------------------- | ------------------------------------------------- |
| 包                                    | PACKAGE                                           |
| 类、接口、枚举、Annotation类型        | TYPE                                              |
| 类成员(方法,构造方法,成员变量,枚举值) | 构造方法:CONSTRUCTOR    变量:FIELD    方法:METHOD |
| 方法参数和本地变量                    | 局部变量:LOCAL_VARIABLE     参数:PARAMETER        |


​    例:@Target(value=ElementType.TYPE)     

  2.@Retention

​     表示需要在什么级别保存该注解信息，用于描述注解的生命周期

​      Reteniton注解用来限定那些被它所注解的注解类在注解到其他类上以后，可被保留到何时。定义在RetentionPolicy枚举中。

| 取值----RetentionPolicy | 作用                                            |
| ----------------------- | ----------------------------------------------- |
| SOURCE                  | 在源文件中有效(即，源文件中保留)                |
| CLASS                   | 在class文件中有效                               |
| RUNTIME                 | 在运行时有效，取值为RUNTIME时可以被反射机制读取 |

   3.@Documented

​	  在使用 javadoc 工具为类生成帮助文档时是否要保留其注解信息。

   4.@Inherited

​	  被它修饰的Annotation将具有继承性。如果某个类使用了被@Inherited修饰的Annotation，则其子类将自动具有该注解。

   5.@Repeatable(Java8新增)

​       允许多次使用同一个注解

```java
@Repeatable(Authorities.class)
public @interface Authority {
     String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatAnnotationUseNewVersion {
    @Authority(role="Admin")
    @Authority(role="Manager")
    public void doSomeThing(){ }
}
```

  	创建重复注解Authority时，加上@Repeatable，指向存储注解Authorities，在使用时候，直接可以重复使用Authority注解。

 6.@Native(Java8新增)

​    使用 @Native 注解修饰成员变量，则表示这个变量可以被本地代码引用，常常被代码生成工具使用。不常使用。



### 5.获取注解

   **反射包java.lang.reflect下的AnnotatedElement接口提供了获取注解的方法。**

   注意：只有注解被定义为RUNTIME后，该注解才能是运行时可见。

- `boolean isAnnotationPresent(Class<?extends Annotation> annotationClass)`

​      判断该程序元素上是否包含指定类型的注解，存在则返回true，否则返回false。注意：此方法会忽略注解对应的注解容器。

- `<T extends Annotation> T getAnnotation(Class<T> annotationClass)`

​      返回该程序元素上存在的、指定类型的注解，如果该类型注解不存在，则返回null。

- `Annotation[] getAnnotations()`

​	 返回该程序元素上存在的所有注解，若没有注解，返回长度为0的数组。

- `<T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)`

​	  返回该程序元素上存在的、指定类型的注解数组。如果没有注解对应类型的注解时，返回长度为0的数组。

​      该方法的调用者可以随意修改返回的数组，而不会对其他调用者返回的数组产生任何影响。

​      `getAnnotationsByType`方法与 `getAnnotation`的区别在于，`getAnnotationsByType`会检测注解对应的重复注解容器。

​      若程序元素为类，当前类上找不到注解，且该注解为可继承的，则会去父类上检测对应的注解。

- `<T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)`

​	  返回直接存在于此元素上的所有注解。该方法将忽略继承的注释。如果没有注释直接存在于此元素上，则返回null。

- `<T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)`

​	  返回直接存在于此元素上的所有注解。与此接口中的其他方法不同，该方法将忽略继承的注解。

- `Annotation[] getDeclaredAnnotations()`

   返回直接存在于此元素上的所有注解及注解对应的重复注解容器。与此接口中的其他方法不同，该方法将忽略继承的注解。

   如果没有注释直接存在于此元素上，则返回长度为零的一个数组。

   该方法的调用者可以随意修改返回的数组，而不会对其他调用者返回的数组产生任何影响。

### 6.自定义注解 


​     使用 @interface 进行自定义注解时，自动继承了java.lang.annotation.Annotation接口

​     格式：

​		 public @interface 注解名 {   定义体  }

​     例:

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})

@Retention(RetentionPolicy.SOURCE)
          
public @interface SuppressWarnings {
          			  
    String[] value();
		   
} 
```

   其中, String[] value()  这行代码其实是声明了一个配置参数    参数名称为value，参数类型是String类型的数组 

​            参数类型只能是基本类型、Class、String、enum

​            可以使用 default 来声明参数的默认值。 如果只有一个参数成员，一般参数名为value

   注意：

​      注解元素必须要有值。定义注解元素时，经常使用空字符串、0作为默认值。也经常使用负数(比如：-1)表示不存在的含义

   例:

```java
@Target(value={ElementType.METHOD,ElementType.TYPE})
       
@Retention(RetentionPolicy.RUNTIME)
       
public @interface MyAnnotation{
    
     //参数name,取值为String型,默认为空字符串
    //如果有默认值，那么在使用该注解时如果没有对该参数进行赋值是不会报错的
    String name() default "";  
                                                            
            
    int age() default 0;   //参数age，取值为int型，默认为0
            
    String[] schools() default {"清华大学"};   //参数schools，取值为String数组，默认为"清华大学"        
}

在使用时:
           
	@MyAnnotation( name="vkls",age=19,schools={"北京大学","浙江大学"} )
           
	public void test() {
           
    }  
```

​      例：

```java
//定义自己的注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyMethodAnnotation {

    public String title() default "";

    public String description() default "";

}


//使用注解
public class TestMethodAnnotation {

    @Override
    @MyMethodAnnotation(title = "toStringMethod", description = "override toString method")
    public String toString() {
        return "Override toString method";
    }

    @Deprecated
    @MyMethodAnnotation(title = "old static method", description = "deprecated old static method")
    public static void oldMethod() {
        System.out.println("old method, don't use it.");
    }

    @SuppressWarnings({"unchecked", "deprecation"})
    @MyMethodAnnotation(title = "test method", description = "suppress warning static method")
    public static void genericsTest() throws FileNotFoundException {
        
        List l = new ArrayList();
        
        l.add("abc");
        
        oldMethod();
    }
    
    //用反射接口获取注解信息
    public static void main(String[] args) {
    
        try {
        
            // 获取所有methods       
            Method[] methods = TestMethodAnnotation.class.getClassLoader()
                
                .loadClass(("com.pdai.java.annotation.TestMethodAnnotation"))
                
                .getMethods();
       
            // 遍历    
            for (Method method : methods) {
            
                //判断方法上是否有MyMethodAnnotation注解            
                if (method.isAnnotationPresent(MyMethodAnnotation.class)) {
                
                    try {
                    
                        // 获取并遍历方法上的所有注解                   
                        for (Annotation anno : method.getDeclaredAnnotations()) {
                        
                            System.out.println("Annotation in Method '" + method + "' : " + anno);                 
                        }
                   
                        // 获取MyMethodAnnotation对象信息                   
                        MyMethodAnnotation methodAnno = method.getAnnotation(MyMethodAnnotation.class);
                                                                            
                        System.out.println(methodAnno.title());
                
                    } catch (Throwable ex) {           
                        ex.printStackTrace();
                    }            
                }       
            }    
        } catch (SecurityException | ClassNotFoundException e) {        
            e.printStackTrace();    
        }
    }
}
```

### 原理

   注解@interface 是一个实现了Annotation接口的 接口， 然后在调用getDeclaredAnnotations()方法的时候，返回一个代理$Proxy对

​      象，这个是使用jdk动态代理创建，使用Proxy的newProxyInstance方法时候，传入接口 和InvocationHandler的一个实例(也就是 

​      AnotationInvocationHandler ) ，最后返回一个代理实例。

   期间，在创建代理对象之前，解析注解时候 从该注解类的常量池中取出注解的信息，包括之前写到注解中的参数，然后将这些信息在

   创建 AnnotationInvocationHandler时候 ，传入进去作为构造函数的参数。

​	![image-20230426100131505](Java基础.assets/image-20230426100131505.png)

## 序列化

### 概述

定义：

​        Java提供了一种对象序列化的机制，该机制中，一个对象可以被表示为一个字节序列，该字节序列包括该对象的数据、有关

​                对象的类型的信息和存储在对象中数据的类型。

​		将序列化对象写入文件之后，也可以从文件中读取出来，即，对它进行反序列化，也就是说，对象的类型信息、对象的数据，还有对

​        象中的数据类型可以用来在内存中新建对象。

意义：

​          序列化机制允许将实现序列化的Java对象转换为字节序列，这些字节序列可以保存在磁盘上，或通过网络传输，以达到以

​          后恢复成原来的对象的目的。**序列化机制使得对象可以脱离程序的运行而独立存在，即，在一个平台上序列化的对象可以**

​          **在另一个完全不同的平台上反序列化该对象。**

使用场景：

​          **所有可在网络上传输的对象都必须是可序列化的**，比如RMI（remote method invoke,即远程方法调用），传入的参数或

​          返回的对象都是可序列化的，否则会出错；所有需要保存到磁盘的java对象都必须是可序列化的。

​          **通常建议：程序创建的每个JavaBean类都实现Serializeable接口。**

### 实现方式

如果需要将某个对象保存到磁盘上或者通过网络传输，那么这个类应该实现**Serializable**接口或者**Externalizable**接口之一。

#### 1.Serializable

​    1.序列化步骤：

​       1。创建一个ObjectOutputStream输出流；

​       2。调用ObjectOutputStream对象的writeObject方法将可序列化对象写入到文件中。

```java
//定义一个普通类，并实现了Serializable接口
public class Person implements Serializable {
  
    private String name;
  
    private int age;
  
    //不提供无参构造器  
    public Person(String name, int age) {
      this.name = name;
      this.age = age;
  }

  @Override
  public String toString() {
      return "Person{" +
              "name='" + name + '\'' +
              ", age=" + age +
              '}';
  }
}


public class WriteObject {
  
    public static void main(String[] args) {
      
        try (
           
            //创建一个ObjectOutputStream输出流
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.txt"))) {
          
            //将对象序列化到文件s          
            Person person = new Person("vkls", 23);
          
            oos.writeObject(person);
            
            oos.close();
      
        } catch (Exception e) {
          
            e.printStackTrace();
      
        }  
    }
}
```

2.反序列化步骤：

​	1。创建一个ObjectInputStream输入流；

​	2。调用ObjectInputStream对象的readObject( )方法从文件中得到序列化的对象。

```java
public class ReadObject {
  
    public static void main(String[] args) {
      
        try (
           
            //创建一个ObjectInputStream输入流
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.txt"))) {
          
            Person p = (Person) ois.readObject();
          
            System.out.println(p);
      
        } catch (Exception e) {
          
            e.printStackTrace();      
        }  
    }
}

```

3.可选的自定义序列化

   3.1 我们可以选择类中的哪些属性不需要进行序列化，使用transient关键字修饰不需要序列化的字段。

```java
public class Person implements Serializable {
   
    //不需要序列化名字与年龄
   private transient String name;
   private transient int age;
   private int height;
   private transient boolean singlehood;
   
    public Person(String name, int age) {
       this.name = name;
       this.age = age;
   }
   //省略get,set方法
}

public class TransientTest {
   
    public static void main(String[] args) throws Exception {
       
        try (
            
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.txt"));
            
             ObjectInputStream ios = new ObjectInputStream(new FileInputStream("person.txt"))) {
           
            Person person = new Person("vkls", 23);
           
            person.setHeight(185);
           
            System.out.println(person);
           
            oos.writeObject(person);
           
            Person p1 = (Person)ios.readObject();
           
            System.out.println(p1);
       }
   }
}
//输出结果
//Person{name='vkls', age=23', singlehood=true', height=185cm}
//Person{name='null', age=0', singlehood=false', height=185cm}
//反序列化出的对象，被transient修饰的属性是默认值。对于引用类型，值是null；基本类型，值是0；boolean类型，值是false。
```

   3.2使用transient虽然简单，但将此属性完全隔离在了序列化之外。java提供了**可选的自定义序列化。**可以进行控制序列化的方

​		式，或者对序列化数据进行编码加密等。

```java
private void writeObject(java.io.ObjectOutputStream out) throws IOException;

   private void readObject(java.io.ObjectIutputStream in) throws IOException,ClassNotFoundException;

private void readObjectNoData() throws ObjectStreamException;

```

通过重写writeObject与readObject方法，可以自己选择哪些属性需要序列化， 哪些属性不需要。

如果writeObject使用某种规则序列化，则相应的readObject需要相反的规则反序列化，以便能正确反序列化出对象。

下面的例子是对名字进行反转加密：

```java
public class Person implements Serializable {
   
    private String name;
   
    private int age;
   
    //省略构造方法，get及set方法

   
    private void writeObject(ObjectOutputStream out) throws IOException {
       
        //将名字反转写入二进制流       
        out.writeObject(new StringBuffer(this.name).reverse());
       
        out.writeInt(age);
   }

   private void readObject(ObjectInputStream ins) throws IOException,ClassNotFoundException{
       
       //将读出的字符串反转恢复回来       
       this.name = ((StringBuffer)ins.readObject()).reverse().toString();
       
       this.age = ins.readInt();
   }
}
```



#### 2.Externalizable：强制自定义序列化

通过实现Externalizable接口，必须实现writeExternal、readExternal方法。

```java 
public interface Externalizable extends java.io.Serializable {
     
    void writeExternal(ObjectOutput out) throws IOException;
     
    void readExternal(ObjectInput in) throws IOException, ClassNotFoundException;

}
```

```java
public class ExPerson implements Externalizable {
    
    private String name;
    
    private int age;
    
    //注意，必须加上pulic 无参构造器
    public ExPerson() {
    }

    public ExPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        
        //将name反转后写入二进制流
        StringBuffer reverse = new StringBuffer(name).reverse();
        
        System.out.println(reverse.toString());
        
        out.writeObject(reverse);
        
        out.writeInt(age);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        
        //将读取的字符串反转后赋值给name实例变量
        
        this.name = ((StringBuffer) in.readObject()).reverse().toString();
        
        System.out.println(name);
        
        this.age = in.readInt();
    }

    
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        
        try (
            
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ExPerson.txt"));
             
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("ExPerson.txt"))) {
            
            oos.writeObject(new ExPerson("vkls", 23));
            
            ExPerson ep = (ExPerson) ois.readObject();
            
            System.out.println(ep);
        }
    }
}
//输出结果
//slkv
//vkls
//ExPerson{name='vkls', age=23}

```

注意：Externalizable接口不同于Serializable接口，实现此接口必须实现接口中的两个方法实现自定义序列化，这是强制性的；

​          特别之处是必须提供pulic的无参构造器，因为在反序列化的时候需要反射创建对象。

两种序列化方法的对比：

| 实现Serializable接口                                         | 实现Externalizable接口   |
| :----------------------------------------------------------- | :----------------------- |
| 系统自动存储必要的信息                                       | 程序员决定存储哪些信息   |
| Java内建支持，易于实现，只需要实现该接口即可，无需任何代码支持 | 必须实现接口内的两个方法 |
| 性能略差                                                     | 性能略好                 |



### 序列化版本号serialVersionUID

反序列化必须拥有class文件，但随着项目的升级，class文件也会升级，序列化怎么保证升级前后的兼容性呢？

java序列化提供了一个private static final long serialVersionUID 的序列化版本号，只有版本号相同，即使更改了序列化属性，

对象也可以正确被反序列化回来。

```java
public class Person implements Serializable {
    
    //序列化版本号
    private static final long serialVersionUID = 1111013L;
    
    private String name;
    private int age;
    //省略构造方法及get,set
}

```

如果反序列化使用的class的版本号与序列化时使用的不一致，反序列化会报InvalidClassException异常。

序列化版本号可自由指定，如果不指定，JVM会根据类信息自己计算一个版本号，但这样随着class的升级，就无法正确反序列

化；不指定版本号另一个明显隐患是不利于jvm间的移植，可能class文件没有更改，但不同jvm可能计算的规则不一样，这样

也会导致无法反序列化。

需要修改serialVersionUID的情况：

   1。如果只是修改了方法，反序列化不容影响，则无需修改版本号；

   2。如果只是修改了静态变量，瞬态变量（transient修饰的变量），反序列化不受影响，无需修改版本号；

   3。如果修改了非瞬态变量，则可能导致反序列化失败。

​        如果新类中实例变量的类型与序列化时类的类型不一致，则会反序列化失败，这时候需要更改serialVersionUID。

​        如果只是新增了实例变量，则反序列化回来新增的是默认值；如果减少了实例变量，反序列化时会忽略掉减少的实例变量。



### 注意事项

​     1。对象的类名、实例变量（包括基本类型，数组，对其他对象的引用）都会被序列化；

​		      方法、类变量、transient实例变量都不会被序列化。

​     2。如果想让某个变量不被序列化，可以使用transient关键字修饰。

​     3。序列化对象的引用类型成员变量，也必须是可序列化的，否则，会报错。

​     4。反序列化时必须有序列化对象的class文件。

​	 5。当通过文件、网络来读取序列化后的对象时，必须按照实际写入的顺序读取。

​     6。单例类序列化，需要重写readResolve()方法；否则会破坏单例原则。

​     7。同一对象序列化多次，只有第一次序列化为二进制流，以后都只是保存序列化编号(即使对象内容已经改变）。

​     8。反序列化并不会调用类的构造方法。反序列的对象是由JVM自己生成的对象，不通过构造方法生成。  





## 常用类

### 1.包装类(Wrapper Class)

​     **所有的包装类都是抽象类Number的子类**

| 基本数据类型 | 包装类    |
| ------------ | --------- |
| boolean      | Boolean   |
| byte         | Byte      |
| short        | Short     |
| int          | Integer   |
| long         | Long      |
| char         | Character |
| float        | Float     |
| double       | Double    |

​		         ![image-20230426100200433](Java基础.assets/image-20230426100200433.png)      



  包装类的用途

​        1.作为和基本数据类型对应的类型存在,方便涉及到对象的操作。如Object[],集合等操作

​        2.包含每种基本数据类型的相关属性以及相关的操作方法,

​           这些操作方法的作用可以在基本数据类型,包装类对象,字符串之间实现相互转化

  例：

```java
Integer i=new Integer(10);     //每次都会创建一个新的对象            
Integer j=Integer.valueof(20); //创建Integer类的对象(推荐)  使用缓冲池中的对象,多次调用会获得同一个对象的引用                        
int a=j.intValue();       //将包装类对象转换成基本数据类型         包--->基            
double b=j.doubleValue();                  
Integer c=Integer.parselnt("1220"); //将字符串转换为Integer对象   字--->包            
Integer d=new Integer("31225");                        
int a=Integer.parselnt("1220");   //将字符串类型转换为int类型      字--->基              
String str1=j.toString();        //将Integer对象转化为字符串类型   包--->字
            
String s=String.valueOf(100);   //将int类型转换为字符串类型           基--->字
```

​    自动装箱(autoboxing)和拆箱(unboxing)

​        即将基本数据类型和包装类自动转换

​        基本数据类型处于需要对象的环境中时,会自动转为"对象"

​           例: Integer i=5;

​                编译器会自动转成:Integer i=Integer.valueOf(5)

​           当需要一个数值时,对象又会自动转成基本数据类型

​               例: Integer i=Integer.valueOf(5);

​                     int j=i;         //编译器会自动转成:int j=i.intValue();



###  2.字符串及相关类

​       1.String对象的特点

​          1.通过new创建的字符串对象,每一次new都会申请一个内存空间,即使内容相同,但地址值不同

​               String s1=new String("aa");

​               String s2=new String("aa");

​               System.out.println(s1==s2);     //false

​          2.以" "方式给出的字符串,只要字符序列相同,无论在代码中出现几次,JVM都只会创建一个String对象,并在字符串池中维护

​               String s4 = "bb";

​               String s5 = "bb";

​               System.out.println(s4 == s5);  // true

​      2.字符串的比较

​            使用==做比较时,

​               基本类型：比较的是数据值是否相同

​               引用类型：比较的是地址值是否相同

​           比较字符串的内容是否相等时,使用equals()方法

​			 原型：public boolean equals(Object  object)

​    		    例：s1.equals(s2);      //比较字符串s1和s2的内容是否相同

​    		   如果用equals()方法比较两个对象的内容是否相等,则默认比较的是对象的地址值,但通过重写equals()方法可以实现比

​    			  较内容是否相同。			

​	 3.String类代表不可变的字符序列

​     		StringBuilder类和StringBuffer类代表可变字符序列

​     		StringBuilder:线程不安全,不做线程同步检查,效率高

​     		StringBuffer:线程安全,做线程同步检查,效率低



### 3.File类

​     import  java.io.File

​     File：是文件和目录路径名的抽象表示

​          文件和目录是可以通过File封装成对象的

​          对于File而言,其封装的不是一个真正存在的文件,仅仅是一个路径名而已，该路径名可以是存在的,也可以是不存在的

​     1.构造方法

​         File(String pathname)                   通过将给定的路径字符串转换为抽象的路径名来创建File实例

​         File(String parent,String child)       从父路径名字符串和子路径名字符串创建新的File实例

​         File(File parent,String child)           从父抽象路径名和子路径名字符串创建File实例  

​         例:

```java
File f1=new File("D:\\0\\desktop\\.java.txt");
             
File f2=new File("D:\\0\\desktop","java.txt");
             
File f3=new File("D:\\0\\desktop");
             
File f4=new File(f3,"java.txt");                       //三种构造方法的输出结果是一样的
```

   2.常用方法

​       1.public boolean createNewfile()      //当具有该名称的文件不存在时,则创建一个新空文件,如果其中有目录缺失,则报错

​          例:File f1=new File("d:/a.txt");     //使用绝对路径

​               f1.createNewFile();                //创建文件

​       2.System.out.println(System.getProperty("user.dir");       //获取当前工作路径

​	   3.

| 方法                          | 作用                   |
| ----------------------------- | ---------------------- |
| public boolean exists( )      | 判断File是否存在       |
| public boolean isDirectory( ) | 判断File是否是目录     |
| public boolean isFile( )      | 判断File是否是文件     |
| public long lastModified( )   | 返回File最后修改的时间 |
| public long length( )         | 返回File大小           |
| public String getName( )      | 返回文件名             |
| public String getPath( )      | 返回文件的目录结构     |

​      f1.exists();                   //判断文件f1是否存在,判断结果可以直接打印

​      f1.getAbsolutePath();   //获得文件f1的绝对路径

​      f1.delete();                //将文件f1或目录f1删除;如果删除的目录下有内容,则不能直接删除

​      mkdir()                    //创建一个目录;如果中间某个目录缺失,则创建失败

​      mkdirs()                  //创建多个目录,即使中间有目录缺失,也可递归创建

​      例:

​          File f2=new File("d:/a/b/c");

​          boolean flag=f2.mkdir();       //如果目录a或b有一个缺失,则创建失败,flag=false

​          boolean flag=f2.mkdirs();     //即使a和b目录都没有也可以创建成功   









































