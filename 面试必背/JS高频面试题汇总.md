# JavaScript 高频面试题汇总

## 快速导航

### 核心必背知识点
| 知识点 | 重要级别 | 页码 |
|--------|---------|------|
| This指向 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第2节 |
| 闭包 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第7节 |
| 原型/原型链 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第9节 |
| Promise | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第15节 |
| 事件循环 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第18、25节 |
| 深浅拷贝 | ⭐⭐⭐⭐⭐ 🔥 | 第21节 |
| call/apply/bind | ⭐⭐⭐⭐⭐ 🔥 | 第3节 |
| 防抖节流 | ⭐⭐⭐⭐⭐ | 第22节 |

### 高频考点
| 知识点 | 重要级别 | 页码 |
|--------|---------|------|
| 数据类型检测 | ⭐⭐⭐⭐ | 第1节 |
| 变量提升 | ⭐⭐⭐⭐ | 第4节 |
| 作用域 | ⭐⭐⭐⭐ | 第6节 |
| new原理 | ⭐⭐⭐⭐ | 第8节 |
| 继承方式 | ⭐⭐⭐⭐ | 第10节 |
| async/await | ⭐⭐⭐⭐ | 第17节 |
| 垃圾回收 | ⭐⭐⭐⭐ | 第19节 |
| 跨域问题 | ⭐⭐⭐⭐ | 第27节 |

### 重要知识点
| 知识点 | 重要级别 | 页码 |
|--------|---------|------|
| 执行上下文 | ⭐⭐⭐ | 第5节 |
| 面向对象 | ⭐⭐⭐ | 第11节 |
| 事件机制 | ⭐⭐⭐ | 第12节 |
| 模块化 | ⭐⭐⭐ | 第13节 |
| Generator | ⭐⭐⭐ | 第16节 |
| Proxy代理 | ⭐⭐⭐ | 第23节 |
| 数组方法 | ⭐⭐⭐ | 第26节 |

---

## 一、JS基础

### 1. 类型及检测方式 ⭐⭐⭐⭐

#### 题目1：JavaScript有哪些数据类型？
**答案：**
JavaScript有8种数据类型，分为两大类：
- **基本数据类型（7种）**：Number、String、Boolean、Undefined、Null、Symbol、BigInt
- **引用数据类型（1种）**：Object（包括Array、Function、Date、RegExp等）

💡 **记忆口诀：**
```
数字字符布尔空，未定符号大整型（7个基本）
对象引用是一家（1个引用）
```
或更顺口的：
```
数（Number）串（String）布（Boolean）空（Null）未（Undefined）定（Undefined），
符（Symbol）号大（BigInt）整，对（Object）象一家亲
```

#### 题目2：如何检测数据类型？(怎么判断一个变量是否为数组)
**答案：**

💡 **记忆口诀：类型检测四大法**
```
typeof快速看基本，instanceof查原型链
toString最准确，Array专门判数组
```

1. **typeof**：返回一个字符串，表示未经计算的操作数的类型
```javascript
typeof 123 // 'number'
typeof 'str' // 'string'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof null // 'object' (历史遗留问题)
typeof {} // 'object'
typeof [] // 'object'
typeof function(){} // 'function'
typeof Symbol() // 'symbol'
typeof 123n // 'bigint'
```

2. **instanceof**：检测构造函数的prototype（原型）属性是否出现在某个实例对象的原型链上
```javascript
[] instanceof Array // true
{} instanceof Object // true
function(){} instanceof Function // true
```

3. **Object.prototype.toString.call()**：最准确的类型检测方法
```javascript
Object.prototype.toString.call(123) // '[object Number]'
Object.prototype.toString.call('str') // '[object String]'
Object.prototype.toString.call(true) // '[object Boolean]'
Object.prototype.toString.call(undefined) // '[object Undefined]'
Object.prototype.toString.call(null) // '[object Null]'
Object.prototype.toString.call({}) // '[object Object]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call(function(){}) // '[object Function]'
Object.prototype.toString.call(new Date()) // '[object Date]'
Object.prototype.toString.call(/regex/) // '[object RegExp]'
```

4. **Array.isArray()**：专门用于检测数组
```javascript
Array.isArray([]) // true
Array.isArray({}) // false
```

#### 题目3：null和undefined的区别？
**答案：**
- **undefined**：表示变量已声明但未赋值，或者对象属性不存在
- **null**：表示一个空对象指针，常用于释放对象引用
- 相同点：都是假值（falsy），null == undefined 返回true
- 不同点：typeof null === 'object'，typeof undefined === 'undefined'

### 2. This ⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目1：this的指向规则是什么？
**答案：**
this的指向在函数定义时无法确定，只有函数执行时才能确定，一般遵循以下规则：
1. **默认绑定**：非严格模式下this指向window，严格模式下指向undefined
2. **隐式绑定**：作为对象方法调用，this指向调用对象
3. **显式绑定**：通过call、apply、bind改变this指向
4. **new绑定**：作为构造函数调用，this指向新创建的实例
5. **箭头函数**：没有自己的this，继承外层作用域的this

优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

💡 **记忆口诀：新显隐默箭**
```
新（new）建显（call/apply/bind）眼（隐式绑定），
默（默认绑定）认最低，箭（箭头函数）头看外层
```

💡 **记忆口诀：优先级记忆**
```
new最大，call/apply/bind次之
对象方法第三，独立函数最低
箭头函数特殊：继承定义位置
```

#### 题目2：请举例说明不同场景下的this指向
**答案：**
```javascript
// 1. 默认绑定
function fn() {
  console.log(this); // window（非严格模式）/ undefined（严格模式）
}
fn();

// 2. 隐式绑定
const obj = {
  name: 'obj',
  fn: function() {
    console.log(this.name); // 'obj'
  }
};
obj.fn();

// 3. 隐式绑定丢失
const obj2 = {
  name: 'obj2',
  fn: function() {
    console.log(this.name);
  }
};
const fn2 = obj2.fn;
fn2(); // undefined（this指向window）

// 4. 显式绑定
function fn3() {
  console.log(this.name);
}
const obj3 = { name: 'obj3' };
fn3.call(obj3); // 'obj3'
fn3.apply(obj3); // 'obj3'
const boundFn = fn3.bind(obj3);
boundFn(); // 'obj3'

// 5. new绑定
function Person(name) {
  this.name = name;
}
const person = new Person('Alice');
console.log(person.name); // 'Alice'

// 6. 箭头函数
const obj4 = {
  name: 'obj4',
  fn: () => {
    console.log(this); // window（继承外层作用域）
  },
  fn2: function() {
    const arrow = () => {
      console.log(this.name); // 'obj4'（继承fn2的this）
    };
    arrow();
  }
};
obj4.fn();
obj4.fn2();
```

### 3. apply/call/bind 原理 ⭐⭐⭐⭐⭐ 🔥

#### 题目1：call、apply、bind的区别？
**答案：**
- **共同点**：都可以改变函数的this指向
- **区别**：
  - call：立即执行，参数逐个传递 `fn.call(obj, arg1, arg2)`
  - apply：立即执行，参数以数组形式传递 `fn.apply(obj, [arg1, arg2])`
  - bind：返回改变this后的新函数，不立即执行 `fn.bind(obj, arg1, arg2)`

💡 **记忆口诀：CAB三兄弟**
```
call个个传（参数逐个传），立即见效
apply数组传（参数数组传），立马执行
bind预约制（返回新函数），不急执行
```

💡 **记忆口诀：执行时机**
```
call和apply是双胞胎，都是立即执行
bind是预约，返回函数等你调
```

**详细示例：**
```javascript
// 定义一个函数和对象
function greet(name, age) {
  console.log(`Hello, I'm ${name}, ${age} years old.`);
  console.log('this指向:', this);
  console.log('this.name:', this.name);
}

const person = {
  name: '张三',
  age: 25
};

const student = {
  name: '李四',
  age: 20
};

