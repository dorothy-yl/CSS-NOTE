# Iterator迭代器面试题汇总 ⭐⭐⭐⭐

> 💡 **重要程度**: 中高频（约50%的中高级面试会涉及）
> 📌 **记忆口诀**: **Symbol迭代器、next方法返回、value和done**
> 🎯 **学习建议**: 掌握迭代器协议、生成器函数、for...of原理三大核心

---

## 📋 快速导航

| 章节 | 重要级别 | 核心内容 | 记忆口诀 |
|------|---------|---------|----------|
| [一、基础概念](#一基础概念题) | ⭐⭐⭐⭐⭐ | 迭代器协议、可迭代协议 | Symbol迭代器、next方法 |
| [二、代码实现](#二代码实现题) | ⭐⭐⭐⭐⭐ | 手写迭代器、可迭代对象 | value和done、闭包保持状态 |
| [三、生成器](#三生成器相关题) | ⭐⭐⭐⭐⭐ | Generator函数、yield | yield暂停、next恢复 |
| [四、内置可迭代对象](#四内置可迭代对象) | ⭐⭐⭐⭐ | String、Array、Map、Set | 七大内置可迭代 |
| [五、高级应用](#五高级应用题) | ⭐⭐⭐⭐ | 反向迭代、可中断迭代 | 灵活组合、惰性求值 |
| [六、性能优化](#六性能和优化题) | ⭐⭐⭐ | 惰性求值、缓存 | 按需计算、节省内存 |
| [七、错误处理](#七错误处理和边界情况) | ⭐⭐⭐ | return和throw方法 | 清理资源、错误传递 |
| [八、实际应用](#八实际应用场景题) | ⭐⭐⭐⭐ | 分页、树遍历、工具链 | 真实场景、解决方案 |

---

## 🎯 核心记忆口诀

### 迭代器全局记忆法
```
Symbol迭代器、next方法返回、value和done
可迭代有Symbol.iterator、迭代器有next方法
生成器yield暂停、next恢复、自动实现迭代器
```

### 迭代器协议记忆法
```
迭代器协议：实现next方法、返回{value, done}
可迭代协议：实现Symbol.iterator方法、返回迭代器对象
```

### for...of vs for...in 记忆法
```
for...in遍历键名、for...of遍历值
for...in包括原型链、for...of不包括
for...in任何对象、for...of只可迭代对象
```

---

## 一、基础概念题

### 📝 1. 什么是迭代器（Iterator）？ ⭐⭐⭐⭐⭐ 🔥
**答案要点：**
- 迭代器是一种设计模式，提供一种方法顺序访问聚合对象中的各个元素
- ES6 中的迭代器是一个对象，必须实现 next() 方法
- next() 方法返回包含 value 和 done 两个属性的对象

### 📝 2. 什么是可迭代协议（Iterable Protocol）？ ⭐⭐⭐⭐⭐ 🔥
**答案要点：**
- 对象必须实现 Symbol.iterator 方法
- Symbol.iterator 方法返回一个迭代器对象
- 可迭代对象可以被 for...of 循环遍历

**记忆口诀：**
```
可迭代有Symbol.iterator、返回迭代器对象、for...of可遍历
```

---

### 📝 3. 迭代器协议和可迭代协议的区别是什么？ ⭐⭐⭐⭐⭐ 🔥 ⚠️
**答案要点：**
- **迭代器协议**：定义了产生一系列值的标准方式（实现 next 方法）
- **可迭代协议**：定义了对象可被迭代的能力（实现 Symbol.iterator 方法）
- **关系**：可迭代对象返回迭代器，迭代器执行迭代

**对比表格：**
| 协议 | 实现要求 | 返回值 | 作用 |
|------|----------|--------|------|
| **迭代器协议** | 实现next()方法 | {value, done} | 执行迭代 |
| **可迭代协议** | 实现Symbol.iterator方法 | 迭代器对象 | 定义可迭代能力 |

**记忆口诀：**
```
可迭代定义能力、迭代器执行迭代
可迭代返回迭代器、迭代器返回值和状态
```

---

### 📝 4. for...in 和 for...of 的区别是什么？ ⭐⭐⭐⭐⭐ 🔥 ⚠️
**答案要点：**

#### 主要区别
1. **遍历内容不同**
   - `for...in`：遍历对象的**可枚举属性键名**（包括原型链上的）
   - `for...of`：遍历**可迭代对象的值**（不包括原型链）
   - **扩展运算符（...）**：和 `for...of` 一样，只能用于可迭代对象，用于展开其值

2. **适用对象不同**
   - `for...in`：可用于任何对象
   - `for...of`：只能用于可迭代对象（实现了 Symbol.iterator 的对象）
   - **扩展运算符**：只能用于可迭代对象，在数组字面量和函数调用中展开

#### 代码示例
```javascript
// 数组遍历
const arr = ['a', 'b', 'c'];
arr.customProp = 'custom';

// for...in 遍历索引（键名）
for (let key in arr) {
  console.log(key); // '0', '1', '2', 'customProp'
}

// for...of 遍历值
for (let value of arr) {
  console.log(value); // 'a', 'b', 'c'
}

// 对象遍历
const obj = { a: 1, b: 2, c: 3 };

// for...in 可以遍历对象
for (let key in obj) {
  console.log(key, obj[key]); // 'a' 1, 'b' 2, 'c' 3
}

// for...of 不能直接遍历普通对象（会报错）
// for (let value of obj) {} // TypeError: obj is not iterable

// 字符串遍历
const str = 'hello';

// for...in 遍历索引
for (let index in str) {
  console.log(index); // '0', '1', '2', '3', '4'
}

// for...of 遍历字符
for (let char of str) {
  console.log(char); // 'h', 'e', 'l', 'l', 'o'
}

// 原型链差异
Array.prototype.customMethod = function() {};
const arr2 = [1, 2, 3];

// for...in 会遍历原型链
for (let key in arr2) {
  console.log(key); // '0', '1', '2', 'customMethod'
}

// for...of 不会遍历原型链
for (let value of arr2) {
  console.log(value); // 1, 2, 3
}
```

#### 总结
- `for...in` 用于遍历对象属性，获取键名
- `for...of` 用于遍历可迭代对象，获取值
- 遍历数组时推荐用 `for...of`，遍历对象属性用 `for...in`
- `for...in` 会遍历原型链上的可枚举属性，`for...of` 不会

### 4.1 扩展运算符（...）与迭代器的关系
**答案要点：**

#### 核心概念
扩展运算符（spread operator）内部使用了迭代器协议，它会调用对象的 `Symbol.iterator` 方法来展开元素。

#### 使用场景和示例

1. **数组展开**
```javascript
// 基础使用
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // 相当于 Array.from(arr1) 或使用 for...of
console.log(arr2); // [1, 2, 3]

// 合并数组
const merged = [...arr1, 4, 5, ...[6, 7]];
console.log(merged); // [1, 2, 3, 4, 5, 6, 7]

// 扩展运算符内部实现原理（简化版）
function spread(iterable) {
  const result = [];
  for (const item of iterable) { // 使用迭代器
    result.push(item);
  }
  return result;
}
```

2. **字符串展开**
```javascript
const str = 'hello';
const chars = [...str]; // 使用字符串的迭代器
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// 对比 split
console.log(str.split('')); // ['h', 'e', 'l', 'l', 'o']

// 处理 Unicode 字符的优势
const emoji = '👨‍👩‍👧‍👦';
console.log([...emoji]); // ['👨', '‍', '👩', '‍', '👧', '‍', '👦']
console.log(emoji.split('')); // 可能会错误分割
```

3. **Set 和 Map 展开**
```javascript
// Set 展开
const set = new Set([1, 2, 3, 3, 4]);
const arrFromSet = [...set]; // 使用 Set 的迭代器
console.log(arrFromSet); // [1, 2, 3, 4]

// Map 展开
const map = new Map([['a', 1], ['b', 2]]);
const arrFromMap = [...map]; // 使用 Map 的迭代器
console.log(arrFromMap); // [['a', 1], ['b', 2]]

// 获取 Map 的键或值
const keys = [...map.keys()];
const values = [...map.values()];
console.log(keys); // ['a', 'b']
console.log(values); // [1, 2]
```

4. **函数参数展开**
```javascript
function sum(...args) { // rest 参数（收集）
  return args.reduce((a, b) => a + b, 0);
}

const numbers = [1, 2, 3, 4, 5];
console.log(sum(...numbers)); // spread（展开）: 15

// 相当于
console.log(sum(1, 2, 3, 4, 5)); // 15

// 代替 apply
const max = Math.max(...numbers); // 比 Math.max.apply(null, numbers) 更简洁
```

5. **自定义可迭代对象的展开**
```javascript
const range = {
  start: 1,
  end: 5,
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
};

// 扩展运算符可以展开任何可迭代对象
const rangeArray = [...range];
console.log(rangeArray); // [1, 2, 3, 4, 5]

// 生成器函数
function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibArray = [...fibonacci(7)];
console.log(fibArray); // [0, 1, 1, 2, 3, 5, 8]
```

6. **对象展开（不使用迭代器）**
```javascript
// 注意：对象展开不使用迭代器协议，而是使用自己的机制
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // 这不是迭代器操作
console.log(obj2); // { a: 1, b: 2, c: 3 }

// 对象不是可迭代的
// const arr = [...obj1]; // TypeError: obj1 is not iterable
```

7. **NodeList 和 HTMLCollection 转换**
```javascript
// DOM 操作中的应用
const nodeList = document.querySelectorAll('div');
const divArray = [...nodeList]; // NodeList 是可迭代的

// 老方法对比
const divArray2 = Array.prototype.slice.call(nodeList);
const divArray3 = Array.from(nodeList);
```

#### 性能考虑

```javascript
// 性能测试示例
const largeArray = Array(1000000).fill(1);

// 扩展运算符
console.time('spread');
const copy1 = [...largeArray];
console.timeEnd('spread');

// for...of
console.time('for...of');
const copy2 = [];
for (const item of largeArray) {
  copy2.push(item);
}
console.timeEnd('for...of');

// 注意：扩展运算符在大数据量时可能导致调用栈溢出
// const hugeArray = Array(10000000).fill(1);
// const copy = [...hugeArray]; // 可能报错：Maximum call stack size exceeded
```

#### 扩展运算符与迭代器的高级应用

```javascript
// 1. 限制展开数量
function* take(n, iterable) {
  let i = 0;
  for (const item of iterable) {
    if (i >= n) break;
    yield item;
    i++;
  }
}

const first5 = [...take(5, fibonacci(100))];
console.log(first5); // [0, 1, 1, 2, 3]

// 2. 链式操作
function* filter(predicate, iterable) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
  }
}

function* map(fn, iterable) {
  for (const item of iterable) {
    yield fn(item);
  }
}

const result = [...map(x => x * 2, filter(x => x % 2 === 0, range))];
console.log(result); // [4, 8]

// 3. 扁平化嵌套结构
function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}

const nested = [1, [2, [3, [4, 5]]], 6];
const flat = [...flatten(nested)];
console.log(flat); // [1, 2, 3, 4, 5, 6]
```

#### 常见错误和陷阱

```javascript
// 1. 尝试展开非可迭代对象
const num = 123;
// const arr = [...num]; // TypeError: num is not iterable

// 2. 展开 null 或 undefined
const nothing = null;
// const arr = [...nothing]; // TypeError: nothing is not iterable

// 3. 循环引用
const circular = [1, 2];
circular.push(circular);
// const copy = [...circular]; // 不会报错，但会包含循环引用

// 4. 大数据量展开
function* infiniteGenerator() {
  let i = 0;
  while (true) yield i++;
}
// const arr = [...infiniteGenerator()]; // 会导致内存溢出！

// 正确做法：限制数量
const limited = [...take(100, infiniteGenerator())];
```

#### 扩展运算符 vs Array.from vs for...of

```javascript
const set = new Set([1, 2, 3]);

// 扩展运算符 - 最简洁
const arr1 = [...set];

// Array.from - 可以传递映射函数
const arr2 = Array.from(set, x => x * 2); // [2, 4, 6]

// for...of - 最灵活，可以添加逻辑
const arr3 = [];
for (const item of set) {
  if (item > 1) {
    arr3.push(item);
  }
}
```

#### 总结要点
1. **扩展运算符内部使用迭代器协议**，通过调用 `Symbol.iterator` 方法工作
2. **只能用于可迭代对象**，不能用于普通对象（对象字面量的展开是特殊语法）
3. **性能优秀**但要注意大数据量可能导致栈溢出
4. **语法简洁**，是处理可迭代对象的首选方式
5. **与 for...of 原理相同**，都是基于迭代器协议

## 二、代码实现题

### 5. 手写一个简单的迭代器
```javascript
// 实现一个数字范围迭代器
function createRangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

// 使用示例
const iterator = createRangeIterator(1, 3);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 6. 实现一个可迭代对象
```javascript
// 方式一：使用 Symbol.iterator
const myIterable = {
  data: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// 方式二：使用生成器
const myIterable2 = {
  data: [1, 2, 3, 4, 5],
  *[Symbol.iterator]() {
    for (let item of this.data) {
      yield item;
    }
  }
};

// 使用 for...of 遍历
for (let value of myIterable) {
  console.log(value); // 1, 2, 3, 4, 5
}
```

### 7. 实现一个无限迭代器
```javascript
function createInfiniteIterator() {
  let value = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { value: value++, done: false };
    }
  };
}

const infinite = createInfiniteIterator();
for (let value of infinite) {
  if (value > 10) break;
  console.log(value); // 0, 1, 2, ..., 10
}
```

### 8. 实现链表的迭代器
```javascript
class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const node = { value, next: null };
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }

  [Symbol.iterator]() {
    let current = this.head;
    return {
      next() {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}

const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);

for (let value of list) {
  console.log(value); // 1, 2, 3
}
```

## 三、生成器相关题

### 9. 使用生成器实现迭代器
```javascript
function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci(5);
for (let value of fib) {
  console.log(value); // 0, 1, 1, 2, 3
}
```

### 10. 生成器委托（yield*）
```javascript
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield* generator1();
  yield 3;
  yield 4;
}

const gen = generator2();
console.log([...gen]); // [1, 2, 3, 4]
```

### 11. 使用生成器实现异步迭代
```javascript
async function* asyncGenerator() {
  const urls = ['url1', 'url2', 'url3'];
  for (const url of urls) {
    const data = await fetch(url);
    yield data;
  }
}

// 使用
(async () => {
  for await (const data of asyncGenerator()) {
    console.log(data);
  }
})();
```

## 四、内置可迭代对象

### 12. 哪些内置对象是可迭代的？
**答案：**
- String
- Array
- TypedArray
- Map
- Set
- NodeList
- Arguments
- Generator 对象

```javascript
// String 迭代
const str = "Hello";
for (let char of str) {
  console.log(char); // 'H', 'e', 'l', 'l', 'o'
}

// Map 迭代
const map = new Map([['a', 1], ['b', 2]]);
for (let [key, value] of map) {
  console.log(key, value);
}

// Set 迭代
const set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value);
}
```

### 13. 实现类数组对象的迭代
```javascript
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

for (let item of arrayLike) {
  console.log(item); // 'a', 'b', 'c'
}
```

## 五、高级应用题

### 14. 实现可以同时支持 for...of 和展开运算符的对象
```javascript
class CustomCollection {
  constructor(...items) {
    this.items = items;
  }

  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }

  // 支持反向迭代
  *reverse() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i];
    }
  }
}

