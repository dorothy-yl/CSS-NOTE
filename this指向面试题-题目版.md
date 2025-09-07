# JavaScript this指向面试题 - 题目版（100分制）

## 基础理解题（30分）

### 1. 普通函数调用（5分）
```javascript
"use strict";
function test() {
    console.log(this);
}
test(); // 输出什么？为什么？
```

### 2. 对象方法调用（5分）
```javascript
const obj = {
    name: '张三',
    sayHello() {
        console.log(`Hello, ${this.name}`);
    }
};

const func = obj.sayHello;
func(); // 输出什么？为什么？
```

### 3. 构造函数调用（5分）
```javascript
function Person(name) {
    this.name = name;
    console.log(this);
}

const person = Person('李四'); // 没有使用new
console.log(person); // 输出什么？
console.log(window.name); // 输出什么？
```

### 4. call/apply/bind的使用（5分）
```javascript
const obj1 = { name: '王五' };
const obj2 = { name: '赵六' };

function getName() {
    return this.name;
}

console.log(getName.call(obj1)); // 输出什么？
console.log(getName.apply(obj2)); // 输出什么？
console.log(getName.bind(obj1)()); // 输出什么？
```

### 5. 箭头函数与普通函数对比（5分）
```javascript
const obj = {
    name: '小明',
    regularFunc: function() {
        setTimeout(function() {
            console.log('普通函数:', this.name);
        }, 100);
    },
    arrowFunc: function() {
        setTimeout(() => {
            console.log('箭头函数:', this.name);
        }, 100);
    }
};

obj.regularFunc(); // 输出什么？
obj.arrowFunc();  // 输出什么？
```

### 6. 复杂场景分析（5分）
```javascript
const obj = {
    name: '小红',
    method1: function() {
        console.log('method1:', this.name);
        
        const innerFunc = function() {
            console.log('innerFunc:', this.name);
        };
        
        const arrowFunc = () => {
            console.log('arrowFunc:', this.name);
        };
        
        innerFunc();
        arrowFunc();
    },
    method2: () => {
        console.log('method2:', this.name);
    }
};

obj.method1(); // 输出什么？
obj.method2(); // 输出什么？
```

## 进阶应用题（40分）

### 7. 事件处理中的this（8分）
```javascript
const button = document.getElementById('myButton');
const obj = {
    name: '按钮',
    handleClick: function() {
        console.log('点击事件:', this.name);
    }
};

button.addEventListener('click', obj.handleClick); // 点击后输出什么？
button.addEventListener('click', () => obj.handleClick()); // 点击后输出什么？
```

### 8. 链式调用中的this（8分）
```javascript
const calculator = {
    value: 0,
    add: function(num) {
        this.value += num;
        return this;
    },
    multiply: function(num) {
        this.value *= num;
        return this;
    },
    getValue: function() {
        return this.value;
    }
};

const result = calculator.add(5).multiply(2).add(3).getValue();
console.log(result); // 输出什么？
```

### 9. 立即执行函数中的this（8分）
```javascript
const obj = {
    name: '测试',
    test: function() {
        (function() {
            console.log('IIFE:', this.name);
        })();
        
        (() => {
            console.log('箭头IIFE:', this.name);
        })();
    }
};

obj.test(); // 输出什么？
```

### 10. 原型方法中的this（8分）
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.sayName = function() {
    console.log('My name is:', this.name);
};

const dog = new Animal('旺财');
const cat = new Animal('咪咪');

dog.sayName(); // 输出什么？
cat.sayName(); // 输出什么？

const sayNameFunc = dog.sayName;
sayNameFunc(); // 输出什么？
```

### 11. 类方法中的this（8分）
```javascript
class Student {
    constructor(name) {
        this.name = name;
    }
    
    study() {
        console.log(`${this.name} is studying`);
    }
    
    static create(name) {
        return new Student(name);
    }
}

const student = new Student('李华');
student.study(); // 输出什么？

const studyFunc = student.study;
studyFunc(); // 输出什么？
```

## 高级应用题（30分）

### 12. 异步函数中的this（10分）
```javascript
const obj = {
    name: '异步测试',
    async asyncMethod() {
        console.log('async method:', this.name);
        
        setTimeout(function() {
            console.log('setTimeout in async:', this.name);
        }, 100);
        
        setTimeout(() => {
            console.log('setTimeout arrow in async:', this.name);
        }, 100);
        
        await new Promise(resolve => setTimeout(resolve, 50));
        console.log('after await:', this.name);
    }
};

obj.asyncMethod(); // 输出什么？
```

### 13. 模块中的this（10分）
```javascript
// module.js
const moduleObj = {
    name: '模块对象',
    method: function() {
        console.log('module method:', this.name);
    }
};

export default moduleObj;

// main.js
import moduleObj from './module.js';

const { method } = moduleObj;
method(); // 输出什么？

moduleObj.method(); // 输出什么？
```

### 14. 装饰器中的this（10分）
```javascript
function logThis(target, name, descriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args) {
        console.log('装饰器中的this:', this);
        return original.apply(this, args);
    };
    return descriptor;
}

class Calculator {
    @logThis
    add(a, b) {
        console.log('方法中的this:', this);
        return a + b;
    }
}

const calc = new Calculator();
calc.add(1, 2); // 输出什么？
```

## 答题要求

1. **仔细分析每道题的代码执行上下文**
2. **考虑严格模式和非严格模式的区别**
3. **理解不同函数调用方式对this的影响**
4. **注意箭头函数和普通函数的区别**
5. **分析原型链和继承对this的影响**
6. **考虑异步执行对this的影响**

## 评分标准

- 基础理解题（30分）：每题5分，共6题
- 进阶应用题（40分）：每题8分，共5题
- 高级应用题（30分）：每题10分，共3题
- 总分：100分

## 知识点回顾

在答题前，请确保理解以下概念：
- 普通函数调用中的this指向
- 对象方法调用中的this指向
- 构造函数调用中的this指向
- call/apply/bind对this的修改
- 箭头函数的this继承机制
- 严格模式对this的影响
- 异步函数中的this指向
- 模块和装饰器中的this指向

---

**提示：** 建议在浏览器控制台或Node.js环境中实际运行这些代码来验证你的答案！






