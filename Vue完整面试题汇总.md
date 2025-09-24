# Vue 完整面试题汇总（含Vue3最新特性）

## 第一部分：Vue 基础原理

### 1. Vue 响应式原理

**Vue 2.x 响应式原理：**
- 使用 `Object.defineProperty()`在页面刚开始加载的时候，Vue会遍历data中的所有属性  使用 `Object.defineProperty()转化为 getter 和 setter，当用户访问或设置某个属性时会触发对应的getter 和 setter，随后通知每个组件实例对应的一个watch方法，最后实现视图的更新
- **缺陷**：
- 对于复杂对象需要深度监听，需要一次性监听到底，计算量是非常大的，性能不好
- 对象的新增删除属性是无法监听到的，需要使用Vue.$set和Vue.$delete来辅助
- 需要重写数组方法来实现数组的监听

```

**Vue 3.x 响应式原理：**
- 使用 `Proxy` 代替了Object.defineProperty()，使用 `Reflect` 配合操作
- **优势**：可以直接监听整个对象，而不需要遍历监听属性，性能会有所提升
- Proxy可以直接监听数组的变化，而不需要去重写数组原生的方法，便利性会增加很多
- Proxy有多达13种拦截方法，功能更加强大，
- Proxy作为一个新标准，会受到浏览器厂商的重点持续的性能优化



### 2. 发布订阅模式和观察者模式

**观察者模式：**
- 观察者直接订阅主题，主题状态变化时通知观察者
- 耦合度较高
- **Vue中的应用：响应式系统核心**
  - Dep（依赖收集器）作为Subject（主题）
  - Watcher（观察者）直接订阅Dep
  - 数据变化时，Dep直接通知所有Watcher更新

**发布订阅模式：**
- 发布者和订阅者通过事件中心进行通信
- 解耦程度更高
- **Vue中的应用：事件系统**
  - $on/$emit/$off 等事件API
  - EventBus事件总线
  - 组件通信时的自定义事件

**在Vue中的具体体现：**

1. **Vue2响应式系统（观察者模式）：**
```javascript
// Vue2中的实现简化示例
class Dep {  // 依赖收集器（主题）
  constructor() {
    this.subs = []  // 存储所有观察者
  }

  addSub(watcher) {  // 添加观察者
    this.subs.push(watcher)
  }

  notify() {  // 通知所有观察者
    this.subs.forEach(watcher => watcher.update())
  }
}

class Watcher {  // 观察者
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 触发getter，收集依赖
    Dep.target = this
    this.vm[this.key]  // 触发getter
    Dep.target = null
  }

  update() {  // 数据更新时执行
    this.cb.call(this.vm, this.vm[this.key])
  }
}
```

2. **事件系统（发布订阅模式）- Vue2/Vue3通用：**
```javascript
// Vue2/Vue3都支持的事件系统简化示例
class EventBus {  // 事件中心
  constructor() {
    this.events = {}  // 事件中心
  }

  $on(event, callback) {  // 订阅
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  $emit(event, ...args) {  // 发布
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args))
    }
  }

  $off(event, callback) {  // 取消订阅
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }
}

// 使用示例
const bus = new EventBus()
bus.$on('update', (data) => console.log(data))
bus.$emit('update', 'hello')
```

3. **Vue3响应式系统（观察者模式）：**
```javascript
// Vue3中的实现简化示例
const targetMap = new WeakMap()  // 存储所有响应式对象的依赖
let activeEffect = null

// 依赖收集
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)  // 收集依赖
  }
}

// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())  // 通知所有观察者
  }
}

// reactive实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      track(target, key)  // 收集依赖
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)  // 触发更新
      return true
    }
  })
}

// effect副作用函数（相当于Vue2的Watcher）
function effect(fn) {
  activeEffect = fn
  fn()  // 执行函数，触发依赖收集
  activeEffect = null
}
```

