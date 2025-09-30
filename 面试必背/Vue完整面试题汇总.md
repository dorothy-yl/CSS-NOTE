# Vue 完整面试题汇总（含 Vue3 最新特性）

## 📋 快速导航 - 重要级别标注

| 序号 | 知识点 | 重要级别 | 记忆口诀 | 分类 |
|------|--------|----------|----------|------|
| 1 | Vue 响应式原理 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | **依赖收集触发更新** | 核心原理 |
| 2 | 发布订阅与观察者模式 | ⭐⭐⭐⭐ | **观察者直接通知，发布订阅解耦** | 设计模式 |
| 3 | Virtual DOM 原理 | ⭐⭐⭐⭐⭐ 🔥 | **JS对象描述DOM** | 核心原理 |
| 5 | Diff 算法 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | **同层比较、双端对比、最长递增** | 核心原理 |
| 6 | Vue3 新特性 | ⭐⭐⭐⭐⭐ 🔥 | **性能更快、体积更小、TS支持** | Vue3 |
| 8 | ref vs reactive | ⭐⭐⭐⭐ 🔥 | **ref需value，reactive不需** | Vue3 |
| 10 | watch vs watchEffect | ⭐⭐⭐⭐ 🔥 | **watch指定源、watchEffect自动追踪** | Vue3 |
| 11 | Vue3 生命周期 | ⭐⭐⭐⭐⭐ ⚠️ | **创建挂载更新销毁** | 生命周期 |
| 16 | 路由传参 | ⭐⭐⭐⭐ 🔥 | **query显示params隐藏** | 路由 |
| 19 | 组件通信 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | **父子props、兄弟bus、跨级provide** | 组件通信 |
| 22 | 性能优化 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | **懒加载、缓存、虚拟列表** | 性能优化 |
| 23 | keep-alive | ⭐⭐⭐⭐ | **缓存组件不销毁** | 性能优化 |
| 32 | nextTick 原理 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | **微任务异步更新DOM** | 核心原理 |
| 35 | Vue2 vs Vue3 对比 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | **Proxy替Object、组合替选项** | 对比 |

**图例说明：**
- ⭐⭐⭐⭐⭐ 🔥 ⚠️ = 核心必背（面试必问）
- ⭐⭐⭐⭐ 🔥 = 高频考点
- ⭐⭐⭐⭐ = 重要知识
- ⭐⭐⭐ = 基础知识

---

## 🔥 核心对比表格速查

### Vue2 vs Vue3 核心差异对比

| 特性 | Vue2 | Vue3 | 记忆口诀 |
|------|------|------|----------|
| **响应式原理** | Object.defineProperty | Proxy + Reflect | **Proxy替Object** |
| **API 风格** | Options API | Composition API | **组合替选项** |
| **生命周期** | destroyed | unmounted | **销毁改卸载** |
| **TypeScript** | 部分支持 | 完全支持 | **类型更友好** |
| **性能** | 基准 | 快1.3-2倍 | **更快更小** |
| **包体积** | 23KB | 13.5KB | **体积减半** |
| **Diff 算法** | 双端比较 | 最长递增子序列 | **算法更优** |
| **多根节点** | 不支持 | 支持Fragment | **无需包裹** |

### computed vs watch 对比

| 特性 | computed | watch | 记忆口诀 |
|------|----------|-------|----------|
| **缓存** | 有缓存，依赖不变不重算 | 无缓存，每次都执行 | **计算缓存** |
| **依赖追踪** | 自动追踪依赖 | 需明确指定监听源 | **computed自动** |
| **返回值** | 必须有返回值 | 无返回值 | **computed必返** |
| **异步** | 不支持异步 | 支持异步操作 | **watch可异步** |
| **使用场景** | 派生数据、多对一 | 副作用、一对多 | **计算派生侦听副作用** |
| **执行时机** | 惰性求值 | 可立即执行(immediate) | **侦听可立即** |

### v-if vs v-show 对比

| 特性 | v-if | v-show | 记忆口诀 |
|------|------|--------|----------|
| **DOM 操作** | 销毁/重建 | 切换 display | **if销毁show隐藏** |
| **编译** | 条件渲染 | 始终渲染 | **if条件渲染** |
| **初始成本** | 低(条件为false不渲染) | 高(始终渲染) | **if初始低** |
| **切换成本** | 高(销毁重建) | 低(CSS切换) | **show切换低** |
| **使用场景** | 条件很少改变 | 频繁切换 | **少变if频繁show** |
| **生命周期** | 触发生命周期 | 不触发 | **if触发周期** |

### props vs data vs computed 对比

| 特性 | props | data | computed | 记忆口诀 |
|------|-------|------|----------|----------|
| **数据来源** | 父组件传入 | 组件内部定义 | 依赖其他响应式数据 | **props外data内computed算** |
| **可修改性** | 单向数据流，不可修改 | 可直接修改 | 只读(除非定义setter) | **props只读** |
| **响应式** | 响应式 | 响应式 | 响应式+缓存 | **computed有缓存** |
| **使用场景** | 父子通信 | 组件状态 | 派生状态 | **props传data存computed算** |

### ref vs reactive 对比

| 特性 | ref | reactive | 记忆口诀 |
|------|-----|----------|----------|
| **数据类型** | 基本类型 + 对象 | 仅对象类型 | **ref全reactive对象** |
| **访问方式** | 需要 .value | 直接访问 | **ref需value** |
| **重新赋值** | 可整体替换 | 不可整体替换 | **ref可替** |
| **解构** | 可直接解构(丢失响应式) | 需 toRefs 解构 | **解构需toRefs** |
| **使用场景** | 简单值、需重新赋值 | 复杂对象、表单数据 | **简单ref复杂reactive** |

### query vs params 路由传参对比

| 特性 | query | params | 记忆口诀 |
|------|-------|--------|----------|
| **URL 显示** | 显示 ?id=123 | 隐藏在路径 /user/123 | **query显params隐** |
| **路由配置** | 不需要配置 | 需配置动态路由 :id | **params需配置** |
| **传递方式** | path 或 name | 仅 name | **params只用name** |
| **刷新保留** | 保留 | 保留(动态路由) | **都能保留** |
| **使用场景** | 可选参数、搜索条件 | 必要参数、RESTful | **query可选params必要** |

---

## 第一部分：Vue 基础原理

### 1. Vue 响应式原理 ⭐⭐⭐⭐⭐ 🔥 ⚠️

**💡 记忆口诀：依赖收集触发更新**

**Vue 2.x 响应式原理：**

- 使用 `Object.defineProperty()` 在页面刚开始加载的时候，Vue 会遍历 data 中的所有属性，使用 `Object.defineProperty()` 转化为 getter 和 setter，当用户访问或设置某个属性时会触发对应的 getter 和 setter，随后通知每个组件实例对应的一个 watcher 方法，最后实现视图的更新

**Vue2 的缺陷：**
1. 对于复杂对象需要深度监听，需要一次性监听到底，计算量大，性能不好
2. 对象的新增删除属性无法监听，需要使用 `Vue.$set` 和 `Vue.$delete` 来辅助
3. 需要重写数组方法来实现数组的监听

**Vue 3.x 响应式原理：**
- 使用 `Proxy` 代替了 Object.defineProperty()，使用 `Reflect` 配合操作。当我们读写数据、新增属性时，都会经过 Proxy 的拦截器。在拦截器里，Vue3 会做依赖收集和触发更新，这样就能实现数据变化时自动更新视图了。

**Vue3 的优势：**
1. 可以直接监听整个对象，而不需要遍历监听属性，性能会有所提升
2. Proxy 可以直接监听数组的变化，而不需要去重写数组原生的方法，便利性会增加很多
3. Proxy 有多达 13 种拦截方法，功能更加强大
4. Proxy 作为一个新标准，会受到浏览器厂商的重点持续的性能优化

**🎯 面试要点：**
- Vue2 使用 Object.defineProperty，Vue3 使用 Proxy
- Proxy 可以监听动态新增的属性和数组变化
- 性能更好，不需要递归遍历所有属性

---

### 2. 发布订阅模式和观察者模式 ⭐⭐⭐⭐

