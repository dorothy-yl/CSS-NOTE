# Vue 面试题精简版

## 🔥 核心必背知识点

### 1. Vue 响应式原理 ⭐⭐⭐⭐⭐

**口诀：依赖收集触发更新**

**Vue2：** Object.defineProperty
- 遍历data属性，转为getter/setter
- getter收集依赖，setter触发更新
- 缺陷：无法监听新增/删除属性、数组变化（如何解决）

**Vue3：** Proxy
- 直接代理整个对象
- 可监听动态属性和数组
- 性能更好，不需递归遍历

---

### 2. Diff 算法 ⭐⭐⭐⭐⭐

**口诀：同层比较、双端对比、最长递增**

**核心策略：**
1. **同层比较** - 只比较同层节点，O(n³)→O(n)
2. **组件比较** - 不同类型直接替换
3. **元素比较** - 通过key优化

**Vue2 双端比较：**
- 头头、尾尾、头尾、尾头四次比较
- 找不到则通过key查找

**Vue3 最长递增子序列：**
1. 头部同步
2. 尾部同步
3. 新增/删除节点
4. 乱序用最长递增子序列优化移动

**key的作用：**
- 标识节点身份
- 帮助Diff算法复用DOM
- ⚠️ 不要用index作key（列表会变动时）

---

### 3. Vue2 vs Vue3 ⭐⭐⭐⭐⭐

**口诀：Proxy替Object、组合替选项**

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 响应式 | Object.defineProperty | Proxy |
| API | Options API | Composition API |
| 性能 | 基准 | 快1.3-2倍 |
| 包体积 | 23KB | 13.5KB |
| TypeScript | 部分支持 | 完全支持 |
| 多根节点 | 不支持 | 支持Fragment |

---

### 4. ref vs reactive ⭐⭐⭐⭐

**口诀：ref需value，reactive不需**

```javascript
// ref - 基本类型 + 对象
const count = ref(0)
count.value++ // 需要.value

// reactive - 仅对象类型
const state = reactive({ count: 0 })
state.count++ // 不需要.value
```

| 特性 | ref | reactive |
|------|-----|----------|
| 数据类型 | 基本类型+对象 | 仅对象 |
| 访问方式 | 需.value | 直接访问 |
| 重新赋值 | 可整体替换 | 不可整体替换 |
| 解构 | 需toRefs | 需toRefs |

---

### 5. computed vs watch ⭐⭐⭐⭐

**口诀：计算缓存侦听副作用**

| 特性 | computed | watch |
|------|----------|-------|
| 缓存 | 有缓存 | 无缓存 |
| 返回值 | 必须有 | 无 |
| 异步 | 不支持 | 支持 |
| 使用场景 | 派生数据 | 副作用操作 |

```javascript
// computed - 计算属性
const doubled = computed(() => count.value * 2)

// watch - 侦听器
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal)
}, { immediate: true, deep: true })

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(count.value)
})
```

---

### 6. 组件通信 ⭐⭐⭐⭐⭐

**口诀：父子props、兄弟bus、跨级provide**

```javascript
// 1. props/emit - 父子通信
// 父组件
<Child :msg="message" @update="handleUpdate" />

// 子组件
const props = defineProps(['msg'])
const emit = defineEmits(['update'])
emit('update', newValue)

// 2. provide/inject - 跨级通信
// 祖先组件
provide('user', state)

// 后代组件
const user = inject('user')

// 3. v-model - 双向绑定
<Child v-model="value" />
// 等价于
<Child :modelValue="value" @update:modelValue="value = $event" />
```

---

### 7. 生命周期 ⭐⭐⭐⭐⭐

**口诀：创建挂载更新销毁**

| Vue2 | Vue3 | 说明 |
|------|------|------|
| beforeCreate | setup | 创建前 |
| created | setup | 创建后 |
| beforeMount | onBeforeMount | 挂载前 |
| mounted | onMounted | 挂载后 |
| beforeUpdate | onBeforeUpdate | 更新前 |
| updated | onUpdated | 更新后 |
| beforeDestroy | onBeforeUnmount | 销毁前 |
| destroyed | onUnmounted | 销毁后 |