4. **两种模式在Vue中的区别：**
   - **观察者模式（响应式）：**
     - Vue2: Dep和Watcher直接关联
     - Vue3: targetMap、track、trigger和effect机制
   - **发布订阅模式（事件）：** 通过EventBus解耦，用于组件通信（Vue2/3通用）

5. **Vue2 vs Vue3 响应式对比：**
   - **Vue2:** Object.defineProperty + Dep + Watcher
   - **Vue3:** Proxy + WeakMap + effect函数
   - **相同点:** 都基于观察者模式实现响应式
   - **不同点:** Vue3性能更好，支持数组和对象新增属性的响应式

### 3. 为什么使用 Virtual DOM

**原因：**
1. **跨平台能力**：Virtual DOM本质是JS对象，可以渲染到不同平台
2. **批量更新**：将多次DOM操作合并为一次，减少重排重绘
3. **声明式编程**：开发者只需关心数据变化，无需手动操作DOM
4. **diff算法优化**：通过diff算法找出最小变化，精确更新

### 4. Virtual DOM 的三个组成部分

1. **VNode（虚拟节点）**：用 JS 对象描述 DOM 结构
2. **diff算法**：对比新旧虚拟 DOM 树，找出差异
3. **patch（打补丁）**：将差异应用到真实 DOM

## 第二部分：Vue 3 核心语法

### 5. Vue3 新特性亮点

**性能提升：**
- 打包大小减少 41%
- 初次渲染快 55%，更新渲染快 133%
- 内存减少 54%

**新特性：**
- Composition API（setup、ref、reactive等）
- 多根节点支持（Fragment）
- Teleport（传送门）
- Suspense（异步组件）
- 更好的 TypeScript 支持

### 6. setup 函数详解

**特点：**
- Vue3 中的新配置项，是 Composition API 的"舞台"
- setup 在 beforeCreate 之前执行
- setup 中的 this 是 undefined

```vue
<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const state = reactive({
  name: 'Vue3',
  version: '3.0'
})

// 计算属性
const doubled = computed(() => count.value * 2)

// 侦听器
watch(count, (newVal, oldVal) => {
  console.log(`count changed: ${oldVal} -> ${newVal}`)
})

// 生命周期
onMounted(() => {
  console.log('mounted')
})

// 方法
const increment = () => {
  count.value++
}
</script>
```

### 7. ref 与 reactive 的区别

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
const count = ref(0)
count.value++ // 需要 .value

// reactive 使用
const state = reactive({ count: 0 })
state.count++ // 不需要 .value
```

### 8. computed 计算属性

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Zhang')
const lastName = ref('San')

// 只读计算属性
const fullName = computed(() => {
  return firstName.value + ' ' + lastName.value
})

// 可写计算属性
const fullName2 = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(val) {
    [firstName.value, lastName.value] = val.split(' ')
  }
})
</script>
```

### 9. watch 与 watchEffect

**watch：**
- 需要明确指定监视的数据源 
- 可以访问新值和旧值
- 懒执行（可配置 immediate）

**watchEffect：**
- 自动追踪依赖
- 立即执行
- 无法访问旧值


 官网：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。

* `watch`对比`watchEffect`

  > 1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
  >
  > 2. `watch`：要明确指出监视的数据
  >
  > 3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。
```javascript
// watch
watch(source, (newVal, oldVal) => {
  console.log(newVal, oldVal)
}, {
  immediate: true, // 立即执行
  deep: true // 深度监听
})

// watchEffect
watchEffect(() => {
  // 自动追踪 count.value
  console.log(count.value)
})
```

### 10. Vue3 生命周期

**Composition API 生命周期：**
- setup（创建阶段）
- onBeforeMount、onMounted（挂载阶段）
- onBeforeUpdate、onUpdated（更新阶段）
- onBeforeUnmount、onUnmounted（卸载阶段）

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件挂载完成')
})

