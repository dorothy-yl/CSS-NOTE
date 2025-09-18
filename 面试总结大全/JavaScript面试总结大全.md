# JavaScript面试总结大全

## 一、JavaScript基础

### 1. JavaScript组成
JavaScript由三部分组成：
- **ECMAScript** - 语言核心标准（变量、函数、数据类型等）
- **DOM** - 文档对象模型，操作HTML文档的API
- **BOM** - 浏览器对象模型，操作浏览器的API


### 2. 数据类型

**基本类型（7个）：**
- `Number` - 数字
- `String` - 字符串
- `Boolean` - 布尔值
- `Undefined` - 未定义
- `Null` - 空值
- `Symbol` - 符号（ES6）
- `BigInt` - 大整数（ES2020）

**引用类型：**
- `Object` - 对象（包括Array、Function、Date、RegExp等）

### 3. 类型检测

**typeof操作符：**
```javascript
console.log(typeof null);     // "object" (历史bug)
console.log(typeof undefined); // "undefined"
console.log(typeof []);        // "object"
console.log(typeof {});        // "object"
console.log(typeof function(){}); // "function"
```

**准确检测类型：**
```javascript
// 检测数组
Array.isArray(arr)
arr instanceof Array
Object.prototype.toString.call(arr) === '[object Array]'

// 检测所有类型
Object.prototype.toString.call(obj).slice(8, -1)
```

### 4. null和undefined的区别
- **undefined**：变量声明但未赋值，函数无返回值，对象不存在的属性
- **null**：空对象指针，主动赋值表示"无"
- `null == undefined` 为 `true`（类型转换）
- `null === undefined` 为 `false`（严格比较）

## 二、变量声明

### 1. var、let、const的区别

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 有提升 | 暂时性死区 | 暂时性死区 |
| 重复声明 | 可以 | 不可以 | 不可以 |
| 重新赋值 | 可以 | 可以 | 不可以 |

### 2. 变量提升
```javascript
console.log(a); // undefined (提升但未赋值)
console.log(b); // ReferenceError (暂时性死区)
console.log(foo); // function foo() {} (函数提升)

var a = 1;
let b = 2;

function foo() {
    return 'foo';
}
```

**💡 理解要点：**
- **var的提升**：就像把声明部分"搬到"作用域顶部，但赋值留在原地
  ```javascript
  // 实际执行顺序相当于：
  var a;           // 声明被提升到顶部，值为undefined
  console.log(a);  // 所以这里是undefined而不是报错
  a = 1;           // 赋值还在原来位置
  ```
- **let/const的暂时性死区**：虽然也提升了，但在声明前不能访问（像被"冻结"了）
- **函数提升**：整个函数定义都被提升，所以可以在声明前调用

### 3. 暂时性死区
```javascript
// 情况1
let a = 1; 
let a = 2;  // SyntaxError: Identifier 'a' has already been declared

// 情况2
var a = 1; 
var a = 2;  // 可以，var允许重复声明

// 情况3
var a = 1; 
let a = 2;  // SyntaxError: Identifier 'a' has already been declared

// 情况4
let null = 1;  // SyntaxError: Unexpected token 'null'
```

**💡 理解要点：**
- **暂时性死区**：从作用域开始到let/const声明这段区域，变量不可访问
  ```javascript
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 1;      // 这里才真正"激活"变量x
  ```
- **记忆技巧**：
  - var = "随意大叔"：可以重复声明，到处都能用
  - let = "严格青年"：不能重复声明，有自己的块级作用域
  - const = "固执老头"：不能重复声明，还不能改值

## 三、作用域与闭包

### 1. 作用域链
JavaScript作用域链是查找变量的机制：
1. 在当前作用域查找
2. 如果没找到，向上一级作用域查找
3. 直到全局作用域
4. 如果都没找到，返回undefined

**💡 理解要点：**
- **作用域链**：就像"找东西"的过程，先在自己房间找，找不到就去客厅找，再找不到就去其他房间找
  ```javascript
  let global = '全局变量';
  
  function outer() {
    let outerVar = '外层变量';
    
    function inner() {
      let innerVar = '内层变量';
      console.log(innerVar);  // 1. 先在inner作用域找 ✓
      console.log(outerVar);  // 2. inner没有，去outer找 ✓
      console.log(global);    // 3. outer没有，去全局找 ✓
      console.log(notExist);  // 4. 全局也没有，报错 ✗
    }
  }
  ```