// 1. call方法 - 立即执行，参数逐个传递
console.log('=== call方法示例 ===');
greet.call(person, '王五', 30);
// 输出：
// Hello, I'm 王五, 30 years old.
// this指向: {name: '张三', age: 25}
// this.name: 张三

// 2. apply方法 - 立即执行，参数以数组形式传递
console.log('=== apply方法示例 ===');
greet.apply(student, ['赵六', 35]);
// 输出：
// Hello, I'm 赵六, 35 years old.
// this指向: {name: '李四', age: 20}
// this.name: 李四

// 3. bind方法 - 返回新函数，不立即执行
console.log('=== bind方法示例 ===');
const boundGreet = greet.bind(person, '孙七', 28);
console.log('bind后返回新函数，但未执行');
boundGreet(); // 现在才执行
// 输出：
// Hello, I'm 孙七, 28 years old.
// this指向: {name: '张三', age: 25}
// this.name: 张三

// 实际应用场景示例
console.log('=== 实际应用场景 ===');

// 场景1：借用数组方法
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

// 使用call借用数组的push方法
Array.prototype.push.call(arrayLike, 'd');
console.log('借用push后:', arrayLike); // {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4}

// 场景2：使用apply求数组最大值
const numbers = [1, 5, 3, 9, 2];
const max = Math.max.apply(null, numbers);
console.log('数组最大值:', max); // 9

// 场景3：使用bind创建事件处理函数
const button = document.createElement('button');
button.textContent = '点击我';

// 使用bind确保事件处理函数中的this指向特定对象
const handler = {
  name: '按钮处理器',
  handleClick: function(event) {
    console.log('按钮被点击了！');
    console.log('this.name:', this.name);
    console.log('事件对象:', event);
  }
};

// bind确保this指向handler对象
button.addEventListener('click', handler.handleClick.bind(handler));
```

#### 题目2：手写实现call方法
**答案：**
```javascript
Function.prototype.myCall = function(context, ...args) {
  // 1. 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  
  // 2. 判断context是否传入，如果未传入则设置为window
  context = context || window;
  
  // 3. 将函数作为context的一个属性
  const fn = Symbol('fn');
  context[fn] = this;
  
  // 4. 调用函数
  const result = context[fn](...args);
  
  // 5. 删除属性
  delete context[fn];
  
  // 6. 返回结果
  return result;
};
```

#### 题目3：手写实现apply方法
**答案：**
```javascript
Function.prototype.myApply = function(context, args) {
  // 1. 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  
  // 2. 判断context是否传入
  context = context || window;
  
  // 3. 将函数作为context的一个属性
  const fn = Symbol('fn');
  context[fn] = this;
  
  // 4. 调用函数
  let result;
  if (args) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  
  // 5. 删除属性
  delete context[fn];
  
  // 6. 返回结果
  return result;
};
```

#### 题目4：手写实现bind方法
**答案：**
```javascript
Function.prototype.myBind = function(context, ...args) {
  // 1. 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  
  // 2. 保存this
  const fn = this;
  
  // 3. 返回一个函数
  return function Fn(...innerArgs) {
    // 判断是否用于构造函数
    if (this instanceof Fn) {
      return new fn(...args, ...innerArgs);
    }
    return fn.apply(context, [...args, ...innerArgs]);
  };
};
```

### 4. 变量提升 ⭐⭐⭐⭐

#### 题目1：什么是变量提升？
**答案：**
变量提升（Hoisting）是JavaScript的一种机制，指在代码执行前，变量和函数声明会被移动到其所在作用域的顶部。

- **var声明**：变量声明提升，但赋值不提升，初始值为undefined
- **函数声明**：整个函数提升，可以在声明前调用
- **let/const**：存在暂时性死区，不能在声明前使用

💡 **记忆口诀：提升三规则**
```
var声明提升值不提，初始undefined要记牢
函数声明全提升，声明之前可调用
let/const有死区，使用之前会报错
```

#### 题目2：请解释下面代码的输出
**答案：**
```javascript
// 例1
console.log(a); // undefined
var a = 1;
// 相当于：
// var a;
// console.log(a);
// a = 1;

// 例2
console.log(fn); // [Function: fn]
fn(); // 'hello'
function fn() {
  console.log('hello');
}

// 例3
console.log(fn2); // undefined
fn2(); // TypeError: fn2 is not a function
var fn2 = function() {
  console.log('hello');
};

// 例4
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2;

// 例5：函数优先级高于变量
console.log(c); // [Function: c]
var c = 1;
function c() {}
console.log(c); // [Function: c]
c = 2;
console.log(c); // 2
```

### 5. 执行上下文 ⭐⭐⭐

#### 题目1：什么是执行上下文？
**答案：**
执行上下文是JavaScript代码执行的环境，包含了代码执行所需的所有信息。

**执行上下文的类型：**
1. **全局执行上下文**：只有一个，浏览器中是window对象
2. **函数执行上下文**：函数被调用时创建，可以有无数个
3. **Eval执行上下文**：eval函数执行时创建

**执行上下文包含：**
1. **变量对象（VO）/活动对象（AO）**：存储变量、函数声明、函数参数
2. **作用域链**：当前变量对象 + 所有父级变量对象
3. **this**：函数执行时确定

💡 **记忆口诀：执行上下文三要素**
```
变量对象存数据（VO/AO）
作用域链找变量（Scope Chain）
this指向看调用
```

#### 题目2：执行上下文的生命周期？
**答案：**
1. **创建阶段**：
   - 创建变量对象
   - 建立作用域链
   - 确定this指向

2. **执行阶段**：
   - 变量赋值
   - 函数引用
   - 执行其他代码

3. **销毁阶段**：
   - 执行完毕后，执行上下文出栈，等待垃圾回收

### 6. 作用域 ⭐⭐⭐⭐

#### 题目1：什么是作用域？
**答案：**
作用域是变量和函数的可访问范围，决定了代码中变量和函数的可见性和生命周期。

**作用域类型：**
1. **全局作用域**：在任何地方都能访问
2. **函数作用域**：只在函数内部访问
3. **块级作用域**：ES6新增，let/const在{}内形成块级作用域

💡 **记忆口诀：作用域三兄弟**
```
全局作用域：到处都能访问
函数作用域：函数内部私有
块级作用域：大括号内有效（let/const）
```

#### 题目2：什么是作用域链？
**答案：**
作用域链是多个作用域嵌套形成的链式结构。当查找变量时，会从当前作用域开始，逐级向上查找，直到全局作用域。

```javascript
var a = 1;
function fn1() {
  var b = 2;
  function fn2() {
    var c = 3;
    console.log(a, b, c); // 1 2 3
    // 作用域链：fn2作用域 -> fn1作用域 -> 全局作用域
  }
  fn2();
}
fn1();
```

### 7. 闭包 ⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目1：什么是闭包？
**答案：**
闭包是指函数能够访问其定义时所在作用域的变量，即使函数在其他地方执行。

**闭包的特点（闭包三要素）：**
1. 函数嵌套函数
2. 内部函数引用外部函数的变量
3. 内部函数被返回或传递到外部

💡 **记忆口诀：闭包三要素**
```
函数套函数（嵌套函数）
内访外变量（引用外部变量）
外传内函数（返回内部函数）
```

💡 **记忆口诀：闭包特点**
```
定义时作用域，执行时记得牢
外层变量常驻，内层函数持有
```

#### 题目2：闭包的应用场景？
**答案：**
1. **数据私有化**
```javascript
function createCounter() {
  let count = 0;
  return {
    increment: function() { count++; },
    decrement: function() { count--; },
    getCount: function() { return count; }
  };
}
const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
```

2. **函数工厂**
```javascript
function createMultiplier(multiplier) {
  return function(x) {
    return x * multiplier;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
```

3. **事件处理和回调**
```javascript
function addHandlers() {
  for (let i = 0; i < 5; i++) {
    document.getElementById('btn' + i).onclick = function() {
      console.log(i); // 正确输出0,1,2,3,4
    };
  }
}
```

#### 题目3：闭包的缺点？
**答案：**
1. **内存泄漏**：闭包会使函数中的变量都保存在内存中，内存消耗大
2. **性能问题**：闭包会导致作用域链变长，查找变量的时间增加

### 8. New的原理 ⭐⭐⭐⭐

#### 题目1：new操作符做了什么？
**答案：**
new操作符执行时会进行以下步骤：
1. 创建一个新的空对象
2. 将新对象的原型指向构造函数的prototype
3. 将构造函数的this指向新对象，执行构造函数
4. 如果构造函数返回对象，则返回该对象；否则返回新创建的对象

💡 **记忆口诀：new的四步骤**
```
创建空对象第一步（创建空对象）
原型指向prototype（设置原型）
this绑定执行函数（绑定this并执行）
返回对象看情况（判断返回值）
```

#### 题目2：手写实现new操作符
**答案：**
```javascript
function myNew(Constructor, ...args) {
  // 1. 创建一个新对象，原型指向构造函数的prototype
  const obj = Object.create(Constructor.prototype);
  
  // 2. 执行构造函数，绑定this
  const result = Constructor.apply(obj, args);
  
  // 3. 如果构造函数返回对象，则返回该对象；否则返回新创建的对象
  return result instanceof Object ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = myNew(Person, 'Alice', 20);
console.log(person.name); // 'Alice'
person.sayHello(); // "Hello, I'm Alice"
```

### 9. 原型/原型链 ⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目1：什么是原型和原型链？
**答案：**
- **原型**：每个函数都有prototype属性，每个对象都有__proto__属性
- **原型链**：对象通过__proto__属性连接起来的链式结构

**原型规则：**
1. 所有对象都有__proto__属性，指向其构造函数的prototype
2. 所有函数都有prototype属性，指向一个对象
3. 所有函数都是Function的实例
4. Object.prototype.__proto__ === null（原型链顶端）

💡 **记忆口诀：原型链查找规则**
```
对象找属性，先看自己有没有
自己没有找原型（__proto__）
原型没有继续找，直到null为止
Object.prototype是终点，null是尽头
```

💡 **记忆口诀：prototype和__proto__**
```
函数有prototype（显式原型）
对象有__proto__（隐式原型）
对象的__proto__指向构造函数的prototype
```

#### 题目2：instanceof的原理？
**答案：**
instanceof用于检测构造函数的prototype是否出现在对象的原型链上。

```javascript
function myInstanceof(obj, Constructor) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);
  
  // 获取构造函数的prototype
  const prototype = Constructor.prototype;
  
  // 循环遍历原型链
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  
  return false;
}

// 测试
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof([], Function)); // false
```

### 10. 继承 ⭐⭐⭐⭐

#### 题目1：JavaScript有哪些继承方式？
**答案：**

💡 **记忆口诀：继承六大方式**
```
原型链继承共享引用（缺点：引用类型共享）
构造函数无法继承原型（缺点：不能继承原型方法）
组合继承调用两次（缺点：调用两次父构造函数）
原型式继承创建对象（Object.create原理）
寄生式继承增强对象（在原型式基础上增强）
寄生组合最理想（最佳继承方式）
ES6 Class最简洁（语法糖，本质还是原型）
```

1. **原型链继承**
```javascript
function Parent() {
  this.name = '张三';
  this.hobbies = ['读书', '运动'];
}
Parent.prototype.getName = function() {
  return this.name;
};

