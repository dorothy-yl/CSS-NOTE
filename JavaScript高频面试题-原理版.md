# JavaScript 高频面试题汇总 - 原理版

## 一、JS基础

### 1. 类型及检测方式

#### 题目1：JavaScript有哪些数据类型？
**答案：**
JavaScript有8种数据类型，分为两大类：
- **基本数据类型（7种）**：Number、String、Boolean、Undefined、Null、Symbol、BigInt
- **引用数据类型（1种）**：Object（包括Array、Function、Date、RegExp等）

#### 题目2：如何检测数据类型？
**答案：**
1. **typeof**：返回一个字符串，表示未经计算的操作数的类型。注意null会返回'object'，这是历史遗留问题。

2. **instanceof**：检测构造函数的prototype（原型）属性是否出现在某个实例对象的原型链上。

3. **Object.prototype.toString.call()**：最准确的类型检测方法，返回[object Type]格式的字符串。

4. **Array.isArray()**：专门用于检测数组的方法。

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

### 2. apply/call/bind 原理

#### 题目1：call、apply、bind的区别？
**答案：**
- **共同点**：都可以改变函数的this指向
- **区别**：
  - call：立即执行，参数逐个传递
  - apply：立即执行，参数以数组形式传递
  - bind：返回改变this后的新函数，不立即执行

### 3. 变量提升

#### 题目1：什么是变量提升？
**答案：**
变量提升（Hoisting）是JavaScript的一种机制，指在代码执行前，变量和函数声明会被移动到其所在作用域的顶部。

- **var声明**：变量声明提升，但赋值不提升，初始值为undefined
- **函数声明**：整个函数提升，可以在声明前调用
- **let/const**：存在暂时性死区，不能在声明前使用

### 4. 执行上下文

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

### 5. 作用域

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

### 6. 闭包

#### 题目1：什么是闭包？
**答案：**
闭包是指函数能够访问其定义时所在作用域的变量，即使函数在其他地方执行。

**闭包的特点：**
1. 函数嵌套函数
2. 内部函数引用外部函数的变量
3. 内部函数被返回或传递到外部

#### 题目2：闭包的应用场景？
**答案：**
1. **数据私有化**：创建私有变量，外部无法直接访问
2. **函数工厂**：根据参数创建不同功能的函数
3. **事件处理和回调**：保持变量状态
4. **模块化**：创建独立的模块作用域

#### 题目3：闭包的缺点？
**答案：**
1. **内存泄漏**：闭包会使函数中的变量都保存在内存中，内存消耗大
2. **性能问题**：闭包会导致作用域链变长，查找变量的时间增加

### 7. New的原理

#### 题目1：new操作符做了什么？
**答案：**
new操作符执行时会进行以下步骤：
1. 创建一个新的空对象
2. 将新对象的原型指向构造函数的prototype
3. 将构造函数的this指向新对象，执行构造函数
4. 如果构造函数返回对象，则返回该对象；否则返回新创建的对象

### 8. 原型/原型链

#### 题目1：什么是原型和原型链？
**答案：**
- **原型**：每个函数都有prototype属性，每个对象都有__proto__属性
- **原型链**：对象通过__proto__属性连接起来的链式结构

**原型规则：**
1. 所有实例对象都有__proto__属性，指向其构造函数的prototype
2. 所有函数都有prototype属性，指向一个原型对象
3. 所有函数都是Function的实例
4. Object.prototype.__proto__ === null（原型链顶端）

#### 题目2：instanceof的原理？
**答案：**
instanceof用于检测构造函数的prototype是否出现在对象的原型链上。

### 9. 继承

#### 题目1：JavaScript有哪些继承方式？
**答案：**

1. **原型链继承**：子类原型指向父类实例。缺点：引用类型属性被所有实例共享 Child prototype=new Parent()  let ol=new child()
 function Parent(){
  this.name="李四"；
}
function Child(){
this.age=20;
Child.prototype=new Parent();
let o1=new Child();
console.log(o1);
}
2. **原型式继承**：基于现有对象创建新对象，ES5的Object.create就是这个原理。
3. **构造函数继承**：在子类构造函数中调用父类构造函数。缺点：无法继承原型上的方法。
function Parent(){
  this.name="张三";
}
function Child(){
    Parent.call(this);
    this.age="30";
}
let o2=new Child();
console.log(o2);
4. **寄生式继承**：在原型式继承基础上增强对象。
2. **组合继承**：结合原型链和构造函数继承。缺点：调用两次父构造函数。
5. **寄生组合式继承**：最理想的继承方式，只调用一次父构造函数，避免了在子类原型上创建不必要的属性。
6. **ES6 Class继承**：使用extends关键字，内部实现基于寄生组合式继承。



