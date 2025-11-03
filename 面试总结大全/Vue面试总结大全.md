# Vue面试总结大全

## 一、Vue基础

### 1. Vue生命周期

**Vue2生命周期钩子：**
- `beforeCreate` - 实例创建前
- `created` - 实例创建后
- `beforeMount` - 挂载前
- `mounted` - 挂载后
- `beforeUpdate` - 更新前
- `updated` - 更新后
- `beforeDestroy` - 销毁前
- `destroyed` - 销毁后

**Vue3生命周期钩子：**
- `setup` - 组合式API入口
- `onBeforeMount` - 挂载前
- `onMounted` - 挂载后
- `onBeforeUpdate` - 更新前
- `onUpdated` - 更新后
- `onBeforeUnmount` - 卸载前
- `onUnmounted` - 卸载后

### 2. 父子组件生命周期执行顺序

**父组件创建：**
1. 父组件 beforeCreate
2. 父组件 created
3. 父组件 beforeMount
4. 子组件 beforeCreate
5. 子组件 created
6. 子组件 beforeMount
7. 子组件 mounted
8. 父组件 mounted

**父组件更新：**
1. 父组件 beforeUpdate
2. 子组件 beforeUpdate
3. 子组件 updated
4. 父组件 updated

**父组件销毁：**
1. 父组件 beforeDestroy
2. 子组件 beforeDestroy
3. 子组件 destroyed
4. 父组件 destroyed

**Vue3父子组件生命周期执行顺序：**

**父组件创建：**
1. 父组件 setup
2. 父组件 onBeforeMount
3. 子组件 setup
4. 子组件 onBeforeMount
5. 子组件 onMounted
6. 父组件 onMounted

**父组件更新：**
1. 父组件 onBeforeUpdate
2. 子组件 onBeforeUpdate
3. 子组件 onUpdated
4. 父组件 onUpdated

**父组件卸载：**
1. 父组件 onBeforeUnmount
2. 子组件 onBeforeUnmount
3. 子组件 onUnmounted
4. 父组件 onUnmounted

### 3. keep-alive组件生命周期
- `activated` - 组件激活时
- `deactivated` - 组件失活时

## 二、Vue指令

### 1. 常用指令
- `v-if` / `v-else` / `v-else-if` - 条件渲染
- `v-show` - 显示/隐藏
- `v-for` - 列表渲染
- `v-model` - 双向绑定
- `v-bind` - 属性绑定
- `v-on` - 事件监听
- `v-text` - 文本内容
- `v-html` - HTML内容
- `v-cloak` - 防止闪烁
- `v-once` - 只渲染一次

### 2. v-if vs v-show
| 特性     | v-if             | v-show                |
| -------- | ---------------- | --------------------- |
| 渲染方式 | 条件性渲染       | 总是渲染，切换display |
| 性能     | 切换时性能开销大 | 初始渲染开销大        |
| 使用场景 | 条件很少改变     | 频繁切换              |
| DOM      | 会创建/销毁元素  | 元素始终存在          |

### 3. v-model原理
核心原理：v-model通过组合 属性绑定和事件监听，实现了数据与视图的双向同步，让开发者可以用一个简单的指令就完成复杂的双向绑定逻辑。
文本输入框：监听input事件，绑定value属性
复选框：监听change事件，绑定checked属性
单选框：监听change事件，绑定checked属性
下拉选择框：监听change事件，绑定value属性
Vue版本差异
Vue2中：自定义组件使用value属性和input事件
Vue3中：自定义组件使用modelValue属性和update:modelValue事件


v-model是语法糖，本质上是：
```vue
<!-- 使用v-model -->
<input v-model="message" />

<!-- 等价于 -->
<input 
  :value="message" 
  @input="message = $event.target.value" 
/>
```

**不同表单元素的v-model：**
```vue
<!-- 文本输入框 -->
<input v-model="text" />
<!-- 等价于 -->
<input :value="text" @input="text = $event.target.value" />

<!-- 复选框 -->
<input type="checkbox" v-model="checked" />
<!-- 等价于 -->
<input type="checkbox" :checked="checked" @change="checked = $event.target.checked" />

<!-- 下拉选择框 -->
<select v-model="selected">
  <option value="A">A</option>
  <option value="B">B</option>
</select>
<!-- 等价于 -->
<select :value="selected" @change="selected = $event.target.value">
  <option value="A">A</option>
  <option value="B">B</option>
</select>
```

### 4. 自定义组件v-model