function Child() {
  this.age = 20;
}
Child.prototype = new Parent();

let child1 = new Child();
let child2 = new Child();
console.log(child1.name); // '张三'
console.log(child1.age);  // 20

// 缺点：引用类型属性会被所有实例共享
child1.hobbies.push('游戏');
console.log(child2.hobbies); // ['读书', '运动', '游戏'] - 被共享了
```

2. **构造函数继承**
```javascript
function Parent(name) {
  this.name = name;
  this.hobbies = ['读书', '运动'];
}
Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

let child1 = new Child('李四', 18);
let child2 = new Child('王五', 22);
console.log(child1.name); // '李四'
console.log(child1.age);  // 18
child1.hobbies.push('游戏');
console.log(child2.hobbies); // ['读书', '运动'] - 不会被共享

// 缺点：无法继承原型上的方法
console.log(child1.getName); // undefined
```

3. **组合继承**
```javascript
function Parent(name) {
  this.name = name;
  this.hobbies = ['读书', '运动'];
}
Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name); // 第一次调用Parent
  this.age = age;
}
Child.prototype = new Parent(); // 第二次调用Parent
Child.prototype.constructor = Child;

let child1 = new Child('赵六', 25);
console.log(child1.name); // '赵六'
console.log(child1.age);  // 25
console.log(child1.getName()); // '赵六' - 可以继承原型方法

// 缺点：调用两次父构造函数
```

4. **原型式继承**
```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: '孙七',
  age: 30,
  hobbies: ['读书', '运动']
};

let child1 = object(person);
let child2 = Object.create(person); // ES5的Object.create就是这个原理

child1.name = '周八';
child1.age = 28;
console.log(child1.name); // '周八'
console.log(child2.name); // '孙七'
```

5. **寄生式继承**
```javascript
function createAnother(original) {
  const clone = Object.create(original);
  clone.sayHello = function() {
    console.log(`你好，我是${this.name}，今年${this.age}岁`);
  };
  return clone;
}

let person = {
  name: '吴九',
  age: 35
};

let child = createAnother(person);
child.sayHello(); // '你好，我是吴九，今年35岁'
```

6. **寄生组合式继承**（最理想）
```javascript
function inheritPrototype(Child, Parent) {
  const prototype = Object.create(Parent.prototype);
  prototype.constructor = Child;
  Child.prototype = prototype;
}

function Parent(name) {
  this.name = name;
  this.hobbies = ['读书', '运动'];
}
Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
inheritPrototype(Child, Parent);

let child1 = new Child('郑十', 26);
console.log(child1.name); // '郑十'
console.log(child1.age);  // 26
console.log(child1.getName()); // '郑十'

