# JavaScript 高频面试题汇总

## 一、JS基础

### 1. 类型及检测方式

#### 题目1：JavaScript有哪些数据类型？
**答案：**
JavaScript有8种数据类型，分为两大类：
- **基本数据类型（7种）**：Number、String、Boolean、Undefined、Null、Symbol、BigInt
- **引用数据类型（1种）**：Object（包括Array、Function、Date、RegExp等）

#### 题目2：如何检测数据类型？
**答案：**
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

### 2. This

#### 题目1：this的指向规则是什么？
**答案：**
this的指向在函数定义时无法确定，只有函数执行时才能确定，一般遵循以下规则：
1. **默认绑定**：非严格模式下this指向window，严格模式下指向undefined
2. **隐式绑定**：作为对象方法调用，this指向调用对象
3. **显式绑定**：通过call、apply、bind改变this指向
4. **new绑定**：作为构造函数调用，this指向新创建的实例
5. **箭头函数**：没有自己的this，继承外层作用域的this

优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

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

### 3. apply/call/bind 原理

#### 题目1：call、apply、bind的区别？
**答案：**
- **共同点**：都可以改变函数的this指向
- **区别**：
  - call：立即执行，参数逐个传递 `fn.call(obj, arg1, arg2)`
  - apply：立即执行，参数以数组形式传递 `fn.apply(obj, [arg1, arg2])`
  - bind：返回改变this后的新函数，不立即执行 `fn.bind(obj, arg1, arg2)`

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

### 4. 变量提升

#### 题目1：什么是变量提升？
**答案：**
变量提升（Hoisting）是JavaScript的一种机制，指在代码执行前，变量和函数声明会被移动到其所在作用域的顶部。

- **var声明**：变量声明提升，但赋值不提升，初始值为undefined
- **函数声明**：整个函数提升，可以在声明前调用
- **let/const**：存在暂时性死区，不能在声明前使用

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

### 5. 执行上下文

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

### 6. 作用域

#### 题目1：什么是作用域？
**答案：**
作用域是变量和函数的可访问范围，决定了代码中变量和函数的可见性和生命周期。

**作用域类型：**
1. **全局作用域**：在任何地方都能访问
2. **函数作用域**：只在函数内部访问
3. **块级作用域**：ES6新增，let/const在{}内形成块级作用域

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

### 7. 闭包

#### 题目1：什么是闭包？
**答案：**
闭包是指有函数作用域中变量的函数。简权访问另一个单说，闭包就是能够读取其他函数内部变量的函数。

闭包是指函数能够访问其定义时所在作用域的变量，即使函数在其他地方执行。
**闭包的特点：**
1. 函数嵌套函数
2. 内部函数引用外部函数的变量
3. 内部函数被返回或传递到外部

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

### 8. New的原理

#### 题目1：new操作符做了什么？
**答案：**
new操作符执行时会进行以下步骤：
1. 创建一个新的空对象
2. 将新对象的原型指向构造函数的prototype
3. 将构造函数的this指向新对象，执行构造函数
4. 如果构造函数返回对象，则返回该对象；否则返回新创建的对象

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

### 9. 原型/原型链

#### 题目1：什么是原型和原型链？
**答案：**
- **原型**：每个函数都有prototype属性，每个对象都有__proto__属性
- **原型链**：对象通过__proto__属性连接起来的链式结构

**原型规则：**
1. 所有对象都有__proto__属性，指向其构造函数的prototype
2. 所有函数都有prototype属性，指向一个对象
3. 所有函数都是Function的实例
4. Object.prototype.__proto__ === null（原型链顶端）

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

### 10. 继承

#### 题目1：JavaScript有哪些继承方式？
**答案：**

1. **原型链继承**
```javascript
function Parent() {
  this.name = 'parent';
  this.colors = ['red', 'blue'];
}
Parent.prototype.getName = function() {
  return this.name;
};

function Child() {}
Child.prototype = new Parent();

// 缺点：引用类型属性会被所有实例共享
```

2. **构造函数继承**
```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

function Child(name) {
  Parent.call(this, name);
}

// 缺点：无法继承原型上的方法
```

3. **组合继承**
```javascript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
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

// 缺点：调用两次父构造函数
```

4. **原型式继承**
```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// ES5的Object.create就是这个原理
```

5. **寄生式继承**
```javascript
function createAnother(original) {
  const clone = Object.create(original);
  clone.sayHi = function() {
    console.log('hi');
  };
  return clone;
}
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
}
Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
inheritPrototype(Child, Parent);

// 优点：只调用一次Parent构造函数，避免了在Child.prototype上创建不必要的属性
```

7. **ES6 Class继承**
```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
```

### 11. 面向对象

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

### 12. 事件机制

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

### 13. 模块化

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

### 14. Iterator迭代器

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

### 15. Promise

#### 题目1：Promise的基本用法和状态？
**答案：**
Promise有三种状态：
- **pending**：初始状态
- **fulfilled**：操作成功
- **rejected**：操作失败

状态只能从pending转为fulfilled或rejected，且一旦改变就不会再变。

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

### 16. Generator

#### 题目1：什么是Generator函数？
**答案：**
Generator函数是ES6提供的一种异步编程解决方案，可以理解为一个状态机，封装了多个内部状态。

特征：
1. function关键字与函数名之间有一个星号
2. 函数体内部使用yield表达式定义不同的内部状态

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

### 17. async/await

#### 题目1：async/await的原理？
**答案：**
async/await是Generator函数的语法糖，内部基于Promise实现。
- async函数返回一个Promise对象
- await表达式会暂停async函数的执行，等待Promise解析

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

### 18. 事件循环

#### 题目1：什么是事件循环？
**答案：**
事件循环（Event Loop）是JavaScript执行异步代码的机制。JavaScript是单线程的，通过事件循环来实现异步操作。

**执行顺序：**
1. 执行同步代码（执行栈）
2. 执行微任务队列（Promise.then、MutationObserver）
3. 执行宏任务队列（setTimeout、setInterval、I/O、UI渲染）
4. 重复以上步骤

#### 题目2：宏任务和微任务有哪些？
**答案：**
- **宏任务**：setTimeout、setInterval、setImmediate、I/O、UI渲染
- **微任务**：Promise.then、Promise.catch、Promise.finally、MutationObserver、process.nextTick（Node.js）

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

### 19. 垃圾回收

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

#### 题目2：什么情况下会造成内存泄漏？
**答案：**
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

### 20. 内存泄露

#### 题目1：如何检测内存泄漏？
**答案：**
1. **Chrome DevTools**
   - Memory面板：查看内存快照，对比内存增长
   - Performance面板：查看内存使用曲线

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

### 21. 深浅拷贝

#### 题目1：深拷贝和浅拷贝的区别？
**答案：**
- **浅拷贝**：只复制对象的第一层属性，如果属性值是引用类型，复制的是引用地址
- **深拷贝**：递归复制对象的所有层级，创建一个完全独立的新对象

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

### 22. 节流与防抖

#### 题目1：什么是防抖和节流？
**答案：**
- **防抖（debounce）**：事件触发后延迟n秒执行，如果在n秒内再次触发，则重新计时
- **节流（throttle）**：事件触发后每隔n秒执行一次，n秒内多次触发只执行一次

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
}
```

### 23. Proxy代理

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

### 24. Ajax

#### 题目1：原生Ajax的实现步骤？
**答案：**
```javascript
function ajax(options) {
  // 1. 创建XMLHttpRequest对象
  const xhr = new XMLHttpRequest();
  
  // 2. 处理参数
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

### 25. 深入数组

#### 题目1：数组的高阶方法有哪些？
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