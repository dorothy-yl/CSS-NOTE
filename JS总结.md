# JavaScript 基础总结

## JS是什么
- JavaScript 是一种运行在客户端（浏览器）上的编程语言，实现人机交互效果
- 是一种解释型、弱类型、动态类型的脚本语言

### 相关面试题
**Q: JavaScript的特点是什么？**
**A:** 
- 解释型语言：不需要编译，直接执行
- 弱类型语言：变量类型可以动态改变
- 动态类型语言：运行时才确定数据类型
- 单线程：同一时间只能执行一个任务
- 事件驱动：通过事件循环处理异步操作

---

## JS的组成部分（ECMAScript + Web APIs）

### ECMAScript（基础语法）
规定JS的核心知识，例如：变量、分支语句、循环语句、对象等。

### Web APIs
- **文档对象模型(DOM)**：操作文档，比如对页面的元素进行移动、大小、添加删除等操作
- **浏览器对象模型(BOM)**：操作浏览器，比如页面的弹窗、检查窗口的宽度、存储数据到浏览器等

### 相关面试题
**Q: 请解释DOM和BOM的区别？**
**A:** 
- **DOM (Document Object Model)**：文档对象模型，用于操作HTML和XML文档
- **BOM (Browser Object Model)**：浏览器对象模型，用于操作浏览器窗口和浏览器相关功能
- DOM是W3C标准，BOM没有统一标准，各浏览器实现可能不同

---

## JS输入输出语句
- **输入**：`prompt()`
- **输出**：`alert()`、`document.write()`、`console.log()`

---

## JS内置对象
- **String**：字符串对象
- **Boolean**：布尔值对象
- **Object**：对象
- **Number**：数字对象
- **Array**：数组对象
- **Function**：函数对象
- **Date**：日期对象
- **Math**：数学对象
- **RegExp**：正则表达式对象

### 常用方法示例
```javascript
// Math 对象
Math.abs()    // 绝对值
Math.sqrt()   // 平方根
Math.max()    // 最大值
Math.min()    // 最小值

// Date 对象
new Date()    // 创建日期对象
getFullYear() // 获取年份（注意：getYear()已废弃）

// String 对象
concat()      // 连接字符串
length        // 字符串长度
slice()       // 截取字符串
split()       // 分割字符串

// Array 对象
// 见下方数组方法部分
```

### 相关面试题
**Q: 请列举JavaScript的内置对象及其常用方法？**
**A:** 
- **Math**：数学计算，如Math.abs()、Math.sqrt()、Math.max()、Math.min()
- **Date**：日期时间处理，如new Date()、getFullYear()、getMonth()
- **String**：字符串处理，如concat()、slice()、split()、indexOf()
- **Array**：数组操作，如push()、pop()、map()、filter()
- **Object**：对象操作，如Object.keys()、Object.values()、Object.assign()

---

## JS操作数组的方法

### 会改变原数组的方法（破坏性方法）
- `push()` - 在数组末尾添加元素
- `pop()` - 删除并返回数组的最后一个元素
- `sort()` - 对数组元素进行排序
- `splice()` - 添加/删除数组元素
- `unshift()` - 在数组开头添加元素
- `shift()` - 删除并返回数组的第一个元素
- `reverse()` - 反转数组

### 不会改变原数组的方法（非破坏性方法）
- `concat()` - 合并数组
- `join()` - 将数组元素连接成字符串
- `map()` - 映射数组元素
- `filter()` - 过滤数组元素
- `every()` - 检查所有元素是否满足条件
- `some()` - 检查是否有元素满足条件
- `reduce()` - 归并数组元素
- `findIndex()` - 查找元素索引
- `slice()` - 截取数组片段

### 其他常用方法
- `Array.isArray()` - 检查是否为数组
- `indexOf()` - 查找元素索引
- `includes()` - 检查是否包含某元素

### 相关面试题
**Q: 请实现数组去重的方法？**
**A:** 有多种方法：