const collection = new CustomCollection(1, 2, 3, 4, 5);
console.log([...collection]); // [1, 2, 3, 4, 5]
console.log([...collection.reverse()]); // [5, 4, 3, 2, 1]
```

### 15. 实现可中断和恢复的迭代器
```javascript
class PausableIterator {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    }
    return { done: true };
  }

  pause() {
    this.pausedIndex = this.index;
  }

  resume() {
    this.index = this.pausedIndex || this.index;
  }

  reset() {
    this.index = 0;
  }
}

const pausable = new PausableIterator([1, 2, 3, 4, 5]);
console.log(pausable.next()); // { value: 1, done: false }
console.log(pausable.next()); // { value: 2, done: false }
pausable.pause();
pausable.reset();
console.log(pausable.next()); // { value: 1, done: false }
```

### 16. 实现迭代器组合
```javascript
function* combineIterators(...iterators) {
  for (let iterator of iterators) {
    yield* iterator;
  }
}

const iter1 = [1, 2, 3];
const iter2 = new Set([4, 5, 6]);
const iter3 = 'abc';

const combined = combineIterators(iter1, iter2, iter3);
console.log([...combined]); // [1, 2, 3, 4, 5, 6, 'a', 'b', 'c']
```

## 六、性能和优化题

### 17. 迭代器的惰性求值
```javascript
class LazyRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      console.log(`生成值: ${i}`);
      yield i;
    }
  }

  *filter(predicate) {
    for (let value of this) {
      if (predicate(value)) {
        yield value;
      }
    }
  }

  *map(mapper) {
    for (let value of this) {
      yield mapper(value);
    }
  }
}