onUpdated(() => {
  console.log('组件更新完成')
})

onUnmounted(() => {
  console.log('组件卸载完成')
})
```

### 11. Composition API 优势

**Options API 的问题：**
- 相关逻辑分散在 data、methods、computed 等选项中
- 难以复用和维护

**Composition API 的优势：**
- 相关逻辑聚合在一起
- 更好的逻辑复用（自定义 Hook）
- 更好的类型推导
- 更小的打包体积

### 12. toRefs 与 toRef

将响应式对象的属性转换为 ref：

```javascript
import { reactive, toRefs, toRef } from 'vue'

const state = reactive({
  name: 'Zhang San',
  age: 18
})

// toRefs 批量转换
const { name, age } = toRefs(state)

// toRef 单个转换
const nameRef = toRef(state, 'name')
```

## 第三部分：Vue Router

### 13. Vue Router 4.x 新特性

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(), // history 模式
  // history: createWebHashHistory(), // hash 模式
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('./views/Home.vue'), // 路由懒加载
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id',
      component: User,
      props: true // 路由参数作为 props 传递
    }
  ]
})
```

### 14. 路由导航守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// 组件内守卫（Composition API）
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('确定要离开吗？')
  if (!answer) return false
})
```

### 15. 路由传参方式

**query 参数：**
```javascript
// 传递
router.push({ path: '/user', query: { id: 123 } })
// 接收
const route = useRoute()
console.log(route.query.id)
```

**params 参数：**
```javascript
// 传递（需要使用 name）
router.push({ name: 'User', params: { id: 123 } })
// 接收
console.log(route.params.id)
```

## 第四部分：Pinia 状态管理

### 16. Pinia vs Vuex

| 特性 | Pinia | Vuex |
|-----|------|------|
| 设计理念 | 简洁直观 | 严格规范 |
| TypeScript | 完美支持 | 需要额外配置 |
| Mutations | 无 | 必须 |
| 模块化 | 天然支持多Store | 需要modules |
| 代码体积 | ~2KB | ~10KB |

### 17. Pinia 使用示例

```javascript
// store/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  
  // getters
  const doubled = computed(() => count.value * 2)
  
  // actions
  function increment() {
    count.value++
  }
  
  return { count, doubled, increment }
})

// 组件中使用
const counter = useCounterStore()
counter.increment()
```

## 第五部分：组件通信

### 18. Vue3 组件通信方式总结

1. **props / emit**：父子组件通信
2. **provide / inject**：跨级组件通信
3. **v-model**：双向数据绑定
4. **refs**：获取子组件实例
5. **$attrs**：透传属性
6. **mitt**：事件总线（替代 Vue2 的 EventBus）
7. **Pinia**：全局状态管理

### 19. v-model 在组件中的使用

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
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input 
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

### 20. provide / inject 跨级通信

```javascript
// 祖先组件
import { provide, reactive } from 'vue'

const state = reactive({
  user: 'John'
})

provide('user', state)

// 后代组件
import { inject } from 'vue'

const user = inject('user')
```

## 第六部分：性能优化

### 21. Vue 性能优化方案

**编译优化：**
1. 路由懒加载
2. 组件懒加载
3. Tree-shaking

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

### 22. keep-alive 缓存组件

```vue
<template>
  <keep-alive :include="['Home', 'About']" :max="10">
    <router-view />
  </keep-alive>
</template>

<script setup>
// 缓存的组件会触发这两个生命周期
onActivated(() => {
  console.log('组件被激活')
})