**💡 记忆口诀：观察者直接通知，发布订阅解耦**

**观察者模式：**
- 观察者直接依赖主题，主题状态变化时通知观察者
- 耦合度较高
- **Vue中的应用：响应式系统核心**
  - Dep（Dependency依赖管理器）作为 Subject（被观察的主题/目标）
    - **Subject理解**：被多个观察者关注的数据源，状态改变时需要通知观察者
    - 每个响应式属性都有一个 Dep 实例（每个数据都是一个被观察的主题）
    - **收集的是"谁依赖这个数据"**（即收集使用该数据的 Watcher）
    - 当数据被读取时（getter触发），将当前活跃的 Watcher 添加到 Dep 中
  - Watcher（观察者）被添加到 Dep 的依赖列表中
    - **渲染Watcher**：组件渲染时创建，负责更新视图
    - **计算属性Watcher**：computed 属性创建，负责缓存计算结果
    - **侦听器Watcher**：watch 选项创建，负责执行回调
  - 数据变化时（setter触发），Dep 通知所有收集到的 Watcher 更新

**发布订阅模式：**
- 发布者和订阅者通过事件中心进行通信
- 解耦程度更高
- **Vue中的应用：事件系统**
  - $on/$emit/$off 等事件API
  - EventBus 事件总线
  - 组件通信时的自定义事件

**Dep 依赖收集的通俗理解：**
- **Dep = 数据的"联系人名单"**
  - 每个响应式数据都有一个 Dep，记录"谁在用我"
  - 比如 data.message 被3个地方使用（模板、computed、watch），Dep 就收集这3个 Watcher
- **收集时机**：数据被读取时（getter）
- **通知时机**：数据被修改时（setter）

**在 Vue 中的具体体现：**

1. **Vue2 响应式系统（观察者模式）：**
```javascript
// Vue2 中的实现简化示例

// Dep = Subject（被观察的主题）
// 举例：data 中的 message 属性就是一个 Subject，多个地方使用它
class Dep {  // 依赖管理器 - "Dependency"的缩写
  constructor() {
    this.subs = []  // 存储所有观察这个数据的 Watcher（观察者列表）
  }

  addSub(watcher) {  // 添加观察者
    this.subs.push(watcher)
  }

  notify() {  // 数据变化时，通知所有观察者
    this.subs.forEach(watcher => watcher.update())
  }
}

// Watcher = Observer（观察者）
// 举例：模板中的 {{ message }} 会创建一个 Watcher 来观察 message 的变化
class Watcher {  // 观察者
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key  // 要观察的数据 key，如 "message"
    this.cb = cb     // 数据变化时的回调（如更新视图）

    // 初始化时触发依赖收集
    Dep.target = this  // 将自己设为当前活跃的 Watcher
    this.vm[this.key]  // 读取数据，触发 getter，此时 Dep 会收集这个 Watcher
    Dep.target = null  // 清空
  }

  update() {  // 被 Dep 通知更新时执行
    this.cb.call(this.vm, this.vm[this.key])
  }
}
```

2. **事件系统（发布订阅模式）- Vue2/Vue3 通用：**

```javascript
// Vue2/Vue3 都支持的事件系统简化示例
class EventBus {
  // 事件中心
  constructor() {
    this.events = {}; // 事件中心
  }

  $on(event, callback) {
    // 订阅
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  $emit(event, ...args) {
    // 发布
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(...args));
    }
  }

  $off(event, callback) {
    // 取消订阅
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

// 使用示例
const bus = new EventBus();
bus.$on("update", (data) => console.log(data));
bus.$emit("update", "hello");
```

3. **Vue3 响应式系统（观察者模式）：**

```javascript
// Vue3 中的实现简化示例
const targetMap = new WeakMap(); // 存储所有响应式对象的依赖
let activeEffect = null;

// 依赖收集
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect); // 收集依赖
  }
}

// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect()); // 通知所有观察者
  }
}

// reactive 实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      track(target, key); // 收集依赖
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key); // 触发更新
      return true;
    },
  });
}

// effect 副作用函数（相当于 Vue2 的 Watcher）
function effect(fn) {
  activeEffect = fn;
  fn(); // 执行函数，触发依赖收集
  activeEffect = null;
}
```

4. **两种模式在 Vue 中的区别：**

   - **观察者模式（响应式）：**
     - Vue2: Dep 和 Watcher 直接关联
     - Vue3: targetMap、track、trigger 和 effect 机制
   - **发布订阅模式（事件）：** 通过 EventBus 解耦，用于组件通信（Vue2/3 通用）

5. **Vue3 重要概念澄清：Proxy vs 设计模式**

**需要明确的是：Proxy 和发布订阅/观察者模式不是对立或可替换的关系**

| 概念层面         | Vue2                  | Vue3                   | 说明         |
| ---------------- | --------------------- | ---------------------- | ------------ |
| **数据劫持技术** | Object.defineProperty | Proxy                  | 技术实现手段 |
| **设计模式**     | 观察者模式            | 观察者模式             | 架构设计思想 |
| **依赖管理**     | Dep + Watcher         | effect + track跟踪/trigger 触发| 具体实现机制 |

**Vue3 使用 Proxy 的优势：**

```javascript
// Vue2 的限制
const vm = new Vue({
  data: {
    obj: { a: 1 },
  },
});
vm.obj.b = 2; // 新增属性不是响应式的，需要 Vue.set
vm.arr[0] = 100; // 数组索引赋值不触发更新

// Vue3 自动处理
const state = reactive({
  obj: { a: 1 },
});
state.obj.b = 2; // 自动响应式
state.arr[0] = 100; // 自动触发更新
```

**性能对比：**
| 特性 | Vue2 | Vue3 |
|------|------|------|
| 初始化 | 递归遍历所有属性 | 懒代理，访问时才处理 |
| 内存占用 | 每个属性都有 Dep 实例 | WeakMap 弱引用，自动垃圾回收 |
| 数组处理 | 重写 7 个数组方法 | Proxy 原生支持所有操作 |
| 类型支持 | 较弱 | 完整 TypeScript 支持 |

**总结：Vue3 仍使用观察者模式，Proxy 只是更好的实现手段**

---

### 3. 为什么使用 Virtual DOM ⭐⭐⭐⭐⭐ 🔥

**💡 记忆口诀：JS对象描述DOM**

**原因：**

1. **跨平台能力**：Virtual DOM 本质是 JS 对象，可以渲染到不同平台
2. **批量更新**：将多次 DOM 操作合并为一次，减少重排重绘
3. **声明式编程**：开发者只需关心数据变化，无需手动操作 DOM
4. **diff 算法优化**：通过 diff 算法找出最小变化，精确更新

---

### 4. Virtual DOM 的三个组成部分 ⭐⭐⭐⭐

**💡 记忆口诀：VNode、Diff、Patch**

1. **VNode（虚拟节点）**：用 JS 对象描述 DOM 结构
2. **diff 算法**：对比新旧虚拟 DOM 树，找出差异
3. **patch（打补丁）**：将差异应用到真实 DOM

---

### 5. Vue Diff 算法完整解析 ⭐⭐⭐⭐⭐ 🔥 ⚠️

**💡 记忆口诀：同层比较、双端对比、最长递增**

**什么是 Diff 算法？**
Diff 算法是 Virtual DOM 的核心算法，用于比较新旧虚拟 DOM 树的差异，计算出最小的更新操作，然后批量更新真实 DOM。

**为什么需要 Diff 算法？**
1. 直接操作 DOM 性能差，需要减少 DOM 操作次数
2. 找出真正变化的部分，精准更新
3. 复用已有 DOM 节点，避免重复创建

**Diff 算法的三个核心策略：**

1. **同层比较（Tree Diff）**
   - 只比较同一层级的节点，不跨层级比较
   - 如果节点类型变了，直接销毁重建
   - 大大降低算法复杂度从 O(n³) 到 O(n)

   **为什么传统算法是 O(n³)？**
   - 传统的完整树 diff 算法需要找到两棵树的最小编辑距离
   - 第1步：遍历 tree1 中每个节点 - O(n)
   - 第2步：对每个节点，遍历 tree2 中所有节点寻找匹配 - O(n)
   - 第3步：找到所有可能的转换方式后，计算最优解 - O(n)
   - 总复杂度：O(n) × O(n) × O(n) = O(n³)

   **Vue/React 优化到 O(n) 的策略：**
   - 只比较同层节点，不考虑跨层移动（实际开发中跨层移动很少）
   - 通过 key 和组件类型快速判断是否为相同节点
   - 不求最优解，只求可用解

