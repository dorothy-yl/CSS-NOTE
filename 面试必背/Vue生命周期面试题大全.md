# Vue 生命周期面试题大全

## 基础概念类

### 1. 生命周期执行顺序
**题目：** 说出 Vue 组件完整的生命周期执行顺序

**答案：** beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeDestroy → destroyed

### 2. 各阶段能访问什么
**题目：** 每个生命周期阶段能访问到什么？

**答案：**
- beforeCreate: 无法访问 data、methods
- created: 可访问 data、methods，无法访问 DOM
- mounted: 可访问所有内容包括 DOM
- beforeDestroy: 实例仍可用，适合清理工作

### 3. Vue2 vs Vue3 生命周期对比
**题目：** Vue2 和 Vue3 生命周期有什么区别？

**答案：**
```javascript
// Vue2              // Vue3
beforeCreate    →   setup()
created         →   setup()
beforeMount     →   onBeforeMount
mounted         →   onMounted
beforeUpdate    →   onBeforeUpdate
updated         →   onUpdated
beforeDestroy   →   onBeforeUnmount
destroyed       →   onUnmounted
```

## 应用场景类

### 4. API 请求时机
**题目：** 什么时候发起异步请求比较好？

**答案：** created 或 mounted，推荐 created（更早执行）

### 5. DOM 操作时机
**题目：** 操作 DOM 元素应该在哪个生命周期？

**答案：** mounted，此时 DOM 已完全渲染

### 6. 清理工作时机
**题目：** 移除元素和清除定时器应该在哪个生命周期？

**答案：** beforeDestroy（Vue2）/ onBeforeUnmount（Vue3）

**补充说明：**
- **destroyed/onUnmounted 可以吗？** 可以，但不推荐
  - 时机过晚：组件实例已被销毁，DOM已被移除
  - 无法访问DOM：如果需要操作DOM元素进行清理，已经无法访问
  - 最佳实践：beforeDestroy/onBeforeUnmount是专门设计用于清理工作的钩子

**推荐做法：**
```javascript
// Vue2
beforeDestroy() {
  clearInterval(this.timer);
  this.$off('custom-event');
  document.removeEventListener('click', this.handler);
}

// Vue3
onBeforeUnmount(() => {
  clearInterval(timer.value);
  document.removeEventListener('click', handler);
})
```

## 组件交互类

### 7. 父子组件生命周期执行顺序
**题目：** 父子组件的生命周期执行顺序是怎样的？

**答案：** 
- **挂载：** 父beforeCreate → 父created → 父beforeMount → 子beforeCreate → 子created → 子beforeMount → 子mounted → 父mounted
- **更新：** 父beforeUpdate → 子beforeUpdate → 子updated → 父updated
- **销毁：** 父beforeDestroy → 子beforeDestroy → 子destroyed → 父destroyed

### 8. mixin 生命周期执行顺序
**题目：** mixin 和组件中同名生命周期的执行顺序？

**答案：** mixin 先执行，然后是组件本身的生命周期

### 9. 父组件监听子组件生命周期
**题目：** 父组件如何监听子组件的生命周期？

**答案：**
```javascript
// 方法1：通过 $emit
// 子组件
mounted() {
  this.$emit('mounted')
}

// 方法2：通过 hook 事件
// 父组件模板
<child @hook:mounted="onChildMounted" />
```

## 特殊场景类

### 10. keep-alive 相关生命周期
**题目：** keep-alive 组件有哪些特殊生命周期？

**答案：** activated（激活时）和 deactivated（缓存时）

### 11. 条件渲染对生命周期的影响
**题目：** v-if 和 v-show 对组件生命周期有什么影响？

**答案：**
- v-if: 组件会重新创建/销毁，触发完整生命周期
- v-show: 只改变 display，不触发生命周期

### 12. 动态组件生命周期
**题目：** 使用 `<component :is="componentName">` 切换组件时生命周期如何执行？

**答案：** 旧组件销毁（beforeDestroy → destroyed），新组件创建（beforeCreate → ... → mounted）

