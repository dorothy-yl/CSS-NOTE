# diff 算法和虚拟 DOM 面试题汇总

## 一、虚拟 DOM 基础概念

### 1. 什么是虚拟 DOM？

**详细解释：**

虚拟 DOM（Virtual DOM）是用 JavaScript 对象来描述真实 DOM 结构的一种抽象表示。它是一个轻量级的 JavaScript 对象树，每个节点包含标签名、属性、子节点等信息。

```javascript
// 真实 DOM
<div id="app">
  <p class="text">Hello World</p>
</div>

// 虚拟 DOM 表示
{
  tag: 'div',
  props: { id: 'app' },
  children: [
    {
      tag: 'p',
      props: { class: 'text' },
      children: ['Hello World']
    }
  ]
}
```

**面试背诵版：**

虚拟 DOM 是真实 DOM 的 JavaScript 对象描述，包含了标签名、属性、子节点等信息。通过在内存中操作虚拟 DOM，计算出最小的变更，再批量更新真实 DOM，避免了频繁的 DOM 操作，提高了性能。

### 2. 为什么要使用虚拟 DOM？

**详细解释：**

1. **性能优化**
   - DOM 操作是昂贵的，虚拟 DOM 通过批量更新减少 DOM 操作次数
   - JavaScript 操作对象的速度远快于操作 DOM

2. **跨平台能力**
   - 虚拟 DOM 本质是 JS 对象，可以渲染到不同平台（Web、Native、SSR）

3. **开发体验**
   - 声明式编程，无需手动操作 DOM
   - 提供了更好的抽象层，让开发者专注业务逻辑

4. **可预测性**
   - 数据驱动视图，状态变化可预测
   - 便于实现时间旅行、撤销重做等功能

**面试背诵版：**

使用虚拟 DOM 主要有四个原因：
1. 性能优化 - 批量更新 DOM，减少重排重绘
2. 跨平台能力 - 可渲染到不同平台
3. 更好的开发体验 - 声明式编程，无需手动操作 DOM
4. 提供了可预测的状态管理机制

### 3. 虚拟 DOM 的工作原理

**详细解释：**

虚拟 DOM 的工作流程分为三个步骤：

1. **创建虚拟 DOM 树**
```javascript
function createElement(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children.flat()
  }
}
```

2. **diff 算法比较差异**
```javascript
function diff(oldVNode, newVNode) {
  // 比较新旧虚拟 DOM 树的差异
  // 生成补丁（patches）
}
```

3. **patch 更新真实 DOM**
```javascript
function patch(el, patches) {
  // 根据补丁更新真实 DOM
}
```

**面试背诵版：**

虚拟 DOM 工作原理分三步：
1. 用 JavaScript 对象描述 DOM 树结构，创建虚拟 DOM
2. 状态变化时，重新生成新的虚拟 DOM 树，通过 diff 算法比较新旧树的差异
3. 根据差异生成补丁（patch），只更新变化的部分到真实 DOM

### 4. 虚拟 DOM 一定比直接操作 DOM 快吗？

**详细解释：**

不一定。虚拟 DOM 的性能优势取决于具体场景：

**虚拟 DOM 更快的场景：**
- 大量 DOM 操作时，批量更新优势明显
- 复杂应用中，避免了不必要的 DOM 操作
- 列表渲染等需要频繁更新的场景

**直接操作 DOM 更快的场景：**
- 简单的、针对性的 DOM 操作
- 只更新一个节点的文本内容
- 已知具体要修改的 DOM 元素

```javascript
// 直接操作 DOM - 简单场景下更快
document.getElementById('text').textContent = 'New Text';

// 虚拟 DOM - 需要 diff 和 patch 过程
setState({ text: 'New Text' }); // 触发整个更新流程
```

**面试背诵版：**

虚拟 DOM 不一定比直接操作 DOM 快。对于简单的、针对性的 DOM 操作，直接操作 DOM 更快。虚拟 DOM 的优势在于：
1. 大量 DOM 操作时的批量优化
2. 复杂应用中避免不必要的操作
3. 提供了更好的开发体验和可维护性
虚拟 DOM 是一种权衡，牺牲了部分性能换取了更好的开发体验和可维护性。

## 二、diff 算法原理

