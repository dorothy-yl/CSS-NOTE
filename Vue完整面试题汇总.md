# Vue 完整面试题汇总（含Vue3最新特性）

## 第一部分：Vue 基础原理

### 1. Vue 响应式原理

**Vue 2.x 响应式原理：**
- 使用 `Object.defineProperty()` 劫持对象属性的 getter 和 setter
- 通过 Dep 收集依赖，Watcher 监听数据变化
- 数组通过重写原型方法实现响应式
- **缺陷**：无法监听对象属性的添加删除，数组索引和长度变化

```javascript
// Vue2 核心实现
function defineReactive(obj, key, val) {
  const dep = new Dep() // 依赖收集器
  
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend() // 收集依赖
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      dep.notify() // 通知更新
    }
  })
}
```

**Vue 3.x 响应式原理：**
- 使用 `Proxy` 代理整个对象，使用 `Reflect` 配合操作
- 可以监听动态新增的属性、数组索引和 length 变化
- 性能更好，内存占用更小

```javascript
// Vue3 使用 Proxy 实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key) // 收集依赖
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key) // 触发更新
      return result
    }
  })
}
```

### 2. 发布订阅模式和观察者模式

**观察者模式：**
- 观察者直接订阅主题，主题状态变化时通知观察者
- 耦合度较高

**发布订阅模式：**
- 发布者和订阅者通过事件中心进行通信
- 解耦程度更高
- Vue 的响应式系统使用观察者模式，事件系统使用发布订阅模式

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