2. **组件比较（Component Diff）**
   - 同类型组件按原策略比较 Virtual DOM 树
   - 不同类型组件直接替换整个组件

3. **元素比较（Element Diff）**
   - 同层级子节点通过 key 优化
   - Vue2 使用双端比较，Vue3 使用最长递增子序列

**Vue2 双端 Diff 算法详解：**

```javascript
// Vue2 双端 Diff 算法实现
function patchChildren(oldChildren, newChildren) {
  let oldStartIdx = 0;                           // 旧节点开始索引
  let oldEndIdx = oldChildren.length - 1;        // 旧节点结束索引
  let newStartIdx = 0;                           // 新节点开始索引
  let newEndIdx = newChildren.length - 1;        // 新节点结束索引

  let oldStartVNode = oldChildren[oldStartIdx];
  let oldEndVNode = oldChildren[oldEndIdx];
  let newStartVNode = newChildren[newStartIdx];
  let newEndVNode = newChildren[newEndIdx];

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 跳过 undefined 节点
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIdx];
    } else if (!oldEndVNode) {
      oldEndVNode = oldChildren[--oldEndIdx];
    }
    // 1. 头头比较
    else if (sameVNode(oldStartVNode, newStartVNode)) {
      patchVNode(oldStartVNode, newStartVNode);
      oldStartVNode = oldChildren[++oldStartIdx];
      newStartVNode = newChildren[++newStartIdx];
    }
    // 2. 尾尾比较
    else if (sameVNode(oldEndVNode, newEndVNode)) {
      patchVNode(oldEndVNode, newEndVNode);
      oldEndVNode = oldChildren[--oldEndIdx];
      newEndVNode = newChildren[--newEndIdx];
    }
    // 3. 头尾比较（旧头新尾）
    else if (sameVNode(oldStartVNode, newEndVNode)) {
      patchVNode(oldStartVNode, newEndVNode);
      // 把 oldStart 移动到最后
      nodeOps.insertBefore(parentElm, oldStartVNode.elm, nodeOps.nextSibling(oldEndVNode.elm));
      oldStartVNode = oldChildren[++oldStartIdx];
      newEndVNode = newChildren[--newEndIdx];
    }
    // 4. 尾头比较（旧尾新头）
    else if (sameVNode(oldEndVNode, newStartVNode)) {
      patchVNode(oldEndVNode, newStartVNode);
      // 把 oldEnd 移动到最前
      nodeOps.insertBefore(parentElm, oldEndVNode.elm, oldStartVNode.elm);
      oldEndVNode = oldChildren[--oldEndIdx];
      newStartVNode = newChildren[++newStartIdx];
    }
    // 5. 都不相同，使用 key 查找
    else {
      // 建立 key 到 index 的映射
      if (!oldKeyToIdx) {
        oldKeyToIdx = createKeyToOldIdx(oldChildren, oldStartIdx, oldEndIdx);
      }
      // 通过 key 查找对应的旧节点
      idxInOld = newStartVNode.key ? oldKeyToIdx[newStartVNode.key] : null;

      if (!idxInOld) {
        // 没找到，创建新节点
        createElm(newStartVNode, parentElm, oldStartVNode.elm);
      } else {
        // 找到了，移动复用
        vnodeToMove = oldChildren[idxInOld];
        patchVNode(vnodeToMove, newStartVNode);
        oldChildren[idxInOld] = undefined; // 标记已处理
        nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVNode.elm);
      }
      newStartVNode = newChildren[++newStartIdx];
    }
  }

  // 处理剩余节点
  if (oldStartIdx > oldEndIdx) {
    // 添加新节点
    addVnodes(parentElm, newChildren, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    // 删除旧节点
    removeVnodes(oldChildren, oldStartIdx, oldEndIdx);
  }
}
```

**Vue3 快速 Diff 算法（最长递增子序列）：**

```javascript
// Vue3 Diff 算法核心实现
function patchKeyedChildren(oldChildren, newChildren) {
  let i = 0;
  const l2 = newChildren.length;
  let e1 = oldChildren.length - 1; // 旧节点的结束索引
  let e2 = l2 - 1; // 新节点的结束索引

  // 1. 从头部开始同步
  // (a b) c
  // (a b) d e
  while (i <= e1 && i <= e2) {
    const n1 = oldChildren[i];
    const n2 = newChildren[i];
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2);
    } else {
      break;
    }
    i++;
  }

  // 2. 从尾部开始同步
  // a (b c)
  // d e (b c)
  while (i <= e1 && i <= e2) {
    const n1 = oldChildren[e1];
    const n2 = newChildren[e2];
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2);
    } else {
      break;
    }
    e1--;
    e2--;
  }

  // 3. 新节点多于旧节点，需要挂载
  // (a b)
  // (a b) c
  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1;
      const anchor = nextPos < l2 ? newChildren[nextPos].el : null;
      while (i <= e2) {
        mount(newChildren[i], container, anchor);
        i++;
      }
    }
  }
  // 4. 旧节点多于新节点，需要卸载
  // (a b) c
  // (a b)
  else if (i > e2) {
    while (i <= e1) {
      unmount(oldChildren[i]);
      i++;
    }
  }
  // 5. 乱序情况，需要移动、删除、新增
  else {
    const s1 = i; // 旧子序列开始索引
    const s2 = i; // 新子序列开始索引

    // 5.1 构建新节点的 key:index 映射
    const keyToNewIndexMap = new Map();
    for (i = s2; i <= e2; i++) {
      const nextChild = newChildren[i];
      if (nextChild.key != null) {
        keyToNewIndexMap.set(nextChild.key, i);
      }
    }

    // 5.2 遍历旧节点，更新和移动节点
    const toBePatched = e2 - s2 + 1;
    const newIndexToOldIndexMap = new Array(toBePatched);
    // 初始化为0，0表示新增节点
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

    let moved = false;
    let maxNewIndexSoFar = 0;

    for (i = s1; i <= e1; i++) {
      const prevChild = oldChildren[i];
      let newIndex;

      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key);
      } else {
        // key 不存在，尝试找相同类型的节点
        for (j = s2; j <= e2; j++) {
          if (isSameVNodeType(prevChild, newChildren[j])) {
            newIndex = j;
            break;
          }
        }
      }

      if (newIndex === undefined) {
        // 没找到对应节点，删除
        unmount(prevChild);
      } else {
        // 记录新旧节点的映射关系
        newIndexToOldIndexMap[newIndex - s2] = i + 1;
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex;
        } else {
          // 节点需要移动
          moved = true;
        }
        patch(prevChild, newChildren[newIndex]);
      }
    }

    // 5.3 移动和挂载新节点
    // 使用最长递增子序列优化移动
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : [];

    let j = increasingNewIndexSequence.length - 1;
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i;
      const nextChild = newChildren[nextIndex];
      const anchor = nextIndex + 1 < l2 ? newChildren[nextIndex + 1].el : null;

      if (newIndexToOldIndexMap[i] === 0) {
        // 新增节点
        mount(nextChild, container, anchor);
      } else if (moved) {
        // 需要移动
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor);
        } else {
          // 位于递增子序列中，不需要移动
          j--;
        }
      }
    }
  }
}

// 最长递增子序列算法（动态规划）
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;

  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      // 二分查找
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }

  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
```

**key 的作用和重要性：**

**💡 记忆口诀：标识复用、优化diff**