const range = new LazyRange(1, 5);
const result = range
  .filter(x => x % 2 === 0)
  .map(x => x * 2);

// 直到实际迭代时才会执行
for (let value of result) {
  console.log(value); // 4, 8
}
```

### 18. 实现带缓存的迭代器
```javascript
class CachedIterator {
  constructor(iterable) {
    this.iterable = iterable;
    this.cache = [];
    this.iterator = null;
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.cache.length) {
          return { value: this.cache[index++], done: false };
        }

        if (!this.iterator) {
          this.iterator = this.iterable[Symbol.iterator]();
        }

        const result = this.iterator.next();
        if (!result.done) {
          this.cache.push(result.value);
          index++;
        }
        return result;
      }
    };
  }
}

// 使用示例
function* expensiveGenerator() {
  for (let i = 0; i < 3; i++) {
    console.log(`Computing ${i}`);
    yield i * i;
  }
}

const cached = new CachedIterator(expensiveGenerator());
console.log([...cached]); // Computing 0, Computing 1, Computing 2, [0, 1, 4]
console.log([...cached]); // 直接从缓存返回 [0, 1, 4]
```

## 七、错误处理和边界情况

### 19. 迭代器的 return 和 throw 方法
```javascript
function* generatorWithCleanup() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log('Cleanup');
  }
}