onDeactivated(() => {
  console.log('组件被缓存')
})
</script>
```

### 23. Vue3 编译优化

**优化技术：**
1. **静态提升**：将静态节点提升到 render 函数外
2. **预字符串化**：连续静态节点转为字符串
3. **缓存事件处理函数**
4. **Block Tree**：动态节点收集
5. **PatchFlag**：标记动态内容类型

```javascript
// PatchFlag 示例
const PatchFlags = {
  TEXT: 1,        // 动态文本
  CLASS: 2,       // 动态class
  STYLE: 4,       // 动态style
  PROPS: 8,       // 动态props
  FULL_PROPS: 16, // 有动态key的props
}
```

## 第七部分：TypeScript 支持

### 24. Vue3 + TypeScript 最佳实践

```typescript
// 使用 defineComponent（Options API）
import { defineComponent, PropType } from 'vue'

interface User {
  id: number
  name: string
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  }
})

// 使用 <script setup lang="ts">（Composition API）
interface Props {
  msg: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits 类型
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()

// Ref 类型
const input = ref<string>('')
const list = ref<User[]>([])
```

## 第八部分：Vue3 新组件

### 25. Teleport 传送门

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

### 26. Suspense 异步组件

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
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
)
</script>
```

### 27. Fragment 多根节点

Vue3 支持组件有多个根节点：

```vue
<template>
  <header>Header</header>
  <main>Main Content</main>
  <footer>Footer</footer>
</template>
```

## 第九部分：其他 API

### 28. 自定义 Hook

```javascript
// hooks/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return {
    count,
    doubled,
    increment,
    decrement
  }
}

// 组件中使用
const { count, doubled, increment } = useCounter(10)
```

### 29. customRef 自定义 ref

实现防抖 ref：

```javascript
import { customRef } from 'vue'

function debounceRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

// 使用
const text = debounceRef('', 500)
```

### 30. 响应式 API 进阶

```javascript
// shallowRef - 浅层响应式
const state = shallowRef({ count: 1 })

// shallowReactive - 浅层响应式对象
const state = shallowReactive({ nested: { count: 1 } })

// readonly - 深层只读
const copy = readonly(original)

// shallowReadonly - 浅层只读
const copy = shallowReadonly(original)

// toRaw - 获取原始对象
const raw = toRaw(reactive(obj))

// markRaw - 标记不可响应
const marked = markRaw(obj)
```

## 第十部分：实战问题

### 31. nextTick 的使用场景

```javascript
import { nextTick } from 'vue'

// 修改数据后立即使用更新后的 DOM
async function updateAndScroll() {
  message.value = 'Updated'
  await nextTick()
  // DOM 已更新
  scrollToBottom()
}
```

### 32. Vue3 中的 v-model 修饰符

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

### 33. 插槽（Slots）的使用

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

### 34. Vue3 与 Vue2 的主要区别总结

| 特性 | Vue 2.x | Vue 3.x |
|-----|---------|---------|
| 响应式系统 | Object.defineProperty | Proxy |
| 组件API | Options API | Composition API + Options API |
| TypeScript | 部分支持 | 完全支持 |
| 性能 | 基准 | 提升1.3~2倍 |
| 包体积 | ~23KB | ~13.5KB |
| Fragment | 不支持 | 支持多根节点 |
| Teleport | 不支持 | 内置支持 |
| Suspense | 不支持 | 内置支持 |
| 生命周期 | destroyed等 | unmounted等 |

### 35. Vite 相比 Webpack 的优势

**核心差异：**
1. **开发服务器**：Vite 使用 ESBuild（Go编写），启动速度快 10-100 倍
2. **HMR**：基于 ESM，只更新变化的模块
3. **按需编译**：不需要预先打包所有模块
4. **生产构建**：使用 Rollup，更优的 tree-shaking

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

## 面试技巧总结

### 回答问题的思路
1. **是什么**：概念理解
2. **为什么**：设计初衷和解决的问题
3. **怎么做**：实现原理
4. **优缺点**：对比分析
5. **应用场景**：实际使用

### 高频考点
- Vue3 响应式原理（Proxy vs Object.defineProperty）
- Composition API 的优势和使用
- Vue3 性能优化措施
- 组件通信的各种方式
- Pinia 与 Vuex 的区别
- TypeScript 在 Vue3 中的应用
- 虚拟 DOM 和 diff 算法
- 生命周期的变化
- 路由和状态管理
- 新特性（Teleport、Suspense、Fragment等）

### 准备建议
- 深入理解原理，不要死记硬背
- 准备实际项目经验案例
- 熟悉 Vue3 生态系统（Vite、Pinia、VueRouter 4等）
- 关注最新特性和发展趋势
- 多写代码练习，理论结合实践

## 第十一部分：高频面试题

### 36. 操作DOM元素在哪个生命周期函数执行？

**Vue 2.x：**
- **mounted**：组件挂载完成后，DOM已经渲染完成，可以安全操作DOM
- **updated**：组件更新完成后，DOM已更新，可以操作更新后的DOM

**Vue 3.x：**
- **onMounted**：对应Vue2的mounted
- **onUpdated**：对应Vue2的updated

```javascript
// Vue2 Options API
export default {
  mounted() {
    // DOM已渲染完成，可以操作DOM
    this.$refs.myElement.style.color = 'red'
  },
  updated() {
    // 组件更新后操作DOM
    this.$refs.myElement.scrollTop = 0
  }
}

// Vue3 Composition API
import { onMounted, onUpdated } from 'vue'

onMounted(() => {
  // DOM已渲染完成
  const element = document.getElementById('myElement')
  element.style.color = 'red'
})

onUpdated(() => {
  // 组件更新后
  const element = document.getElementById('myElement')
  element.scrollTop = 0
})
```

### 37. 网络请求后端API写在哪个生命周期函数里面？

**推荐位置：**
- **created/mounted**（Vue2）或 **onMounted**（Vue3）

**原因：**
1. **created**：组件实例创建完成，数据观测、属性和方法已配置，但DOM未挂载
2. **mounted**：DOM挂载完成，适合需要操作DOM的API请求

```javascript
// Vue2 - 推荐在created中
export default {
  data() {
    return {
      userList: []
    }
  },
  async created() {
    try {
      const response = await fetch('/api/users')
      this.userList = await response.json()
    } catch (error) {
      console.error('获取用户列表失败:', error)
    }
  }
}

// Vue3 - 推荐在onMounted中
import { ref, onMounted } from 'vue'

const userList = ref([])

onMounted(async () => {
  try {
    const response = await fetch('/api/users')
    userList.value = await response.json()
  } catch (error) {
    console.error('获取用户列表失败:', error)
  }
})
```

### 38. 移除定时器、移除监听函数在哪个生命周期执行？

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
      eventHandler: null
    }
  },
  mounted() {
    // 设置定时器
    this.timer = setInterval(() => {
      console.log('定时器执行')
    }, 1000)
    
    // 添加事件监听
    this.eventHandler = () => console.log('事件触发')
    window.addEventListener('resize', this.eventHandler)
  },
  beforeDestroy() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    
    // 移除事件监听
    if (this.eventHandler) {
      window.removeEventListener('resize', this.eventHandler)
      this.eventHandler = null
    }
  }
}