```javascript
// 为什么需要 key？
// 没有 key 的情况
<li>A</li>    =>    <li>B</li>
<li>B</li>    =>    <li>A</li>
// Vue 会复用 DOM，只更新内容：
// li 元素1的内容从 A 改为 B
// li 元素2的内容从 B 改为 A

// 有 key 的情况
<li key="a">A</li>    =>    <li key="b">B</li>
<li key="b">B</li>    =>    <li key="a">A</li>
// Vue 会识别出是同一个节点，只需要移动位置

// key 的最佳实践
// ✅ 正确：使用唯一且稳定的值
<li v-for="item in list" :key="item.id">{{ item.name }}</li>

// ❌ 错误：使用 index 作为 key（列表会变动时）
<li v-for="(item, index) in list" :key="index">{{ item.name }}</li>

// ❌ 错误：使用随机数
<li v-for="item in list" :key="Math.random()">{{ item.name }}</li>
```

**Vue2 vs Vue3 Diff 算法对比：**

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 算法策略 | 双端比较 | 快速Diff（最长递增子序列） |
| 时间复杂度 | O(n) | O(n log n)（最坏情况） |
| 空间复杂度 | O(1) | O(n) |
| 优化重点 | 减少DOM移动 | 最少的DOM操作 |
| 静态标记 | 无 | PatchFlag静态标记 |
| 性能 | 良好 | 更优，特别是大列表 |

**Diff 算法性能优化技巧：**

1. **合理使用 key**
   - 使用唯一且稳定的 key
   - 避免使用 index 作为 key
   - 不要使用随机数或时间戳

2. **避免不必要的节点移动**
   - 保持列表项的相对顺序
   - 使用 v-show 替代频繁的 v-if

3. **利用 Vue3 的优化特性**
   - 静态提升
   - PatchFlag
   - 缓存事件处理函数

---

## 第二部分：Vue 3 核心语法

### 6. Vue3 新特性亮点 ⭐⭐⭐⭐⭐ 🔥

**💡 记忆口诀：性能更快、体积更小、TS支持**

**性能提升：**

- 打包大小减少 41%
- 初次渲染快 55%，更新渲染快 133%
- 内存减少 54%

**新特性：**

- Composition API（setup、ref、reactive 等）
- 多根节点支持（Fragment）
- Teleport（传送门）
- Suspense（异步组件）
- 更好的 TypeScript 支持

---

### 7. setup 函数详解 ⭐⭐⭐⭐

**💡 记忆口诀：组合API舞台**

**特点：**

- Vue3 中的新配置项，是 Composition API 的"舞台"
- setup 在 beforeCreate 之前执行
- setup 中的 this 是 undefined

```vue
<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";

// 响应式数据
const count = ref(0);
const state = reactive({
  name: "Vue3",
  version: "3.0",
});

// 计算属性
const doubled = computed(() => count.value * 2);

// 侦听器
watch(count, (newVal, oldVal) => {
  console.log(`count changed: ${oldVal} -> ${newVal}`);
});

// 生命周期
onMounted(() => {
  console.log("mounted");
});

// 方法
const increment = () => {
  count.value++;
};
</script>
```

---

### 8. ref 与 reactive 的区别 ⭐⭐⭐⭐ 🔥

**💡 记忆口诀：ref需value，reactive不需**

**ref：**

- 可以定义基本类型和对象类型的响应式数据
- 访问时需要 `.value`
- 适合单个值的响应式

**reactive：**

- 只能定义对象类型的响应式数据
- 不需要 `.value`
- 适合复杂对象，层级较深时推荐使用

```javascript
// ref 使用
const count = ref(0);
count.value++; // 需要 .value

// reactive 使用
const state = reactive({ count: 0 });
state.count++; // 不需要 .value
```

---

### 9. computed 计算属性 ⭐⭐⭐⭐

**💡 记忆口诀：缓存依赖自动更新**

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("Zhang");
const lastName = ref("San");

// 只读计算属性
const fullName = computed(() => {
  return firstName.value + " " + lastName.value;
});

// 可写计算属性
const fullName2 = computed({
  get() {
    return firstName.value + " " + lastName.value;
  },
  set(val) {
    [firstName.value, lastName.value] = val.split(" ");
  },
});
</script>
```

---

### 10. watch 与 watchEffect ⭐⭐⭐⭐ 🔥

**💡 记忆口诀：watch指定源、watchEffect自动追踪**

**watch：**

- 需要明确指定监视的数据源
- 可以访问新值和旧值
- 懒执行（可配置 immediate）

**watchEffect：**

- 自动追踪依赖
- 立即执行
- 无法访问旧值

官网：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。

- `watch`对比`watchEffect`

  > 1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
  >
  > 2. `watch`：要明确指出监视的数据
  >
  > 3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。

```javascript
// watch
watch(
  source,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);

// watchEffect
watchEffect(() => {
  // 自动追踪 count.value
  console.log(count.value);
});
```

---

### 11. Vue3 生命周期 ⭐⭐⭐⭐⭐ ⚠️

**💡 记忆口诀：创建挂载更新销毁**

**Composition API 生命周期：**

- setup（创建阶段）
- onBeforeMount、onMounted（挂载阶段）
- onBeforeUpdate、onUpdated（更新阶段）
- onBeforeUnmount、onUnmounted（卸载阶段）

```javascript
import { onMounted, onUpdated, onUnmounted } from "vue";

onMounted(() => {
  console.log("组件挂载完成");
});

onUpdated(() => {
  console.log("组件更新完成");
});

onUnmounted(() => {
  console.log("组件卸载完成");
});
```

---

### 12. Composition API 优势 ⭐⭐⭐⭐

**💡 记忆口诀：逻辑聚合易复用**

**Options API 的问题：**

- 相关逻辑分散在 data、methods、computed 等选项中
- 难以复用和维护

**Composition API 的优势：**

- 相关逻辑聚合在一起
- 更好的逻辑复用（自定义 Hook）
- 更好的类型推导
- 更小的打包体积

---

### 13. toRefs 与 toRef ⭐⭐⭐

**💡 记忆口诀：解构保持响应式**

将响应式对象的属性转换为 ref：

```javascript
import { reactive, toRefs, toRef } from "vue";

const state = reactive({
  name: "Zhang San",
  age: 18,
});

// toRefs 批量转换
const { name, age } = toRefs(state);

// toRef 单个转换
const nameRef = toRef(state, "name");
```

---

## 第三部分：Vue Router

### 14. Vue Router 4.x 新特性 ⭐⭐⭐⭐

**💡 记忆口诀：history模式、懒加载**

```javascript
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(), // history 模式
  // history: createWebHashHistory(), // hash 模式
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("./views/Home.vue"), // 路由懒加载
      meta: { requiresAuth: true },
    },
    {
      path: "/user/:id",
      component: User,
      props: true, // 路由参数作为 props 传递
    },
  ],
});
```

---

### 15. 路由导航守卫 ⭐⭐⭐⭐

**💡 记忆口诀：全局组件独享**

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

// 组件内守卫（Composition API）
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm("确定要离开吗？");
  if (!answer) return false;
});
```

---

### 16. 路由传参方式 ⭐⭐⭐⭐ 🔥

**💡 记忆口诀：query显示params隐藏**

**query 参数：**

```javascript
// 传递
router.push({ path: "/user", query: { id: 123 } });
// 接收
const route = useRoute();
console.log(route.query.id);
// URL: /user?id=123
```

**params 参数：**

```javascript
// 传递（需要使用 name）
router.push({ name: "User", params: { id: 123 } });
// 接收
console.log(route.params.id);
// URL: /user/123
```

**query vs params 区别对比：**

| 特性 | query | params |
|------|-------|--------|
| **URL显示** | 显示在URL中 `?id=123` | 作为路径一部分 `/user/123` |
| **路由配置** | 不需要配置 | 需要在路由中配置 `path: '/user/:id'` |
| **传递方式** | 可用path或name | 只能用name |
| **刷新页面** | 参数不会丢失 | 参数不会丢失（动态路由）|
| **参数类型** | 会转为字符串 | 保持原类型（内存中） |
| **使用场景** | 可选参数、过滤条件 | 必要参数、RESTful风格 |