```javascript
onMounted(() => {
  // DOM操作、API请求
})

onBeforeUnmount(() => {
  // 清理定时器、事件监听
})
```

---

### 8. nextTick ⭐⭐⭐⭐⭐

**口诀：微任务异步更新DOM**

```javascript
// 修改数据后立即使用更新后的DOM
async function updateAndScroll() {
  message.value = 'Updated'
  await nextTick()
  // DOM已更新
  scrollToBottom()
}
```

**原理：**
- Vue数据更新是异步的
- 多次修改合并为一次更新
- 使用微任务（Promise.then）实现

---

### 9. 路由传参 ⭐⭐⭐⭐

**口诀：query显示params隐藏**

```javascript
// query - 显示在URL ?id=123
router.push({ path: '/user', query: { id: 123 } })
const id = route.query.id

// params - 隐藏在路径 /user/123
router.push({ name: 'User', params: { id: 123 } })
const id = route.params.id
```

| 特性 | query | params |
|------|-------|--------|
| URL显示 | ?id=123 | /user/123 |
| 路由配置 | 不需要 | 需配置:id |
| 传递方式 | path或name | 仅name |
| 使用场景 | 可选参数 | 必要参数 |

---

### 10. v-if vs v-show ⭐⭐⭐⭐

**口诀：if销毁show隐藏**

| 特性 | v-if | v-show |
|------|------|--------|
| DOM操作 | 销毁/重建 | 切换display |
| 初始成本 | 低 | 高 |
| 切换成本 | 高 | 低 |
| 使用场景 | 条件很少改变 | 频繁切换 |

---

### 11. 性能优化 ⭐⭐⭐⭐⭐

**口诀：懒加载、缓存、虚拟列表**

```javascript
// 1. 路由懒加载
const Home = () => import('./views/Home.vue')

// 2. 组件懒加载
const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComp.vue')
)

// 3. keep-alive缓存
<keep-alive :include="['Home']">
  <router-view />
</keep-alive>

// 4. v-memo缓存列表
<div v-for="item in list" :key="item.id" v-memo="[item.id]">
  {{ item.name }}
</div>

// 5. computed缓存计算结果
const expensive = computed(() => heavyCalculation(data.value))
```

---

### 12. Composition API优势 ⭐⭐⭐⭐

**口诀：逻辑聚合易复用**

**优势：**
- 相关逻辑聚合在一起
- 更好的逻辑复用（自定义Hook）
- 更好的类型推导
- 更小的打包体积

```javascript
// 自定义Hook
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubled, increment }
}

// 使用
const { count, doubled, increment } = useCounter(10)
```

---

### 13. 发布订阅 vs 观察者模式 ⭐⭐⭐⭐

**口诀：观察者直接通知，发布订阅解耦**

**观察者模式（Vue响应式系统）：**
- Dep（被观察者）直接通知Watcher（观察者）
- 耦合度较高

**发布订阅模式（事件系统）：**
- 通过事件中心（EventBus）解耦
- $on/$emit/$off

```javascript
// 发布订阅模式
class EventBus {
  constructor() {
    this.events = {}
  }

  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(...args))
    }
  }
}
```

---

## 🎯 快速记忆表

| 知识点 | 核心口诀 |
|--------|----------|
| 响应式原理 | 依赖收集触发更新 |
| Diff算法 | 同层比较、双端对比、最长递增 |
| Vue2 vs Vue3 | Proxy替Object、组合替选项 |
| ref vs reactive | ref需value，reactive不需 |
| computed vs watch | 计算缓存侦听副作用 |
| 组件通信 | 父子props、兄弟bus、跨级provide |
| 生命周期 | 创建挂载更新销毁 |
| nextTick | 微任务异步更新DOM |
| 路由传参 | query显示params隐藏 |
| v-if vs v-show | if销毁show隐藏 |
| 性能优化 | 懒加载、缓存、虚拟列表 |
| 设计模式 | 观察者直接通知，发布订阅解耦 |