**Vue3实现：**
```vue
<!-- 父组件使用 -->
<MyInput v-model="parentValue" />
<!-- 等价于 -->
<MyInput :modelValue="parentValue" @update:modelValue="parentValue = $event" />

<!-- 子组件实现 -->
<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>
```

**Vue2实现：**
```vue
<!-- 父组件使用 -->
<MyInput v-model="parentValue" />
<!-- 等价于 -->
<MyInput :value="parentValue" @input="parentValue = $event" />

<!-- 子组件实现 -->
<template>
  <input 
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  props: ['value']
}
</script>
```

## 三、Vue响应式原理

### 1. Vue2响应式原理

**核心机制：**
- 使用`Object.defineProperty`劫持对象属性
- 通过`getter`收集依赖
- 通过`setter`触发更新
- 使用观察者模式实现数据变化通知

**实现示例：**
```javascript
function defineReactive(obj, key, val) {
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        get() {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        },
        set(newVal) {
            if (newVal !== val) {
                val = newVal;
                dep.notify();
            }
        }
    });
}
```

**Vue2响应式的弊端：**
- 无法检测对象属性的添加/删除
- 无法检测数组索引和长度的变化
- 需要递归遍历所有属性
- 性能开销大

### 2. Vue3响应式原理

**核心机制：**
- 使用`Proxy`代理整个对象
- 通过`Reflect`操作对象属性
- 支持数组和对象的所有操作
- 性能更好，功能更强大

**实现示例：**
```javascript
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key) {
            track(target, key);
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            const result = Reflect.set(target, key, value);
            trigger(target, key);
            return result;
        }
    });
}
```

**Vue3响应式的改进：**
- 支持数组和对象的所有操作
- 性能更好
- 支持Map、Set等数据结构
- 更好的TypeScript支持

### 3. 数组变化检测

**Vue2数组方法：**
Vue2重写了以下数组方法：
- `push()`, `pop()`, `shift()`, `unshift()`
- `splice()`, `sort()`, `reverse()`

**无法检测的变化：**
- 通过索引直接设置数组项：`vm.items[index] = newValue`
- 修改数组长度：`vm.items.length = newLength`

**解决方案：**
```javascript
// Vue.set 或 this.$set
Vue.set(vm.items, index, newValue);
this.$set(this.items, index, newValue);

// 使用splice
vm.items.splice(index, 1, newValue);
```

## 四、Vue组件通信

### 1. 父子组件通信

**父传子（Props）：**
```vue
<!-- 父组件 -->
<ChildComponent :message="parentMessage" />

<!-- 子组件 -->
<script>
export default {
  props: ['message'],
  // 或
  props: {
    message: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
```

**子传父（$emit）：**
```vue
<!-- 子组件 -->
<button @click="handleClick">点击</button>
<script>
export default {
  methods: {
    handleClick() {
      this.$emit('update', '子组件数据');
    }
  }
}
</script>

<!-- 父组件 -->
<ChildComponent @update="handleUpdate" />
<script>
export default {
  methods: {
    handleUpdate(data) {
      console.log(data);
    }
  }
}
</script>
```

### 2. 兄弟组件通信

**通过父组件中转：**
```vue
<!-- 父组件 -->
<ChildA @send="handleSend" />
<ChildB :message="message" />

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    handleSend(data) {
      this.message = data;
    }
  }
}
</script>
```

**使用事件总线：**
```javascript
// eventBus.js
import Vue from 'vue';
export default new Vue();

// 组件A
import eventBus from './eventBus';
eventBus.$emit('send', '数据');

// 组件B
import eventBus from './eventBus';
eventBus.$on('send', (data) => {
  console.log(data);
});
```

### 3. 跨级组件通信

**provide/inject：**
```javascript
// 祖先组件
export default {
  provide() {
    return {
      message: this.message
    }
  }
}

// 后代组件
export default {
  inject: ['message']
}
```

**$attrs/$listeners：**
```vue
<!-- 父组件 -->
<ChildComponent v-bind="$attrs" v-on="$listeners" />
```

### 4. 状态管理

**Vuex（Vue2）：**
```javascript
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
});
```

**Pinia（Vue3）：**
```javascript
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
});
```

### 5. Pinia vs Vuex对比

| 特性           | Vuex                | Pinia               |
| -------------- | ------------------- | ------------------- |
| API设计        | 复杂，需要mutations | 简单，直接修改state |
| TypeScript支持 | 需要额外配置        | 原生支持            |
| 模块化         | 需要modules         | 自动模块化          |
| 代码分割       | 需要动态导入        | 自动代码分割        |
| 开发工具       | Vuex DevTools       | Pinia DevTools      |

## 五、Vue路由

### 1. 路由模式