```javascript
// 方法1：使用Set
const arr = [1, 2, 2, 3, 3, 4];
const unique1 = [...new Set(arr)];

// 方法2：使用filter
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);

// 方法3：使用reduce
const unique3 = arr.reduce((acc, cur) => {
  return acc.includes(cur) ? acc : [...acc, cur];
}, []);

// 方法4：使用Map
const unique4 = Array.from(new Map(arr.map(item => [item, item])).values());
```

**Q: 请实现数组扁平化？**
**A:** 

```javascript
const arr = [1, [2, 3], [4, [5, 6]]];

// 方法1：使用flat (ES2019)
const flat1 = arr.flat(Infinity);

// 方法2：递归
function flatten(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

// 方法3：使用toString
const flat3 = arr.toString().split(',').map(Number);
```

**Q: 哪些数组方法会改变原数组？**
**A:** 会改变原数组的方法（破坏性方法）：
- `push()`、`pop()`、`unshift()`、`shift()` - 增删元素
- `splice()` - 增删改元素
- `sort()`、`reverse()` - 排序和反转
- `fill()` - 填充数组

---

## JavaScript数据类型

### 基本数据类型（7种）
1. **Number** - 数字类型（包括整数和浮点数）
2. **String** - 字符串型
3. **Boolean** - 布尔型（true、false）
4. **Undefined** - 未定义型
5. **Null** - 空类型
6. **Symbol** - 符号类型（ES6新增，表示独一无二的值）
7. **BigInt** - 大整数类型（ES2020新增）

### 引用数据类型
- **Object** - 对象（包括Array数组、Function函数、Date日期、RegExp正则表达式等）

### 相关面试题
**Q: 请解释JavaScript中的基本数据类型和引用数据类型的区别？**
**A:** 
- **基本数据类型**：存储在栈内存中，按值访问，复制时创建新的值
- **引用数据类型**：存储在堆内存中，按引用访问，复制时复制引用地址

```javascript
// 基本数据类型
let a = 1;
let b = a; // b获得a的值副本
b = 2;     // 修改b不影响a
console.log(a); // 1

// 引用数据类型
let obj1 = {name: 'John'};
let obj2 = obj1; // obj2获得obj1的引用
obj2.name = 'Jane'; // 修改obj2会影响obj1
console.log(obj1.name); // 'Jane'
```

**Q: typeof null 为什么返回 "object"？**
**A:** 这是JavaScript的一个已知bug，在JavaScript最初的实现中，对象被表示为32位，其中低3位表示类型标签。null被表示为全0，而对象的类型标签也是000，所以typeof null返回"object"。

---

## 如何检测数据类型

### 一、typeof 操作符
返回一个字符串，表示未经计算的操作数的类型

```javascript
typeof 200                           // "number"
typeof "Hello World"                 // "string"
typeof false                         // "boolean"
typeof undefined                     // "undefined"
typeof null                          // "object" (这是JavaScript的一个已知bug)
typeof [1,2,3]                       // "object"
typeof {name:"Dorothy",age:18}       // "object"
typeof function(){}                  // "function"
typeof NaN                           // "number"
typeof new Date()                    // "object"
typeof x                             // "undefined" (已声明但未赋值的变量)
typeof typeof 1                      // "string"
typeof 10n                           // "bigint"
typeof Symbol('id')                  // "symbol"
typeof Math                          // "object"
```

### 二、null和undefined的区别
- **null**：表示"空"或"不存在"，是一个空对象指针
- **undefined**：表示已声明但未赋值
- **相同点**：都是假值，在布尔上下文中都返回false
- **不同点**：
  - `typeof null` // "object"
  - `typeof undefined` // "undefined"

### 三、如何准确判断一个变量是否是数组
```javascript
// 推荐方法
Array.isArray(arr)                   // 最佳方式
arr instanceof Array                 // 也可以使用

// 其他方法
Object.prototype.toString.call(arr) === '[object Array]'
```

### 四、如何检测一个对象是否是某个特定类的实例
```javascript
obj instanceof ClassName
```

### 五、最准确的类型检测方法
```javascript
Object.prototype.toString.call(value)
// 返回格式：[object Type]
```

### 六、instanceof 操作符
检测构造函数的prototype属性是否出现在某个实例对象的原型链上
```javascript
[] instanceof Array                  // true
{} instanceof Object                 // true
function(){} instanceof Function     // true
```