```javascript
// 路由配置示例
const routes = [
  {
    path: '/user/:id',  // params需要在路径中声明
    name: 'User',
    component: UserDetail,
    props: true  // 可以将params作为props传递给组件
  },
  {
    path: '/search',  // query不需要声明
    name: 'Search',
    component: SearchPage
  }
]

// 组合使用
router.push({
  name: 'User',
  params: { id: 123 },
  query: { tab: 'profile' }
})
// URL: /user/123?tab=profile

// 编程式导航的注意事项
// ✅ 正确：path配query
router.push({ path: '/user', query: { id: 123 } })

// ❌ 错误：path配params（params会被忽略）
router.push({ path: '/user', params: { id: 123 } })

// ✅ 正确：name配params
router.push({ name: 'User', params: { id: 123 } })

// Vue Router 4.x 中params传递对象的限制
// ❌ Vue Router 4不再支持params传递对象
router.push({
  name: 'User',
  params: {
    id: 123,
    userInfo: { name: 'John' }  // 对象会被忽略
  }
})

// ✅ 解决方案：使用query或state
router.push({
  name: 'User',
  params: { id: 123 },
  query: { info: JSON.stringify({ name: 'John' }) }
})

// 或使用history.state
router.push({
  name: 'User',
  params: { id: 123 },
  state: { userInfo: { name: 'John' } }
})
```

---

## 第四部分：状态管理

### 17. 状态管理概述 ⭐⭐⭐⭐

**💡 记忆口诀：Vuex到Pinia**

**什么是状态管理？**
状态管理是在应用中集中管理共享状态的模式和工具，解决多个组件间的数据共享和同步问题。

**Vue生态的状态管理方案：**
- **Vuex**：Vue官方的状态管理库，基于Flux架构
- **Pinia**：新一代状态管理库，Vue官方推荐
- **详细内容请参考**：[Vuex和Pinia面试题详解.md](./Vuex和Pinia面试题详解.md)

---

### 18. 简单状态管理（不使用Vuex/Pinia） ⭐⭐⭐

对于小型应用，可以使用简单的状态管理模式：

```javascript
// 简单的响应式store
import { reactive, readonly } from 'vue'

const state = reactive({
  count: 0,
  user: null
})

const methods = {
  increment() {
    state.count++
  },
  setUser(user) {
    state.user = user
  }
}

export default {
  state: readonly(state), // 只读状态，防止直接修改
  ...methods
}

// 在组件中使用
import store from '@/store/simple-store'

export default {
  computed: {
    count() {
      return store.state.count
    }
  },
  methods: {
    increment() {
      store.increment()
    }
  }
}
```

---

## 第五部分：组件通信

### 19. Vue3 组件通信方式总结 ⭐⭐⭐⭐⭐ 🔥 ⚠️

**💡 记忆口诀：父子props、兄弟bus、跨级provide**

1. **props / emit**：父子组件通信
2. **provide / inject**：跨级组件通信
3. **v-model**：双向数据绑定
4. **refs**：获取子组件实例
5. **$attrs**：透传属性
6. **mitt**：事件总线（替代 Vue2 的 EventBus）
7. **Pinia**：全局状态管理

---

### 20. v-model 在组件中的使用 ⭐⭐⭐⭐

**💡 记忆口诀：语法糖双向绑定**

```vue
<!-- 父组件 -->
<CustomInput v-model="searchText" />
<!-- 等价于 -->
<CustomInput
  :modelValue="searchText"
  @update:modelValue="searchText = $event"
/>

<!-- 子组件 -->
<script setup>
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

---

### 21. provide / inject 跨级通信 ⭐⭐⭐⭐

**💡 记忆口诀：依赖注入跨级传**

```javascript
// 祖先组件
import { provide, reactive } from "vue";

const state = reactive({
  user: "John",
});

provide("user", state);

// 后代组件
import { inject } from "vue";

const user = inject("user");
```

---

## 第六部分：性能优化

### 22. Vue 性能优化方案 ⭐⭐⭐⭐⭐ 🔥 ⚠️

**💡 记忆口诀：懒加载、缓存、虚拟列表**

**编译优化：**

1. **路由懒加载** - 路由组件按需加载，减少首屏加载体积
```javascript
// 普通导入（会打包到主bundle）
import Home from './views/Home.vue'

// 懒加载（单独打包，访问时才加载）
const Home = () => import('./views/Home.vue')

// 带预加载提示
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // 路由级别的代码分割
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]
```

2. **组件懒加载** - 异步组件按需加载，优化性能
```javascript
// Vue3 异步组件
import { defineAsyncComponent } from 'vue'

// 基础用法
const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

// 带配置选项
const AsyncComp = defineAsyncComponent({
  loader: () => import('./components/AsyncComponent.vue'),
  loadingComponent: LoadingComponent, // 加载时显示的组件
  errorComponent: ErrorComponent,      // 错误时显示的组件
  delay: 200,    // 显示加载组件前的延迟，默认200ms
  timeout: 3000  // 超时时间，默认Infinity
})

// 在组件中使用
export default {
  components: {
    AsyncComp: defineAsyncComponent(() =>
      import('./components/HeavyComponent.vue')
    )
  }
}