### 5. 什么是 diff 算法？

**详细解释：**

diff 算法是虚拟 DOM 的核心算法，用于比较新旧两棵虚拟 DOM 树的差异，计算出最小的更新操作集合。

**传统 diff 算法的问题：**
- 完整的树 diff 算法时间复杂度是 O(n³)
- 对于大型应用，这个复杂度是不可接受的

**现代框架的优化策略：**
1. 只比较同层级节点（深度优先遍历）
2. 通过 key 值判断节点是否可复用
3. 不同类型的组件直接替换

**面试背诵版：**

diff 算法是用于比较新旧虚拟 DOM 树差异的算法。传统完整树 diff 复杂度是 O(n³)，现代框架通过三个策略优化到 O(n)：
1. 只比较同层级节点，不跨层级比较
2. 不同类型的元素会产生不同的树，直接替换
3. 通过 key 值优化列表对比，提高复用率

### 6. diff 算法的优化策略

**详细解释：**

**1. 同层比较策略**
```javascript
function diffChildren(oldChildren, newChildren) {
  // 只比较同一层级的子节点
  const patches = [];
  const max = Math.max(oldChildren.length, newChildren.length);
  for (let i = 0; i < max; i++) {
    patches.push(diff(oldChildren[i], newChildren[i]));
  }
  return patches;
}
```

**2. 不同类型直接替换**
```javascript
function diff(oldVNode, newVNode) {
  // 节点类型不同，直接替换
  if (oldVNode.tag !== newVNode.tag) {
    return { type: 'REPLACE', newVNode };
  }
  // 相同类型，比较属性和子节点
  // ...
}
```

**3. key 值优化**
```javascript
function diffWithKey(oldChildren, newChildren) {
  // 建立 key -> index 映射
  const oldKeyToIdx = createKeyToOldIdx(oldChildren);
  // 通过 key 快速找到可复用节点
  // ...
}
```

**面试背诵版：**

diff 算法主要有三个优化策略：
1. **同层比较** - 只比较同一层级节点，将 O(n³) 降到 O(n)
2. **类型判断** - 不同类型组件直接替换，不再深入比较
3. **key 值优化** - 通过唯一 key 值快速识别节点，提高列表渲染性能

## 三、Vue 的 diff 算法实现

### 7. Vue2 的 diff 算法（双端比较）

**详细解释：**

Vue2 使用双端比较算法，同时从新旧子节点的两端开始比较：

```javascript
function updateChildren(oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let newEndIdx = newCh.length - 1;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 1. 旧头 vs 新头
    if (sameVnode(oldCh[oldStartIdx], newCh[newStartIdx])) {
      patchVnode(oldCh[oldStartIdx], newCh[newStartIdx]);
      oldStartIdx++;
      newStartIdx++;
    }
    // 2. 旧尾 vs 新尾
    else if (sameVnode(oldCh[oldEndIdx], newCh[newEndIdx])) {
      patchVnode(oldCh[oldEndIdx], newCh[newEndIdx]);
      oldEndIdx--;
      newEndIdx--;
    }
    // 3. 旧头 vs 新尾（需要移动）
    else if (sameVnode(oldCh[oldStartIdx], newCh[newEndIdx])) {
      patchVnode(oldCh[oldStartIdx], newCh[newEndIdx]);
      // 将旧头移动到旧尾之后
      parentElm.insertBefore(oldCh[oldStartIdx].elm, oldCh[oldEndIdx].elm.nextSibling);
      oldStartIdx++;
      newEndIdx--;
    }
    // 4. 旧尾 vs 新头（需要移动）
    else if (sameVnode(oldCh[oldEndIdx], newCh[newStartIdx])) {
      patchVnode(oldCh[oldEndIdx], newCh[newStartIdx]);
      // 将旧尾移动到旧头之前
      parentElm.insertBefore(oldCh[oldEndIdx].elm, oldCh[oldStartIdx].elm);
      oldEndIdx--;
      newStartIdx++;
    }
    // 5. 以上都不匹配，通过 key 查找
    else {
      // 通过 key 值查找可复用节点
      // ...
    }
  }

  // 处理剩余节点
  if (oldStartIdx > oldEndIdx) {
    // 添加新节点
  } else if (newStartIdx > newEndIdx) {
    // 删除旧节点
  }
}
```