#### 10. 题目1：JavaScript如何实现封装？
**答案：**
1. **使用闭包实现私有属性和方法**：通过函数作用域隐藏内部实现
2. **使用Symbol实现私有属性**：Symbol值唯一，外部难以访问
3. **使用WeakMap实现私有属性**：WeakMap的键只能是对象，实现真正的私有

### 11. 事件机制

#### 题目1：什么是事件委托？
**答案：**
事件委托是利用事件冒泡机制，将子元素的事件处理函数绑定到父元素上。

**优点：**
1. 减少内存消耗，不需要为每个子元素绑定事件
2. 动态绑定，新增的子元素自动有事件处理

**实现原理：**
```javascript
// 事件委托实现
document.getElementById('list').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log('点击了：', e.target.textContent);
  }
});
```

#### 题目2：事件流的三个阶段？
**答案：**
1. **捕获阶段**：事件从window向目标元素传播
2. **目标阶段**：事件到达目标元素
3. **冒泡阶段**：事件从目标元素向window传播

**执行顺序示例：**
```javascript
// 捕获阶段监听
element.addEventListener('click', handler, true);
// 冒泡阶段监听（默认）
element.addEventListener('click', handler, false);
```

#### 题目3：如何阻止事件传播和默认行为？
**答案：**
- `stopPropagation()`：阻止事件冒泡
- `stopImmediatePropagation()`：阻止事件捕获和冒泡
- `preventDefault()`：阻止默认行为
- `return false`：在onclick等属性绑定中阻止默认行为和冒泡

#### 题目4：Vue和React的事件机制有什么区别？
**答案：**

**Vue事件机制：**
- 直接绑定到目标元素上
- 使用原生DOM事件对象
- 提供丰富的事件修饰符（.stop、.prevent、.once等）
- 支持自定义事件（$emit/$on）

```vue
<template>
  <button @click.stop.prevent="handleClick">Vue按钮</button>
  <input @keyup.enter="handleEnter">
</template>
```

**React事件机制：**
- 使用事件委托，所有事件委托到document
- 使用合成事件对象（SyntheticEvent）
- 自动处理跨浏览器兼容性
```jsx
const handleClick = (event) => {
  // event是合成事件对象
  event.stopPropagation();
  event.preventDefault();
  // 访问原生事件：event.nativeEvent
};

<button onClick={handleClick}>React按钮</button>
```

**主要区别对比：**
| 特性 | Vue | React |
|------|-----|-------|
| 事件绑定 | 直接绑定到元素 | 委托到document |
| 事件对象 | 原生事件对象 | 合成事件对象 |
| 性能 | 元素多时内存占用高 | 统一委托，性能更好 |
| 语法 | 声明式修饰符 | 手动处理 |
| 调试 | 直观易调试 | 需要理解委托机制 |

#### 题目5：React合成事件的原理是什么？
**答案：**
React合成事件是对原生事件的封装，主要特点：

1. **事件委托**：所有事件都委托到document根节点
2. **统一接口**：提供跨浏览器兼容的事件API
3. **事件池**：复用事件对象提高性能（React 16及之前）
4. **批量更新**：事件处理中的状态更新会被批处理

**实现原理：**
```javascript
// 简化的React事件处理流程
function handleEvent(nativeEvent) {
  // 1. 创建合成事件对象
  const syntheticEvent = createSyntheticEvent(nativeEvent);
  
  // 2. 收集事件路径上的处理器
  const handlers = collectHandlers(nativeEvent.target);
  
  // 3. 执行事件处理器
  executeHandlers(handlers, syntheticEvent);
  
  // 4. 清理事件对象（事件池）
  releaseSyntheticEvent(syntheticEvent);
}
```

### 12. 模块化

#### 题目1：JavaScript的模块化方案有哪些？
**答案：**

1. **CommonJS**（Node.js）：使用require/module.exports，同步加载
2. **ES6 Module**：使用import/export，静态加载

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

### 13. Iterator迭代器
   
#### 题目1：什么是Iterator？
**答案：**
Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作。

**Iterator的作用：**
1. 为各种数据结构提供统一的访问接口
2. 使数据结构的成员能够按某种次序排列
3. 为for...of循环提供接口

#### 题目2：如何实现一个Iterator？
**答案：**
Iterator接口需要实现next方法，返回包含value和done属性的对象。可以通过Symbol.iterator为对象添加迭代器接口。

### 14. Promise

#### 题目1：Promise的基本用法和状态？
**答案：**
Promise有三种状态：
- **pending**：初始状态
- **fulfilled**：操作成功
- **rejected**：操作失败

状态只能从pending转为fulfilled或rejected，且一旦改变就不会再变。

#### 题目2：Promise的常用方法？
**答案：**
1. **Promise.all**：所有Promise都成功才成功，一个失败就失败
2. **Promise.any**：任意一个Promise成功就成功，全部失败才失败
3. **Promise.race**：返回最先改变状态的Promise
4. **Promise.allSettled**：等待所有Promise都完成（无论成功失败）