- **记忆技巧**：作用域链 = 向上查找的"家族关系"，儿子找不到问爸爸，爸爸找不到问爷爷

### 2. 闭包
闭包是函数可以访问其外部作用域的变量，即使外部函数已经执行完毕。

**闭包示例：**
```javascript
function outer() {
    let count = 0;
    return function() {
        return ++count;
    }
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

**💡 理解要点：**
- **闭包**：就像一个"保险箱"，内层函数可以永久访问外层函数的变量
  ```javascript
  function createWallet() {
    let money = 100;  // 这个变量被"锁"在闭包里
    
    return {
      getMoney: () => money,        // 可以查看余额
      spend: (amount) => {          // 可以花钱
        if (money >= amount) {
          money -= amount;
          return `花了${amount}元，余额${money}元`;
        }
        return '余额不足';
      }
    };
  }
  
  const wallet = createWallet();
  console.log(wallet.getMoney()); // 100
  console.log(wallet.spend(30));  // "花了30元，余额70元"
  // 外部无法直接访问money变量，实现了数据私有化
  ```

**闭包的作用：**
- 创建私有变量（外部无法直接访问）
- 延长变量生命周期（函数执行完变量不销毁）
- 模块化代码（封装功能）

**记忆技巧**：闭包 = "私人保险箱"，只有特定的钥匙（内层函数）才能打开

### 3. 闭包应用 - 私有计数器
```javascript
function createCounter() {
    let count = 0;
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getValue() {
            return count;
        },
        reset() {
            count = 0;
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getValue());  // 1
```

## 四、this指向

### 1. this指向规则
- **普通函数调用**：指向window（严格模式undefined）
- **对象方法调用**：指向调用对象
- **构造函数调用**：指向新创建的实例
- **call/apply/bind**：指向第一个参数
- **箭头函数**：继承外层this

### 2. this指向示例
```javascript
const obj = {
    name: '张三',
    getName: function() {
        return this.name;
    },
    getNameArrow: () => {
        return this.name;
    }
};

const getName = obj.getName;
console.log(obj.getName());      // '张三'
console.log(getName());           // undefined（严格模式报错）
console.log(obj.getNameArrow()); // undefined（箭头函数this指向外层）
```

### 3. 事件处理中的this
```javascript
class Button {
    constructor(name) {
        this.name = name;
    }
    
    handleClick() {
        console.log(this.name);
    }
    
    handleClickArrow = () => {
        console.log(this.name);
    }
}

const btn = new Button('提交按钮');
const button = document.getElementById('myButton');

button.addEventListener('click', btn.handleClick);      // undefined（this指向element）
button.addEventListener('click', btn.handleClickArrow); // '提交按钮'（箭头函数保持this）
```

### 4. 定时器中的this
```javascript
const timer = {
    seconds: 0,
    start: function() {
        setTimeout(function() {
            this.seconds++;  // this指向window，输出NaN
            console.log(this.seconds);
        }, 1000);
    },
    startArrow: function() {
        setTimeout(() => {
            this.seconds++;  // this指向timer对象，正常计数
            console.log(this.seconds);
        }, 1000);
    }
};
```

## 五、call、apply、bind

### 1. 基本用法
```javascript
const person1 = { name: '小明' };
const person2 = { name: '小红' };

function introduce(age, city) {
    return `我叫${this.name}，今年${age}岁，来自${city}`;
}

// call
console.log(introduce.call(person1, 25, '北京'));

// apply
console.log(introduce.apply(person1, [25, '北京']));

// bind
const boundFunc = introduce.bind(person1);
console.log(boundFunc(25, '北京'));
```

### 2. 手写实现

**实现call：**
```javascript
Function.prototype.myCall = function(context, ...args) {
    context = context || window;
    const fn = Symbol('fn');
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};
```

**实现bind：**
```javascript
Function.prototype.myBind = function(context, ...args) {
    const fn = this;
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
};
```

## 六、原型与继承

### 1. 原型链
每个对象都有`__proto__`属性指向其原型对象，原型对象也有自己的原型，形成链式结构。

**💡 理解要点：**
- **原型链**：就像"遗传关系"，孩子没有的特征会从父母那里继承
  ```javascript
  // 想象一个家族：
  // 爷爷(Object.prototype) -> 爸爸(Animal.prototype) -> 儿子(dog实例)
  
  function Animal(name) {
    this.name = name;  // 每个实例自己的属性
  }
  Animal.prototype.eat = function() {  // 所有动物共有的方法
    console.log(this.name + ' is eating');
  };
  
  const dog = new Animal('旺财');
  dog.eat();  // 旺财 is eating
  
  // 查找过程：
  // 1. dog对象有eat方法吗？没有
  // 2. dog.__proto__(Animal.prototype)有eat方法吗？有！调用它
  ```
- **记忆技巧**：原型链 = "家族遗传链"，没有的能力就问上一代要

### 2. 构造函数、原型、实例的关系
- 构造函数有`prototype`属性指向原型对象
- 原型对象有`constructor`属性指向构造函数
- 实例有`__proto__`属性指向原型对象

**💡 理解要点：**
- **三者关系**：就像"工厂-模板-产品"的关系
  ```javascript
  function Person(name) {    // 构造函数 = 工厂
    this.name = name;
  }
  
  Person.prototype.sayHi = function() {  // 原型对象 = 模板
    console.log('Hi, I am ' + this.name);
  };
  
  const alice = new Person('Alice');     // 实例 = 产品
  
  // 关系图：
  // Person(构造函数) ←--constructor--- Person.prototype(原型对象)
  //    ↓                                      ↑
  // prototype                            __proto__
  //    ↓                                      ↑
  //  指向                                   alice(实例)
  ```
- **记忆口诀**：
  - 构造函数的prototype指向原型
  - 原型的constructor指向构造函数  
  - 实例的__proto__指向原型
  - "工厂有模板，模板记工厂，产品找模板"

### 3. 原型链示例
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a sound`);
};