**四种比较情况：**
1. 旧头 === 新头：不移动，指针后移
2. 旧尾 === 新尾：不移动，指针前移
3. 旧头 === 新尾：旧头移到最后
4. 旧尾 === 新头：旧尾移到最前

**面试背诵版：**

Vue2 使用双端比较算法，维护四个指针同时从两端比较：
1. 先比较四种情况：旧头新头、旧尾新尾、旧头新尾、旧尾新头
2. 都不匹配则通过 key 查找可复用节点
3. 比较完成后处理剩余的新增或删除节点
这种算法在大部分场景下能减少 DOM 移动次数，性能较好。

### 8. Vue3 的 diff 算法（最长递增子序列）

**详细解释：**

Vue3 优化了 diff 算法，使用最长递增子序列减少移动次数：

```javascript
function patchKeyedChildren(c1, c2) {
  let i = 0;
  let e1 = c1.length - 1;
  let e2 = c2.length - 1;

  // 1. 从头部开始同步
  while (i <= e1 && i <= e2) {
    if (isSameVNodeType(c1[i], c2[i])) {
      patch(c1[i], c2[i]);
      i++;
    } else {
      break;
    }
  }

  // 2. 从尾部开始同步
  while (i <= e1 && i <= e2) {
    if (isSameVNodeType(c1[e1], c2[e2])) {
      patch(c1[e1], c2[e2]);
      e1--;
      e2--;
    } else {
      break;
    }
  }

  // 3. 处理新增节点
  if (i > e1 && i <= e2) {
    while (i <= e2) {
      mount(c2[i++]);
    }
  }
  // 4. 处理删除节点
  else if (i > e2 && i <= e1) {
    while (i <= e1) {
      unmount(c1[i++]);
    }
  }
  // 5. 处理中间部分（最长递增子序列）
  else {
    // 建立新节点 key -> index 映射
    const keyToNewIndexMap = new Map();
    for (let i = s2; i <= e2; i++) {
      keyToNewIndexMap.set(c2[i].key, i);
    }

    // 查找需要移动的节点
    const toBePatched = e2 - s2 + 1;
    const newIndexToOldIndexMap = new Array(toBePatched).fill(0);

    // 遍历旧节点，填充映射关系
    for (let i = s1; i <= e1; i++) {
      const newIndex = keyToNewIndexMap.get(c1[i].key);
      if (newIndex !== undefined) {
        newIndexToOldIndexMap[newIndex - s2] = i + 1;
        patch(c1[i], c2[newIndex]);
      } else {
        unmount(c1[i]);
      }
    }

    // 获取最长递增子序列
    const increasingNewIndexSequence = getSequence(newIndexToOldIndexMap);
    let j = increasingNewIndexSequence.length - 1;

    // 从后向前遍历，移动节点
    for (let i = toBePatched - 1; i >= 0; i--) {
      if (newIndexToOldIndexMap[i] === 0) {
        // 新增节点
        mount(c2[s2 + i]);
      } else if (i !== increasingNewIndexSequence[j]) {
        // 需要移动
        move(c2[s2 + i]);
      } else {
        // 不需要移动
        j--;
      }
    }
  }
}
```

**最长递增子序列的作用：**
- 找出不需要移动的节点序列
- 其他节点相对于这个序列进行移动
- 最小化 DOM 移动操作

**面试背诵版：**

Vue3 优化了 diff 算法，主要步骤：
1. **头部同步** - 从头开始比较相同节点
2. **尾部同步** - 从尾开始比较相同节点
3. **处理新增/删除** - 只有新增或删除的简单情况
4. **中间乱序部分** - 使用最长递增子序列算法
   - 建立 key 映射关系
   - 找出最长递增子序列（不需要移动的节点）
   - 移动其他节点

相比 Vue2，Vue3 的算法在处理大量节点移动时性能更优。

### 9. Vue 中 key 的作用

**详细解释：**

key 是虚拟 DOM 对象的唯一标识，在 diff 算法中起到关键作用：

**1. 精准判断节点**
```javascript
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  );
}
```