### 13. 路由切换对生命周期的影响
**题目：** Vue Router 路由切换时组件生命周期如何执行？

**答案：**
```javascript
// 路由离开
beforeRouteLeave → beforeDestroy → destroyed

// 路由进入  
beforeRouteEnter → beforeCreate → ... → mounted → beforeRouteEnter的next回调
```

### 14. 服务端渲染(SSR)生命周期
**题目：** SSR 中哪些生命周期会执行？

**答案：** 只有 beforeCreate 和 created，不会执行 mounted（没有DOM）

## 技术细节类

### 15. $refs 访问时机
**题目：** $refs 什么时候可以访问到？

**答案：** mounted 之后，beforeMount 时 $refs 是空对象

### 16. $nextTick 使用场景
**题目：** $nextTick 在生命周期中的作用？

**答案：** 等待 DOM 更新完成后执行回调，常在 updated 中使用

### 17. 生命周期中 this 指向问题
**题目：** 在生命周期钩子中使用箭头函数会有什么问题？

**答案：** 箭头函数没有自己的 this，会导致 this 指向错误
```javascript
// 错误
mounted: () => {
  console.log(this) // undefined 或全局对象
}

// 正确
mounted() {
  console.log(this) // Vue 实例
}
```

### 18. 异步组件生命周期
**题目：** 异步组件的生命周期是怎样的？

**答案：** 异步组件加载完成后才开始正常的生命周期流程

### 19. 递归组件生命周期
**题目：** 递归组件的生命周期执行顺序？

**答案：** 深度优先，最深层组件先 mounted，然后逐层向上

## 数据响应类

### 20. 生命周期与响应式数据
**题目：** 在 beforeCreate 中能否通过 $set 添加响应式属性？

**答案：** 不能，此时 data 选项还未初始化，$set 方法不可用

### 21. computed 计算属性工作时机
**题目：** computed 属性什么时候开始工作？

**答案：** 在 created 之后，data 初始化完成后就开始工作

### 22. watch 侦听器执行时机
**题目：** watch 中的 immediate: true 会在哪个生命周期执行？

**答案：** 在 created 和 beforeMount 之间执行
```javascript
watch: {
  msg: {
    handler() { console.log('executed') },
    immediate: true // 会在 created 后立即执行
  }
}
```

### 23. 生命周期与 Vuex
**题目：** 在生命周期中如何正确使用 Vuex？

**答案：**
```javascript
created() {
  // 可以 dispatch action
  this.$store.dispatch('fetchData')
},
beforeDestroy() {
  // 清理 subscription
  this.unsubscribe && this.unsubscribe()
}
```

## 性能优化类

### 24. 内存泄漏防范
**题目：** 如何防止组件销毁时的内存泄漏？

**答案：** 在 beforeDestroy/onBeforeUnmount 中清理定时器、事件监听器、第三方库实例

**需要清理的常见内容：**
- 定时器 (setInterval/setTimeout)
- 事件监听器
- DOM 操作产生的引用
- 第三方库实例

### 25. 生命周期性能优化
**题目：** 如何优化生命周期中的性能问题？

**答案：**
- 避免在 updated 中进行重复计算
- 使用 computed 代替 watch
- 合理使用 v-once 避免重复渲染

### 26. 生命周期与缓存策略
**题目：** 如何在生命周期中实现组件级缓存？

**答案：**
```javascript
activated() {
  // keep-alive 激活时，判断是否需要刷新数据
  if (this.needRefresh) {
    this.fetchData()
  }
}
```

### 27. 生命周期与性能监控
**题目：** 如何在生命周期中实现性能监控？

**答案：**
```javascript
created() {
  this.startTime = performance.now()
},
mounted() {
  const loadTime = performance.now() - this.startTime
  console.log(`Component loaded in ${loadTime}ms`)
}
```

## 错误处理类

### 28. 生命周期异常处理
**题目：** 如果 mounted 钩子中抛出异常会影响其他生命周期吗？

**答案：** 不会阻止后续生命周期，但会被错误边界捕获

### 29. 生命周期中的错误处理
**题目：** 如果在 created 中发生错误会怎样？

