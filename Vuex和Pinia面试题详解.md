# Vuex 和 Pinia 状态管理面试题详解

## 一、基础概念题

### 1. 什么是Vuex？它解决了什么问题？

**答案：**
Vuex是Vue官方的状态管理库，采用集中式存储管理应用的所有组件状态。

**解决的问题：**
- **多组件状态共享**：解决了父子组件、兄弟组件之间复杂的数据传递问题
- **状态管理混乱**：避免了通过事件总线或深层props传递造成的数据流混乱
- **数据持久化**：配合插件可以实现状态持久化存储
- **开发调试**：提供时间旅行调试、状态快照等DevTools功能

**适用场景：**
```javascript
// 适合使用Vuex的场景
1. 用户登录状态、用户信息
2. 购物车数据
3. 全局的配置信息
4. 多组件共享的列表数据
```

### 2. Vuex的核心概念有哪些？

**答案：**

```javascript
// 1. State - 单一状态树
const store = createStore({
  state: {
    count: 0
  }
})

// 2. Getter - store的计算属性
const store = createStore({
  state: {
    todos: [
      { id: 1, done: true },
      { id: 2, done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// 3. Mutation - 同步更改state
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    increment(state, payload) {
      state.count += payload
    }
  }
})

// 4. Action - 处理异步操作
const store = createStore({
  actions: {
    async fetchUser({ commit }, id) {
      const user = await api.getUser(id)
      commit('setUser', user)
    }
  }
})

// 5. Module - 模块化管理
const moduleA = {
  namespaced: true,
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
```

### 3. 为什么Vuex的mutation必须是同步的？

**答案：**
```javascript
// 错误示例 - 异步mutation
mutations: {
  someMutation(state) {
    api.callAsyncMethod(() => {
      state.count++ // 这里的状态改变无法被追踪
    })
  }
}

// 正确做法 - 使用action处理异步
actions: {
  async incrementAsync({ commit }) {
    await api.callAsyncMethod()
    commit('increment') // 在action中提交mutation
  }
}
```

**原因：**
1. **DevTools无法追踪**：异步操作完成时机不确定，DevTools无法准确记录状态变化
2. **调试困难**：无法确定状态是何时被更改的
3. **违背设计原则**：Vuex遵循Flux架构，mutation类似于事件，需要同步触发

### 4. Vuex中action和mutation的区别？

**答案：**

| 特性 | Mutation | Action |
|------|----------|--------|
| **执行方式** | 同步 | 可异步 |
| **调用方式** | `commit` | `dispatch` |
| **接收参数** | `(state, payload)` | `(context, payload)` |
| **职责** | 直接修改state | 提交mutation |
| **DevTools** | 可追踪 | 可追踪 |

```javascript
// Mutation - 必须同步
mutations: {
  SET_USER(state, user) {
    state.user = user
  }
}

// Action - 可以异步
actions: {
  async login({ commit }, credentials) {
    try {
      const user = await api.login(credentials)
      commit('SET_USER', user)
      return user
    } catch (error) {
      throw error
    }
  }
}

// 使用
store.commit('SET_USER', user) // mutation
store.dispatch('login', credentials) // action
```

### 5. Pinia相比Vuex有哪些优势？

**答案：**

```javascript
// Vuex写法 - 繁琐
const store = createStore({
  state: {
    count: 0
  },
  getters: {
    doubleCount: state => state.count * 2
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})

// Pinia写法 - 简洁
const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  async function incrementAsync() {
    await new Promise(r => setTimeout(r, 1000))
    count.value++
  }

  return { count, doubleCount, increment, incrementAsync }
})
```

**优势对比：**
1. **无需mutations**：直接修改state，代码更简洁
2. **更好的TypeScript支持**：自动类型推导
3. **更小的包体积**：约2KB vs 10KB
4. **更符合直觉**：Composition API风格
5. **支持多个Store**：不需要嵌套模块

## 二、实践应用题