### 相关面试题
**Q: 如何准确判断一个变量的数据类型？**
**A:** 
```javascript
// 1. 使用Object.prototype.toString.call()
Object.prototype.toString.call([]) === '[object Array]'
Object.prototype.toString.call({}) === '[object Object]'
Object.prototype.toString.call(null) === '[object Null]'

// 2. 使用constructor属性
[].constructor === Array
{}.constructor === Object

// 3. 使用instanceof
[] instanceof Array
{} instanceof Object
```

---

## this的指向规则

**重要**：this的指向在函数定义时无法确定，只有函数执行时才能确定

### 1. 默认绑定
- 严格模式下：this指向undefined
- 非严格模式下：this指向全局对象（浏览器中是window）

### 2. 隐式绑定
作为对象的方法进行调用，this指向调用对象
```javascript
const obj = {
  name: 'test',
  sayHi() {
    console.log(this.name);
  }
};
obj.sayHi(); // this指向obj
```

### 3. 显式绑定
通过bind、call、apply改变this指向
```javascript
function greet() {
  console.log(this.name);
}
const person = { name: 'John' };
greet.call(person);   // this指向person
greet.apply(person);  // this指向person
const boundGreet = greet.bind(person); // 返回新函数，this绑定到person
```

### 4. new绑定
作为构造函数调用，this指向新创建的对象
```javascript
function Person(name) {
  this.name = name;
}
const person = new Person('John'); // this指向新创建的person对象
```

### 5. 箭头函数
箭头函数没有自己的this，继承外层作用域的this
```javascript
const obj = {
  name: 'test',
  sayHi: () => {
    console.log(this.name); // this指向外层作用域，不是obj
  }
};
```

### 相关面试题
**Q: 请解释JavaScript中this的指向规则？**
**A:** this的指向取决于函数的调用方式：

```javascript
// 1. 默认绑定
function foo() {
  console.log(this);
}
foo(); // window (非严格模式) / undefined (严格模式)

// 2. 隐式绑定
const obj = {
  name: 'obj',
  foo: function() {
    console.log(this.name);
  }
};
obj.foo(); // 'obj'

// 3. 显式绑定
function bar() {
  console.log(this.name);
}
const person = {name: 'person'};
bar.call(person); // 'person'

// 4. new绑定
function Person(name) {
  this.name = name;
}
const p = new Person('John');
console.log(p.name); // 'John'

// 5. 箭头函数
const arrowObj = {
  name: 'arrow',
  foo: () => {
    console.log(this.name);
  }
};
arrowObj.foo(); // undefined (this指向外层作用域)
```

**Q: call、apply、bind的区别？**
**A:** 
- **call**：立即执行，参数逐个传入
- **apply**：立即执行，参数以数组形式传入
- **bind**：返回新函数，不立即执行

```javascript
function greet(name, age) {
  console.log(`Hello, I'm ${name}, ${age} years old`);
}

greet.call(null, 'John', 25);
greet.apply(null, ['John', 25]);
const boundGreet = greet.bind(null, 'John', 25);
boundGreet();
```

---

## 补充知识点

### 变量提升
- var声明的变量会提升到作用域顶部
- let和const声明的变量不会提升（暂时性死区）

### 闭包
函数能够访问其定义时所在作用域的变量，即使函数在其他地方执行

### 原型链
JavaScript通过原型链实现继承，每个对象都有一个原型对象

### 事件循环
JavaScript是单线程的，通过事件循环机制处理异步操作

### 相关面试题

**Q: 什么是变量提升？var、let、const有什么区别？**
**A:** 
- **变量提升**：JavaScript引擎在解析代码时，会将变量声明提升到当前作用域的顶部
- **区别**：
  - `var`：存在变量提升，可以重复声明，函数作用域
  - `let`：存在暂时性死区，不可重复声明，块级作用域
  - `const`：同let，但声明后不可重新赋值

```javascript
console.log(a); // undefined (变量提升)
var a = 1;

console.log(b); // ReferenceError (暂时性死区)
let b = 2;