// Vue3
import { onMounted, onBeforeUnmount } from 'vue'

let timer = null
let eventHandler = null

onMounted(() => {
  // 设置定时器
  timer = setInterval(() => {
    console.log('定时器执行')
  }, 1000)
  
  // 添加事件监听
  eventHandler = () => console.log('事件触发')
  window.addEventListener('resize', eventHandler)
})

onBeforeUnmount(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  
  // 移除事件监听
  if (eventHandler) {
    window.removeEventListener('resize', eventHandler)
    eventHandler = null
  }
})
```

### 39. Vue2和Vue3方法名称有哪些变动？

| Vue 2.x | Vue 3.x | 说明 |
|---------|---------|------|
| `beforeCreate` | `setup` | 新增setup函数，在beforeCreate之前执行 |
| `created` | `setup` | setup函数替代created |
| `beforeMount` | `onBeforeMount` | 挂载前 |
| `mounted` | `onMounted` | 挂载后 |
| `beforeUpdate` | `onBeforeUpdate` | 更新前 |
| `updated` | `onUpdated` | 更新后 |
| `beforeDestroy` | `onBeforeUnmount` | 销毁前（名称更语义化） |
| `destroyed` | `onUnmounted` | 销毁后（名称更语义化） |
| `activated` | `onActivated` | keep-alive激活 |
| `deactivated` | `onDeactivated` | keep-alive停用 |
| `errorCaptured` | `onErrorCaptured` | 错误捕获 |

```javascript
// Vue2 生命周期
export default {
  beforeCreate() { /* ... */ },
  created() { /* ... */ },
  beforeMount() { /* ... */ },
  mounted() { /* ... */ },
  beforeUpdate() { /* ... */ },
  updated() { /* ... */ },
  beforeDestroy() { /* ... */ },
  destroyed() { /* ... */ }
}