**2. 就地复用策略**
```html
<!-- 没有 key -->
<li v-for="item in list">{{ item }}</li>
<!-- Vue 会就地更新元素，可能导致状态混乱 -->

<!-- 有 key -->
<li v-for="item in list" :key="item.id">{{ item }}</li>
<!-- Vue 能准确识别每个节点，正确维护组件状态 -->
```

**3. 常见问题示例**
```javascript
// 错误：使用 index 作为 key
list.map((item, index) => <Item key={index} />)
// 问题：列表顺序变化时，key 也变化，无法正确复用

// 正确：使用唯一 ID
list.map(item => <Item key={item.id} />)
```

**面试背诵版：**

key 的作用是给虚拟 DOM 节点添加唯一标识，帮助 diff 算法：
1. **精准识别节点** - 判断是否为同一节点
2. **优化列表渲染** - 提高节点复用率，减少 DOM 操作
3. **维护组件状态** - 确保组件实例的正确复用

注意：不推荐使用 index 作为 key，因为列表顺序变化会导致 key 变化，影响性能且可能导致状态错乱。应使用稳定的唯一值如 ID。

## 四、React 的 diff 算法实现

### 10. React 的 diff 算法（Reconciliation）

**详细解释：**

React 的 diff 算法也遵循三个策略，但实现细节不同：

**1. 树的 diff（tree diff）**
```javascript
function reconcileChildren(current, workInProgress, nextChildren) {
  if (current === null) {
    // 初次渲染，直接创建新节点
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    // 更新时，进行 diff
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  }
}
```

**2. 组件 diff（component diff）**
```javascript
function updateClassComponent(current, workInProgress, Component, nextProps) {
  // 同类型组件，更新 props 并调用生命周期
  if (current !== null && current.type === Component) {
    // 复用组件实例
    const instance = workInProgress.stateNode;
    instance.props = nextProps;
    instance.update();
  } else {
    // 不同类型，卸载旧组件，创建新组件
    unmountComponent(current);
    mountComponent(Component, nextProps);
  }
}
```

**3. 元素 diff（element diff）**
```javascript
function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
  // 第一轮遍历：处理更新的节点
  let oldFiber = currentFirstChild;
  let newIdx = 0;

  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    // 判断 key 是否相同
    if (oldFiber.key === newChildren[newIdx].key) {
      // key 相同，更新节点
      const newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx]);
      // ...
    } else {
      // key 不同，跳出第一轮遍历
      break;
    }
    oldFiber = oldFiber.sibling;
  }

  // 第二轮遍历：处理剩余的节点
  // 1. 删除多余的旧节点
  // 2. 插入新增的节点
  // 3. 移动节点位置
}
```

**面试背诵版：**

React 的 diff 算法（Reconciliation）分为三个层级：
1. **Tree Diff** - 只比较同层节点，不跨层级比较
2. **Component Diff** - 不同类型组件直接替换，相同类型组件更新
3. **Element Diff** - 通过 key 优化列表，分两轮遍历：
   - 第一轮：处理更新的节点（key 相同）
   - 第二轮：处理新增、删除、移动的节点

### 11. React Fiber 架构对 diff 的影响

**详细解释：**

Fiber 架构让 React 的 diff 过程可中断和恢复：

**1. 任务拆分**
```javascript
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

function shouldYield() {
  // 检查是否有更高优先级任务或超时
  return deadlineDidExpire || (deadline !== null && deadline.timeRemaining() < 1);
}
```

**2. 优先级调度**
```javascript
// 不同优先级的更新
const priorities = {
  ImmediatePriority: 1,    // 同步优先级，如用户输入
  UserBlockingPriority: 2, // 用户交互
  NormalPriority: 3,       // 普通更新
  LowPriority: 4,          // 低优先级
  IdlePriority: 5          // 空闲时执行
};
```

**3. 可中断的 diff**
```javascript
function performUnitOfWork(unitOfWork) {
  // 处理当前 fiber 节点
  const next = beginWork(unitOfWork);

  if (next === null) {
    // 没有子节点，完成当前节点
    completeUnitOfWork(unitOfWork);
  } else {
    // 继续处理子节点
    workInProgress = next;
  }

  // 检查是否需要中断
  if (shouldYield()) {
    // 保存当前进度，下次恢复
    return;
  }
}
```

**面试背诵版：**