### 6. 如何在Vuex中实现模块化？

**答案：**

```javascript
// store/modules/user.js
const userModule = {
  namespaced: true, // 开启命名空间

  state: () => ({
    userInfo: null,
    token: ''
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    userName: state => state.userInfo?.name || 'Guest'
  },

  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },

  actions: {
    async login({ commit }, credentials) {
      const { userInfo, token } = await api.login(credentials)
      commit('SET_USER_INFO', userInfo)
      commit('SET_TOKEN', token)
    },

    logout({ commit }) {
      commit('SET_USER_INFO', null)
      commit('SET_TOKEN', '')
    }
  }
}

// store/modules/cart.js
const cartModule = {
  namespaced: true,
  state: () => ({
    items: []
  }),
  // ...
}

// store/index.js
export default createStore({
  modules: {
    user: userModule,
    cart: cartModule
  }
})

// 组件中使用
computed: {
  ...mapState('user', ['userInfo', 'token']),
  ...mapGetters('user', ['isLoggedIn'])
},
methods: {
  ...mapActions('user', ['login', 'logout'])
}

// 或直接访问
this.$store.state.user.userInfo
this.$store.getters['user/isLoggedIn']
this.$store.dispatch('user/login', credentials)
```

### 7. 如何实现Vuex数据持久化？

**答案：**

```javascript
// 方法1：使用vuex-persistedstate插件
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  plugins: [
    createPersistedState({
      key: 'my-app', // 存储key
      paths: ['user.token', 'cart.items'], // 指定需要持久化的模块
      storage: window.localStorage, // 可选择sessionStorage
    })
  ],
  // ...
})

// 方法2：手动实现
const persistPlugin = store => {
  // 初始化时从localStorage读取
  const savedState = localStorage.getItem('store')
  if (savedState) {
    store.replaceState(JSON.parse(savedState))
  }

  // 监听mutation，保存到localStorage
  store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
  })
}

const store = createStore({
  plugins: [persistPlugin],
  // ...
})

// 方法3：选择性持久化
const selectivePersist = store => {
  // 只持久化特定数据
  store.subscribe((mutation, state) => {
    if (mutation.type === 'user/SET_TOKEN') {
      localStorage.setItem('token', state.user.token)
    }
  })
}
```

### 8. Pinia如何实现状态持久化？

**答案：**

```javascript
// 安装插件
npm install pinia-plugin-persistedstate

// main.js配置
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// store中使用
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref(null)

  return { token, userInfo }
}, {
  persist: true // 启用持久化
})

// 高级配置
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref(null)
  const settings = ref({})

  return { token, userInfo, settings }
}, {
  persist: {
    key: 'user-store',
    storage: sessionStorage,
    paths: ['token', 'userInfo'], // 只持久化部分状态
    beforeRestore: (context) => {
      console.log('即将恢复数据')
    },
    afterRestore: (context) => {
      console.log('数据已恢复')
    }
  }
})
```

### 9. 如何在组件外使用Vuex/Pinia？

**答案：**

```javascript
// Vuex - 在路由守卫中使用
import store from '@/store'

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['user/isLoggedIn']

  if (to.meta.requireAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

// Vuex - 在axios拦截器中使用
axios.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Pinia - 在路由守卫中使用
import { useUserStore } from '@/stores/user'

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requireAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

// Pinia - 在axios拦截器中使用
import { useUserStore } from '@/stores/user'

axios.interceptors.request.use(config => {
  const userStore = useUserStore()

  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})
```

### 10. 如何优化大型Vuex/Pinia应用？

**答案：**