// Vue3 生命周期
import { 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated, 
  onBeforeUnmount, 
  onUnmounted 
} from 'vue'

onBeforeMount(() => { /* ... */ })
onMounted(() => { /* ... */ })
onBeforeUpdate(() => { /* ... */ })
onUpdated(() => { /* ... */ })
onBeforeUnmount(() => { /* ... */ })
onUnmounted(() => { /* ... */ })
```

### 40. Diff算法是如何做比较的？（3点核心）

**Diff算法的三个核心策略：**

1. **同层比较，不跨层级**
   - 只比较同一层级的节点
   - 不会跨层级比较，提高性能

2. **双端比较（Vue2）或快速Diff（Vue3）**
   - **Vue2双端比较**：同时从新旧子节点的两端开始比较
   - **Vue3快速Diff**：先处理相同的前置和后置节点，再处理中间部分

3. **key值优化**
   - 使用key标识节点，避免不必要的DOM操作
   - 相同key的节点会被复用

```javascript
// Vue2 Diff算法核心逻辑（简化版）
function patchChildren(oldChildren, newChildren) {
  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1
  
  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]
  
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 1. 比较旧头和新头
    if (sameVNode(oldStartVNode, newStartVNode)) {
      patchVNode(oldStartVNode, newStartVNode)
      oldStartVNode = oldChildren[++oldStartIdx]
      newStartVNode = newChildren[++newStartIdx]
    }
    // 2. 比较旧尾和新尾
    else if (sameVNode(oldEndVNode, newEndVNode)) {
      patchVNode(oldEndVNode, newEndVNode)
      oldEndVNode = oldChildren[--oldEndIdx]
      newEndVNode = newChildren[--newEndIdx]
    }
    // 3. 比较旧头和新尾
    else if (sameVNode(oldStartVNode, newEndVNode)) {
      patchVNode(oldStartVNode, newEndVNode)
      // 移动DOM节点
      moveVNode(oldStartVNode, oldEndVNode.nextSibling)
      oldStartVNode = oldChildren[++oldStartIdx]
      newEndVNode = newChildren[--newEndIdx]
    }
    // 4. 比较旧尾和新头
    else if (sameVNode(oldEndVNode, newStartVNode)) {
      patchVNode(oldEndVNode, newStartVNode)
      // 移动DOM节点
      moveVNode(oldEndVNode, oldStartVNode)
      oldEndVNode = oldChildren[--oldEndIdx]
      newStartVNode = newChildren[++newStartIdx]
    }
    // 5. 都不匹配，创建新节点
    else {
      createVNode(newStartVNode)
      newStartVNode = newChildren[++newStartIdx]
    }
  }
}
```

### 41. 响应式原理：缺陷、Vue3改为Proxy有什么区别？

**Vue2 Object.defineProperty的缺陷：**

1. **无法监听对象属性的添加和删除**
2. **无法监听数组索引和length变化**
3. **需要递归遍历对象的所有属性**
4. **性能较差，内存占用大**

**Vue3 Proxy的优势：**

1. **可以监听动态新增的属性**
2. **可以监听数组索引和length变化**
3. **不需要递归遍历，性能更好**
4. **内存占用更小**

```javascript
// Vue2 的缺陷演示
const obj = {}
Object.defineProperty(obj, 'name', {
  get() { return this._name },
  set(val) { this._name = val }
})