const gen = generatorWithCleanup();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.return('early exit')); // Cleanup, { value: 'early exit', done: true }
console.log(gen.next()); // { value: undefined, done: true }

// throw 方法
function* generatorWithErrorHandling() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    console.log('Caught:', e);
  }
}

const gen2 = generatorWithErrorHandling();
console.log(gen2.next()); // { value: 1, done: false }
console.log(gen2.throw('error')); // Caught: error, { value: undefined, done: true }
```

### 20. 防止迭代器被多次迭代
```javascript
class OneTimeIterator {
  constructor(data) {
    this.data = data;
    this.used = false;
  }

  [Symbol.iterator]() {
    if (this.used) {
      throw new Error('Iterator already consumed');
    }
    this.used = true;

    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
}

const once = new OneTimeIterator([1, 2, 3]);
console.log([...once]); // [1, 2, 3]
// console.log([...once]); // Error: Iterator already consumed
```

## 八、实际应用场景题

### 21. 实现分页数据的迭代器
```javascript
class PaginatedIterator {
  constructor(fetchPage, pageSize = 10) {
    this.fetchPage = fetchPage;
    this.pageSize = pageSize;
  }

  async *[Symbol.asyncIterator]() {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await this.fetchPage(page, this.pageSize);
      if (data.length === 0) {
        hasMore = false;
      } else {
        for (let item of data) {
          yield item;
        }
        if (data.length < this.pageSize) {
          hasMore = false;
        }
        page++;
      }
    }
  }
}