// 优点：只调用一次Parent构造函数，避免了在Child.prototype上创建不必要的属性
```

7. **ES6 Class继承**
```javascript
class Parent {
  constructor(name) {
    this.name = name;
    this.hobbies = ['读书', '运动'];
  }
  getName() {
    return this.name;
  }
  introduce() {
    return `我是${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  getAge() {
    return this.age;
  }
  introduce() {
    return `${super.introduce()}，今年${this.age}岁`;
  }
}

let child1 = new Child('陈十一', 24);
console.log(child1.getName()); // '陈十一'
console.log(child1.getAge());  // 24
console.log(child1.introduce()); // '我是陈十一，今年24岁'
```

### 11. 面向对象 ⭐⭐⭐

#### 题目1：JavaScript如何实现封装？
**答案：**
1. **使用闭包实现私有属性和方法**
```javascript
function Person(name) {
  // 私有属性
  let _age = 0;
  
  // 公有属性
  this.name = name;
  
  // 私有方法
  function checkAge(age) {
    return age > 0 && age < 150;
  }
  
  // 公有方法（特权方法）
  this.setAge = function(age) {
    if (checkAge(age)) {
      _age = age;
    }
  };
  
  this.getAge = function() {
    return _age;
  };
}
```

2. **使用Symbol实现私有属性**
```javascript
const _age = Symbol('age');

class Person {
  constructor(name, age) {
    this.name = name;
    this[_age] = age;
  }
  
  getAge() {
    return this[_age];
  }
}
```

3. **使用WeakMap实现私有属性**
```javascript
const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    this.name = name;
    privateData.set(this, { age });
  }
  
  getAge() {
    return privateData.get(this).age;
  }
}
```

### 12. 事件机制 ⭐⭐⭐

#### 题目1：什么是事件委托？
**答案：**
事件委托是利用事件冒泡机制，将子元素的事件处理函数绑定到父元素上。

**优点：**
1. 减少内存消耗，不需要为每个子元素绑定事件
2. 动态绑定，新增的子元素自动有事件处理

```javascript
// 不使用事件委托
const lis = document.querySelectorAll('li');
lis.forEach(li => {
  li.addEventListener('click', function() {
    console.log(this.textContent);
  });
});

// 使用事件委托
const ul = document.querySelector('ul');
ul.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
```

#### 题目2：事件流的三个阶段？
**答案：**
1. **捕获阶段**：事件从window向目标元素传播
2. **目标阶段**：事件到达目标元素
3. **冒泡阶段**：事件从目标元素向window传播

```javascript
// addEventListener的第三个参数控制在哪个阶段触发
element.addEventListener('click', handler, true); // 捕获阶段
element.addEventListener('click', handler, false); // 冒泡阶段（默认）
```

#### 题目3：如何阻止事件传播和默认行为？
**答案：**
```javascript
element.addEventListener('click', function(e) {
  // 阻止事件冒泡
  e.stopPropagation();
  
  // 阻止事件捕获和冒泡
  e.stopImmediatePropagation();
  
  // 阻止默认行为
  e.preventDefault();
  
  // 或者直接返回false（仅在onclick等属性绑定中有效）
  return false;
});
```

### 13. 模块化 ⭐⭐⭐

#### 题目1：JavaScript的模块化方案有哪些？
**答案：**

1. **CommonJS**（Node.js）
```javascript
// 导出
module.exports = {
  name: 'module'
};
// 或
exports.name = 'module';

// 导入
const module = require('./module');
```

2. **AMD**（RequireJS）
```javascript
// 定义模块
define(['dependency'], function(dep) {
  return {
    name: 'module'
  };
});

// 使用模块
require(['module'], function(module) {
  console.log(module.name);
});
```

3. **UMD**（通用模块定义）
```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    factory(module.exports);
  } else {
    // 全局变量
    factory(root);
  }
}(this, function(exports) {
  exports.name = 'module';
}));
```

4. **ES6 Module**
```javascript
// 导出
export const name = 'module';
export default { name: 'module' };

// 导入
import { name } from './module';
import module from './module';
```

#### 题目2：CommonJS和ES6 Module的区别？
**答案：**
1. **加载时机**：
   - CommonJS：运行时加载，动态加载
   - ES6 Module：编译时加载，静态加载

2. **加载方式**：
   - CommonJS：加载的是值的拷贝
   - ES6 Module：加载的是值的引用

3. **this指向**：
   - CommonJS：this指向当前模块
   - ES6 Module：this指向undefined

4. **循环依赖**：
   - CommonJS：需要开发者保证正确性
   - ES6 Module：自动处理循环依赖

### 14. Iterator迭代器 ⭐⭐⭐

#### 题目1：什么是Iterator？
**答案：**
Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作。

**Iterator的作用：**
1. 为各种数据结构提供统一的访问接口
2. 使数据结构的成员能够按某种次序排列
3. 为for...of循环提供接口

#### 题目2：如何实现一个Iterator？
**答案：**
```javascript
// 手动实现迭代器
function makeIterator(array) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        { value: array[nextIndex++], done: false } :
        { value: undefined, done: true };
    }
  };
}

// 为对象添加Iterator接口
const obj = {
  data: ['a', 'b', 'c'],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// 使用for...of遍历
for (let item of obj) {
  console.log(item); // 'a', 'b', 'c'
}
```
### 15. Promise ⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目1：Promise的基本用法和状态？
**答案：**
Promise有三种状态：
- **pending**：初始状态（等待中）
- **fulfilled**：操作成功（已完成）
- **rejected**：操作失败（已拒绝）

状态只能从pending转为fulfilled或rejected，且一旦改变就不会再变。

💡 **记忆口诀：Promise三状态**
```
pending等待中，初始状态未决定
fulfilled成功了，resolve来决定
rejected失败了，reject来拒绝
状态一旦变，再也不能改
```

💡 **记忆口诀：Promise方法**
```
then处理成功，catch捕获错误
finally总执行，无论成败都会走
```

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (/* 成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
});

promise
  .then(value => {
    // 成功回调
  })
  .catch(error => {
    // 失败回调
  })
  .finally(() => {
    // 无论成功失败都会执行
  });
```

#### 题目2：Promise的常用方法？
**答案：**

💡 **记忆口诀：Promise静态方法四兄弟**
```
all全成功（所有成功才成功，一个失败全失败）
race比速度（返回最快的那个）
allSettled全等待（等所有完成，不管成败）
any有一个（有一个成功就成功，全失败才失败）
```

1. **Promise.all**：所有Promise都成功才成功，一个失败就失败
```javascript
Promise.all([p1, p2, p3])
  .then(values => {
    // values为所有Promise的结果数组
  })
  .catch(error => {
    // 第一个失败的Promise的错误
  });
```

2. **Promise.race**：返回最先改变状态的Promise
```javascript
Promise.race([p1, p2, p3])
  .then(value => {
    // 最先完成的Promise的结果
  });
```

3. **Promise.allSettled**：等待所有Promise都完成（无论成功失败）
```javascript
Promise.allSettled([p1, p2, p3])
  .then(results => {
    // results包含每个Promise的状态和结果
  });
```

4. **Promise.any**：任意一个Promise成功就成功，全部失败才失败
```javascript
Promise.any([p1, p2, p3])
  .then(value => {
    // 第一个成功的Promise的结果
  })
  .catch(errors => {
    // 所有Promise都失败时的错误数组
  });
```

#### 题目3：手写实现Promise
**答案：**
```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
        
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```

### 16. Generator ⭐⭐⭐

#### 题目1：什么是Generator函数？
**答案：**
Generator函数是ES6提供的一种异步编程解决方案，可以理解为一个状态机，封装了多个内部状态。

特征：
1. function关键字与函数名之间有一个星号
2. 函数体内部使用yield表达式 定义不同的内部状态

```javascript
function* generator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

const gen = generator();
console.log(gen.next()); // { value: 'hello', done: false }
console.log(gen.next()); // { value: 'world', done: false }
console.log(gen.next()); // { value: 'ending', done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

#### 题目2：Generator的应用场景？
**答案：**
1. **异步操作的同步化表达**
```javascript
function* loadData() {
  const data1 = yield fetch('/api/data1');
  const data2 = yield fetch('/api/data2');
  return { data1, data2 };
}
```

2. **控制流管理**
```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
```

### 17. async/await ⭐⭐⭐⭐

#### 题目1：async/await的原理？
**答案：**
async/await是Generator函数的语法糖，内部基于Promise实现。
- async函数返回一个Promise对象
- await表达式会暂停async函数的执行，等待Promise解析

💡 **记忆口诀：async/await特点**
```
async返回Promise（函数返回Promise）
await等待结果（暂停执行等待）
错误try/catch（异常处理）
本质是语法糖（Generator + Promise）
```

```javascript
// async/await写法
async function fetchData() {
  try {
    const data1 = await fetch('/api/data1');
    const data2 = await fetch('/api/data2');
    return { data1, data2 };
  } catch (error) {
    console.error(error);
  }
}

// 等价于
function fetchData() {
  return fetch('/api/data1')
    .then(data1 => {
      return fetch('/api/data2')
        .then(data2 => ({ data1, data2 }));
    })
    .catch(error => {
      console.error(error);
    });
}
```

#### 题目2：async/await的错误处理？
**答案：**
1. **try/catch**
```javascript
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

2. **catch方法**
```javascript
async function getData() {
  const data = await fetchData().catch(error => {
    console.error('Error:', error);
    return null;
  });
  return data;
}
```

3. **统一错误处理**
```javascript
// 封装错误处理
function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null]);
}

async function getData() {
  const [err, data] = await to(fetchData());
  if (err) {
    console.error('Error:', err);
    return;
  }
  return data;
}
```

### 18. 事件循环 ⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目1：什么是事件循环？
**答案：**
事件循环（Event Loop）是JavaScript执行异步代码的机制。JavaScript是单线程的，通过事件循环来实现异步操作。

**执行顺序：**
1. 执行同步代码（执行栈）
2. 执行微任务队列（Promise.then、MutationObserver）
3. 执行宏任务队列（setTimeout、setInterval、I/O、UI渲染）
4. 重复以上步骤

💡 **记忆口诀：事件循环执行顺序**
```
同步代码先执行（清空调用栈）
微任务紧跟上（清空微任务队列）
宏任务一个一个来（取一个宏任务执行）
循环往复不停歇
```

#### 题目2：宏任务和微任务有哪些？
**答案：**
- **宏任务**：setTimeout、setInterval、setImmediate、I/O、UI渲染
- **微任务**：Promise.then、Promise.catch、Promise.finally、MutationObserver、process.nextTick（Node.js）

💡 **记忆口诀：宏微任务区分**
```
宏任务：定时器（setTimeout/setInterval）、I/O、UI渲染
微任务：Promise回调（then/catch/finally）、MutationObserver
记住：微任务优先级高于宏任务
```

#### 题目3：分析下面代码的输出顺序
**答案：**
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

console.log('6');

// 输出顺序：1 6 4 2 3 5
// 解析：
// 1. 同步代码：1, 6
// 2. 微任务：4（Promise.then）
// 3. 宏任务1：2（第一个setTimeout）
// 4. 宏任务1产生的微任务：3
// 5. 宏任务2：5（第二个setTimeout）
```

### 19. 垃圾回收 ⭐⭐⭐⭐

#### 题目1：JavaScript的垃圾回收机制？
**答案：**
JavaScript使用自动垃圾回收机制，主要有两种策略：

1. **标记清除**（现代浏览器主要使用）
   - 标记阶段：从根对象开始，标记所有可访问的对象
   - 清除阶段：清除所有未被标记的对象

2. **引用计数**（旧版IE使用）
   - 跟踪每个对象被引用的次数
   - 引用次数为0时，对象被回收
   - 缺点：无法处理循环引用

💡 **记忆口诀：垃圾回收两策略**
```
标记清除现代用：标记可达，清除不达
引用计数老IE用：计数为零，立即回收
循环引用是大坑（引用计数的缺陷）
```

#### 题目2：什么情况下会造成内存泄漏？
**答案：**

💡 **记忆口诀：内存泄漏四大原因**
```
全局变量不释放（意外的全局变量）
定时器忘清除（未清除的定时器）
闭包占内存（闭包引用大对象）
DOM引用未删除（已删除DOM的引用）
```

1. **意外的全局变量**
```javascript
function leak() {
  // 没有声明，成为全局变量
  name = 'leak';
}
```

2. **未清除的定时器**
```javascript
let timer = setInterval(() => {
  // do something
}, 1000);
// 忘记clearInterval(timer)
```

3. **闭包**
```javascript
function closure() {
  const largeData = new Array(1000000);
  return function() {
    console.log(largeData.length);
  };
}
const fn = closure(); // largeData一直在内存中
```

4. **DOM引用**
```javascript
let element = document.getElementById('button');
document.body.removeChild(element);
// element仍然引用着DOM元素
```

### 20. 内存泄露 ⭐⭐⭐

#### 题目1：如何检测内存泄漏？
**答案：**
1. **Chrome DevTools**（谷歌浏览器开发工具）
   - Memory(记忆)面板：查看内存快照，对比内存增长
   - Performance（性能）面板：查看内存使用曲线

2. **代码层面**
   - 使用WeakMap、WeakSet存储对象引用
   - 及时解绑事件监听器
   - 清除定时器
   - 避免意外的全局变量

#### 题目2：如何避免内存泄漏？
**答案：**
```javascript
// 1. 及时清除定时器
class Timer {
  constructor() {
    this.timer = null;
  }
  
  start() {
    this.timer = setInterval(() => {
      console.log('running');
    }, 1000);
  }
  
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

// 2. 解绑事件监听
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
  
  mount() {
    document.addEventListener('click', this.handleClick);
  }
  
  unmount() {
    document.removeEventListener('click', this.handleClick);
  }
  
  handleClick() {
    console.log('clicked');
  }
}

// 3. 使用WeakMap
const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  const result = /* expensive operation */;
  cache.set(obj, result);
  return result;
}
```

### 21. 深浅拷贝 ⭐⭐⭐⭐⭐ 🔥

#### 题目1：深拷贝和浅拷贝的区别？
**答案：**
- **浅拷贝**：只复制对象的第一层属性，如果属性值是引用类型，复制的是引用地址
- **深拷贝**：递归复制对象的所有层级，创建一个完全独立的新对象

💡 **记忆口诀：深浅拷贝区分**
```
浅拷贝：拷贝一层，引用共享
深拷贝：层层拷贝，完全独立
```

**深浅拷贝对比表：**

| 对比项 | 浅拷贝 | 深拷贝 |
|--------|--------|--------|
| **复制层级** | 只复制第一层 | 递归复制所有层级 |
| **引用类型** | 共享引用地址 | 创建新的引用 |
| **修改影响** | 会影响原对象 | 不影响原对象 |
| **性能** | 快 | 相对慢 |
| **常用方法** | Object.assign、扩展运算符、slice | JSON方法、递归、lodash.cloneDeep |

#### 题目2：实现浅拷贝的方法？
**答案：**
```javascript
// 1. Object.assign
const obj2 = Object.assign({}, obj1);

// 2. 扩展运算符
const obj2 = { ...obj1 };
const arr2 = [...arr1];

// 3. Array.prototype.slice
const arr2 = arr1.slice();

// 4. Array.prototype.concat
const arr2 = arr1.concat();
```

#### 题目3：实现深拷贝的方法？
**答案：**
```javascript
// 1. JSON方法（有限制）
const obj2 = JSON.parse(JSON.stringify(obj1));
// 限制：无法拷贝函数、undefined、Symbol、Date、RegExp等

// 2. 手写深拷贝
function deepClone(obj, map = new WeakMap()) {
  // 处理null和基本类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 处理日期
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  // 处理正则
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // 处理循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }
  
  // 创建新对象或数组
  const cloneObj = Array.isArray(obj) ? [] : {};
  map.set(obj, cloneObj);
  
  // 递归拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], map);
    }
  }
  
