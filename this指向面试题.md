# JavaScript this指向面试题

## 基础理解题

### 1. 普通函数调用
```javascript
"use strict";
function test() {
    console.log(this);
}
test(); // 输出什么？为什么？
```

**我的答案：**
输出：_____function____________
原因：______在普通函数调用，指向Windows___________

**正确答案：**
输出：undefined
原因：在严格模式下，普通函数调用中的this指向undefined，而不是window对象

### 2. 对象方法调用
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

**我的答案：**
输出：________Hello,张三_________
原因：____________对象方法调用时，指向调用对象_____

**正确答案：**
输出：Hello, undefined
原因：虽然func是从obj.sayHello赋值而来，但直接调用func()时，this指向全局对象（非严格模式）或undefined（严格模式），而不是obj对象

## 进阶应用题

### 3. 构造函数调用
```javascript
function Person(name) {
    this.name = name;
    console.log(this);
}

const person = Person('李四'); // 没有使用new
console.log(person); // 输出什么？
console.log(window.name); // 输出什么？
```

**我的答案：**
person输出：________name_________
window.name输出：______李四___________
原因：_________________

**正确答案：**
person输出：undefined
window.name输出：李四
原因：没有使用new关键字调用Person函数，this指向全局对象（window），所以this.name = '李四'实际上是window.name = '李四'，函数没有返回值，所以person为undefined

### 4. call/apply/bind的使用
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

**我的答案：**
call输出：___王五_____________
apply输出：___赵六___________
bind输出：_____王五____________

**正确答案：**
call输出：王五
apply输出：赵六
bind输出：王五
原因：call、apply、bind都能改变函数的this指向，call和apply立即执行，bind返回新函数需要再次调用

## 综合应用题

### 5. 箭头函数与普通函数对比
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

**我的答案：**
regularFunc输出：________小明_________
arrowFunc输出：___________小明______

**正确答案：**
regularFunc输出：undefined
arrowFunc输出：小明
原因：setTimeout中的普通函数this指向全局对象（非严格模式）或undefined（严格模式），而箭头函数继承外层作用域的this指向

### 6. 复杂场景分析
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

**我的答案：**
method1输出：________小红_________
method2输出：_________小红________

**正确答案：**
method1输出：小红, undefined, 小红
method2输出：undefined
原因：method1中innerFunc是普通函数，this指向全局对象；arrowFunc继承外层this指向obj；method2是箭头函数，this指向定义时的全局对象

## 陷阱题

### 7. 事件处理中的this
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

**我的答案：**
第一个事件输出：_____ '按钮'____________
第二个事件输出：_________'myButton'________

**正确答案：**
第一个事件输出：undefined（或按钮的name属性值）
第二个事件输出：按钮
原因：第一个事件中，handleClick作为回调函数直接传递，this指向触发事件的元素；第二个事件中，箭头函数调用obj.handleClick()，this指向obj

### 8. 链式调用中的this
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

**我的答案：**
输出：_____________15____

**正确答案：**
输出：13
原因：链式调用中，每个方法都返回this，所以this始终指向calculator对象。计算过程：0+5=5, 5×2=10, 10+3=13

### 9. 立即执行函数中的this
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

**我的答案：**
IIFE输出：___________'测试'______
箭头IIFE输出：_________________

**正确答案：**
IIFE输出：undefined
箭头IIFE输出：测试
原因：普通立即执行函数中的this指向全局对象（非严格模式）或undefined（严格模式），而箭头立即执行函数继承外层作用域的this指向

### 10. 原型方法中的this
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

**我的答案：**
dog.sayName()输出：_My name is '旺财'______________
cat.sayName()输出：_My name is __'咪咪'______________
sayNameFunc()输出：__My name is '旺财'_______________

**正确答案：**
dog.sayName()输出：My name is: 旺财
cat.sayName()输出：My name is: 咪咪
sayNameFunc()输出：My name is: undefined
原因：前两个调用中this指向实例对象，最后一个调用中sayNameFunc是普通函数调用，this指向全局对象（非严格模式）或undefined（严格模式）

## 答题要求

1. **仔细分析每道题的代码执行上下文**
2. **考虑严格模式和非严格模式的区别**
3. **理解不同函数调用方式对this的影响**
4. **注意箭头函数和普通函数的区别**
5. **分析原型链和继承对this的影响**

## 知识点回顾

在答题前，请确保理解以下概念：
- 普通函数调用中的this指向
- 对象方法调用中的this指向
- 构造函数调用中的this指向
- call/apply/bind对this的修改
- 箭头函数的this继承机制
- 严格模式对this的影响

---

**提示：** 建议在浏览器控制台或Node.js环境中实际运行这些代码来验证你的答案！ 