const dog = new Animal('旺财');
const speak = dog.speak;

dog.speak();    // '旺财 makes a sound'
speak();        // 'undefined makes a sound'（this指向全局）
speak.call(dog); // '旺财 makes a sound'
```

### 4. 继承实现
```javascript
function Animal(name) {
    this.name = name;
    this.colors = ['white', 'black'];
}

Animal.prototype.sayName = function() {
    console.log('My name is ' + this.name);
};

function Dog(name, breed) {
    Animal.call(this, name);  // 继承属性
    this.breed = breed;
}

// 继承原型方法
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog1 = new Dog('Max', 'Golden Retriever');
const dog2 = new Dog('Buddy', 'Labrador');

dog1.colors.push('brown');
console.log(dog1.colors); // ['white', 'black', 'brown']
console.log(dog2.colors); // ['white', 'black']
dog1.sayName(); // 'My name is Max'
```

**💡 理解要点：**
- **继承的两个步骤**：
  1. **继承属性**：`Animal.call(this, name)` - 在子类构造函数中调用父类构造函数
  2. **继承方法**：`Dog.prototype = Object.create(Animal.prototype)` - 让子类原型继承父类原型
  
  ```javascript
  // 步骤拆解：
  function Dog(name, breed) {
    // 第1步：继承父类的实例属性
    Animal.call(this, name);  // 相当于把Animal函数在Dog的this上执行一遍
    // 现在this.name和this.colors都有了
    
    this.breed = breed;  // 添加子类特有属性
  }
  
  // 第2步：继承父类的原型方法
  Dog.prototype = Object.create(Animal.prototype);  // 创建一个新对象，原型指向Animal.prototype
  Dog.prototype.constructor = Dog;  // 修正constructor指向
  ```

- **为什么要两步？**
  - 第1步解决：每个实例有自己的属性副本（不共享）
  - 第2步解决：所有实例共享父类的方法（节省内存）

- **记忆技巧**：继承 = "搬家"，先搬东西（属性），再搬关系（方法）

### 5. ES6 Class继承
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    speak() {
        console.log(`${this.name} barks`);
    }
}
```

**💡 理解要点：**
- **ES6 Class vs 传统继承**：
  ```javascript
  // 传统方式（复杂）
  function Dog(name, breed) {
    Animal.call(this, name);  // 继承属性
    this.breed = breed;
  }
  Dog.prototype = Object.create(Animal.prototype);  // 继承方法
  Dog.prototype.constructor = Dog;  // 修正constructor
  
  // ES6方式（简洁）
  class Dog extends Animal {
    constructor(name, breed) {
      super(name);  // 相当于Animal.call(this, name)
      this.breed = breed;
    }
  }
  ```

- **super关键字**：
  - `super(name)` = 调用父类构造函数，相当于 `Animal.call(this, name)`
  - `super.speak()` = 调用父类方法

- **记忆技巧**：
  - ES6 Class = "语法糖"，让继承写法更像其他面向对象语言
  - extends = "扩展"，Dog扩展了Animal的功能
  - super = "超级"，调用超级父类的能力