  return cloneObj;
}

// 3. Lodash的cloneDeep
const obj2 = _.cloneDeep(obj1);
```

### 22. 节流与防抖 ⭐⭐⭐⭐⭐

#### 题目1：什么是防抖和节流？
**答案：**
- **防抖（debounce）**：事件触发后延迟n秒执行，如果在n秒内再次触发，则重新计时
- **节流（throttle）**：事件触发后每隔n秒执行一次，n秒内多次触发只执行一次

💡 **记忆口诀：防抖节流形象记**
```
防抖：电梯等人（一直有人来就一直等，没人来了才关门）
节流：水龙头滴水（不管你怎么开，就是固定频率滴水）
```

💡 **记忆口诀：使用场景**
```
防抖用于：搜索框输入、窗口resize
节流用于：滚动加载、按钮点击
```

**防抖 vs 节流对比表：**

| 对比项 | 防抖（Debounce） | 节流（Throttle） |
|--------|-----------------|-----------------|
| **触发时机** | 停止触发后延迟执行 | 固定时间间隔执行 |
| **执行频率** | 最后一次触发后执行一次 | 固定时间间隔执行一次 |
| **应用场景** | 搜索框、resize、表单验证 | 滚动、点击、拖拽 |
| **形象比喻** | 电梯等人 | 水龙头滴水 |

#### 题目2：手写实现防抖函数
**答案：**
```javascript
function debounce(fn, delay) {
  let timer = null;
  
  return function(...args) {
    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }
    
    // 设置新的定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 使用示例
const handleInput = debounce(function(e) {
  console.log('Input value:', e.target.value);
}, 500);

input.addEventListener('input', handleInput);
```

#### 题目3：手写实现节流函数
**答案：**
```javascript
// 1. 时间戳版本
function throttle(fn, delay) {
  let lastTime = 0;
  
  return function(...args) {
    const nowTime = Date.now();
    
    if (nowTime - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = nowTime;
    }
  };
}

// 2. 定时器版本
function throttle(fn, delay) {
  let timer = null;
  
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

// 3. 时间戳+定时器版本（第一次立即执行，最后一次也会执行）
function throttle(fn, delay) {
  let timer = null;
  let lastTime = 0;
  
  return function(...args) {
    const nowTime = Date.now();
    const remaining = delay - (nowTime - lastTime);
    
    clearTimeout(timer);
    
    if (remaining <= 0) {
      fn.apply(this, args);
      lastTime = nowTime;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
      }, remaining);
    }
  };
}·  
```

### 23. Proxy代理 ⭐⭐⭐

#### 题目1：Proxy的基本用法？
**答案：**
Proxy用于创建一个对象的代理，从而实现基本操作的拦截和自定义。

```javascript
const target = {
  name: 'target'
};