// 使用示例
async function fetchPage(page, pageSize) {
  // 模拟 API 调用
  const totalItems = 25;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalItems);
  return Array.from({ length: end - start }, (_, i) => start + i + 1);
}

(async () => {
  const paginated = new PaginatedIterator(fetchPage, 10);
  for await (let item of paginated) {
    console.log(item); // 1, 2, ..., 25
  }
})();
```

### 22. 实现树结构的深度优先和广度优先迭代
```javascript
class TreeNode {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }

  // 深度优先迭代
  *dfs() {
    yield this.value;
    for (let child of this.children) {
      yield* child.dfs();
    }
  }

  // 广度优先迭代
  *bfs() {
    const queue = [this];
    while (queue.length > 0) {
      const node = queue.shift();
      yield node.value;
      queue.push(...node.children);
    }
  }
}

// 构建树
const tree = new TreeNode(1, [
  new TreeNode(2, [
    new TreeNode(4),
    new TreeNode(5)
  ]),
  new TreeNode(3, [
    new TreeNode(6),
    new TreeNode(7)
  ])
]);

console.log([...tree.dfs()]); // [1, 2, 4, 5, 3, 6, 7]
console.log([...tree.bfs()]); // [1, 2, 3, 4, 5, 6, 7]
```

### 23. 实现可以 take、skip、filter 的迭代器工具链
```javascript
class IteratorChain {
  constructor(iterable) {
    this.iterable = iterable;
  }