Fiber 架构对 diff 的影响：
1. **可中断** - diff 过程可以被中断，让出主线程
2. **可恢复** - 中断后可以恢复之前的进度继续执行
3. **优先级调度** - 高优先级任务（如用户输入）可以打断低优先级任务
4. **时间分片** - 将大任务拆分成小任务，避免长时间阻塞

这使得 React 在处理大型应用时保持流畅的用户体验。

## 五、Vue 和 React diff 算法对比

### 12. Vue 和 React diff 算法的异同

**详细解释：**

**相同点：**
1. 都采用同层比较策略，O(n) 复杂度
2. 都使用 key 来识别节点
3. 都采用虚拟 DOM 技术
4. 不同类型节点直接替换

**不同点：**

| 对比维度 | Vue | React |
|---------|-----|-------|
| 算法策略 | Vue2: 双端比较<br>Vue3: 双端+最长递增子序列 | 两轮遍历 |
| 更新粒度 | 组件级更新 | 应用级更新（Fiber可中断） |
| 优化方式 | 编译时优化（静态标记） | 运行时优化（Fiber调度） |
| 列表处理 | 四种比较+key映射 | 两轮遍历处理 |

**代码示例对比：**
```javascript
// Vue - 组件级更新
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++ // 只更新当前组件
    }
  }
}

// React - 应用级更新（通过 Fiber 优化）
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
  // 触发整个应用的重新渲染（但 Fiber 会优化）
}
```

**面试背诵版：**

Vue 和 React diff 算法的对比：

**相同点：**
- 同层比较，O(n) 复杂度
- 使用 key 优化列表
- 不同类型直接替换

**不同点：**
- **算法实现**：Vue 用双端比较/最长递增子序列，React 用两轮遍历
- **更新粒度**：Vue 组件级更新，React 应用级更新
- **优化时机**：Vue 编译时优化，React 运行时调度
- **中断机制**：React Fiber 可中断，Vue 不可中断

## 六、性能优化相关

### 13. 如何优化虚拟 DOM 的性能？

**详细解释：**

**1. 合理使用 key**
```jsx
// 错误：使用 index 作为 key
{items.map((item, index) =>
  <li key={index}>{item.name}</li>
)}

// 正确：使用唯一稳定的 ID
{items.map(item =>
  <li key={item.id}>{item.name}</li>
)}
```

**2. 避免不必要的渲染**
```jsx
// Vue: 使用 v-once、v-memo
<div v-once>{{ staticContent }}</div>
<div v-memo="[item.id]">{{ expensiveComputation }}</div>

// React: 使用 memo、useMemo、useCallback
const MemoizedComponent = React.memo(Component);
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**3. 组件拆分**
```jsx
// 将变化频繁的部分拆分成独立组件
// 不好
<div>
  <StaticHeader />
  <DynamicContent />
  <StaticFooter />
</div>

// 好 - 拆分后只有 DynamicContent 会重新渲染
<StaticComponent />
<DynamicComponent />
<StaticComponent />
```

**4. 列表优化**
```jsx
// 虚拟列表（只渲染可见区域）
import { VirtualList } from '@tanstack/react-virtual';