### 15. Generator

#### 题目1：什么是Generator函数？
**答案：**
Generator函数是ES6提供的一种异步编程解决方案，可以理解为一个状态机，封装了多个内部状态。

特征：
1. function关键字与函数名之间有一个星号
2. 函数体内部使用yield表达式定义不同的内部状态
3. 调用Generator函数返回一个迭代器对象

#### 题目2：Generator的应用场景？
**答案：**
1. **异步操作的同步化表达**：用同步的写法表达异步操作
2. **控制流管理**：可以暂停和恢复函数执行
3. **状态机**：管理复杂的状态变化
4. **迭代器生成**：创建自定义的迭代器

### 16. async/await

#### 题目1：async/await的原理？
**答案：**
async/await是Generator函数的语法糖，内部基于Promise实现。
- async函数返回一个Promise对象
- await表达式会暂停async函数的执行，等待Promise解析
- 相比于Promise链式调用，async/await让异步代码看起来更像同步代码

#### 题目2：async/await的错误处理？
**答案：**
1. **try/catch**：包裹await语句处理错误
2. **catch方法**：在await后面链式调用catch
3. **统一错误处理**：封装错误处理函数

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
1. **意外的全局变量**：未声明的变量成为全局变量
2. **未清除的定时器**：忘记clearInterval或clearTimeout
3. **闭包**：闭包引用的变量不会被回收
4. **DOM引用**：删除DOM元素后仍保持引用

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
- 及时清除定时器
- 解绑事件监听器
- 使用WeakMap存储临时引用
- 避免循环引用
- 合理使用闭包

### 21. 深浅拷贝

#### 题目1：深拷贝和浅拷贝的区别？
**答案：**
- **浅拷贝**：只复制对象的第一层属性，如果属性值是引用类型，复制的是引用地址
- **深拷贝**：递归复制对象的所有层级，创建一个完全独立的新对象

#### 题目2：实现浅拷贝的方法？
**答案：**
- Object.assign()
- 扩展运算符（...）
- Array.prototype.slice()
- Array.prototype.concat()

#### 题目3：实现深拷贝的方法？
**答案：**
1. **JSON方法**：JSON.parse(JSON.stringify())，但有限制（无法拷贝函数、undefined、Symbol等）
2. **手写深拷贝**：递归处理各种数据类型，考虑循环引用问题
3. **Lodash的cloneDeep**：成熟的第三方库实现

### 22. 节流与防抖

#### 题目1：什么是防抖和节流？
**答案：**
- **防抖（debounce）**：事件触发后延迟n秒执行，如果在n秒内再次触发，则重新计时
- **节流（throttle）**：事件触发后每隔n秒执行一次，n秒内多次触发只执行一次

#### 题目2：手写实现防抖函数
**答案：**
防抖实现原理：
- 使用定时器延迟执行
- 每次触发时清除之前的定时器
- 重新设置新的定时器

#### 题目3：手写实现节流函数
**答案：**
节流实现方式：
1. **时间戳版本**：记录上次执行时间，比较时间差
2. **定时器版本**：使用定时器控制执行频率
3. **时间戳+定时器版本**：结合两种方式的优点

### 23. Proxy代理

#### 题目1：Proxy的基本用法？
**答案：**
Proxy用于创建一个对象的代理，从而实现基本操作的拦截和自定义。可以拦截对象的读取、设置、枚举、函数调用等操作。

#### 题目2：Proxy的应用场景？
**答案：**
1. **数据验证**：在设置属性时进行验证
2. **属性默认值**：为不存在的属性提供默认值
3. **数组负索引**：实现数组的负索引访问
4. **响应式数据**：Vue 3的响应式系统基于Proxy实现

### 24. Ajax

#### 题目1：原生Ajax的实现步骤？
**答案：**
1. 创建XMLHttpRequest对象
2. 处理请求参数
3. 设置请求状态变化的处理函数
4. 打开连接并发送请求
5. 处理响应结果

#### 题目2：Fetch和Ajax的区别？
**答案：**
1. **Fetch基于Promise，Ajax基于回调**
2. **Fetch不会reject HTTP错误状态**
3. **Fetch默认不发送cookies**
4. **Fetch不支持超时设置**
5. **Fetch不支持进度事件**

### 25. 事件循环（Event Loop）

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

#### 题目3：请解释代码的执行顺序
**答案：**
事件循环执行顺序分析：
1. 同步代码最先执行
2. 微任务队列清空
3. 执行宏任务
4. 宏任务产生的微任务立即执行
5. 继续下一个宏任务

#### 题目4：async/await在事件循环中的执行机制？
**答案：**
async/await本质上是Promise的语法糖，在事件循环中的行为与Promise一致。await后面的代码相当于Promise.then中的回调，会被放入微任务队列。

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

