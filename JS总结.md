  # JS是什么
  - JS 是一种运行在客户端（浏览器）上的一门编程语言，实现人机交互效果

  # JS的组成部分（ECMAScript+Wab APIs）
- ECMAScript（基础语法）:规定JS的核心知识，例如：变量、分支语句、循环语句、对象等。

- 文档对象模型(DOM)：操作文档、比如对页面的元素及进行移动、大小、添加删除等操作
- 浏览器对象模型(BOM)：操作浏览器，比如页面的弹窗、检查窗口的宽度、存储数据到浏览器等。


# JS输入输出语句？
- 输入：prompt()
- 输出：alent() document.write() console.log()


# JS有那些内置对象
* String Boolean(布尔值)  Object Number Array(数组对象) Function Data Math RegExp...
> Math  abs()  sqrt() max() min()
> Data  new Data()   getYear()
> String   concat()   length  slice()   split()
> Array

#JS操作数组的方法
- push(),pop(),sort(),splice(),unshift(),shift(),reverse(),concat(),
- join(),map(),filter(),ervery(),some(),reduce(),isArray(),findIndex()
---
>  哪些方法会改变原数组
 push(),pop(),sort(),splice(),unshift(),shift(),reverse(),


# JavaScript数据类型整体分为两大类：
- 基本数据类型（7种）：
- Number(数字类型)、String(字符串型)、Boolean（布尔型:true、false）、Undefined（未定义型）、Null（空类型）、Symbol、BigInt

- 引用数据类型：Object（对象）（包括Array、Function、Date、RegExp等）

# 如何检测数据类型（typeof）
- 1.typeof  200 //number
- 2.typeof  "Hello Woeld" //string
- 3.typeof  false //boolean
- 4.typeof  undefined  //undefined
- 5.typeof  null //Object
- 6.typeof[1,2,3]   //Object
- 7.typeof{name:"Dorothy",age:18}  //Object
- 8.typeof function(){}   //function
- 9.typeof NaN    //number
- 10.typeof new Date()   //Object
- 11.typeof x      //undefined(已声明但未赋值的变量)
- 12.typeof typeof 1  //string
- 13.typeof 10n    //bigint
- 14.typeof Symbol('id')  //Symbol
- 15.typeof  Math //Object
 

 # null和undefined的区别
 > null是一个空对象，undefined表示已声明但未赋值
 - 相同点：都是假值，返回都是ture
 - 不同点：typeof null //'object'，
 typeof undefined // 'undefined'