## 七、数组方法

### 1. 改变原数组的方法
- `push()` - 尾部添加
- `pop()` - 尾部删除
- `shift()` - 头部删除
- `unshift()` - 头部添加
- `splice()` - 删除/替换/插入
- `reverse()` - 反转
- `sort()` - 排序

### 2. 不改变原数组的方法
- `map()` - 映射
- `filter()` - 过滤
- `concat()` - 连接
- `slice()` - 切片
- `join()` - 连接成字符串

### 3. 数组方法示例
```javascript
const arr = [1, 2, 3, 4, 5];
const result1 = arr.map(x => x * 2);
const result2 = arr.filter(x => x > 3);

console.log(arr);        // [1, 2, 3, 4, 5]
console.log(result1);    // [2, 4, 6, 8, 10]
console.log(result2);    // [4, 5]
```

## 八、事件循环

### 1. 事件循环机制
JavaScript是单线程的，通过事件循环处理异步操作：
1. 执行同步代码
2. 执行微任务队列（Promise.then、queueMicrotask）
3. 执行宏任务队列（setTimeout、setInterval、I/O）
4. 重复步骤2-3

### 2. 微任务和宏任务
**微任务：**
- Promise.then/catch/finally
- queueMicrotask
- MutationObserver

**宏任务：**
- setTimeout/setInterval
- setImmediate（Node.js）
- I/O操作
- UI渲染

### 3. 事件循环示例
```javascript
console.log('start');

setTimeout(() => {
    console.log('timeout1');
    Promise.resolve().then(() => {
        console.log('promise1');
    });
}, 0);

new Promise((resolve) => {
    console.log('promise2');
    resolve();
}).then(() => {
    console.log('then2');
    setTimeout(() => {
        console.log('timeout2');
    }, 0);
});

console.log('end');

// 输出顺序：start -> promise2 -> end -> then2 -> timeout1 -> promise1 -> timeout2
```

## 九、Promise

### 1. Promise基础
Promise是异步编程的解决方案，解决了回调地狱问题。

### 2. Promise状态
- **pending** - 等待中
- **fulfilled** - 已成功
- **rejected** - 已失败

### 3. Promise方法
```javascript
// 基本用法
const promise = new Promise((resolve, reject) => {
    if (success) {
        resolve(value);
    } else {
        reject(error);
    }
});

// 链式调用
promise
    .then(value => {
        console.log(value);
        return value * 2;
    })
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.error(error);
    });
```

### 4. Promise.all vs Promise.race
```javascript
// Promise.all - 所有Promise都成功才成功
Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log(values); // [value1, value2, value3]
    })
    .catch(error => {
        console.error(error); // 任何一个失败都会进入catch
    });

// Promise.race - 第一个完成的Promise决定结果
Promise.race([promise1, promise2, promise3])
    .then(value => {
        console.log(value); // 第一个完成的值
    });
```

### 5. async/await
```javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

## 十、深浅拷贝

### 1. 浅拷贝
```javascript
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = { ...obj };  // 或 Object.assign({}, obj)
shallowCopy.b.c = 3;  // 会影响原对象的 obj.b.c
```

### 2. 深拷贝方法

**JSON方法（有局限性）：**
```javascript
const deepCopy = JSON.parse(JSON.stringify(obj));
// 不能处理函数、undefined、Symbol、循环引用
```

**递归实现（完整版）：**
```javascript
function deepClone(obj, map = new WeakMap()) {
    // 基本类型直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // 检查循环引用
    if (map.has(obj)) {
        return map.get(obj);
    }
    
    // 处理特殊对象类型
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }
    
    // 创建新对象或数组
    const cloned = Array.isArray(obj) ? [] : {};
    
    // 存储到map中，用于检测循环引用
    map.set(obj, cloned);
    
    // 递归拷贝属性
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key], map);
        }
    }
    
    return cloned;
}
```

## 十一、防抖和节流

### 1. 防抖（Debounce）
防抖是在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

```javascript
function debounce(fn, delay, immediate = false) {
    let timer = null;
    
    return function(...args) {
        const context = this;
        
        if (immediate && !timer) {
            fn.apply(context, args);
        }
        
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (!immediate) {
                fn.apply(context, args);
            }
            timer = null;
        }, delay);
    };
}