  *[Symbol.iterator]() {
    yield* this.iterable;
  }

  take(n) {
    const iterable = this.iterable;
    return new IteratorChain(function* () {
      let count = 0;
      for (let item of iterable) {
        if (count >= n) break;
        yield item;
        count++;
      }
    }());
  }

  skip(n) {
    const iterable = this.iterable;
    return new IteratorChain(function* () {
      let count = 0;
      for (let item of iterable) {
        if (count >= n) {
          yield item;
        }
        count++;
      }
    }());
  }

  filter(predicate) {
    const iterable = this.iterable;
    return new IteratorChain(function* () {
      for (let item of iterable) {
        if (predicate(item)) {
          yield item;
        }
      }
    }());
  }

  map(mapper) {
    const iterable = this.iterable;
    return new IteratorChain(function* () {
      for (let item of iterable) {
        yield mapper(item);
      }
    }());
  }

  toArray() {
    return [...this];
  }
}

// 使用示例
const chain = new IteratorChain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const result = chain
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
  .skip(1)
  .take(2)
  .toArray();

console.log(result); // [8, 12]
```

## 九、与其他特性结合

### 24. Iterator 与 Promise 结合
```javascript
async function* asyncIteratorFromPromises(promises) {
  for (let promise of promises) {
    yield await promise;
  }
}

// 批量处理 Promise
async function batchProcess(promises, batchSize = 3) {
  const iterator = promises[Symbol.iterator]();
  const results = [];

  while (true) {
    const batch = [];
    for (let i = 0; i < batchSize; i++) {
      const { value, done } = iterator.next();
      if (done) break;
      batch.push(value);
    }

    if (batch.length === 0) break;

    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }

  return results;
}
```

### 25. 使用 Proxy 增强迭代器
```javascript
function createEnhancedIterator(iterable) {
  const iterator = iterable[Symbol.iterator]();
  let count = 0;

  return new Proxy(iterator, {
    get(target, prop) {
      if (prop === 'next') {
        return function() {
          const result = target.next();
          if (!result.done) {
            count++;
            console.log(`Iteration ${count}: ${result.value}`);
          }
          return result;
        };
      }
      if (prop === 'count') {
        return count;
      }
      return target[prop];
    }
  });
}

const enhanced = createEnhancedIterator([1, 2, 3]);
enhanced.next(); // Iteration 1: 1
enhanced.next(); // Iteration 2: 2
console.log(enhanced.count); // 2
```

## 十、面试常见陷阱题

### 26. 迭代器的状态共享问题
```javascript
// 错误示例：多个迭代共享状态
const buggyIterable = {
  index: 0,
  data: [1, 2, 3],
  [Symbol.iterator]() {
    return this;
  },
  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    }
    return { done: true };
  }
};