function LargeList({ items }) {
  return (
    <VirtualList
      height={600}
      itemCount={items.length}
      itemSize={35}
      renderItem={({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    />
  );
}
```

**5. 批量更新**
```javascript
// Vue: 自动批量更新
this.a = 1;
this.b = 2;
this.c = 3;
// Vue 会自动批量更新

// React 18: 自动批处理
setCount(c => c + 1);
setFlag(f => !f);
// React 18 会自动批处理
```

**面试背诵版：**

优化虚拟 DOM 性能的方法：
1. **正确使用 key** - 使用稳定唯一的 ID，不用 index
2. **避免不必要渲染** - 使用 memo、v-once、shouldComponentUpdate
3. **合理拆分组件** - 将静态和动态部分分离
4. **列表优化** - 长列表使用虚拟滚动
5. **批量更新** - 利用框架的批处理机制
6. **懒加载** - 按需加载组件和数据

### 14. 什么时候不需要使用 key？

**详细解释：**

以下场景可以不使用 key：

**1. 静态列表**
```jsx
// 列表项永远不会改变
<ul>
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
```

**2. 没有状态的纯展示列表**
```jsx
// 简单的文本展示，没有组件状态
{['apple', 'banana', 'orange'].map(fruit =>
  <span>{fruit}</span>
)}
```

**3. 列表项顺序固定且不会变化**
```jsx
// 顺序和内容都不会变化
const staticItems = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' }
];
```

**但建议始终使用 key 的原因：**
- 保持代码一致性
- 便于未来扩展
- 避免潜在的 bug

**面试背诵版：**

理论上，静态列表、无状态的纯展示列表、顺序固定的列表可以不用 key。但实践中建议始终使用 key，因为：
1. 保持代码一致性
2. 便于未来扩展和维护
3. 避免潜在的性能问题和 bug
使用 key 是一个最佳实践，即使当前场景不需要。

### 15. 虚拟 DOM 在什么场景下性能较差？

**详细解释：**

**1. 大数据量的全量更新**
```javascript
// 10000 个节点全部更新
this.largeList = this.largeList.map(item => ({
  ...item,
  selected: true
}));
// diff 10000 个节点开销很大
```

**2. 深层嵌套的组件树**
```jsx
// 深度嵌套导致递归 diff 开销大
<A>
  <B>
    <C>
      <D>
        <E>
          {/* 更深的嵌套... */}
        </E>
      </D>
    </C>
  </B>
</A>
```

**3. 频繁的小更新**
```javascript
// 每次输入都触发完整的 diff 流程
handleInput(e) {
  this.setState({ value: e.target.value });
  // 对于简单的输入，直接操作 DOM 更快
}
```

**4. 大量 DOM 属性更新**
```jsx
// 更新大量内联样式
<div style={{
  width: x,
  height: y,
  transform: `translate(${x}px, ${y}px)`,
  // ... 更多样式
}}>
```

**优化方案：**
```javascript
// 1. 使用虚拟列表
import VirtualList from 'virtual-list';

// 2. 使用 Web Workers
const worker = new Worker('diff.worker.js');

// 3. 使用 requestAnimationFrame
requestAnimationFrame(() => {
  this.updateDOM();
});

// 4. 直接操作 DOM（特定场景）
this.$refs.input.value = newValue;
```

**面试背诵版：**

虚拟 DOM 性能较差的场景：
1. **大数据量全量更新** - diff 开销超过收益
2. **深层嵌套组件** - 递归 diff 成本高
3. **频繁的小更新** - 如输入框输入，直接操作 DOM 更快
4. **大量 DOM 属性变化** - 如动画场景

优化方案：虚拟列表、Web Workers、RAF、必要时直接操作 DOM。

## 七、实战面试题

### 16. 实现一个简单的虚拟 DOM

**详细实现：**

```javascript
// 1. 定义虚拟 DOM 结构
class VNode {
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props || {};
    this.children = children || [];
    this.key = props?.key;
  }
}

// 2. 创建虚拟 DOM
function h(tag, props, ...children) {
  return new VNode(tag, props, children.flat());
}

// 3. 渲染虚拟 DOM 为真实 DOM
function render(vnode) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  const el = document.createElement(vnode.tag);

  // 设置属性
  Object.entries(vnode.props).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      // 事件处理
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else {
      el.setAttribute(key, value);
    }
  });

  // 递归渲染子节点
  vnode.children.forEach(child => {
    el.appendChild(render(child));
  });

  return el;
}

// 4. diff 算法
function diff(oldVNode, newVNode) {
  const patches = [];

  if (!oldVNode) {
    patches.push({ type: 'CREATE', newVNode });
  } else if (!newVNode) {
    patches.push({ type: 'REMOVE' });
  } else if (typeof oldVNode === 'string' || typeof newVNode === 'string') {
    if (oldVNode !== newVNode) {
      patches.push({ type: 'TEXT', text: newVNode });
    }
  } else if (oldVNode.tag !== newVNode.tag) {
    patches.push({ type: 'REPLACE', newVNode });
  } else {
    // 比较属性
    const propPatches = diffProps(oldVNode.props, newVNode.props);
    if (propPatches.length > 0) {
      patches.push({ type: 'PROPS', propPatches });
    }

    // 比较子节点
    const childPatches = diffChildren(oldVNode.children, newVNode.children);
    if (childPatches.length > 0) {
      patches.push({ type: 'CHILDREN', childPatches });
    }
  }

  return patches;
}

