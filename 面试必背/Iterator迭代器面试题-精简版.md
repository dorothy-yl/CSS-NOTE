# Iterator迭代器面试题-精简版 ⭐⭐⭐⭐

> 💡 **记忆口诀**: Symbol迭代器、next方法返回、value和done

---

## 📋 快速导航

| 主题 | 核心内容 | 记忆口诀 |
|------|---------|---------|
| 迭代器协议 | next()方法、{value, done} | next返回值和状态 |
| 可迭代协议 | Symbol.iterator | Symbol返回迭代器 |
| for...of vs for...in | 遍历值 vs 遍历键 | of值in键、of可迭代in任意 |
| 生成器 | function*、yield | yield暂停、next恢复 |

---

## 一、核心概念

### 1. 迭代器协议 vs 可迭代协议 ⭐⭐⭐⭐⭐

**对比表格：**
| 协议 | 实现要求 | 返回值 | 作用 |
|------|----------|--------|------|
| **迭代器协议** | 实现 next() 方法 | {value, done} | 执行迭代 |
| **可迭代协议** | 实现 Symbol.iterator 方法 | 迭代器对象 | 定义可迭代能力 |

**记忆口诀：**
```
可迭代定义能力、迭代器执行迭代
可迭代返回迭代器、迭代器返回值和状态
```

**示例：**
```javascript
// 可迭代对象
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {  // 可迭代协议：返回迭代器
    let index = 0;
    const data = this.data;
    return {
      next() {  // 迭代器协议：返回 {value, done}
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// 使用
for (let value of myIterable) {
  console.log(value); // 1, 2, 3
}
```

---

### 2. for...in vs for...of ⭐⭐⭐⭐⭐

**核心区别：**
1. **for...in**：遍历**键名**（包括原型链）、适用于任何对象
2. **for...of**：遍历**值**（不包括原型链）、只适用于可迭代对象

**代码示例：**
```javascript
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

// 对象
const obj = { a: 1, b: 2 };
for (let key in obj) console.log(key);  // 'a', 'b' ✅
// for (let value of obj) {}  // ❌ TypeError: obj is not iterable
```

**记忆口诀：**
```
for...in遍历键名、for...of遍历值
for...in包括原型链、for...of不包括
for...in任何对象、for...of只可迭代对象
```

---

### 3. 扩展运算符（...）与迭代器

**核心原理：** 扩展运算符内部调用 `Symbol.iterator` 方法

**使用示例：**
```javascript
// 1. 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1, 2, 3]

// 2. 字符串展开
const chars = [...'hello']; // ['h', 'e', 'l', 'l', 'o']

// 3. Set/Map 转数组
const set = new Set([1, 2, 3]);
const arrFromSet = [...set]; // [1, 2, 3]

const map = new Map([['a', 1], ['b', 2]]);
const arrFromMap = [...map]; // [['a', 1], ['b', 2]]

// 4. 自定义可迭代对象
const range = {
  start: 1,
  end: 5,
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
};
console.log([...range]); // [1, 2, 3, 4, 5]

// ⚠️ 注意：对象展开不使用迭代器
const obj = { a: 1, b: 2 };
const obj2 = { ...obj }; // ✅ 可以，但不是迭代器操作
// const arr = [...obj]; // ❌ TypeError: obj is not iterable
```

---

## 二、手写实现

### 4. 手写简单迭代器
```javascript
// 数字范围迭代器
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

// 使用
const iterator = createRangeIterator(1, 3);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 5. 手写可迭代对象
```javascript
// 方式一：手动实现
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

// 方式二：使用生成器（推荐）
const myIterable2 = {
  data: [1, 2, 3, 4, 5],
  *[Symbol.iterator]() {
    for (let item of this.data) {
      yield item;
    }
  }
};