// Vue2 写法
const AsyncComp = () => ({
  component: import('./components/AsyncComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```

3. **Tree-shaking** - 移除未使用的代码，减少打包体积
```javascript
// utils.js
export function used() { /* 会被打包 */ }
export function unused() { /* 不会被打包 */ }

// main.js
import { used } from './utils' // 只导入used，unused会被tree-shaking

// package.json配置
{
  "sideEffects": false, // 标记无副作用，允许tree-shaking
  // 或指定有副作用的文件
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/some-side-effectful-file.js"
  ]
}

// webpack配置（生产模式自动开启）
module.exports = {
  mode: 'production', // 自动启用tree-shaking
  optimization: {
    usedExports: true,     // 标记未使用的导出
    minimize: true,        // 压缩代码
    sideEffects: false     // 根据package.json的sideEffects配置
  }
}

// Vite默认支持tree-shaking
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 手动分包策略
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['element-plus']
        }
      }
    }
  }
}

// 注意事项：
// 1. 必须使用ES6模块语法（import/export）
// 2. 确保没有副作用代码
// 3. 生产环境构建才会生效
```

**效果对比：**
- **路由懒加载**：首屏加载从2MB降到500KB，其他路由按需加载
- **组件懒加载**：大型组件（如图表、编辑器）使用时才加载，减少初始渲染时间
- **Tree-shaking**：自动移除未使用的代码，打包体积减少30-60%

**运行时优化：**

```javascript
// 1. 使用 shallowRef/shallowReactive 减少响应式开销
const state = shallowRef({ heavy: data })

// 2. 使用 v-memo 缓存列表项
<div v-for="item in list" :key="item.id" v-memo="[item.id]">
  {{ item.name }}
</div>

// 3. 使用 computed 缓存计算结果
const expensive = computed(() => {
  return heavyCalculation(data.value)
})

// 4. 合理使用 v-show 和 v-if
// 频繁切换用 v-show，条件很少改变用 v-if

// 5. 使用虚拟滚动处理长列表
import { VirtualList } from '@tanstack/vue-virtual'
```

---

### 23. keep-alive 缓存组件 ⭐⭐⭐⭐

**💡 记忆口诀：缓存组件不销毁**

```vue
<template>
  <keep-alive :include="['Home', 'About']" :max="10">
    <router-view />
  </keep-alive>
</template>

<script setup>
// 缓存的组件会触发这两个生命周期
onActivated(() => {
  console.log("组件被激活");
});

onDeactivated(() => {
  console.log("组件被缓存");
});
</script>
```

---

### 24. Vue3 编译优化 ⭐⭐⭐⭐

**💡 记忆口诀：静态提升、PatchFlag**

**优化技术：**

1. **静态提升**：将静态节点提升到 render 函数外
2. **预字符串化**：连续静态节点转为字符串
3. **缓存事件处理函数**
4. **Block Tree**：动态节点收集
5. **PatchFlag**：标记动态内容类型

```javascript
// PatchFlag 示例
const PatchFlags = {
  TEXT: 1, // 动态文本
  CLASS: 2, // 动态class
  STYLE: 4, // 动态style
  PROPS: 8, // 动态props
  FULL_PROPS: 16, // 有动态key的props
};
```

---

## 第七部分：TypeScript 支持

### 25. Vue3 + TypeScript 最佳实践 ⭐⭐⭐

**💡 记忆口诀：类型安全开发体验**

```typescript
// 使用 defineComponent（Options API）
import { defineComponent, PropType } from "vue";

interface User {
  id: number;
  name: string;
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
});

// 使用 <script setup lang="ts">（Composition API）
interface Props {
  msg: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});

// Emits 类型
const emit = defineEmits<{
  update: [value: string];
  delete: [id: number];
}>();

// Ref 类型
const input = ref<string>("");
const list = ref<User[]>([]);
```

---

## 第八部分：Vue3 新组件

### 26. Teleport 传送门 ⭐⭐⭐

**💡 记忆口诀：内容传送到任意DOM**

```vue
<template>
  <!-- 将内容渲染到 body 下 -->
  <Teleport to="body">
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <!-- 模态框内容 -->
      </div>
    </div>
  </Teleport>
</template>
```

---

### 27. Suspense 异步组件 ⭐⭐⭐

**💡 记忆口诀：异步组件加载态**

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const AsyncComponent = defineAsyncComponent(() =>
  import("./AsyncComponent.vue")
);
</script>
```

---

### 28. Fragment 多根节点 ⭐⭐⭐

**💡 记忆口诀：无需单根节点包裹**

Vue3 支持组件有多个根节点：

```vue
<template>
  <header>Header</header>
  <main>Main Content</main>
  <footer>Footer</footer>
</template>
```

---

## 第九部分：其他 API

### 29. 自定义 Hook ⭐⭐⭐⭐

**💡 记忆口诀：逻辑复用组合式**

```javascript
// hooks/useCounter.js
import { ref, computed } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const doubled = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  return {
    count,
    doubled,
    increment,
    decrement,
  };
}

// 组件中使用
const { count, doubled, increment } = useCounter(10);
```

---

### 30. customRef 自定义 ref ⭐⭐⭐

**💡 记忆口诀：自定义响应式逻辑**

实现防抖 ref：

```javascript
import { customRef } from "vue";

function debounceRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}

// 使用
const text = debounceRef("", 500);
```

---

### 31. 响应式 API 进阶 ⭐⭐⭐

**💡 记忆口诀：浅层响应、只读、标记**

```javascript
// shallowRef - 浅层响应式
const state = shallowRef({ count: 1 });

// shallowReactive - 浅层响应式对象
const state = shallowReactive({ nested: { count: 1 } });

// readonly - 深层只读
const copy = readonly(original);

// shallowReadonly - 浅层只读
const copy = shallowReadonly(original);

// toRaw - 获取原始对象
const raw = toRaw(reactive(obj));

// markRaw - 标记不可响应
const marked = markRaw(obj);
```

---

## 第十部分：实战问题

### 32. nextTick 的使用场景 ⭐⭐⭐⭐⭐ 🔥 ⚠️

**💡 记忆口诀：微任务异步更新DOM**

```javascript
import { nextTick } from "vue";

// 修改数据后立即使用更新后的 DOM
async function updateAndScroll() {
  message.value = "Updated";
  await nextTick();
  // DOM 已更新
  scrollToBottom();
}
```

**nextTick 原理：**
- Vue 的数据更新是异步的，多次修改数据会被合并到一次更新
- nextTick 将回调延迟到下次 DOM 更新循环之后执行
- 使用微任务（Promise.then 或 MutationObserver）实现
- 如果微任务不可用，降级使用宏任务（setImmediate 或 setTimeout）

---

### 33. Vue3 中的 v-model 修饰符 ⭐⭐⭐

**💡 记忆口诀：lazy、number、trim**

```vue
<!-- .lazy - 在 change 事件后同步 -->
<input v-model.lazy="msg" />

<!-- .number - 自动转换为数字 -->
<input v-model.number="age" />

<!-- .trim - 自动去除首尾空格 -->
<input v-model.trim="text" />

<!-- 自定义修饰符 -->
<CustomInput v-model.capitalize="text" />
```

---

### 34. 插槽（Slots）的使用 ⭐⭐⭐⭐

**💡 记忆口诀：默认具名作用域**

```vue
<!-- 默认插槽 -->
<template #default>
  <p>默认内容</p>
</template>

<!-- 具名插槽 -->
<template #header>
  <h1>标题</h1>
</template>

<!-- 作用域插槽 -->
<template #item="{ item, index }">
  <li>{{ index }} - {{ item.name }}</li>
</template>

<!-- 动态插槽名 -->
<template #[dynamicSlotName]>
  <p>动态内容</p>
</template>
```

---

### 35. Vue3 与 Vue2 的主要区别总结 ⭐⭐⭐⭐⭐ 🔥 ⚠️

**💡 记忆口诀：Proxy替Object、组合替选项**

| 特性       | Vue 2.x               | Vue 3.x                       |
| ---------- | --------------------- | ----------------------------- |
| 响应式系统 | Object.defineProperty | Proxy                         |
| 组件 API   | Options API           | Composition API + Options API |
| TypeScript | 部分支持              | 完全支持                      |
| 性能       | 基准                  | 提升 1.3~2 倍                 |
| 包体积     | ~23KB                 | ~13.5KB                       |
| Fragment   | 不支持                | 支持多根节点                  |
| Teleport   | 不支持                | 内置支持                      |
| Suspense   | 不支持                | 内置支持                      |
| 生命周期   | destroyed 等          | unmounted 等                  |

---

### 36. Vite 相比 Webpack 的优势 ⭐⭐⭐⭐

**💡 记忆口诀：开发快、HMR秒级**

**核心差异：**

1. **开发服务器**：Vite 使用 ESBuild（Go 编写），启动速度快 10-100 倍
2. **HMR**：基于 ESM，只更新变化的模块
3. **按需编译**：不需要预先打包所有模块
4. **生产构建**：使用 Rollup，更优的 tree-shaking

```javascript
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
```

---

## 第十一部分：高频面试题

### 37. 操作 DOM 元素在哪个生命周期函数执行？ ⭐⭐⭐⭐

**Vue 2.x：**

- **mounted**：组件挂载完成后，DOM 已经渲染完成，可以安全操作 DOM
- **updated**：组件更新完成后，DOM 已更新，可以操作更新后的 DOM

**Vue 3.x：**

- **onMounted**：对应 Vue2 的 mounted
- **onUpdated**：对应 Vue2 的 updated

```javascript
// Vue2 Options API
export default {
  mounted() {
    // DOM已渲染完成，可以操作DOM
    this.$refs.myElement.style.color = "red";
  },
  updated() {
    // 组件更新后操作DOM
    this.$refs.myElement.scrollTop = 0;
  },
};

// Vue3 Composition API
import { onMounted, onUpdated } from "vue";

onMounted(() => {
  // DOM已渲染完成
  const element = document.getElementById("myElement");
  element.style.color = "red";
});

onUpdated(() => {
  // 组件更新后
  const element = document.getElementById("myElement");
  element.scrollTop = 0;
});
```

---

### 38. 网络请求后端 API 写在哪个生命周期函数里面？ ⭐⭐⭐⭐

**推荐位置：**

- **created/mounted**（Vue2）或 **onMounted**（Vue3）

**原因：**

1. **created**：组件实例创建完成，数据观测、属性和方法已配置，但 DOM 未挂载
2. **mounted**：DOM 挂载完成，适合需要操作 DOM 的 API 请求

```javascript
// Vue2 - 推荐在created中
export default {
  data() {
    return {
      userList: [],
    };
  },
  async created() {
    try {
      const response = await fetch("/api/users");
      this.userList = await response.json();
    } catch (error) {
      console.error("获取用户列表失败:", error);
    }
  },
};

// Vue3 - 推荐在onMounted中
import { ref, onMounted } from "vue";

const userList = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("/api/users");
    userList.value = await response.json();
  } catch (error) {
    console.error("获取用户列表失败:", error);
  }
});
```

---

### 39. 移除定时器、移除监听函数在哪个生命周期执行？ ⭐⭐⭐⭐

**Vue 2.x：**

- **beforeDestroy** 或 **destroyed**

**Vue 3.x：**

- **onBeforeUnmount** 或 **onUnmounted**

```javascript
// Vue2
export default {
  data() {
    return {
      timer: null,
      eventHandler: null,
    };
  },
  mounted() {
    // 设置定时器
    this.timer = setInterval(() => {
      console.log("定时器执行");
    }, 1000);

    // 添加事件监听
    this.eventHandler = () => console.log("事件触发");
    window.addEventListener("resize", this.eventHandler);
  },
  beforeDestroy() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // 移除事件监听
    if (this.eventHandler) {
      window.removeEventListener("resize", this.eventHandler);
      this.eventHandler = null;
    }
  },
};