// 5. 应用补丁
function patch(el, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'CREATE':
        return render(patch.newVNode);
      case 'REMOVE':
        return el.remove();
      case 'REPLACE':
        return el.replaceWith(render(patch.newVNode));
      case 'TEXT':
        return el.textContent = patch.text;
      case 'PROPS':
        patchProps(el, patch.propPatches);
        break;
      case 'CHILDREN':
        patchChildren(el, patch.childPatches);
        break;
    }
  });
}

// 使用示例
const vdom1 = h('div', { id: 'app' },
  h('h1', {}, 'Hello'),
  h('p', {}, 'World')
);

const vdom2 = h('div', { id: 'app' },
  h('h1', {}, 'Hello'),
  h('p', {}, 'Vue/React')
);

const el = render(vdom1);
document.body.appendChild(el);

const patches = diff(vdom1, vdom2);
patch(el, patches);
```

**面试背诵版：**

实现简单虚拟 DOM 需要：
1. **VNode 类** - 描述虚拟节点结构
2. **h 函数** - 创建虚拟 DOM
3. **render 函数** - 渲染成真实 DOM
4. **diff 函数** - 比较新旧虚拟 DOM 差异
5. **patch 函数** - 将差异应用到真实 DOM

核心是 diff 算法，通过比较得出最小更新集合，然后批量更新 DOM。

### 17. 为什么不建议用 index 作为 key？

**详细解释与示例：**

```javascript
// 场景1：列表顺序变化
const list = ['A', 'B', 'C'];
// 使用 index 作为 key
list.map((item, index) => <Item key={index} value={item} />);
// 渲染：
// <Item key={0} value="A" />
// <Item key={1} value="B" />
// <Item key={2} value="C" />

// 删除 'A' 后
const newList = ['B', 'C'];
// key 发生变化！
// <Item key={0} value="B" /> // 原本 key=1，现在变成 key=0
// <Item key={1} value="C" /> // 原本 key=2，现在变成 key=1

// 问题：
// 1. 组件实例被错误复用
// 2. 组件内部状态混乱
```

```javascript
// 场景2：带状态的组件
function TodoList({ todos }) {
  return todos.map((todo, index) => (
    <TodoItem
      key={index}  // 错误！
      todo={todo}
    />
  ));
}

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  // 如果列表顺序变化，isEditing 状态会错误地保留在错误的项目上
}
```

```javascript
// 场景3：性能问题
// 假设有列表 [A, B, C, D]，在最前面插入 E
// 使用 index 作为 key：
[
  <Item key={0} value="E" />, // 新建
  <Item key={1} value="A" />, // 更新（原本是 key=0）
  <Item key={2} value="B" />, // 更新（原本是 key=1）
  <Item key={3} value="C" />, // 更新（原本是 key=2）
  <Item key={4} value="D" />  // 更新（原本是 key=3）
]
// 结果：1个新建 + 4个更新 = 5次 DOM 操作

// 使用唯一 ID 作为 key：
[
  <Item key="e" value="E" />, // 新建
  <Item key="a" value="A" />, // 复用
  <Item key="b" value="B" />, // 复用
  <Item key="c" value="C" />, // 复用
  <Item key="d" value="D" />  // 复用
]
// 结果：1个新建 + 0个更新 = 1次 DOM 操作
```

**面试背诵版：**

不建议用 index 作为 key 的原因：
1. **状态错乱** - 列表顺序变化时，组件状态会错误保留
2. **性能问题** - 无法正确复用节点，导致不必要的更新
3. **动画异常** - 过渡动画可能出现在错误的元素上

示例：删除列表第一项时，所有项的 index 都会变化，导致 key 全部改变，框架认为是全新的节点，造成大量不必要的更新。应该使用稳定、唯一的值作为 key。

### 18. Vue3 的静态提升对 diff 的优化

**详细解释：**

Vue3 在编译时进行静态提升优化：

```javascript
// 模板
<template>
  <div>
    <span>静态文本</span>
    <p>{{ dynamicText }}</p>
  </div>
</template>