```javascript
// 1. 模块拆分 - 按功能域拆分
store/
  modules/
    user/
      state.js
      getters.js
      mutations.js
      actions.js
    product/
    cart/
    order/

// 2. 命名空间 - 避免命名冲突
const userModule = {
  namespaced: true,
  // ...
}

// 3. 常量管理 - mutation types
// mutation-types.js
export const SET_USER = 'SET_USER'
export const SET_TOKEN = 'SET_TOKEN'

// 4. 严格模式 - 开发环境开启
const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  // ...
})

// 5. 动态注册模块 - 按需加载
store.registerModule('dashboard', dashboardModule)
store.unregisterModule('dashboard')

// 6. Pinia - 合理拆分Store
stores/
  user.js      // 用户相关
  cart.js      // 购物车
  product.js   // 产品列表
  order.js     // 订单管理

// 7. 使用shallowRef优化大对象
const useDataStore = defineStore('data', () => {
  // 对于不需要深度响应的大对象
  const heavyData = shallowRef(largeDataSet)

  return { heavyData }
})
```

## 三、高级面试题

### 11. 实现一个简化版的Vuex

**答案：**

```javascript
// 简化版Vuex实现
class MiniVuex {
  constructor(options) {
    this._state = reactive(options.state)
    this._getters = {}
    this._mutations = options.mutations
    this._actions = options.actions

    // 处理getters
    Object.keys(options.getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => options.getters[key](this.state)
      })
    })
  }

  get state() {
    return this._state
  }

  get getters() {
    return this._getters
  }

  commit = (type, payload) => {
    if (!this._mutations[type]) {
      throw new Error(`Mutation ${type} not found`)
    }
    this._mutations[type](this.state, payload)
  }

  dispatch = (type, payload) => {
    if (!this._actions[type]) {
      throw new Error(`Action ${type} not found`)
    }
    return this._actions[type](
      {
        state: this.state,
        getters: this.getters,
        commit: this.commit,
        dispatch: this.dispatch
      },
      payload
    )
  }
}

// 使用
const store = new MiniVuex({
  state: {
    count: 0
  },
  getters: {
    doubleCount: state => state.count * 2
  },
  mutations: {
    increment(state, payload = 1) {
      state.count += payload
    }
  },
  actions: {
    incrementAsync({ commit }, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('increment', payload)
          resolve()
        }, 1000)
      })
    }
  }
})
```

### 12. 实现一个简化版的Pinia

**答案：**

```javascript
// 简化版Pinia实现
const stores = new Map()

function defineStore(id, setup) {
  return function useStore() {
    // 单例模式
    if (!stores.has(id)) {
      const store = setup()

      // 添加$reset方法
      store.$reset = () => {
        Object.keys(store).forEach(key => {
          if (isRef(store[key])) {
            store[key].value = store[key]._initialValue
          }
        })
      }

      // 添加$patch方法
      store.$patch = (partial) => {
        Object.keys(partial).forEach(key => {
          if (isRef(store[key])) {
            store[key].value = partial[key]
          } else {
            store[key] = partial[key]
          }
        })
      }

      stores.set(id, store)
    }

    return stores.get(id)
  }
}

// 使用
const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  count._initialValue = 0 // 保存初始值

  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

### 13. Vuex的严格模式是什么？如何实现？

**答案：**

```javascript
// 严格模式配置
const store = createStore({
  strict: true, // 开启严格模式
  // 或根据环境
  strict: process.env.NODE_ENV !== 'production',

  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// 严格模式下，直接修改state会报错
store.state.count++ // Error: Do not mutate vuex store state outside mutation handlers

// 实现原理
function enableStrictMode(store) {
  store._vm.$watch(
    function () { return this._data.$$state },
    function () {
      if (!store._committing) {
        console.error('Do not mutate vuex store state outside mutation handlers')
      }
    },
    { deep: true, sync: true }
  )
}

// Vuex内部通过_committing标志位控制
class Store {
  commit(type, payload) {
    this._committing = true
    // 执行mutation
    this._mutations[type](this.state, payload)
    this._committing = false
  }
}
```

### 14. 如何监听Vuex/Pinia的状态变化？

**答案：**

```javascript
// Vuex - subscribe监听mutation
store.subscribe((mutation, state) => {
  console.log('mutation type:', mutation.type)
  console.log('mutation payload:', mutation.payload)
  console.log('state after mutation:', state)
})

// Vuex - subscribeAction监听action
store.subscribeAction({
  before: (action, state) => {
    console.log(`before action ${action.type}`)
  },
  after: (action, state) => {
    console.log(`after action ${action.type}`)
  },
  error: (action, state, error) => {
    console.error(`error in action ${action.type}`, error)
  }
})

// Vuex - watch监听特定状态
store.watch(
  (state, getters) => state.user.token,
  (newToken, oldToken) => {
    console.log('Token changed:', newToken)
  }
)

// Pinia - $subscribe监听状态变化
const store = useStore()

store.$subscribe((mutation, state) => {
  console.log('Mutation:', mutation)
  console.log('New state:', state)

  // 持久化
  localStorage.setItem('store', JSON.stringify(state))
})

// Pinia - $onAction监听action
store.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  console.log(`Start action ${name}`)

  after((result) => {
    console.log(`Action ${name} finished:`, result)
  })

  onError((error) => {
    console.error(`Action ${name} failed:`, error)
  })
})