**答案：** 会被 errorCaptured 钩子捕获，或触发全局错误处理

## 高级应用类

### 30. 生命周期与事件总线
**题目：** 在哪个生命周期注册/注销事件总线比较合适？

**答案：**
- 注册：created 或 mounted
- 注销：beforeDestroy，防止内存泄漏

### 31. 生命周期与动画
**题目：** Vue 过渡动画与生命周期的关系？

**答案：**
- enter 动画在 mounted 后
- leave 动画在 beforeDestroy 前

### 32. 生命周期与插槽(slot)
**题目：** 插槽内容的生命周期是怎样的？

**答案：** 插槽内容属于父组件作用域，跟随父组件的生命周期

### 33. 生命周期与表单验证
**题目：** 表单验证应该在哪个生命周期初始化？

**答案：** mounted 中初始化，确保 DOM 元素存在

### 34. 生命周期与懒加载
**题目：** 图片懒加载应该在哪个生命周期实现？

**答案：** mounted 中初始化 IntersectionObserver

### 35. 自定义指令生命周期
**题目：** 自定义指令的生命周期与组件生命周期的关系？

**答案：**
- bind: 在 beforeMount 之前
- inserted: 在 mounted 之后
- update: 在 updated 期间

## Vue3 特有类

### 36. Vue3 Composition API 生命周期时机
**题目：** setup() 相当于 Vue2 的哪个生命周期？

**答案：** 介于 beforeCreate 和 created 之间，但在 beforeCreate 之前执行

### 37. 函数式组件生命周期
**题目：** 函数式组件有生命周期吗？

**答案：** 没有，函数式组件是无状态的，没有实例和生命周期

## 开发工具类

### 38. 生命周期调试技巧
**题目：** 如何调试生命周期执行问题？

**答案：**
- 使用 Vue DevTools
- 在每个生命周期中添加 console.log
- 使用 Vue.config.performance 性能追踪

### 39. 生命周期与单元测试
**题目：** 如何测试组件的生命周期钩子？

**答案：**
```javascript
// Jest + Vue Test Utils
test('calls mounted hook', () => {
  const mockMounted = jest.fn()
  mount(Component, {
    mounted: mockMounted
  })
  expect(mockMounted).toHaveBeenCalled()
})
```

### 40. 生命周期与 TypeScript
**题目：** 在 TypeScript 中如何正确定义生命周期？

**答案：**
```typescript
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {
  mounted(): void {
    // 类型安全的生命周期
  }
}
```

## 底层原理类

### 41. 生命周期与微任务/宏任务
**题目：** 生命周期钩子是微任务还是宏任务？

**答案：** 同步执行，但内部的 nextTick 是微任务

### 42. 生命周期版本差异
**题目：** Vue 2.6+ 和之前版本生命周期有什么变化？

**答案：** 引入了错误处理相关的 errorCaptured 生命周期钩子

---

## 总结要点

### 🎯 面试重点
1. **基础掌握**：理解每个生命周期的作用和执行时机
2. **实际应用**：知道在什么场景下使用哪个生命周期
3. **性能优化**：合理使用生命周期避免内存泄漏和性能问题
4. **框架进阶**：了解 Vue2/3 差异和特殊场景处理
5. **工程实践**：结合实际开发中的测试、调试、优化经验

### 📚 学习建议
- **理论结合实践**：不仅要记住理论，更要在项目中实际应用
- **对比学习**：Vue2 与 Vue3 的差异要熟练掌握
- **深入理解**：不仅知道怎么用，还要理解为什么这样设计
- **场景应用**：针对不同场景选择合适的生命周期钩子

### 🔧 实战技巧
- 在项目中多实践各种生命周期的使用场景
- 使用 Vue DevTools 观察生命周期的执行过程
- 编写单元测试来验证生命周期的正确性
- 关注性能优化和内存泄漏问题

---

**注意：** 这份面试题涵盖了从基础到高级的各个层面，建议根据自己的技术水平和面试要求有针对性地学习。记住，理解原理比死记硬背更重要！