**Hash模式：**
```javascript
const router = new VueRouter({
  mode: 'hash',
  routes: [...]
});
```
- URL格式：`#/path`
- 优点：兼容性好，不需要服务器配置
- 缺点：URL不美观，SEO不友好

**History模式：**
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
});
```
- URL格式：`/path`
- 优点：URL美观，SEO友好
- 缺点：需要服务器配置支持

### 2. 路由配置
```javascript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: true
  }
];
```

### 3. 路由守卫

**面试话术（三步回答）：**

**第一步：说清楚"是什么"**
Vue路由守卫是在路由跳转过程中设置的钩子函数，用来控制路由的访问权限、导航流程等。

**第二步：分类讲解**
路由守卫分为三类：
1. **全局守卫** - 在整个应用生效
   - `beforeEach` - 全局前置守卫，每次导航前触发
   - `beforeResolve` - 全局解析守卫，导航被确认前触发
   - `afterEach` - 全局后置钩子，导航完成后触发

2. **路由独享守卫** - 在路由配置中定义
   - `beforeEnter` - 只在进入该路由时触发

3. **组件内守卫** - 在组件内部定义
   - `beforeRouteEnter` - 进入组件前（无法访问this）
   - `beforeRouteUpdate` - 路由参数变化时
   - `beforeRouteLeave` - 离开组件时

**第三步：实际应用场景**
常用场景包括：权限验证、登录拦截、页面访问统计、离开提示等。

**记忆口诀：** 全局拦截用beforeEach，组件内控制用三个守卫

---

**完整执行顺序：**
```
导航被触发
  ↓
beforeRouteLeave (离开的组件)
  ↓
beforeEach (全局前置)
  ↓
beforeEnter (路由独享)
  ↓
beforeRouteEnter (进入的组件)
  ↓
beforeResolve (全局解析)
  ↓
导航被确认
  ↓
afterEach (全局后置)
  ↓
DOM更新
```

---

**代码示例：**

```javascript
// 1. 全局前置守卫 - 权限验证
router.beforeEach((to, from, next) => {
  // to: 即将进入的路由
  // from: 正要离开的路由
  // next: 必须调用，否则路由不会跳转

  if (to.meta.requiresAuth) {
    if (isAuthenticated()) {
      next(); // 放行
    } else {
      next('/login'); // 重定向到登录页
    }
  } else {
    next();
  }
});

// 2. 全局后置钩子 - 页面标题设置
router.afterEach((to, from) => {
  document.title = to.meta.title || '默认标题';
});

// 3. 路由独享守卫
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next();
      } else {
        next('/403');
      }
    }
  }
];

// 4. 组件内守卫
export default {
  // 进入组件前（无法访问this，因为组件实例还未创建）
  beforeRouteEnter(to, from, next) {
    // 可以通过next回调访问组件实例
    next(vm => {
      // vm就是组件实例
      vm.loadData();
    });
  },

  // 路由参数变化时（如 /user/1 到 /user/2）
  beforeRouteUpdate(to, from, next) {
    // 可以访问this
    this.userId = to.params.id;
    this.loadUserData();
    next();
  },

  // 离开组件时
  beforeRouteLeave(to, from, next) {
    // 可以访问this
    if (this.hasUnsavedChanges) {
      const answer = window.confirm('有未保存的更改，确定离开吗？');
      if (answer) {
        next();
      } else {
        next(false); // 取消导航
      }
    } else {
      next();
    }
  }
}
```

**重要注意事项：**
1. **必须调用next()**：每个守卫中必须调用next()，否则路由不会继续
2. **next()参数**：
   - `next()` - 放行
   - `next(false)` - 中断导航
   - `next('/path')` - 重定向到指定路由
   - `next(error)` - 导航终止并传递错误
3. **beforeRouteEnter无法访问this**：因为此时组件实例还未创建

## 六、Vue性能优化

### 1. 组件优化
- 使用`v-show`替代`v-if`（频繁切换时）
- 使用`v-once`缓存静态内容
- 使用`key`优化列表渲染
- 避免在模板中使用复杂表达式

### 2. 懒加载
```javascript
// 路由懒加载
const Home = () => import('./views/Home.vue');

// 组件懒加载
export default {
  components: {
    LazyComponent: () => import('./LazyComponent.vue')
  }
}
```

### 3. 虚拟滚动
```vue
<template>
  <div class="virtual-list" @scroll="handleScroll">
    <div :style="{ height: totalHeight + 'px' }">
      <div 
        v-for="item in visibleItems" 
        :key="item.id"
        :style="{ transform: `translateY(${item.top}px)` }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