// Vue3
import { onMounted, onBeforeUnmount } from "vue";

let timer = null;
let eventHandler = null;

onMounted(() => {
  // 设置定时器
  timer = setInterval(() => {
    console.log("定时器执行");
  }, 1000);

  // 添加事件监听
  eventHandler = () => console.log("事件触发");
  window.addEventListener("resize", eventHandler);
});

onBeforeUnmount(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  // 移除事件监听
  if (eventHandler) {
    window.removeEventListener("resize", eventHandler);
    eventHandler = null;
  }
});
```

---

### 40. Vue2 和 Vue3 方法名称有哪些变动？ ⭐⭐⭐⭐

| Vue 2.x         | Vue 3.x           | 说明                                      |
| --------------- | ----------------- | ----------------------------------------- |
| `beforeCreate`  | `setup`           | 新增 setup 函数，在 beforeCreate 之前执行 |
| `created`       | `setup`           | setup 函数替代 created                    |
| `beforeMount`   | `onBeforeMount`   | 挂载前                                    |
| `mounted`       | `onMounted`       | 挂载后                                    |
| `beforeUpdate`  | `onBeforeUpdate`  | 更新前                                    |
| `updated`       | `onUpdated`       | 更新后                                    |
| `beforeDestroy` | `onBeforeUnmount` | 销毁前（名称更语义化）                    |
| `destroyed`     | `onUnmounted`     | 销毁后（名称更语义化）                    |
| `activated`     | `onActivated`     | keep-alive 激活                           |
| `deactivated`   | `onDeactivated`   | keep-alive 停用                           |
| `errorCaptured` | `onErrorCaptured` | 错误捕获                                  |

```javascript
// Vue2 生命周期
export default {
  beforeCreate() {
    /* ... */
  },
  created() {
    /* ... */
  },
  beforeMount() {
    /* ... */
  },
  mounted() {
    /* ... */
  },
  beforeUpdate() {
    /* ... */
  },
  updated() {
    /* ... */
  },
  beforeDestroy() {
    /* ... */
  },
  destroyed() {
    /* ... */
  },
};

// Vue3 生命周期
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

onBeforeMount(() => {
  /* ... */
});
onMounted(() => {
  /* ... */
});
onBeforeUpdate(() => {
  /* ... */
});
onUpdated(() => {
  /* ... */
});
onBeforeUnmount(() => {
  /* ... */
});
onUnmounted(() => {
  /* ... */
});
```

---

### 41. 响应式原理：缺陷、Vue3 改为 Proxy 有什么区别？ ⭐⭐⭐⭐⭐ 🔥

**Vue2 Object.defineProperty 的缺陷：**

1. **无法监听对象属性的添加和删除**
2. **无法监听数组索引和 length 变化**
3. **需要递归遍历对象的所有属性**
4. **性能较差，内存占用大**

**Vue3 Proxy 的优势：**

1. **可以监听动态新增的属性**
2. **可以监听数组索引和 length 变化**
3. **不需要递归遍历，性能更好**
4. **内存占用更小**

```javascript
// Vue2 的缺陷演示
const obj = {};
Object.defineProperty(obj, "name", {
  get() {
    return this._name;
  },
  set(val) {
    this._name = val;
  },
});

obj.name = "Vue2"; // 可以监听
obj.age = 18; // 无法监听，不会触发setter

// Vue3 Proxy 的优势演示
const obj = { name: "Vue3" };
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("get:", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set:", key, value);
    return Reflect.set(target, key, value, receiver);
  },
  deleteProperty(target, key) {
    console.log("delete:", key);
    return Reflect.deleteProperty(target, key);
  },
});

proxy.name = "Vue3"; // 触发set
proxy.age = 18; // 触发set，新增属性也能监听
delete proxy.name; // 触发deleteProperty
```

---

### 42. 浏览器不兼容问题 ⭐⭐⭐

**Vue2 兼容性：**

- IE9+（需要 polyfill）
- 现代浏览器完全支持

**Vue3 兼容性：**

- IE 不支持（需要 Vue2）
- 现代浏览器完全支持
- 需要 ES2015+环境

**解决方案：**

```javascript
// 1. 使用polyfill（Vue2）
import "core-js/stable";
import "regenerator-runtime/runtime";

// 2. 条件编译（Vue3）
// vite.config.js
export default defineConfig({
  build: {
    target: "es2015", // 设置目标环境
    polyfills: ["es.promise", "es.symbol"], // 添加polyfill
  },
});

// 3. 浏览器检测
if (!window.Promise) {
  // 降级到Vue2或提示用户升级浏览器
  console.warn("当前浏览器不支持Vue3，请升级浏览器");
}
```

---

### 43. Dep 算法、Proxy、Reflect 对象分别是什么？ ⭐⭐⭐⭐

**1. Dep（依赖收集器）：**

- Vue2 响应式系统的核心，负责收集和通知依赖
- 每个响应式属性都有一个 Dep 实例

```javascript
// Dep类的简化实现
class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (Dep.target) {
      this.subscribers.add(Dep.target);
    }
  }

  notify() {
    this.subscribers.forEach((watcher) => {
      watcher.update();
    });
  }
}

// 全局的当前Watcher
Dep.target = null;
```

**2. Proxy（代理对象）：**

- ES6 新增的元编程特性
- 可以拦截对象的基本操作（get、set、delete 等）
- Vue3 响应式系统的核心

```javascript
// Proxy基本用法
const target = { name: "Vue3" };
const proxy = new Proxy(target, {
  get(target, prop, receiver) {
    console.log(`获取属性: ${prop}`);
    return target[prop];
  },
  set(target, prop, value, receiver) {
    console.log(`设置属性: ${prop} = ${value}`);
    target[prop] = value;
    return true;
  },
});

proxy.name; // 输出: 获取属性: name
proxy.age = 18; // 输出: 设置属性: age = 18
```

**3. Reflect（反射对象）：**

- ES6 新增的全局对象
- 提供操作对象的默认行为
- 与 Proxy 配合使用，确保操作的一致性

```javascript
// Reflect基本用法
const obj = { name: "Vue3" };

// 获取属性
console.log(Reflect.get(obj, "name")); // 'Vue3'

// 设置属性
Reflect.set(obj, "age", 18);
console.log(obj.age); // 18

// 删除属性
Reflect.deleteProperty(obj, "age");
console.log(obj.hasOwnProperty("age")); // false

// 与Proxy配合使用
const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    // 使用Reflect确保默认行为
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    // 使用Reflect确保默认行为
    return Reflect.set(target, prop, value, receiver);
  },
});
```

---

### 44. watch 写出来 ⭐⭐⭐⭐

**Vue2 Options API：**

```javascript
export default {
  data() {
    return {
      message: "Hello",
      user: { name: "John", age: 25 },
    };
  },
  watch: {
    // 监听简单数据
    message(newVal, oldVal) {
      console.log("message changed:", oldVal, "->", newVal);
    },

    // 深度监听对象
    user: {
      handler(newVal, oldVal) {
        console.log("user changed:", oldVal, "->", newVal);
      },
      deep: true,
      immediate: true,
    },

    // 监听对象特定属性
    "user.name"(newVal, oldVal) {
      console.log("user.name changed:", oldVal, "->", newVal);
    },
  },
};
```

**Vue3 Composition API：**

```javascript
import { ref, reactive, watch, watchEffect } from "vue";

const message = ref("Hello");
const user = reactive({ name: "John", age: 25 });

// 1. 基础watch
watch(message, (newVal, oldVal) => {
  console.log("message changed:", oldVal, "->", newVal);
});