// Pinia - 组件中使用watch
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const store = useStore()
const { someState } = storeToRefs(store)

watch(someState, (newValue, oldValue) => {
  console.log('State changed:', newValue)
})
```

### 15. 如何测试Vuex/Pinia？

**答案：**

```javascript
// Vuex单元测试
import { createStore } from 'vuex'

describe('Vuex Store', () => {
  let store

  beforeEach(() => {
    store = createStore({
      state: {
        count: 0
      },
      mutations: {
        increment(state) {
          state.count++
        }
      },
      actions: {
        incrementAsync({ commit }) {
          return new Promise(resolve => {
            setTimeout(() => {
              commit('increment')
              resolve()
            }, 100)
          })
        }
      },
      getters: {
        doubleCount: state => state.count * 2
      }
    })
  })

  test('mutation should update state', () => {
    expect(store.state.count).toBe(0)
    store.commit('increment')
    expect(store.state.count).toBe(1)
  })

  test('action should commit mutation', async () => {
    await store.dispatch('incrementAsync')
    expect(store.state.count).toBe(1)
  })

  test('getter should compute correctly', () => {
    store.state.count = 5
    expect(store.getters.doubleCount).toBe(10)
  })
})

// Pinia单元测试
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'

describe('Pinia Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('increment action should update count', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    counter.increment()
    expect(counter.count).toBe(1)
  })

  test('computed getter should work', () => {
    const counter = useCounterStore()
    counter.count = 5
    expect(counter.doubleCount).toBe(10)
  })

  test('$reset should reset state', () => {
    const counter = useCounterStore()
    counter.count = 10
    counter.$reset()
    expect(counter.count).toBe(0)
  })
})
```

## 四、最佳实践题

### 16. Vuex/Pinia在大型项目中的最佳实践？

**答案：**

```javascript
// 1. 目录结构组织
src/
  store/                 # Vuex
    index.js
    modules/
      user/
        state.js
        mutations.js
        actions.js
        getters.js
      cart/
      product/

  stores/                # Pinia
    user.js
    cart.js
    product.js
    index.js

// 2. 类型定义（TypeScript）
// types/store.ts
export interface RootState {
  version: string
}

export interface UserState {
  token: string
  userInfo: UserInfo | null
}

// store/modules/user/index.ts
import { Module } from 'vuex'
import { UserState, RootState } from '@/types/store'

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    token: '',
    userInfo: null
  },
  // ...
}

// 3. API层分离
// api/user.js
export const userApi = {
  login: (credentials) => axios.post('/login', credentials),
  logout: () => axios.post('/logout'),
  getProfile: () => axios.get('/profile')
}

// 4. 常量管理
// constants/mutation-types.js
export const USER = {
  SET_TOKEN: 'SET_TOKEN',
  SET_INFO: 'SET_INFO',
  CLEAR: 'CLEAR'
}