### 26. 深入数组

#### 题目1：数组的高阶方法有哪些？
**答案：**
- **map**：映射新数组，返回新数组
- **filter**：过滤数组，返回满足条件的元素组成的新数组
- **reduce**：归约，将数组元素累积为单个值
- **forEach**：遍历数组，无返回值
- **find**：查找第一个满足条件的元素
- **findIndex**：查找第一个满足条件的元素索引
- **some**：检测是否有元素满足条件
- **every**：检测是否所有元素都满足条件
- **flat**：扁平化数组
- **flatMap**：先map后flat

#### 题目2：手写实现数组的map方法
**答案：**
map方法实现原理：
- 检查callback是否为函数
- 创建新数组存储结果
- 遍历原数组，对每个元素调用callback
- 将callback返回值存入新数组
- 返回新数组

#### 题目3：数组去重的方法？
**答案：**
1. **Set去重**：利用Set的唯一性
2. **filter + indexOf**：利用indexOf返回第一个匹配索引
3. **reduce**：累积不重复的元素
4. **Map去重**：可以处理对象去重

## 二、HTTP缓存机制

### 27. 协商缓存

#### 题目1：什么是协商缓存？协商缓存的实现原理？
**答案：**
协商缓存是HTTP缓存机制的一种，当强缓存失效时，浏览器会向服务器发送请求，服务器根据请求头中的缓存标识来决定是否使用缓存。

**实现原理：**
1. 浏览器发送请求时携带缓存标识（If-Modified-Since 或 If-None-Match）
2. 服务器比较缓存标识与资源当前状态
3. 如果资源未变化，返回304状态码，浏览器使用本地缓存
4. 如果资源已变化，返回200状态码和新的资源内容

**两种协商缓存方式：**
1. **Last-Modified / If-Modified-Since**：基于文件修改时间
2. **ETag / If-None-Match**：基于文件内容哈希值

#### 题目2：Last-Modified和ETag的区别？
**答案：**

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
- 问题：文件内容相同，但touch命令修改了时间
- Last-Modified会认为文件已变化，导致不必要的下载
- ETag可以正确识别内容未变化

**场景2：分布式系统中的缓存一致性问题**
- 问题：多台服务器时间不同步
- 解决方案：使用ETag而不是Last-Modified

**场景3：CDN边缘节点的缓存策略**
- 需要同时支持ETag和Last-Modified
- 优先检查ETag，备选Last-Modified

### 28. 跨域问题

#### 题目1：什么是跨域？为什么会出现跨域问题？
**答案：**
跨域是指浏览器不能执行其他网站的脚本，它是由浏览器的同源策略造成的。

**同源策略限制：**
- 协议相同（http/https）
- 域名相同
- 端口相同

**为什么需要同源策略：**
1. **防止CSRF攻击**：恶意网站无法获取用户在其他网站的数据
2. **保护用户隐私**：防止恶意网站读取用户敏感信息
3. **维护数据安全**：防止恶意网站篡改其他网站的数据

#### 题目2：跨域的解决方案有哪些？
**答案：**

**1. CORS（跨域资源共享）**
- 服务端设置Access-Control-Allow-Origin等头部
- 支持简单请求和预检请求
- 可以携带Cookie（需要特殊配置）

**2. JSONP（JSON with Padding）**
- 利用script标签不受同源策略限制
- 只支持GET请求
- 需要服务端配合返回JSONP格式

**3. 代理服务器**
- 开发环境：webpack devServer代理
- 生产环境：nginx反向代理
- 服务端代理：后端转发请求

**4. postMessage**
- 用于不同窗口间通信
- 支持跨域消息传递
- 需要验证消息来源

**5. document.domain**
- 适用于子域名跨域
- 设置相同的主域名
- 只能用于同一主域下的子域

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

#### 题目4：跨域携带Cookie的问题？
**答案：**
默认情况下，跨域请求不会携带Cookie，需要特殊配置。

**客户端配置：**
- fetch：设置credentials: 'include'
- XMLHttpRequest：设置withCredentials = true

**服务端配置：**
- 不能使用通配符 *
- 必须指定具体的域名
- 设置Access-Control-Allow-Credentials: true

#### 题目5：跨域问题的经典面试场景？
**答案：**

**场景1：开发环境跨域问题**
- 问题：本地开发时前端localhost:3000访问后端localhost:8080
- 解决方案：开发服务器代理配置

**场景2：生产环境跨域问题**
- 问题：前端域名和后端域名不同
- 解决方案：CORS配置

**场景3：第三方API跨域问题**
- 问题：调用第三方API遇到跨域限制
- 解决方案：后端代理转发

**场景4：WebSocket跨域问题**
- 问题：WebSocket连接跨域
- 解决方案：服务端设置CORS验证