// Vue2 编译结果
function render() {
  return h('div', [
    h('span', '静态文本'),  // 每次都会创建
    h('p', this.dynamicText)
  ])
}

// Vue3 编译结果
const _hoisted_1 = h('span', '静态文本')  // 静态提升

function render() {
  return h('div', [
    _hoisted_1,  // 直接引用，不需要重新创建
    h('p', this.dynamicText)
  ])
}
```

**其他编译优化：**

```javascript
// 1. 静态标记（PatchFlags）
// 编译时标记动态部分
h('div', [
  h('span', { class: dynamicClass }, '文本', PatchFlags.CLASS),
  // CLASS = 2，表示只有 class 是动态的
])

// 2. 缓存事件处理函数
// Vue2
<button @click="() => handleClick(item)">

// Vue3 自动缓存
const cached = _cache[0] || (_cache[0] = () => handleClick(item))
<button @click="cached">

// 3. Block Tree
// 将动态节点收集到 block 中，跳过静态节点的 diff
const block = openBlock()
createBlock('div', null, [
  /* 只包含动态节点 */
])
```

**面试背诵版：**

Vue3 的静态提升优化：
1. **静态节点提升** - 将静态节点提升到渲染函数外，只创建一次
2. **静态属性提升** - 将静态属性提升，避免重复创建
3. **PatchFlags 标记** - 编译时标记动态内容类型，diff 时只比较动态部分
4. **缓存事件处理** - 自动缓存内联事件处理函数
5. **Block Tree** - 将动态节点收集到 block，跳过静态子树

这些优化大幅减少了运行时的 diff 开销。

## 八、高频面试问题速答

### 19. 一句话说清楚虚拟 DOM

**面试背诵版：**

虚拟 DOM 是用 JavaScript 对象描述真实 DOM 结构，通过 diff 算法比较新旧虚拟 DOM 树的差异，计算最小更新操作并批量更新真实 DOM，从而提高性能。

### 20. 一句话说清楚 diff 算法

**面试背诵版：**

diff 算法通过同层比较、类型判断、key 值复用三个策略，将树的比较复杂度从 O(n³) 优化到 O(n)，找出最小差异集并批量更新 DOM。

### 21. Vue 和 React 的 diff 有什么区别？

**面试背诵版：**

Vue 使用双端比较（Vue2）或最长递增子序列（Vue3）算法，组件级更新；React 使用两轮遍历算法，应用级更新但通过 Fiber 实现可中断。Vue 重编译时优化，React 重运行时调度。

### 22. 为什么虚拟 DOM 更快？

**面试背诵版：**

虚拟 DOM 不一定更快，它的优势在于：批量更新减少 DOM 操作次数，避免不必要的重排重绘，提供了更好的抽象让框架进行更多优化。对于简单的针对性操作，直接操作 DOM 更快。

### 23. key 的作用是什么？

**面试背诵版：**

key 是虚拟 DOM 的唯一标识，帮助 diff 算法准确识别节点，提高列表渲染时的复用率，确保组件状态的正确维护。不应使用 index 作为 key，应使用稳定的唯一值。

### 24. 什么是最长递增子序列？在 Vue3 中的作用？

**面试背诵版：**

最长递增子序列是找出数组中最长的递增序列。Vue3 用它找出不需要移动的节点序列，其他节点相对这个序列移动，从而最小化 DOM 移动操作，提高了处理大量节点移动时的性能。

### 25. React Fiber 是什么？对 diff 有什么影响？

**面试背诵版：**

Fiber 是 React 的新协调引擎，将渲染工作拆分成可中断的小任务。对 diff 的影响：可以中断和恢复 diff 过程，支持优先级调度，高优先级任务可打断低优先级任务，保证用户交互的流畅性。

## 总结

掌握虚拟 DOM 和 diff 算法需要理解：
1. **核心概念** - 虚拟 DOM 是什么，为什么需要它
2. **算法原理** - 三大策略，如何优化到 O(n)
3. **框架实现** - Vue 和 React 的不同实现方式
4. **性能优化** - 合理使用 key，避免性能陷阱
5. **实战应用** - 知道什么时候该用，什么时候不该用

记住：虚拟 DOM 是一种权衡，不是银弹。理解其原理才能在实际开发中做出正确的技术选择。