obj.name = 'Vue2' // 可以监听
obj.age = 18      // 无法监听，不会触发setter

// Vue3 Proxy 的优势演示
const obj = { name: 'Vue3' }
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('get:', key)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log('set:', key, value)
    return Reflect.set(target, key, value, receiver)
  },
  deleteProperty(target, key) {
    console.log('delete:', key)
    return Reflect.deleteProperty(target, key)
  }
})

proxy.name = 'Vue3'    // 触发set
proxy.age = 18         // 触发set，新增属性也能监听
delete proxy.name       // 触发deleteProperty
```

### 42. 浏览器不兼容问题

**Vue2 兼容性：**
- IE9+（需要polyfill）
- 现代浏览器完全支持

**Vue3 兼容性：**
- IE不支持（需要Vue2）
- 现代浏览器完全支持
- 需要ES2015+环境

**解决方案：**

```javascript
// 1. 使用polyfill（Vue2）
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// 2. 条件编译（Vue3）
// vite.config.js
export default defineConfig({
  build: {
    target: 'es2015', // 设置目标环境
    polyfills: ['es.promise', 'es.symbol'] // 添加polyfill
  }
})

// 3. 浏览器检测
if (!window.Promise) {
  // 降级到Vue2或提示用户升级浏览器
  console.warn('当前浏览器不支持Vue3，请升级浏览器')
}
```

### 43. Dep算法、Proxy、Reflect对象分别是什么？

**1. Dep（依赖收集器）：**
- Vue2响应式系统的核心，负责收集和通知依赖
- 每个响应式属性都有一个Dep实例

```javascript
// Dep类的简化实现
class Dep {
  constructor() {
    this.subscribers = new Set()
  }
  
  depend() {
    if (Dep.target) {
      this.subscribers.add(Dep.target)
    }
  }
  
  notify() {
    this.subscribers.forEach(watcher => {
      watcher.update()
    })
  }
}

// 全局的当前Watcher
Dep.target = null
```

**2. Proxy（代理对象）：**
- ES6新增的元编程特性
- 可以拦截对象的基本操作（get、set、delete等）
- Vue3响应式系统的核心

```javascript
// Proxy基本用法
const target = { name: 'Vue3' }
const proxy = new Proxy(target, {
  get(target, prop, receiver) {
    console.log(`获取属性: ${prop}`)
    return target[prop]
  },
  set(target, prop, value, receiver) {
    console.log(`设置属性: ${prop} = ${value}`)
    target[prop] = value
    return true
  }
})

proxy.name  // 输出: 获取属性: name
proxy.age = 18  // 输出: 设置属性: age = 18
```

**3. Reflect（反射对象）：**
- ES6新增的全局对象
- 提供操作对象的默认行为
- 与Proxy配合使用，确保操作的一致性

```javascript
// Reflect基本用法
const obj = { name: 'Vue3' }

// 获取属性
console.log(Reflect.get(obj, 'name'))  // 'Vue3'

// 设置属性
Reflect.set(obj, 'age', 18)
console.log(obj.age)  // 18

// 删除属性
Reflect.deleteProperty(obj, 'age')
console.log(obj.hasOwnProperty('age'))  // false