// 问题：第二次迭代会失败
console.log([...buggyIterable]); // [1, 2, 3]
console.log([...buggyIterable]); // []

// 正确示例：每次创建新的迭代器
const correctIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

console.log([...correctIterable]); // [1, 2, 3]
console.log([...correctIterable]); // [1, 2, 3]
```

### 27. 生成器函数 vs 普通函数返回迭代器
```javascript
// 生成器函数方式
function* generatorWay() {
  yield 1;
  yield 2;
  yield 3;
}

// 普通函数返回迭代器
function iteratorWay() {
  let value = 1;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      if (value <= 3) {
        return { value: value++, done: false };
      }
      return { done: true };
    }
  };
}

// 两种方式的区别
const gen = generatorWay();
const iter = iteratorWay();

console.log(typeof gen.return); // 'function' - 生成器有 return 方法
console.log(typeof iter.return); // 'undefined' - 普通迭代器没有

console.log(typeof gen.throw); // 'function' - 生成器有 throw 方法
console.log(typeof iter.throw); // 'undefined' - 普通迭代器没有
```

## 九、核心速记（10分钟快速复习）

### 1. 迭代器基础
```
定义：提供统一访问数据的接口
协议：迭代器协议（next方法）+ 可迭代协议（Symbol.iterator）
返回值：{value: 值, done: 布尔值}
```

### 2. 迭代器 vs 可迭代对象
```
可迭代对象：实现Symbol.iterator方法、返回迭代器
迭代器对象：实现next方法、返回{value, done}
关系：可迭代对象[Symbol.iterator]() → 迭代器对象
```

### 3. for...of vs for...in
```
for...in：遍历键名、包括原型链、任何对象
for...of：遍历值、不包括原型链、只可迭代对象
推荐：数组用for...of、对象属性用for...in
```

### 4. 生成器（Generator）
```
定义：function*声明、yield暂停、next恢复
优势：简化迭代器实现、自动实现迭代器协议
方法：next()、return()、throw()
委托：yield* 委托给另一个生成器
```

### 5. 内置可迭代对象
```
七大内置：String、Array、TypedArray、Map、Set、NodeList、Arguments
都实现了Symbol.iterator方法、可以用for...of遍历
```

### 6. 扩展运算符
```
原理：内部使用Symbol.iterator方法
用途：数组展开、函数参数、Set/Map转数组
限制：只能用于可迭代对象、对象展开不使用迭代器
```

### 7. 高级特性
```
惰性求值：按需计算、节省内存
迭代器工具链：take、skip、filter、map
异步迭代：async function*、for await...of
错误处理：return()清理资源、throw()传递错误
```

### 8. 常见陷阱
```
状态共享：每次迭代应创建新迭代器、不要返回this
多次迭代：需要重新创建迭代器
无限迭代：记得设置退出条件、避免内存溢出
```

---

## 十、TOP 15 高频面试题速答

### Q1: 什么是迭代器？⭐⭐⭐⭐⭐ 🔥
迭代器是一个对象，实现next()方法，返回{value, done}，提供统一的数据访问接口。

### Q2: 什么是可迭代对象？⭐⭐⭐⭐⭐ 🔥
实现Symbol.iterator方法的对象，该方法返回迭代器对象，可以用for...of遍历。

### Q3: 迭代器协议和可迭代协议的区别？⭐⭐⭐⭐⭐ 🔥
迭代器协议：实现next()方法；可迭代协议：实现Symbol.iterator方法。

### Q4: for...in和for...of的区别？⭐⭐⭐⭐⭐ 🔥
for...in遍历键名、包括原型链；for...of遍历值、只用于可迭代对象。

### Q5: 如何手写一个迭代器？⭐⭐⭐⭐⭐ 🔥
实现next()方法，返回{value, done}对象，done为true时表示迭代结束。

### Q6: 什么是生成器函数？⭐⭐⭐⭐⭐ 🔥
function*声明的函数，使用yield暂停执行，返回生成器对象（既是迭代器又是可迭代对象）。

### Q7: yield和yield*的区别？⭐⭐⭐⭐
yield返回单个值；yield*委托给另一个可迭代对象，展开其所有值。

### Q8: 哪些内置对象是可迭代的？⭐⭐⭐⭐
String、Array、TypedArray、Map、Set、NodeList、Arguments、Generator对象。

### Q9: 扩展运算符与迭代器的关系？⭐⭐⭐⭐
扩展运算符内部调用Symbol.iterator方法，只能用于可迭代对象。

### Q10: 如何实现可迭代对象？⭐⭐⭐⭐⭐
实现Symbol.iterator方法，返回一个包含next()方法的迭代器对象。

### Q11: 什么是惰性求值？⭐⭐⭐⭐
迭代器按需计算值，不会一次性生成所有值，节省内存。

### Q12: 生成器的return()和throw()方法？⭐⭐⭐
return()提前结束迭代、清理资源；throw()向生成器内部抛出错误。

### Q13: 如何避免迭代器状态共享？⭐⭐⭐⭐
Symbol.iterator方法应该返回新的迭代器对象，不要返回this。

### Q14: 异步迭代器如何使用？⭐⭐⭐⭐
async function*声明异步生成器，使用for await...of遍历。

### Q15: 迭代器的实际应用场景？⭐⭐⭐⭐
分页数据加载、树结构遍历、大文件流式处理、自定义数据结构。

---

## 十一、答题技巧与模板

### 模板1: 概念解释类
```
1. 简洁定义：迭代器/可迭代对象是什么
2. 实现要求：需要实现哪些方法
3. 返回值：方法返回什么
4. 用途：可以用来做什么
```

### 模板2: 代码实现类
```
1. 说明思路：使用什么方式实现
2. 核心代码：写出关键实现
3. 使用示例：展示如何使用
4. 注意事项：避免常见陷阱
```

### 模板3: 对比类问题
```
1. 列举对比维度（表格形式）
2. 说明各自适用场景
3. 给出推荐使用建议
4. 记忆口诀总结
```

### 模板4: 高级应用类
```
1. 分析应用场景
2. 说明实现思路
3. 提供完整代码
4. 强调优势和注意事项
```

---

## 面试技巧和注意事项

### 必须掌握（⭐⭐⭐⭐⭐）
1. **理解核心概念**：掌握迭代器协议、可迭代协议的区别
2. **手写迭代器**：能够手写简单的迭代器和可迭代对象
3. **生成器语法**：掌握function*、yield、yield*的使用
4. **for...of原理**：理解for...of内部如何调用迭代器

### 重要理解（⭐⭐⭐⭐）
5. **内置可迭代对象**：了解哪些内置对象实现了迭代协议
6. **扩展运算符**：理解扩展运算符与迭代器的关系
7. **状态管理**：避免迭代器状态共享导致的问题
8. **实际应用**：迭代器在处理大数据、流式数据时的优势

### 加分项（⭐⭐⭐）
9. **性能优化**：迭代器的惰性求值特性对性能的影响
10. **异步迭代**：掌握async function*与for await...of
11. **错误处理**：了解return()和throw()方法的使用场景
12. **高级应用**：迭代器工具链、树遍历、分页加载等

---

## 📖 学习资源

### 推荐阅读顺序
1. **基础概念**（第一章）→ 理解迭代器和可迭代协议
2. **代码实现**（第二章）→ 动手实践加深理解
3. **生成器**（第三章）→ 掌握简化写法
4. **内置对象**（第四章）→ 了解实际使用
5. **高级应用**（第五-八章）→ 扩展知识面

### 练习建议
- 每天手写一个迭代器实现
- 尝试用生成器重写已有的迭代器
- 阅读Array、Map、Set的迭代器实现源码
- 在实际项目中使用迭代器处理数据

---

**最后更新**: 2025-09-30
**难度等级**: ⭐⭐⭐⭐（中高级）
**面试频率**: 中高（约50%的中高级面试会涉及）