const c = 3;
c = 4; // TypeError: Assignment to constant variable
```

**Q: 什么是闭包？有什么用途？**
**A:** 闭包是指函数能够访问其定义时所在作用域的变量，即使函数在其他地方执行。

```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

**用途**：
- 数据私有化
- 函数工厂
- 模块化开发

**Q: 什么是事件循环？**
**A:** JavaScript是单线程的，通过事件循环处理异步操作：

```javascript
console.log('1'); // 同步任务

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步任务

// 输出顺序：1, 4, 3, 2
```

**Q: 请解释原型链？**
**A:** 原型链是JavaScript实现继承的机制：

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = new Person('John');
person.sayHello(); // 通过原型链找到sayHello方法

// 原型链：person -> Person.prototype -> Object.prototype -> null
```

**Q: 请实现继承？**
**A:** 

```javascript
// 方法1：原型链继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name) {
  Animal.call(this, name); // 借用构造函数
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 方法2：ES6 class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}
```

---

## 异步编程

### 相关面试题
**Q: 请解释Promise、async/await的区别？**
**A:** 

```javascript
// Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('data');
    }, 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

**区别**：
- Promise是异步编程的基础，async/await是Promise的语法糖
- async/await让异步代码看起来像同步代码，更易读
- async/await错误处理更直观

---

## 函数式编程

### 相关面试题
**Q: 请实现防抖和节流？**
**A:** 

```javascript
// 防抖：延迟执行，如果在延迟期间再次触发，则重新计时
function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 节流：在指定时间内只执行一次
function throttle(func, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      func.apply(this, args);
      last = now;
    }
  };
}
```

---

## 深拷贝和浅拷贝

### 相关面试题
**Q: 请实现深拷贝？**
**A:** 

```javascript
// 方法1：JSON
function deepClone1(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 方法2：递归
function deepClone2(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone2(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone2(obj[key]);
      }
    }
    return clonedObj;
  }
}
```

---

## 事件委托

### 相关面试题
**Q: 什么是事件委托？有什么优点？**
**A:** 事件委托是将事件监听器添加到父元素而不是每个子元素上：

```javascript
// 不使用事件委托
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

// 使用事件委托
document.addEventListener('click', function(e) {
  if (e.target.matches('button')) {
    handleClick(e);
  }
});
```

**优点**：
- 减少内存占用
- 动态元素自动绑定事件
- 代码更简洁

---

## 模块化

### 相关面试题
**Q: 请解释ES6模块和CommonJS的区别？**
**A:** 

```javascript
// ES6模块 (ESM)
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add } from './math.js';

// CommonJS
// math.js
const add = (a, b) => a + b;
module.exports = { add };
module.exports.multiply = (a, b) => a * b;

// main.js
const { add, multiply } = require('./math.js');
```

**区别**：
- ES6模块是静态的，编译时确定依赖关系
- CommonJS是动态的，运行时确定依赖关系
- ES6模块支持tree shaking，CommonJS不支持

---

## 高级面试题

### 1. 设计模式
**Q: 请实现单例模式？**
**A:** 

```javascript
// 方法1：闭包
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      name: 'singleton',
      getInstance: function() {
        return this;
      }
    };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// 方法2：ES6 class
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}
```

### 2. 性能优化
**Q: 如何优化JavaScript性能？**
**A:** 
- 避免全局变量
- 使用事件委托
- 避免频繁的DOM操作
- 使用防抖和节流
- 合理使用缓存
- 代码分割和懒加载
- 使用Web Workers处理复杂计算

### 3. 错误处理
**Q: 如何处理JavaScript错误？**
**A:** 

```javascript
// try-catch
try {
  // 可能出错的代码
  throw new Error('Something went wrong');
} catch (error) {
  console.error('Error:', error.message);
} finally {
  // 总是执行的代码
}

// Promise错误处理
fetch('/api/data')
  .then(response => response.json())
  .catch(error => console.error('Fetch error:', error));

// async/await错误处理
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 全局错误处理
window.addEventListener('error', function(event) {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
});
```

这些面试题涵盖了JavaScript的核心概念和常见应用场景，建议深入理解每个概念的原理和实际应用。