// 2. 监听多个数据源
watch(
  [message, () => user.name],
  ([newMessage, newName], [oldMessage, oldName]) => {
    console.log("message or name changed");
  }
);

// 3. 深度监听对象
watch(
  user,
  (newVal, oldVal) => {
    console.log("user changed:", oldVal, "->", newVal);
  },
  { deep: true, immediate: true }
);

// 4. 监听对象特定属性
watch(
  () => user.name,
  (newVal, oldVal) => {
    console.log("user.name changed:", oldVal, "->", newVal);
  }
);

// 5. watchEffect（自动追踪依赖）
watchEffect(() => {
  console.log("message:", message.value);
  console.log("user name:", user.name);
});

// 6. 停止监听
const stopWatch = watch(message, (newVal) => {
  console.log(newVal);
});

// 在需要时停止
stopWatch();
```

---

## 📚 面试技巧总结

### 回答问题的思路

1. **是什么**：概念理解
2. **为什么**：设计初衷和解决的问题
3. **怎么做**：实现原理
4. **优缺点**：对比分析
5. **应用场景**：实际使用

---

## 🎯 核心知识点速记

### Vue 响应式原理速记

```
Vue2: Object.defineProperty
- getter收集依赖（Dep）
- setter触发更新（notify）
- 缺陷：无法监听新增/删除属性、数组索引

Vue3: Proxy + Reflect
- get时track收集依赖
- set时trigger触发更新
- 优势：监听动态属性、数组变化、性能更好
```

### Diff 算法速记

```
三个核心策略：
1. 同层比较（Tree Diff）- O(n³)优化到O(n)
2. 组件比较（Component Diff）- 类型不同直接替换
3. 元素比较（Element Diff）- key优化节点复用

Vue2: 双端比较（头头、尾尾、头尾、尾头）
Vue3: 最长递增子序列（最少移动节点）
```

### 生命周期速记

```
Vue2                Vue3
beforeCreate    ->  setup
created         ->  setup
beforeMount     ->  onBeforeMount
mounted         ->  onMounted
beforeUpdate    ->  onBeforeUpdate
updated         ->  onUpdated
beforeDestroy   ->  onBeforeUnmount
destroyed       ->  onUnmounted

记忆口诀：创建挂载更新销毁
```

### 组件通信速记

```
1. props/emit      - 父子通信（单向数据流）
2. provide/inject  - 跨级通信（依赖注入）
3. v-model         - 双向绑定（语法糖）
4. ref             - 父访问子（实例引用）
5. $attrs          - 透传属性
6. mitt/EventBus   - 兄弟通信（事件总线）
7. Pinia/Vuex      - 全局状态管理

记忆口诀：父子props、兄弟bus、跨级provide
```

---

## 🔥 高频手写代码清单

### 1. 实现简单的响应式系统（Vue2）

```javascript
class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  depend() {
    if (Dep.target) {
      this.subscribers.add(Dep.target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub.update());
  }
}

Dep.target = null;

class Watcher {
  constructor(fn) {
    this.fn = fn;
    Dep.target = this;
    this.fn();
    Dep.target = null;
  }
  update() {
    this.fn();
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      val = newVal;
      dep.notify();
    }
  });
}
```

### 2. 实现 Vue3 响应式（简化版）

```javascript
const targetMap = new WeakMap();
let activeEffect = null;

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return true;
    }
  });
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}
```

### 3. 实现 EventBus

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }

  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
  }

  $off(event, callback) {
    if (this.events[event]) {
      if (callback) {
        this.events[event] = this.events[event].filter(cb => cb !== callback);
      } else {
        delete this.events[event];
      }
    }
  }

  $once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.$off(event, wrapper);
    };
    this.$on(event, wrapper);
  }
}
```

### 4. 实现简单的 computed

```javascript
function computed(getter) {
  let value;
  let dirty = true;

  return {
    get() {
      if (dirty) {
        value = getter();
        dirty = false;
      }
      return value;
    },
    depend() {
      // 收集依赖
      dirty = true;
    }
  };
}
```

### 5. 实现防抖 ref

```javascript
import { customRef } from 'vue';

function debounceRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}
```

---

## ❓ 面试高频问题速查

### 核心原理类

1. **Vue响应式原理是什么？Vue2和Vue3有什么区别？**
   - 答案见 [第1节](#1-vue-响应式原理-)

2. **什么是Virtual DOM？为什么需要它？**
   - 答案见 [第3节](#3-为什么使用-virtual-dom-)

3. **Vue的Diff算法是如何工作的？**
   - 答案见 [第5节](#5-vue-diff-算法完整解析-)

4. **nextTick的原理和使用场景？**
   - 答案见 [第32节](#32-nexttick-的使用场景-)

### Vue3新特性类

5. **Vue3相比Vue2有哪些改进？**
   - 答案见 [第35节](#35-vue3-与-vue2-的主要区别总结-)

6. **什么是Composition API？它解决了什么问题？**
   - 答案见 [第12节](#12-composition-api-优势-)

7. **ref和reactive的区别是什么？**
   - 答案见 [第8节](#8-ref-与-reactive-的区别-)

8. **watch和watchEffect的区别？**
   - 答案见 [第10节](#10-watch-与-watcheffect-)

### 组件通信类

9. **Vue组件通信有哪些方式？**
   - 答案见 [第19节](#19-vue3-组件通信方式总结-)

10. **v-model的原理是什么？**
    - 答案见 [第20节](#20-v-model-在组件中的使用-)

### 性能优化类

11. **Vue性能优化有哪些方法？**
    - 答案见 [第22节](#22-vue-性能优化方案-)

12. **什么是keep-alive？它的作用是什么？**
    - 答案见 [第23节](#23-keep-alive-缓存组件-)

13. **v-if和v-show的区别？使用场景？**
    - 答案见对比表格

14. **computed和watch的区别？**
    - 答案见对比表格

### 路由相关类

15. **Vue Router的query和params传参有什么区别？**
    - 答案见 [第16节](#16-路由传参方式-)

16. **什么是路由导航守卫？有哪些类型？**
    - 答案见 [第15节](#15-路由导航守卫-)

### 生命周期类

17. **Vue2和Vue3的生命周期有什么变化？**
    - 答案见 [第40节](#40-vue2-和-vue3-方法名称有哪些变动-)

18. **在哪个生命周期发送网络请求？**
    - 答案见 [第38节](#38-网络请求后端-api-写在哪个生命周期函数里面-)

19. **在哪个生命周期操作DOM？**
    - 答案见 [第37节](#37-操作-dom-元素在哪个生命周期函数执行-)

20. **在哪个生命周期清理定时器和事件监听？**
    - 答案见 [第39节](#39-移除定时器移除监听函数在哪个生命周期执行-)

---

## 💪 备考建议

### 学习优先级

1. **核心必背（⭐⭐⭐⭐⭐ 🔥 ⚠️）**：
   - Vue响应式原理
   - Diff算法
   - nextTick原理
   - Vue2 vs Vue3对比
   - 组件通信
   - 性能优化

2. **高频考点（⭐⭐⭐⭐ 🔥）**：
   - ref vs reactive
   - watch vs watchEffect
   - 路由传参
   - 生命周期

3. **重要知识（⭐⭐⭐⭐）**：
   - Composition API
   - 路由导航守卫
   - keep-alive
   - provide/inject

### 备考方法

1. **理解原理**：不要死记硬背，理解底层实现
2. **手写代码**：能手写简单的响应式系统、EventBus等
3. **对比总结**：掌握对比表格中的核心差异
4. **实践经验**：准备1-2个项目中的实际案例
5. **记忆口诀**：利用口诀快速回忆关键点

### 面试回答模板

```
问题：Vue响应式原理是什么？

回答结构：
1. 概念（是什么）
   - Vue2使用Object.defineProperty，Vue3使用Proxy

2. 原理（怎么做）
   - getter收集依赖、setter触发更新
   - Dep和Watcher的关系

3. 区别（为什么改进）
   - Vue2的缺陷
   - Vue3的优势

4. 应用（实际场景）
   - 项目中的具体使用案例
```

---

**祝你面试成功！** 🎉