// 使用
for (let value of myIterable) {
  console.log(value); // 1, 2, 3, 4, 5
}
```

---

## 三、生成器（Generator）⭐⭐⭐⭐⭐

### 6. 生成器基础
```javascript
// 定义：function* + yield
function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// 使用
const fib = fibonacci(5);
console.log(fib.next()); // { value: 0, done: false }
console.log(fib.next()); // { value: 1, done: false }
console.log([...fibonacci(7)]); // [0, 1, 1, 2, 3, 5, 8]
```

### 7. yield* 委托
```javascript
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield* generator1(); // 委托给 generator1
  yield 3;
  yield 4;
}

console.log([...generator2()]); // [1, 2, 3, 4]
```

### 8. 生成器方法
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
console.log(gen.next());  // { value: 1, done: false }
console.log(gen.return('early exit')); // Cleanup, { value: 'early exit', done: true }

// throw 方法
function* generatorWithError() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    console.log('Caught:', e);
  }
}

const gen2 = generatorWithError();
console.log(gen2.next());  // { value: 1, done: false }
console.log(gen2.throw('error')); // Caught: error
```

---

## 四、内置可迭代对象

### 9. 七大内置可迭代对象
```javascript
// 1. String
for (let char of 'hello') {
  console.log(char); // 'h', 'e', 'l', 'l', 'o'
}

// 2. Array
for (let value of [1, 2, 3]) {
  console.log(value);
}

// 3. Map
const map = new Map([['a', 1], ['b', 2]]);
for (let [key, value] of map) {
  console.log(key, value);
}

// 4. Set
const set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value);
}

// 5. TypedArray
// 6. NodeList
// 7. Arguments
```

### 10. 类数组转可迭代
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

---

## 五、高级应用