// 5. 插件化
// plugins/persist.js
export const persistPlugin = store => {
  // 恢复状态
  const savedState = localStorage.getItem('vuex')
  if (savedState) {
    store.replaceState(JSON.parse(savedState))
  }

  // 保存状态
  store.subscribe((mutation, state) => {
    localStorage.setItem('vuex', JSON.stringify({
      user: state.user
    }))
  })
}

// 6. 工具函数
// utils/store-helpers.js
export function createAsyncAction(type, apiCall) {
  return async ({ commit }, payload) => {
    commit(`${type}_REQUEST`)
    try {
      const response = await apiCall(payload)
      commit(`${type}_SUCCESS`, response.data)
      return response.data
    } catch (error) {
      commit(`${type}_FAILURE`, error)
      throw error
    }
  }
}
```

### 17. 如何处理Vuex/Pinia中的表单数据？

**答案：**

```javascript
// Vuex - 使用computed的get/set
<template>
  <input v-model="username" />
  <input v-model="email" />
</template>

<script>
export default {
  computed: {
    username: {
      get() {
        return this.$store.state.form.username
      },
      set(value) {
        this.$store.commit('form/SET_USERNAME', value)
      }
    },
    email: {
      get() {
        return this.$store.state.form.email
      },
      set(value) {
        this.$store.commit('form/SET_EMAIL', value)
      }
    }
  }
}
</script>

// Vuex - 使用本地数据+提交
<template>
  <form @submit="handleSubmit">
    <input v-model="localForm.username" />
    <input v-model="localForm.email" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      localForm: {
        username: '',
        email: ''
      }
    }
  },
  created() {
    // 从store初始化
    this.localForm = { ...this.$store.state.form }
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('form/submit', this.localForm)
    }
  }
}
</script>

// Pinia - 直接使用storeToRefs
<template>
  <input v-model="username" />
  <input v-model="email" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useFormStore } from '@/stores/form'

const formStore = useFormStore()
const { username, email } = storeToRefs(formStore)
</script>

// Pinia - Store定义
export const useFormStore = defineStore('form', () => {
  const username = ref('')
  const email = ref('')

  const formData = computed(() => ({
    username: username.value,
    email: email.value
  }))

  function resetForm() {
    username.value = ''
    email.value = ''
  }

  async function submitForm() {
    const data = formData.value
    await api.submitForm(data)
    resetForm()
  }

  return {
    username,
    email,
    formData,
    resetForm,
    submitForm
  }
})
```

### 18. 如何处理Vuex/Pinia的异步数据流？

**答案：**

```javascript
// Vuex - 标准异步处理
const userModule = {
  state: {
    users: [],
    loading: false,
    error: null
  },

  mutations: {
    FETCH_USERS_REQUEST(state) {
      state.loading = true
      state.error = null
    },
    FETCH_USERS_SUCCESS(state, users) {
      state.users = users
      state.loading = false
    },
    FETCH_USERS_FAILURE(state, error) {
      state.error = error
      state.loading = false
    }
  },

  actions: {
    async fetchUsers({ commit }) {
      commit('FETCH_USERS_REQUEST')
      try {
        const response = await api.getUsers()
        commit('FETCH_USERS_SUCCESS', response.data)
        return response.data
      } catch (error) {
        commit('FETCH_USERS_FAILURE', error.message)
        throw error
      }
    }
  }
}

// Pinia - 异步处理
export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchUsers() {
    loading.value = true
    error.value = null

    try {
      const response = await api.getUsers()
      users.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 使用VueUse的异步状态
  const { state, isLoading, error: fetchError, execute } = useAsyncState(
    api.getUsers,
    [],
    {
      immediate: false
    }
  )

  return {
    users: state,
    loading: isLoading,
    error: fetchError,
    fetchUsers: execute
  }
})

// 组件中处理异步
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
const { users, loading, error } = storeToRefs(store)