// 与Proxy配合使用
const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    // 使用Reflect确保默认行为
    return Reflect.get(target, prop, receiver)
  },
  set(target, prop, value, receiver) {
    // 使用Reflect确保默认行为
    return Reflect.set(target, prop, value, receiver)
  }
})
```

### 44. watch写出来

**Vue2 Options API：**

```javascript
export default {
  data() {
    return {
      message: 'Hello',
      user: { name: 'John', age: 25 }
    }
  },
  watch: {
    // 监听简单数据
    message(newVal, oldVal) {
      console.log('message changed:', oldVal, '->', newVal)
    },
    
    // 深度监听对象
    user: {
      handler(newVal, oldVal) {
        console.log('user changed:', oldVal, '->', newVal)
      },
      deep: true,
      immediate: true
    },
    
    // 监听对象特定属性
    'user.name'(newVal, oldVal) {
      console.log('user.name changed:', oldVal, '->', newVal)
    }
  }
}
```

**Vue3 Composition API：**

```javascript
import { ref, reactive, watch, watchEffect } from 'vue'

const message = ref('Hello')
const user = reactive({ name: 'John', age: 25 })

// 1. 基础watch
watch(message, (newVal, oldVal) => {
  console.log('message changed:', oldVal, '->', newVal)
})

// 2. 监听多个数据源
watch([message, () => user.name], ([newMessage, newName], [oldMessage, oldName]) => {
  console.log('message or name changed')
})

// 3. 深度监听对象
watch(user, (newVal, oldVal) => {
  console.log('user changed:', oldVal, '->', newVal)
}, { deep: true, immediate: true })

// 4. 监听对象特定属性
watch(() => user.name, (newVal, oldVal) => {
  console.log('user.name changed:', oldVal, '->', newVal)
})

// 5. watchEffect（自动追踪依赖）
watchEffect(() => {
  console.log('message:', message.value)
  console.log('user name:', user.name)
})

// 6. 停止监听
const stopWatch = watch(message, (newVal) => {
  console.log(newVal)
})

// 在需要时停止
stopWatch()
```

### 45. Pinia插槽

**Pinia插槽（Slots）的使用：**

```javascript
// store/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement
  }
})

// 组件中使用
<template>
  <div>
    <h2>计数器: {{ counter.count }}</h2>
    <p>双倍: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">+</button>
    <button @click="counter.decrement">-</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>
```

**Pinia的高级特性：**

```javascript
// 1. 状态持久化
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  // 自动持久化到localStorage
  const token = useStorage('token', '')
  const userInfo = useStorage('userInfo', {})
  
  function login(credentials) {
    // 登录逻辑
    token.value = 'new-token'
    userInfo.value = { name: 'John' }
  }
  
  function logout() {
    token.value = ''
    userInfo.value = {}
  }
  
  return { token, userInfo, login, logout }
})

// 2. 组合多个store
import { useCounterStore } from './counter'
import { useUserStore } from './user'

export const useMainStore = defineStore('main', () => {
  const counter = useCounterStore()
  const user = useUserStore()
  
  // 组合逻辑
  const isLoggedIn = computed(() => !!user.token.value)
  
  return { counter, user, isLoggedIn }
})

// 3. 插件系统
import { createPinia } from 'pinia'

const pinia = createPinia()

// 添加插件
pinia.use(({ store }) => {
  // 为每个store添加$reset方法
  store.$reset = () => {
    store.$patch({})
  }
})

// 4. 订阅store变化
const counter = useCounterStore()

// 监听store变化
counter.$subscribe((mutation, state) => {
  console.log('Store changed:', mutation.type, state)
})

// 监听action
counter.$onAction(({ name, args, after, onError }) => {
  console.log('Action started:', name, args)
  
  after((result) => {
    console.log('Action succeeded:', result)
  })
  
  onError((error) => {
    console.log('Action failed:', error)
  })
})
```

这些高频面试题涵盖了Vue2和Vue3的核心概念、生命周期、响应式原理、性能优化等关键知识点，是面试中经常被问到的问题。建议深入理解每个概念的原理和实际应用场景。