### 11. 迭代器工具链
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

  filter(predicate) {
    const iterable = this.iterable;
    return new IteratorChain(function* () {
      for (let item of iterable) {
        if (predicate(item)) yield item;
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

// 使用
const result = new IteratorChain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
  .take(3)
  .toArray();

console.log(result); // [4, 8, 12]
```

### 12. 惰性求值
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
      if (predicate(value)) yield value;
    }
  }
}

const range = new LazyRange(1, 1000000);
const result = range.filter(x => x % 2 === 0);

// 只计算需要的值，不会生成全部 100万个数字
for (let value of result) {
  if (value > 10) break;
  console.log(value); // 2, 4, 6, 8, 10
}
```

### 13. 树遍历
```javascript
class TreeNode {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }

  // 深度优先
  *dfs() {
    yield this.value;
    for (let child of this.children) {
      yield* child.dfs();
    }
  }

  // 广度优先
  *bfs() {
    const queue = [this];
    while (queue.length > 0) {
      const node = queue.shift();
      yield node.value;
      queue.push(...node.children);
    }
  }
}

const tree = new TreeNode(1, [
  new TreeNode(2, [new TreeNode(4), new TreeNode(5)]),
  new TreeNode(3, [new TreeNode(6), new TreeNode(7)])
]);

console.log([...tree.dfs()]); // [1, 2, 4, 5, 3, 6, 7]
console.log([...tree.bfs()]); // [1, 2, 3, 4, 5, 6, 7]
```

### 14. 异步迭代器
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

// 分页数据加载
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
```

---

## 六、常见陷阱

### 15. 状态共享问题 ⚠️
```javascript
// ❌ 错误：多个迭代共享状态
const buggyIterable = {
  index: 0,
  data: [1, 2, 3],
  [Symbol.iterator]() {
    return this; // 返回 this 导致状态共享
  },
  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    }
    return { done: true };
  }
};

console.log([...buggyIterable]); // [1, 2, 3]
console.log([...buggyIterable]); // [] ❌ 第二次失败

// ✅ 正确：每次创建新迭代器
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
console.log([...correctIterable]); // [1, 2, 3] ✅ 正常
```

### 16. 无限迭代器
```javascript
function* infiniteGenerator() {
  let i = 0;
  while (true) yield i++;
}

// ❌ 会导致内存溢出
// const arr = [...infiniteGenerator()];

// ✅ 正确：限制数量
function* take(n, iterable) {
  let i = 0;
  for (const item of iterable) {
    if (i >= n) break;
    yield item;
    i++;
  }
}

const limited = [...take(10, infiniteGenerator())];
console.log(limited); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## 七、核心速记

### 迭代器基础
```
定义：提供统一访问数据的接口
协议：迭代器协议（next方法）+ 可迭代协议（Symbol.iterator）
返回值：{value: 值, done: 布尔值}
```

### for...of vs for...in
```
for...in：遍历键名、包括原型链、任何对象
for...of：遍历值、不包括原型链、只可迭代对象
推荐：数组用for...of、对象属性用for...in
```

### 生成器
```
定义：function*声明、yield暂停、next恢复
优势：简化迭代器实现、自动实现迭代器协议
方法：next()、return()、throw()
委托：yield* 委托给另一个生成器
```

### 七大内置可迭代对象
```
String、Array、TypedArray、Map、Set、NodeList、Arguments
都实现了Symbol.iterator方法、可以用for...of遍历
```

### 扩展运算符
```
原理：内部使用Symbol.iterator方法
用途：数组展开、函数参数、Set/Map转数组
限制：只能用于可迭代对象、对象展开不使用迭代器
```

### 常见陷阱
```
状态共享：每次迭代应创建新迭代器、不要返回this
多次迭代：需要重新创建迭代器
无限迭代：记得设置退出条件、避免内存溢出
```

---

## 八、TOP 10 高频面试题速答

### Q1: 什么是迭代器？⭐⭐⭐⭐⭐
迭代器是一个对象，实现 next() 方法，返回 {value, done}，提供统一的数据访问接口。

### Q2: 迭代器协议和可迭代协议的区别？⭐⭐⭐⭐⭐
- 迭代器协议：实现 next() 方法，返回 {value, done}
- 可迭代协议：实现 Symbol.iterator 方法，返回迭代器对象

### Q3: for...in 和 for...of 的区别？⭐⭐⭐⭐⭐
- for...in：遍历键名、包括原型链、适用任何对象
- for...of：遍历值、不包括原型链、只适用可迭代对象

### Q4: 如何手写一个迭代器？⭐⭐⭐⭐⭐
实现 next() 方法，返回 {value, done} 对象，done 为 true 时表示迭代结束。

### Q5: 什么是生成器函数？⭐⭐⭐⭐⭐
function* 声明的函数，使用 yield 暂停执行，返回生成器对象（既是迭代器又是可迭代对象）。

### Q6: yield 和 yield* 的区别？⭐⭐⭐⭐
- yield：返回单个值
- yield*：委托给另一个可迭代对象，展开其所有值

### Q7: 哪些内置对象是可迭代的？⭐⭐⭐⭐
String、Array、TypedArray、Map、Set、NodeList、Arguments、Generator 对象。

### Q8: 扩展运算符与迭代器的关系？⭐⭐⭐⭐
扩展运算符内部调用 Symbol.iterator 方法，只能用于可迭代对象。

### Q9: 如何避免迭代器状态共享？⭐⭐⭐⭐
Symbol.iterator 方法应该返回新的迭代器对象，不要返回 this。

### Q10: 什么是惰性求值？⭐⭐⭐⭐
迭代器按需计算值，不会一次性生成所有值，节省内存。

---

## 九、面试必背要点

### 必须掌握（⭐⭐⭐⭐⭐）
1. ✅ 理解迭代器协议、可迭代协议的区别
2. ✅ 手写简单的迭代器和可迭代对象
3. ✅ 掌握生成器语法（function*、yield、yield*）
4. ✅ 理解 for...of 与 for...in 的区别

### 重要理解（⭐⭐⭐⭐）
5. ✅ 了解七大内置可迭代对象
6. ✅ 理解扩展运算符与迭代器的关系
7. ✅ 避免迭代器状态共享问题
8. ✅ 掌握迭代器的实际应用场景

### 加分项（⭐⭐⭐）
9. ✅ 理解惰性求值的优势
10. ✅ 掌握异步迭代器（async function*、for await...of）
11. ✅ 了解生成器的 return() 和 throw() 方法
12. ✅ 能实现迭代器工具链、树遍历等高级应用