onMounted(async () => {
  try {
    await store.fetchUsers()
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
})
</script>
```

## 五、性能优化题

### 19. 如何优化Vuex/Pinia的性能？

**答案：**

```javascript
// 1. 使用shallowRef/shallowReactive减少响应式开销
const useDataStore = defineStore('data', () => {
  // 大数据集使用shallowRef
  const largeList = shallowRef([])

  // 只有第一层响应式
  const config = shallowReactive({
    theme: 'dark',
    nested: { deep: 'value' } // nested不是响应式
  })

  return { largeList, config }
})

// 2. 数据标准化
// 不好的做法 - 嵌套数据
state: {
  posts: [
    {
      id: 1,
      title: 'Post 1',
      author: { id: 1, name: 'John' },
      comments: [...]
    }
  ]
}

// 好的做法 - 标准化数据
state: {
  posts: {
    byId: {
      1: { id: 1, title: 'Post 1', authorId: 1 }
    },
    allIds: [1]
  },
  authors: {
    byId: {
      1: { id: 1, name: 'John' }
    }
  }
}

// 3. 使用getter缓存计算结果
getters: {
  // getter会被缓存
  expensiveComputation: (state) => {
    return state.items.reduce((acc, item) => {
      // 复杂计算
      return acc + complexCalculation(item)
    }, 0)
  }
}

// 4. 避免不必要的深度监听
// 不好
watch(
  () => state.deepObject,
  (newVal) => {
    // 处理
  },
  { deep: true } // 性能开销大
)

// 好
watch(
  () => state.deepObject.specificField,
  (newVal) => {
    // 只监听需要的字段
  }
)

// 5. 分片处理大数据
const useListStore = defineStore('list', () => {
  const items = ref([])
  const pageSize = 50
  const currentPage = ref(1)

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return items.value.slice(start, start + pageSize)
  })

  return { items, paginatedItems, currentPage }
})

// 6. 动态注册/注销模块
// 路由级别的store动态加载
router.beforeEach((to, from, next) => {
  if (to.name === 'Dashboard' && !store.hasModule('dashboard')) {
    store.registerModule('dashboard', dashboardModule)
  }
  next()
})

router.afterEach((to, from) => {
  if (from.name === 'Dashboard' && to.name !== 'Dashboard') {
    store.unregisterModule('dashboard')
  }
})
```

### 20. Vuex和Pinia的选择建议？

**答案：**

**选择Vuex的场景：**
1. 老项目维护，已经使用Vuex
2. 需要严格的单向数据流
3. 团队熟悉Vuex模式
4. 需要时间旅行调试等高级功能

**选择Pinia的场景：**
1. 新项目开发
2. 需要更好的TypeScript支持
3. 喜欢Composition API风格
4. 追求更小的包体积
5. 需要更灵活的Store组织方式

**迁移策略：**
```javascript
// 可以同时使用Vuex和Pinia，逐步迁移
// main.js
import { createStore } from 'vuex'
import { createPinia } from 'pinia'

app.use(createStore({...})) // 老模块用Vuex
app.use(createPinia())       // 新模块用Pinia

// 逐步将Vuex模块迁移到Pinia
// Vuex模块
const userModule = {
  namespaced: true,
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

// 迁移到Pinia
export const useUserStore = defineStore('user', () => {
  // 迁移state
  const state = reactive({ ... })

  // mutations变成普通函数
  function mutation1() { ... }

  // actions保持不变
  async function action1() { ... }

  return { ...toRefs(state), mutation1, action1 }
})
```

## 总结

掌握Vuex和Pinia需要理解：
1. **核心概念**：State、Getter、Mutation、Action的作用和区别
2. **设计模式**：Flux架构、单向数据流
3. **最佳实践**：模块化、命名空间、类型定义
4. **性能优化**：数据标准化、懒加载、缓存策略
5. **实际应用**：表单处理、异步数据流、持久化方案

建议通过实际项目练习，深入理解状态管理的设计思想和应用场景。