const handler = {
  get(target, prop, receiver) {
    console.log(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxy = new Proxy(target, handler);
proxy.name; // Getting name
proxy.age = 18; // Setting age to 18
```

#### 题目2：Proxy的应用场景？
**答案：**
1. **数据验证**
```javascript
const user = new Proxy({}, {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new TypeError('Age must be a positive number');
      }
    }
    target[prop] = value;
    return true;
  }
});
```

2. **属性默认值**
```javascript
const withDefaults = new Proxy({}, {
  get(target, prop) {
    return prop in target ? target[prop] : 'default';
  }
});
```

3. **数组负索引**
```javascript
const array = new Proxy([1, 2, 3], {
  get(target, prop) {
    if (!isNaN(prop)) {
      prop = parseInt(prop);
      if (prop < 0) {
        prop = target.length + prop;
      }
    }
    return target[prop];
  }
});
console.log(array[-1]); // 3
```

### 24. Ajax（网络请求） ⭐⭐⭐

#### 题目1：原生Ajax的实现步骤？
**答案：**
1.创建 Ajax的核心对象 XMLHttpRequest对象
2.通过 XMLHttpRequest 对象的 open() 方法与服务端建立连接
3.构建请求所需的数据内容，并通过XMLHttpRequest 对象的 send() 方法发送给服务器4.通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端你的通信状态
6.接受并处理服务端向客户端响应的数据结果
7.将处理结果更新到 HTML页面中
```javascript
function ajax(options) {
  // 1. 创建XMLHttpRequest对象
  const xhr = new XMLHttpRequest();
  
  // 2. 处理参数（给默认值）
  options = options || {};
  options.method = (options.method || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  const params = options.data;
  
  // 3. 设置请求状态变化的处理函数
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      const status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
  
  // 4. 连接和发送
  if (options.method === 'GET') {
    xhr.open('GET', options.url + '?' + params, true);
    xhr.send(null);
  } else if (options.method === 'POST') {
    xhr.open('POST', options.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
  }
}

// 使用
ajax({
  url: '/api/data',
  method: 'GET',
  success: function(response) {
    console.log('Success:', response);
  },
  fail: function(status) {
    console.log('Error:', status);
  }
});
```

#### 题目2：Fetch和Ajax的区别？
**答案：**
1. **Fetch基于Promise，Ajax基于回调**
2. **Fetch不会reject HTTP错误状态**
3. **Fetch默认不发送cookies**
4. **Fetch不支持超时设置**
5. **Fetch不支持进度事件**

```javascript
// Fetch示例
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  credentials: 'include' // 发送cookies
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### 25. 事件循环（Event Loop）⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目1：什么是事件循环？JavaScript的事件循环机制是什么？
**答案：**
事件循环是JavaScript处理异步操作的机制，它确保JavaScript单线程能够处理非阻塞的异步操作。

**事件循环的核心概念：**
1. **调用栈（Call Stack）**：执行同步代码的地方
2. **任务队列（Task Queue）**：存放异步任务回调的地方
3. **微任务队列（Microtask Queue）**：存放Promise、MutationObserver等微任务
4. **事件循环**：不断检查调用栈和任务队列的机制

**执行顺序：**
1. 执行同步代码（调用栈）
2. 调用栈清空后，执行所有微任务
3. 执行一个宏任务
4. 重复步骤2-3

```javascript
console.log('1'); // 同步

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步

// 输出顺序：1, 4, 3, 2
```

#### 题目2：宏任务和微任务的区别？有哪些宏任务和微任务？
**答案：**

**宏任务（Macrotask）：**
- setTimeout、setInterval
- setImmediate（Node.js）
- I/O操作
- UI渲染
- script标签

**微任务（Microtask）：**
- Promise.then/catch/finally
- queueMicrotask
- MutationObserver
- process.nextTick（Node.js）

**执行优先级：**
微任务 > 宏任务

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => {
  console.log('3');
  return Promise.resolve();
}).then(() => {
  console.log('4');
});

setTimeout(() => console.log('5'), 0);

console.log('6');

// 输出：1, 6, 3, 4, 2, 5
```

#### 题目3：请解释以下代码的执行顺序
**答案：**
```javascript
console.log('start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

setTimeout(() => {
  console.log('timeout2');
  Promise.resolve().then(() => {
    console.log('promise2');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('promise3');
});

console.log('end');

// 执行顺序分析：
// 1. 同步代码：start, end
// 2. 微任务：promise3
// 3. 宏任务1：timeout1
// 4. 微任务：promise1
// 5. 宏任务2：timeout2
// 6. 微任务：promise2

// 最终输出：start, end, promise3, timeout1, promise1, timeout2, promise2
```

#### 题目4：async/await在事件循环中的执行机制？
**答案：**
async/await本质上是Promise的语法糖，在事件循环中的行为与Promise一致。

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// 执行顺序：
// 1. script start
// 2. async1 start
// 3. async2
// 4. promise1
// 5. script end
// 6. async1 end (await后面的代码相当于.then)
// 7. promise2
// 8. setTimeout
```

#### 题目5：Node.js和浏览器的事件循环有什么区别？
**答案：**

**浏览器事件循环：**
- 只有一个宏任务队列
- 微任务队列优先级最高
- 每个宏任务执行完后，清空所有微任务

**Node.js事件循环：**
- 6个阶段：timers、pending callbacks、idle/prepare、poll、check、close callbacks
- process.nextTick优先级最高
- 每个阶段执行完后，清空nextTick队列和微任务队列

```javascript
// Node.js中的执行顺序
setTimeout(() => console.log('1'), 0);
setImmediate(() => console.log('2'));
process.nextTick(() => console.log('3'));
Promise.resolve().then(() => console.log('4'));

// 输出：3, 4, 1, 2 (或 3, 4, 2, 1)
```

#### 题目6：如何理解"JavaScript是单线程的"？
**答案：**
JavaScript是单线程的，但浏览器是多线程的：

**JavaScript线程：**
- 主线程：执行JavaScript代码
- 单线程：同一时间只能执行一个任务

**浏览器其他线程：**
- GUI渲染线程
- 事件触发线程
- 定时器线程
- 异步HTTP请求线程
- WebWorker线程

**为什么是单线程：**
1. **避免DOM操作冲突**：多线程同时操作DOM会导致竞态条件
2. **简化编程模型**：不需要考虑线程同步问题
3. **提高执行效率**：避免线程切换开销

**单线程的解决方案：**
- 事件循环机制处理异步操作
- 非阻塞I/O操作
- WebWorker处理CPU密集型任务

### 26. 深入数组 ⭐⭐⭐

#### 题目1：数组的高阶方法有哪些？

💡 **记忆口诀：数组高阶方法**
```
map映射新数组，filter过滤留想要
reduce归约成一个，forEach遍历不返回
find查找第一个，some判断有一个
every判断全满足，flat扁平多层数组
```
**答案：**
```javascript
// 1. map：映射新数组
const doubled = [1, 2, 3].map(x => x * 2); // [2, 4, 6]

// 2. filter：过滤数组
const evens = [1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]

// 3. reduce：归约
const sum = [1, 2, 3].reduce((acc, cur) => acc + cur, 0); // 6

// 4. forEach：遍历（无返回值）
[1, 2, 3].forEach(x => console.log(x));

// 5. find：查找第一个满足条件的元素
const found = [1, 2, 3].find(x => x > 1); // 2

// 6. findIndex：查找第一个满足条件的索引
const index = [1, 2, 3].findIndex(x => x > 1); // 1

// 7. some：是否有元素满足条件
const hasEven = [1, 2, 3].some(x => x % 2 === 0); // true

// 8. every：是否所有元素都满足条件
const allEven = [2, 4, 6].every(x => x % 2 === 0); // true

// 9. flat：扁平化数组
const flattened = [1, [2, [3]]].flat(2); // [1, 2, 3]

// 10. flatMap：map + flat
const result = [1, 2].flatMap(x => [x, x * 2]); // [1, 2, 2, 4]
```

#### 题目2：手写实现数组的map方法
**答案：**
```javascript
Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  
  return result;
};

// 测试
const arr = [1, 2, 3];
const doubled = arr.myMap(x => x * 2);
console.log(doubled); // [2, 4, 6]
```

#### 题目3：数组去重的方法？
**答案：**
```javascript
// 1. Set去重
const unique1 = arr => [...new Set(arr)];

// 2. filter + indexOf
const unique2 = arr => arr.filter((item, index) => arr.indexOf(item) === index);

// 3. reduce
const unique3 = arr => arr.reduce((acc, cur) => 
  acc.includes(cur) ? acc : [...acc, cur], []);

// 4. Map去重（可以去重对象）
const unique4 = (arr, key) => {
  const map = new Map();
  return arr.filter(item => {
    const k = key ? item[key] : item;
    if (map.has(k)) {
      return false;
    }
    map.set(k, true);
    return true;
  });
};

// 测试
const arr = [1, 2, 2, 3, 3, 4];
console.log(unique1(arr)); // [1, 2, 3, 4]
```

## 二、HTTP缓存机制

### 27. 协商缓存 ⭐⭐⭐⭐

#### 题目1：什么是协商缓存？协商缓存的实现原理？
**答案：**
协商缓存是浏览器与服务器通过通信协商，判断缓存资源是否过期，从而决定是否复用本地缓存的机制，核心是“二次确认”。

**实现原理：**
协商缓存的实现依赖 HTTP 请求头和响应头的配合，分为以下两步：
1. 首次请求：服务器返回资源并标记缓存标识
当浏览器第一次请求资源时，服务器在返回资源的响应头中，会附带两个关键的缓存标识：
- Last-Modified：资源在服务器上的最后修改时间。
- ETag：资源的唯一标识（类似文件指纹，资源内容变化时会更新）。
浏览器会将这些标识与资源一起保存在本地缓存中。
 
2. 后续请求：浏览器携带标识与服务器协商
当浏览器再次请求同一资源时，会在请求头中携带之前保存的标识，与服务器进行验证：
- 若携带 Last-Modified，则请求头会包含 If-Modified-Since（值为上次的 Last-Modified），服务器对比资源当前修改时间与该值，判断是否更新。
 
- 若携带 ETag，则请求头会包含 If-None-Match（值为上次的 ETag），服务器对比资源当前 ETag 与该值，判断内容是否变化。

3 .协商结果:
如果资源未变化，返回304状态码，浏览器使用本地缓存
如果资源已变化，返回200状态码和新的资源内容

**两种协商缓存方式：**

1. **Last-Modified / If-Modified-Since**
```http
# 首次请求响应头
HTTP/1.1 200 OK
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
Cache-Control: no-cache

# 再次请求请求头
GET /api/data HTTP/1.1
If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT

# 服务器响应
HTTP/1.1 304 Not Modified
```

2. **ETag / If-None-Match**
```http
# 首次请求响应头
HTTP/1.1 200 OK
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Cache-Control: no-cache

# 再次请求请求头
GET /api/data HTTP/1.1
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# 服务器响应
HTTP/1.1 304 Not Modified
```

#### 题目2：Last-Modified和ETag的区别？
**答案：**

💡 **记忆口诀：协商缓存两兄弟**
```
Last-Modified基于时间，精度秒级性能好
ETag基于内容，精度更高更准确
优先ETag来判断，Last-Modified做备选
```

| 特性           | Last-Modified    | ETag                 |
| -------------- | ---------------- | -------------------- |
| **精度**       | 秒级精度         | 任意精度             |
| **性能**       | 性能更好         | 需要计算哈希值       |
| **分布式**     | 不适合分布式系统 | 适合分布式系统       |
| **文件变化**   | 只检测内容变化   | 检测内容和元数据变化 |
| **实现复杂度** | 简单             | 相对复杂             |

**ETag的优势：**
1. 可以检测文件内容变化，即使修改时间相同
2. 支持分布式系统，避免时间同步问题
3. 可以检测文件元数据变化（如权限）

**Last-Modified的优势：**
1. 实现简单，性能开销小
2. 人类可读，便于调试

#### 题目3：协商缓存的经典面试题场景？
**答案：**

**场景1：文件内容未变化，但修改时间变化**
```javascript
// 问题：文件内容相同，但touch命令修改了时间
// Last-Modified会认为文件已变化，导致不必要的下载
// ETag可以正确识别内容未变化

// 解决方案：优先使用ETag，Last-Modified作为备选
if (request.headers['if-none-match'] === currentETag) {
  return 304; // 使用缓存
} else if (request.headers['if-modified-since'] === lastModified) {
  return 304; // 使用缓存
} else {
  return 200; // 返回新内容
}
```

**场景2：分布式系统中的缓存一致性问题**
```javascript
// 问题：多台服务器时间不同步
// 解决方案：使用ETag而不是Last-Modified

// 服务器A
const etagA = generateETag(content); // "abc123"

// 服务器B  
const etagB = generateETag(content); // "abc123" (相同内容)

// 即使时间不同步，ETag也能正确判断
```

**场景3：CDN边缘节点的缓存策略**
```javascript
// CDN节点缓存策略
app.get('/api/data', (req, res) => {
  const etag = generateETag(data);
  const lastModified = new Date(fileStats.mtime).toUTCString();
  
  // 设置缓存头
  res.set({
    'ETag': etag,
    'Last-Modified': lastModified,
    'Cache-Control': 'no-cache' // 强制协商缓存
  });
  
  // 检查协商缓存
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }
  
  if (req.headers['if-modified-since'] === lastModified) {
    return res.status(304).end();
  }
  
  res.json(data);
});
```

### 27. 跨域问题 ⭐⭐⭐⭐

#### 题目1：什么是跨域？为什么会出现跨域问题？
**答案：**
跨域是指浏览器不能执行其他网站的脚本，它是由浏览器的同源策略造成的。

**同源策略限制：**
- 协议相同（http/https）
- 域名相同
- 端口相同

💡 **记忆口诀：同源三要素**
```
协议域名和端口，三者相同才同源
任一不同即跨域，浏览器会阻拦
```

**跨域场景示例：**
```javascript
// 同源：http://localhost:3000
// 跨域：https://localhost:3000 (协议不同)
// 跨域：http://localhost:8080 (端口不同)  
// 跨域：http://api.example.com (域名不同)
```

**为什么需要同源策略：**
1. **防止CSRF攻击**：恶意网站无法获取用户在其他网站的数据
2. **保护用户隐私**：防止恶意网站读取用户敏感信息
3. **维护数据安全**：防止恶意网站篡改其他网站的数据

#### 题目2：跨域的解决方案有哪些？
**答案：**

💡 **记忆口诀：跨域解决五大方案**
```
CORS最常用（服务器设置响应头）
JSONP兼容老（script标签不受限）
代理服务器（开发环境常用）
postMessage通信（iframe跨域）
document.domain（子域名跨域）
```

**1. CORS（跨域资源共享）**
```javascript
// 服务端设置CORS头
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有域名
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // 允许携带cookie
  
  // 预检请求处理
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 客户端请求
fetch('http://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  credentials: 'include', // 携带cookie
  body: JSON.stringify(data)
});
```

**2. JSONP（JSON with Padding）**
```javascript
// 客户端
function jsonp(url, callback) {
  const script = document.createElement('script');
  const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  
  window[callbackName] = function(data) {
    callback(data);
    document.body.removeChild(script);
    delete window[callbackName];
  };
  
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
}

// 使用
jsonp('http://api.example.com/data?callback=handleData', function(data) {
  console.log(data);
});

// 服务端
app.get('/data', (req, res) => {
  const data = { message: 'Hello World' };
  const callback = req.query.callback;
  res.send(`${callback}(${JSON.stringify(data)});`);
});
```

**3. 代理服务器**
```javascript
// webpack devServer代理
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

// nginx代理
server {
  listen 80;
  server_name localhost;
  
  location /api/ {
    proxy_pass http://api.example.com/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

**4. postMessage**
```javascript
// 父页面
window.addEventListener('message', function(event) {
  if (event.origin !== 'http://trusted-domain.com') return;
  console.log('收到消息:', event.data);
});

// 子页面（iframe）
parent.postMessage('Hello Parent', 'http://parent-domain.com');
```

**5. document.domain**
```javascript
// 适用于子域名跨域
// 主页面：http://www.example.com
document.domain = 'example.com';

// 子页面：http://api.example.com  
document.domain = 'example.com';
// 现在可以互相访问
```

#### 题目3：CORS的预检请求是什么？
**答案：**
预检请求（Preflight Request）是浏览器在发送复杂跨域请求前自动发送的OPTIONS请求，用于检查服务器是否允许该跨域请求。

**触发预检请求的条件：**
1. 请求方法不是简单方法（GET、HEAD、POST）
2. 请求头包含非简单头部
3. Content-Type不是简单类型

**简单请求条件：**
- 方法：GET、HEAD、POST
- 头部：Accept、Accept-Language、Content-Language、Content-Type
- Content-Type：application/x-www-form-urlencoded、multipart/form-data、text/plain

**预检请求流程：**
```javascript
// 1. 浏览器发送预检请求
OPTIONS /api/data HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type,Authorization

// 2. 服务器响应
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET,POST,PUT,DELETE
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Max-Age: 86400

// 3. 浏览器发送实际请求
PUT /api/data HTTP/1.1
Origin: http://localhost:3000
Content-Type: application/json
Authorization: Bearer token
```

#### 题目4：跨域携带Cookie的问题？
**答案：**
默认情况下，跨域请求不会携带Cookie，需要特殊配置。

**客户端配置：**
```javascript
// fetch请求
fetch('http://api.example.com/data', {
  credentials: 'include' // 携带cookie
});

// XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', 'http://api.example.com/data');
xhr.send();
```

**服务端配置：**
```javascript
// 不能使用通配符 *
res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
res.header('Access-Control-Allow-Credentials', 'true');

// 动态设置允许的域名
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.header('Access-Control-Allow-Origin', origin);
}
res.header('Access-Control-Allow-Credentials', 'true');
```

#### 题目5：跨域问题的经典面试场景？
**答案：**

**场景1：开发环境跨域问题**
```javascript
// 问题：本地开发时前端localhost:3000访问后端localhost:8080
// 解决方案：开发服务器代理

// package.json
{
  "scripts": {
    "dev": "webpack serve --config webpack.dev.js"
  }
}

// webpack.dev.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
```

**场景2：生产环境跨域问题**
```javascript
// 问题：前端域名和后端域名不同
// 解决方案：CORS配置

// 后端CORS中间件
const cors = require('cors');
app.use(cors({
  origin: ['https://www.example.com', 'https://admin.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**场景3：第三方API跨域问题**
```javascript
// 问题：调用第三方API遇到跨域限制
// 解决方案：后端代理

// 后端代理接口
app.get('/api/weather', async (req, res) => {
  try {
    const response = await fetch('https://api.weather.com/data', {
      headers: {
        'Authorization': `Bearer ${process.env.WEATHER_API_KEY}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});
```

**场景4：WebSocket跨域问题**
```javascript
// 问题：WebSocket连接跨域
// 解决方案：服务端设置CORS

const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 8080,
  verifyClient: (info) => {
    const origin = info.origin;
    const allowedOrigins = ['http://localhost:3000', 'https://example.com'];
    return allowedOrigins.includes(origin);
  }
});
```

---

## 三、快速记忆总结

### 核心必背知识点速记

#### 1. This指向 - 新显隐默箭
```
new > call/apply/bind > 对象方法 > 独立函数 > 箭头函数继承
```

#### 2. 闭包三要素
```
函数套函数 + 内访外变量 + 外传内函数
```

#### 3. 原型链查找
```
自己 → __proto__ → 原型的__proto__ → ... → Object.prototype → null
```

#### 4. Promise三状态
```
pending（等待）→ fulfilled（成功）或 rejected（失败）
状态一旦改变，不可逆转
```

#### 5. 事件循环
```
同步代码 → 微任务（Promise.then）→ 宏任务（setTimeout）→ 循环
```

#### 6. 深浅拷贝
```
浅拷贝：Object.assign、扩展运算符、slice
深拷贝：JSON.parse(JSON.stringify())、递归、lodash.cloneDeep
```

#### 7. 防抖节流
```
防抖：电梯等人（停止触发后延迟执行）
节流：水龙头滴水（固定时间间隔执行）
```

#### 8. 跨域解决
```
CORS > JSONP > 代理服务器 > postMessage > document.domain
```

### 高频手写代码清单

**必背手写题（按重要性排序）：**

1. ⭐⭐⭐⭐⭐ 手写call/apply/bind
2. ⭐⭐⭐⭐⭐ 手写Promise（then/catch/finally）
3. ⭐⭐⭐⭐⭐ 手写深拷贝
4. ⭐⭐⭐⭐⭐ 手写防抖和节流
5. ⭐⭐⭐⭐ 手写new操作符
6. ⭐⭐⭐⭐ 手写instanceof
7. ⭐⭐⭐⭐ 手写数组flat扁平化
8. ⭐⭐⭐⭐ 手写Promise.all/race
9. ⭐⭐⭐ 手写数组去重
10. ⭐⭐⭐ 手写继承（寄生组合式）

### 面试高频问题速查

**基础篇：**
- 数据类型有哪些？如何检测？
- var/let/const的区别？
- null和undefined的区别？
- typeof和instanceof的区别？

**进阶篇：**
- 说说你对闭包的理解？
- 说说你对原型链的理解？
- 说说你对this的理解？
- 说说你对事件循环的理解？

**高级篇：**
- 说说你对Promise的理解？手写Promise
- 说说你对async/await的理解？
- 说说你对垃圾回收的理解？
- 如何避免内存泄漏？

**实战篇：**
- 如何实现深拷贝？
- 如何实现防抖和节流？
- 如何解决跨域问题？
- 如何优化网络请求？

---

## 备注

**学习建议：**
1. 先理解核心概念，再记忆细节
2. 多动手写代码，加深理解
3. 结合实际项目，巩固知识
4. 定期复习，温故知新

**面试技巧：**
1. 先说核心概念，再展开细节
2. 结合实际例子，增强说服力
3. 主动说出优缺点，显示深度理解
4. 提到使用场景，体现实战经验

**最后提醒：**
- 理解 > 记忆
- 实践 > 理论
- 思考 > 背诵
- 总结 > 死记

祝面试顺利！