```

### 4. 函数式组件
```vue
<template functional>
  <div class="functional-component">
    {{ props.message }}
  </div>
</template>
```

## 七、Vue3新特性

### 1. Composition API
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    const doubleCount = computed(() => count.value * 2);
    
    const increment = () => {
      count.value++;
    };
    
    onMounted(() => {
      console.log('组件已挂载');
    });
    
    return {
      count,
      doubleCount,
      increment
    };
  }
};
</script>
```

### 2. 响应式API
```javascript
import { ref, reactive, computed, watch } from 'vue';

// ref - 基本类型
const count = ref(0);
const message = ref('Hello');

// reactive - 对象类型
const state = reactive({
  name: 'Vue',
  version: '3.0'
});

// computed - 计算属性
const doubleCount = computed(() => count.value * 2);

// watch - 监听器
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});
```

### 3. 生命周期钩子
```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载');
    });
    
    onUpdated(() => {
      console.log('组件已更新');
    });
    
    onUnmounted(() => {
      console.log('组件已卸载');
    });
  }
};
```

### 4. Teleport
```vue
<template>
  <div>
    <button @click="showModal = true">显示模态框</button>
    
    <Teleport to="body">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>模态框标题</h2>
          <p>模态框内容</p>
          <button @click="showModal = false">关闭</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
```

### 5. Fragment
```vue
<template>
  <!-- Vue3支持多个根节点 -->
  <header>头部</header>
  <main>主要内容</main>
  <footer>底部</footer>
</template>
```

## 八、Vue CLI和Vite

### 1. Vue CLI
```bash
# 安装
npm install -g @vue/cli

# 创建项目
vue create my-project

# 启动开发服务器
npm run serve

# 构建生产版本
npm run build
```

### 2. Vite
```bash
# 创建项目
npm create vue@latest my-project

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 3. 配置文件
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

## 九、Vue测试

### 1. 单元测试
```javascript
// tests/unit/HelloWorld.spec.js
import { mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = mount(HelloWorld, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
```

### 2. E2E测试
```javascript
// tests/e2e/specs/test.js
describe('My Vue App', () => {
  it('should display welcome message', () => {
    cy.visit('/');
    cy.contains('Welcome to Your Vue.js App');
  });
});
```

## 十、Vue生态

### 1. UI框架
- **Element Plus** - 基于Vue3的桌面端组件库
- **Ant Design Vue** - 企业级UI设计语言
- **Vuetify** - Material Design组件库
- **Quasar** - 跨平台开发框架

### 2. 状态管理
- **Pinia** - Vue3官方推荐的状态管理库
- **Vuex** - Vue2的状态管理库

### 3. 路由
- **Vue Router** - Vue官方路由管理器

### 4. 构建工具
- **Vite** - 下一代前端构建工具
- **Vue CLI** - Vue官方脚手架工具
- **Webpack** - 模块打包器

### 5. 测试工具
- **Vue Test Utils** - Vue官方测试工具
- **Jest** - JavaScript测试框架
- **Cypress** - E2E测试框架

## 十一、Vue最佳实践

### 1. 组件设计
- 单一职责原则
- 组件命名规范
- Props验证
- 事件命名规范

### 2. 代码规范
- 使用ESLint
- 使用Prettier
- 组件文件结构
- 注释规范

### 3. 性能优化
- 合理使用v-if和v-show
- 避免在模板中使用复杂表达式
- 使用key优化列表渲染
- 懒加载和代码分割

### 4. 安全考虑
- XSS防护
- CSRF防护
- 输入验证
- 输出编码

## 十二、常见问题

### 1. 为什么Vue3使用Proxy而不是Object.defineProperty？
- Proxy可以监听整个对象，不需要递归遍历
- 支持数组和对象的所有操作
- 性能更好
- 功能更强大

### 2. Vue2和Vue3的主要区别？
- 组合式API
- 更好的TypeScript支持
- 性能提升
- 更小的包体积
- 更好的Tree-shaking

### 3. 如何选择Vue2还是Vue3？
- 新项目推荐Vue3
- 老项目可以逐步迁移
- 考虑团队技术栈
- 考虑生态成熟度

### 4. Vue的响应式原理？
- Vue2：Object.defineProperty + 观察者模式
- Vue3：Proxy + 观察者模式
- 通过依赖收集和派发更新实现响应式

### 5. 如何优化Vue应用性能？
- 使用v-show替代v-if（频繁切换时）
- 使用key优化列表渲染
- 懒加载和代码分割
- 避免在模板中使用复杂表达式
- 使用函数式组件
- 合理使用computed和watch