// 使用示例
const handleInput = debounce(() => {
    console.log('Input handled');
}, 500, true);
```

### 2. 节流（Throttle）
节流是规定在一个单位时间内，只能触发一次函数。

```javascript
function throttle(fn, delay) {
    let timer = null;
    let lastTime = 0;
    
    return function(...args) {
        const context = this;
        const now = Date.now();
        
        if (now - lastTime >= delay) {
            fn.apply(context, args);
            lastTime = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
                lastTime = Date.now();
            }, delay - (now - lastTime));
        }
    };
}
```

### 3. 使用场景
- **防抖**：搜索输入、按钮点击、窗口resize
- **节流**：滚动事件、鼠标移动、动画

## 十二、数组去重

### 1. 多种实现方法
```javascript
// 方法1：Set
function unique(arr) {
    return [...new Set(arr)];
}

// 方法2：filter + indexOf
function unique(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 方法3：reduce
function unique(arr) {
    return arr.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur];
    }, []);
}

// 方法4：Map
function unique(arr) {
    const map = new Map();
    return arr.filter(item => {
        if (map.has(item)) {
            return false;
        }
        map.set(item, true);
        return true;
    });
}
```

## 十三、手写new操作符

```javascript
function myNew(Constructor, ...args) {
    // 1. 创建一个新对象
    const obj = {};
    
    // 2. 将构造函数的prototype赋值给新对象的__proto__
    obj.__proto__ = Constructor.prototype;
    
    // 3. 执行构造函数，this指向新对象
    const result = Constructor.apply(obj, args);
    
    // 4. 如果构造函数返回对象，则返回该对象；否则返回新对象
    return typeof result === 'object' ? result : obj;
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
person.sayHello(); // 'Hello, I'm Alice'
```

## 十四、内存管理

### 1. 堆和栈的区别
- **栈**：存储基本类型和引用地址，自动管理
- **堆**：存储引用类型，需要垃圾回收

### 2. JavaScript中的存储
- **栈中**：基本类型（Number、String、Boolean、Undefined、Null、Symbol、BigInt）
- **堆中**：引用类型（Object、Array、Function等）

### 3. 垃圾回收
- **标记清除**：标记不再使用的对象，然后清除
- **引用计数**：记录每个对象被引用的次数，为0时回收

## 十五、性能优化

### 1. 代码优化
- 避免全局变量
- 使用事件委托
- 减少DOM操作
- 使用防抖节流
- 合理使用缓存

### 2. 内存优化
- 及时清理定时器
- 避免内存泄漏
- 使用WeakMap/WeakSet
- 合理使用闭包

### 3. 异步优化
- 使用Promise.all并行处理
- 避免回调地狱
- 合理使用async/await
- 使用Web Workers处理复杂计算

## 十六、ES6+新特性

### 1. 变量声明
- `let`/`const` - 块级作用域
- 解构赋值
- 模板字符串

### 2. 函数
- 箭头函数
- 默认参数
- 剩余参数
- 扩展运算符

### 3. 对象和数组
- 对象简写
- 计算属性名
- 数组解构
- 扩展运算符

### 4. 异步编程
- Promise
- async/await
- Generator函数

### 5. 模块化
- import/export
- 默认导出
- 命名导出

## 十七、安全防护

### 1. XSS攻击
**类型：**
- 存储型XSS
- 反射型XSS
- DOM型XSS

**防护措施：**
- 输入验证和过滤
- 输出编码
- 使用CSP（内容安全策略）
- 设置HttpOnly Cookie

### 2. CSRF攻击
**防护措施：**
- 使用CSRF Token
- 验证Referer
- 使用SameSite Cookie
- 双重提交Cookie

## 十八、浏览器兼容性

### 1. 兼容性处理
- 使用polyfill
- 特性检测
- 渐进增强
- 优雅降级

### 2. 常用polyfill
- Babel转译
- core-js
- polyfill.io

## 十九、调试技巧

### 1. 调试工具
- Chrome DevTools
- console方法
- debugger语句
- 断点调试

### 2. 常用console方法
```javascript
console.log()     // 普通日志
console.warn()    // 警告
console.error()   // 错误
console.table()   // 表格显示
console.time()    // 计时
console.group()   // 分组
```

## 二十、算法题常见解法

### 1. 两数之和
```javascript
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}
```

### 2. 数组去重
```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
```

### 3. 移动零
```javascript
function moveZeroes(nums) {
    let nonZeroIndex = 0;
    
    // 将所有非零元素移到前面
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[nonZeroIndex] = nums[i];
            nonZeroIndex++;
        }
    }
    
    // 将剩余位置填充为0
    for (let i = nonZeroIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    
    return nums;
}
```
