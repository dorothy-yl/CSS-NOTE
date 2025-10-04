# AJAX经典面试题汇总 ⭐⭐⭐⭐⭐

> 💡 **重要程度**: 高频必考（约70%的面试会涉及）
> 📌 **记忆口诀**: **创开发收、Fetch Promise、跨域CORS**
> 🎯 **学习建议**: 掌握原生XMLHttpRequest、Fetch API、跨域处理三大核心

---

## 📋 快速导航

| 章节 | 重要级别 | 核心内容 | 记忆口诀 |
|------|---------|---------|----------|
| [一、AJAX基础](#一ajax基础) | ⭐⭐⭐⭐⭐ | 概念、原理、使用 | 异步JS和XML、不刷新更新 |
| [二、XMLHttpRequest](#二xmlhttprequest) | ⭐⭐⭐⭐⭐ | 五种状态、请求流程 | 创开发收、未开头载完 |
| [三、Fetch API](#三fetch-api) | ⭐⭐⭐⭐⭐ | Promise化、现代请求 | Promise化、更简洁、更灵活 |
| [四、请求方法对比](#四请求方法对比) | ⭐⭐⭐⭐ | GET vs POST | GET显露POST隐藏 |
| [五、跨域处理](#五跨域处理) | ⭐⭐⭐⭐⭐ | CORS、JSONP、代理 | CORS首选JSONP兼容 |
| [六、高级技巧](#六高级技巧) | ⭐⭐⭐⭐ | 取消、超时、重试 | 取消用abort、超时race |
| [七、实战封装](#七实战封装) | ⭐⭐⭐⭐ | 通用请求库 | 基础配置加拦截器 |
| [八、实时通信](#八实时通信) | ⭐⭐⭐ | 轮询、长轮询、WebSocket | 轮询定时、长轮询等待、WebSocket实时 |

---

## 🎯 核心记忆口诀

### AJAX全局记忆法
```
异步JS和XML（AJAX定义）
创开发收不刷新（XMLHttpRequest流程）
Fetch Promise化（现代请求）
跨域CORS首选（解决方案）
```

### XMLHttpRequest状态记忆法
```
未开头载完（0未送、1已开、2头收、3载中、4完成）
```

### Fetch vs XHR记忆法
```
Fetch Promise化、语法更简洁
XHR回调式、功能更全面
```

---

## 一、AJAX基础

### 📝 1. 什么是 AJAX？它的全称是什么？ ⭐⭐⭐⭐⭐ 🔥

**答案：**

**定义：**
- AJAX 全称是 **Asynchronous JavaScript And XML**（异步 JavaScript 和 XML）
- 是一种在**无需重新加载整个网页**的情况下，能够**更新部分网页**的技术
- 通过在后台与服务器进行**少量数据交换**，使网页应用能够**快速地更新页面内容**

**核心特点：**
| 特点 | 说明 |
|------|------|
| **异步** | 不阻塞用户操作 |
| **局部刷新** | 只更新部分页面 |
| **用户体验好** | 无感知加载 |
| **减少带宽** | 只传输必要数据 |

**记忆口诀：**
```
异步JS和XML、不刷新更新、用户体验好
```

---

### 📝 2. AJAX 的工作原理是什么？ ⭐⭐⭐⭐⭐ 🔥

**工作流程：**

```
1. 用户触发事件
   ↓
2. JavaScript 创建 XMLHttpRequest 对象
   ↓
3. 发送异步请求到服务器
   ↓
4. 服务器处理请求并返回数据
   ↓
5. JavaScript 接收响应数据
   ↓
6. 使用 JavaScript 和 DOM 更新页面内容
   ↓
7. 用户看到更新（无需刷新）
```

**记忆口诀：**
```
创开发收改页面（创建对象、打开连接、发送请求、接收响应、改变页面）
```

---

## 二、XMLHttpRequest

### 📝 3. 如何创建一个原生的 AJAX 请求？ ⭐⭐⭐⭐⭐ 🔥

**完整请求流程：**

```javascript
// 1. 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 2. 设置请求方法和 URL（method, url, async）
xhr.open('GET', 'https://api.example.com/data', true);

// 3. 设置请求头（可选）
xhr.setRequestHeader('Content-Type', 'application/json');

// 4. 设置响应类型（可选）
xhr.responseType = 'json';

// 5. 设置回调函数（监听状态变化）
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {  // 请求完成
        if (xhr.status === 200) {  // 请求成功
            console.log('成功:', xhr.response);
        } else {
            console.error('请求失败:', xhr.status);
        }
    }
};

// 6. 发送请求
xhr.send();

// POST 请求示例
const xhrPost = new XMLHttpRequest();
xhrPost.open('POST', '/api/data', true);
xhrPost.setRequestHeader('Content-Type', 'application/json');
xhrPost.send(JSON.stringify({ name: 'test' }));
```

**记忆口诀：**
```
创（new）开（open）发（send）收（onreadystatechange）
```

**关键步骤：**
| 步骤 | 方法/属性 | 说明 |
|------|----------|------|
| 1. 创建 | `new XMLHttpRequest()` | 创建XHR对象 |
| 2. 配置 | `open(method, url, async)` | 配置请求参数 |
| 3. 设置头 | `setRequestHeader()` | 可选，设置请求头 |
| 4. 监听 | `onreadystatechange` | 监听状态变化 |
| 5. 发送 | `send(data)` | 发送请求 |

---

### 📝 4. XMLHttpRequest 的 readyState 有哪些状态？ ⭐⭐⭐⭐⭐ 🔥 ⚠️

**五种状态详解：**

| 状态值 | 常量名 | 说明 | 记忆 |
|--------|--------|------|------|
| **0** | UNSENT | 代理被创建，但尚未调用 open() | 未送 |
| **1** | OPENED | open() 方法已经被调用 | 已开 |
| **2** | HEADERS_RECEIVED | send() 已调用，响应头和状态可获得 | 头收 |
| **3** | LOADING | 下载中，responseText 包含部分数据 | 载中 |
| **4** | DONE | 下载操作已完成 | 完成 |

**记忆口诀：**
```
未开头载完（0未送、1已开、2头收、3载中、4完成）
```

**状态转换流程：**
```
0 (UNSENT)
  ↓ xhr.open()
1 (OPENED)
  ↓ xhr.send()
2 (HEADERS_RECEIVED)
  ↓ 开始接收数据
3 (LOADING)
  ↓ 数据接收完成
4 (DONE)
```

**⚠️ 重要提示：**
- 只有 `readyState === 4` 才表示请求完成
- 还需判断 `status === 200` 确认请求成功
- 每次状态改变都会触发 `onreadystatechange` 事件

---

## 三、Fetch API

### 📝 9. Fetch API 和 XMLHttpRequest 的区别？ ⭐⭐⭐⭐⭐ 🔥

**核心对比：**

| 特性 | Fetch API | XMLHttpRequest |
|------|-----------|----------------|
| **返回值** | Promise | 回调函数 |
| **语法** | 更简洁现代 | 较为复杂 |
| **错误处理** | 只在网络错误时 reject（？） | 可以处理 HTTP 错误状态 |
| **请求取消** | AbortController | abort() 方法 |
| **进度监控** | ❌ 不支持上传进度 | ✅ 支持上传/下载进度 |
| **超时设置** | 需配合 AbortController | ✅ 原生支持 timeout |
| **Cookie** | 默认不发送（需设置） | 默认发送 |
| **兼容性** | IE不支持 | 所有浏览器 |
| **代码风格** | async/await | 回调地狱 |

**Fetch 示例：**
```javascript
// 简洁的 Fetch 写法
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// async/await 写法
async function getData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**记忆口诀：**
```
Fetch Promise化、语法更简洁
XHR回调式、功能更全面
```

---

## 四、请求方法对比

### 📝 5. GET 和 POST 请求的区别？ ⭐⭐⭐⭐⭐ 🔥

**八大维度对比：**

| 特性 | GET | POST |
|------|-----|------|
| **数据位置** | URL 参数中 | 请求体中 |
| **数据大小** | 有限制（2KB左右） | 理论上无限制 |
| **安全性** | 较低，数据暴露在 URL 中 | 较高，数据在请求体中 |
| **缓存** | ✅ 可被缓存 | ❌ 不会被缓存 |
| **历史记录** | ✅ 保留在历史记录中 | ❌ 不保留 |
| **书签** | ✅ 可收藏为书签 | ❌ 不可收藏 |
| **幂等性** | ✅ 幂等（多次请求结果相同） | ❌ 非幂等 |
| **使用场景** | 查询数据 | 提交数据、修改数据 |

**记忆口诀：**
```
GET显露POST隐藏（数据位置）
GET有限POST无限（数据大小）
GET可缓POST不缓（缓存特性）
```

**代码示例：**
```javascript
// GET 请求
xhr.open('GET', '/api/users?id=1&name=张三', true);
xhr.send();

// POST 请求
xhr.open('POST', '/api/users', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({ id: 1, name: '张三' }));
```

---

## 五、跨域处理

### 📝 6. 如何处理 AJAX 跨域问题？ ⭐⭐⭐⭐⭐ 🔥 ⚠️

**四大解决方案：**

| 方案 | 优点 | 缺点 | 适用场景 | 推荐度 |
|------|------|------|----------|--------|
| **CORS** | 标准、安全、支持所有HTTP方法 | 需服务端配置 | 现代Web应用 | ⭐⭐⭐⭐⭐ |
| **JSONP** | 兼容老浏览器 | 仅GET、安全性差 | 老浏览器兼容 | ⭐⭐ |
| **代理服务器** | 前端无需修改 | 需额外服务器 | 开发/生产环境 | ⭐⭐⭐⭐ |
| **postMessage** | 安全、双向通信 | 仅窗口间通信 | iframe通信 | ⭐⭐⭐ |

**记忆口诀：**
```
CORS首选、JSONP兼容、代理万能、postMessage窗口
```

#### 1) CORS（推荐方案）⭐⭐⭐⭐⭐
```javascript
// 服务器端设置响应头
res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
res.header('Access-Control-Allow-Credentials', 'true');

// 客户端配置
fetch('http://api.example.com/data', {
  credentials: 'include', // 携带cookie
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### 2) JSONP（兼容方案）
```javascript
function jsonp(url, callback) {
    const script = document.createElement('script');
    const callbackName = 'jsonpCallback_' + Date.now();

    window[callbackName] = function(data) {
        callback(data);
        document.body.removeChild(script);
        delete window[callbackName];
    };

    script.src = `${url}?callback=${callbackName}`;
    document.body.appendChild(script);
}

// 使用
jsonp('http://api.example.com/data', (data) => {
    console.log(data);
});
```

#### 3) 代理服务器
```javascript
// Vue.js 开发环境配置
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
};
```

#### 4) postMessage（窗口通信）
```javascript
// 发送消息（主窗口）
iframe.contentWindow.postMessage(data, 'http://example.com');

// 接收消息（iframe）
window.addEventListener('message', function(e) {
    if (e.origin === 'http://example.com') {
        console.log('收到消息:', e.data);
    }
});
```

---

### 📝 7. 什么是 JSONP？它的原理和限制是什么？ ⭐⭐⭐⭐

**工作原理：**
1. 利用 `<script>` 标签没有跨域限制的特性
2. 通过动态创建 script 标签，将回调函数名传给服务器
3. 服务器返回回调函数的调用，并传入数据
4. 浏览器执行返回的JavaScript代码

**流程图：**
```
1. 客户端创建 <script> 标签
   ↓
2. 设置 src = "http://api.com/data?callback=myCallback"
   ↓
3. 服务器返回: myCallback({ data: 'xxx' })
   ↓
4. 浏览器执行回调函数 myCallback
```

**优点 vs 限制：**
| 优点 | 限制 |
|------|------|
| ✅ 兼容所有浏览器 | ❌ 只支持 GET 请求 |
| ✅ 实现简单 | ❌ 安全性差，易受 XSS 攻击 |
| ✅ 无需服务端CORS配置 | ❌ 需要服务器端配合返回特定格式 |
| | ❌ 错误处理困难 |
| | ❌ 无法获取HTTP状态码 |

**记忆口诀：**
```
script标签不跨域、回调函数传数据、只支持GET请求、安全性较差
```

---

### 📝 14. 什么是预检请求（Preflight Request）？ ⭐⭐⭐⭐⭐ 🔥 ⚠️

**定义：**
- 预检请求是浏览器在发送跨域请求前，先发送一个 **OPTIONS 请求**到服务器
- 用于检查服务器是否允许该实际请求

**触发条件（非简单请求）：**
1. 使用了 **PUT、DELETE、PATCH** 等方法
2. Content-Type 为 **application/json**
3. 请求设置了**自定义头部**

**简单请求 vs 非简单请求：**
| 类型 | 请求方法 | Content-Type | 自定义头 | 是否预检 |
|------|----------|--------------|----------|----------|
| **简单请求** | GET/POST/HEAD | text/plain<br>multipart/form-data<br>application/x-www-form-urlencoded | 无 | ❌ |
| **非简单请求** | PUT/DELETE/PATCH等 | application/json | 有 | ✅ |

**示例：**
```javascript
// 会触发预检请求
fetch('http://api.example.com/data', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'value'
    },
    body: JSON.stringify({ name: 'test' })
});

// 浏览器会先发送 OPTIONS 请求
// OPTIONS /data HTTP/1.1
// Access-Control-Request-Method: PUT
// Access-Control-Request-Headers: X-Custom-Header
```

**记忆口诀：**
```
非简单请求先预检、OPTIONS请求问服务器、允许才发真请求
```

---

## 六、高级技巧

### 📝 8. 如何取消一个 AJAX 请求？ ⭐⭐⭐⭐

**两种方式对比：**

| 方式 | XMLHttpRequest | Fetch API |
|------|----------------|-----------|
| **取消方法** | xhr.abort() | controller.abort() |
| **错误检测** | xhr.status === 0 | err.name === 'AbortError' |
| **使用难度** | 简单 | 需配合 AbortController |

#### 1) XMLHttpRequest 方式
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data');
xhr.send();

// 取消请求
xhr.abort();

// 检测取消
xhr.onabort = function() {
    console.log('请求已取消');
};
```

#### 2) Fetch API 使用 AbortController
```javascript
const controller = new AbortController();

fetch('/api/data', {
    signal: controller.signal
})
.then(response => response.json())
.then(data => console.log(data))
.catch(err => {
    if (err.name === 'AbortError') {
        console.log('请求被取消');
    }
});

// 5秒后自动取消
setTimeout(() => controller.abort(), 5000);
```

**记忆口诀：**
```
XHR用abort、Fetch用AbortController
```

---

### 📝 10. 如何实现 AJAX 请求的超时处理？ ⭐⭐⭐⭐

**两种实现方式：**

#### 1) XMLHttpRequest（原生支持）
```javascript
const xhr = new XMLHttpRequest();
xhr.timeout = 5000; // 5秒超时
xhr.ontimeout = function() {
    console.error('请求超时');
};
xhr.open('GET', '/api/data');
xhr.send();
```

#### 2) Fetch API（Promise.race 实现）
```javascript
function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('请求超时')), timeout)
        )
    ]);
}

// 使用
fetchWithTimeout('/api/data', 5000)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

#### 3) Fetch + AbortController（推荐）
```javascript
function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return fetch(url, { signal: controller.signal })
        .finally(() => clearTimeout(timeoutId));
}
```

**记忆口诀：**
```
XHR原生timeout、Fetch用race或abort
```

---

### 📝 11. 如何实现 AJAX 请求的重试机制？ ⭐⭐⭐⭐

**核心思路：**
1. **失败后重试**：检测到错误后再次发送请求
2. **指数退避**：每次重试延迟时间翻倍（1s → 2s → 4s）
3. **最大重试次数**：避免无限重试

**实现代码：**
```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        } catch (error) {
            // 最后一次重试失败，抛出错误
            if (i === retries - 1) {
                throw error;
            }
            // 指数退避：1s、2s、4s
            const delay = 1000 * Math.pow(2, i);
            console.log(`请求失败，${delay}ms 后重试（${i + 1}/${retries}）`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// 使用示例
fetchWithRetry('/api/data', {}, 3)
    .then(res => res.json())
    .then(data => console.log('成功:', data))
    .catch(err => console.error('所有重试失败:', err));
```

**重试策略对比：**
| 策略 | 延迟时间 | 适用场景 |
|------|----------|----------|
| **固定延迟** | 每次都是1s | 轻量请求 |
| **线性退避** | 1s、2s、3s | 一般请求 |
| **指数退避** | 1s、2s、4s | 推荐，避免服务器压力 |

**记忆口诀：**
```
失败重试、指数退避、设置上限
```

---

### 📝 12. 如何实现 AJAX 请求的并发控制？ ⭐⭐⭐⭐

**核心思路：**
- 限制同时进行的请求数量
- 超出限制的请求进入队列等待
- 有请求完成后，从队列中取出下一个请求

**实现代码：**
```javascript
class RequestQueue {
    constructor(maxConcurrent = 5) {
        this.maxConcurrent = maxConcurrent;  // 最大并发数
        this.running = 0;                     // 当前运行数
        this.queue = [];                      // 等待队列
    }

    async add(promiseCreator) {
        // 如果达到最大并发，进入队列等待
        if (this.running >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }

        this.running++;
        try {
            const result = await promiseCreator();
            return result;
        } finally {
            this.running--;
            // 完成后，执行队列中的下一个请求
            if (this.queue.length > 0) {
                const resolve = this.queue.shift();
                resolve();
            }
        }
    }
}

// 使用示例：限制最多3个并发请求
const queue = new RequestQueue(3);
const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];

const promises = urls.map(url =>
    queue.add(() => fetch(url).then(res => res.json()))
);

Promise.all(promises).then(results => {
    console.log('所有请求完成:', results);
});
```

**应用场景：**
| 场景 | 并发数 | 原因 |
|------|--------|------|
| 图片加载 | 6-8 | 浏览器默认限制 |
| 文件上传 | 3-5 | 避免占用带宽 |
| 批量请求 | 5-10 | 避免服务器压力 |

**记忆口诀：**
```
队列控制、达限等待、完成唤醒
```

---

### 📝 13. 如何处理 AJAX 请求的缓存？ ⭐⭐⭐⭐

**三种缓存策略：**

#### 1) 禁用缓存（强制刷新）
```javascript
// 方法一：添加时间戳
const url = `/api/data?t=${Date.now()}`;

// 方法二：设置请求头
fetch('/api/data', {
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    }
});
```

#### 2) 使用HTTP缓存
```javascript
// 让浏览器自动处理缓存
fetch('/api/data', {
    cache: 'default'  // default、no-cache、reload、force-cache
});
```

#### 3) 实现内存缓存（推荐）⭐⭐⭐⭐
```javascript
class AjaxCache {
    constructor(expireTime = 60000) {
        this.cache = new Map();
        this.expireTime = expireTime;
    }

    async request(url, options = {}) {
        const key = `${url}_${JSON.stringify(options)}`;

        // 检查缓存
        if (this.cache.has(key)) {
            const cached = this.cache.get(key);
            if (Date.now() < cached.expireAt) {
                console.log('从缓存读取');
                return cached.data;
            } else {
                this.cache.delete(key);  // 清除过期缓存
            }
        }

        // 发送请求
        const response = await fetch(url, options);
        const data = await response.json();

        // 存入缓存
        this.cache.set(key, {
            data,
            expireAt: Date.now() + this.expireTime
        });

        return data;
    }
}

// 使用示例
const ajaxCache = new AjaxCache(60000);  // 缓存60秒
ajaxCache.request('/api/users').then(data => console.log(data));
```

**缓存策略对比：**
| 策略 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **禁用缓存** | 数据最新 | 浪费带宽 | 实时数据 |
| **HTTP缓存** | 自动管理 | 不灵活 | 静态资源 |
| **内存缓存** | 灵活可控 | 占用内存 | 频繁请求 |

**记忆口诀：**
```
时间戳防缓存、HTTP自动管、内存可控制
```

---

## 七、实战封装

### 📝 15. 如何封装一个通用的 AJAX 请求函数？ ⭐⭐⭐⭐⭐

**完整的请求库封装：**

```javascript
class Ajax {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.timeout = 10000;
        this.headers = {
            'Content-Type': 'application/json'
        };
        this.interceptors = {
            request: [],
            response: []
        };
    }

    // 请求拦截器
    useRequestInterceptor(fn) {
        this.interceptors.request.push(fn);
    }

    // 响应拦截器
    useResponseInterceptor(fn) {
        this.interceptors.response.push(fn);
    }

    async request(config) {
        const { url, method = 'GET', data, params, headers = {} } = config;

        let fullUrl = this.baseURL + url;

        // 处理 GET 参数
        if (params) {
            const queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        }

        // 设置请求配置
        let options = {
            method,
            headers: { ...this.headers, ...headers }
        };

        // 处理请求体
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        // 执行请求拦截器
        for (const interceptor of this.interceptors.request) {
            options = await interceptor(options);
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            let response = await fetch(fullUrl, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // 执行响应拦截器
            for (const interceptor of this.interceptors.response) {
                response = await interceptor(response);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('请求超时');
            }
            throw error;
        }
    }

    get(url, params) {
        return this.request({ url, method: 'GET', params });
    }

    post(url, data) {
        return this.request({ url, method: 'POST', data });
    }

    put(url, data) {
        return this.request({ url, method: 'PUT', data });
    }

    delete(url) {
        return this.request({ url, method: 'DELETE' });
    }
}

// 使用示例
const api = new Ajax('https://api.example.com');

// 请求拦截器：添加token
api.useRequestInterceptor(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// 响应拦截器：处理错误
api.useResponseInterceptor(async (response) => {
    if (response.status === 401) {
        // 跳转到登录页
        window.location.href = '/login';
    }
    return response;
});

// 发送请求
api.get('/users', { page: 1 })
   .then(data => console.log(data))
   .catch(error => console.error(error));
```

**封装要点：**
| 功能 | 说明 |
|------|------|
| **基础URL** | 统一配置API地址 |
| **超时处理** | AbortController实现 |
| **请求拦截器** | 统一添加token等 |
| **响应拦截器** | 统一错误处理 |
| **便捷方法** | get/post/put/delete |

**记忆口诀：**
```
基础配置加拦截器、超时取消和便捷方法
```

---

## 八、实时通信

### 📝 16. 什么是 AJAX 轮询、长轮询和 WebSocket？ ⭐⭐⭐⭐

**三种实时通信方案对比：**

| 方案 | 原理 | 优点 | 缺点 | 适用场景 |
|------|------|------|------|----------|
| **轮询** | 定时发送请求 | 实现简单 | 实时性差、浪费资源 | 实时性要求不高 |
| **长轮询** | 服务器有数据才返回 | 减少无效请求 | 实现复杂、占用连接 | 中等实时性 |
| **WebSocket** | 全双工通信 | 实时性最好、双向通信 | 兼容性较差、实现复杂 | 实时聊天、游戏 |

#### 1) 轮询（Polling）
```javascript
function polling() {
    setInterval(async () => {
        try {
            const response = await fetch('/api/data');
            const data = await response.json();
            console.log('收到数据:', data);
        } catch (error) {
            console.error('请求失败:', error);
        }
    }, 5000);  // 每5秒请求一次
}

polling();
```

#### 2) 长轮询（Long Polling）
```javascript
async function longPolling() {
    while (true) {
        try {
            const response = await fetch('/api/data', {
                // 服务器会保持连接直到有数据或超时
            });
            const data = await response.json();
            console.log('收到数据:', data);
            // 立即发起下一次请求
        } catch (error) {
            console.error('请求失败:', error);
            // 失败后等待1秒再重试
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

longPolling();
```

#### 3) WebSocket（推荐）⭐⭐⭐⭐⭐
```javascript
const ws = new WebSocket('ws://localhost:8080');

// 连接建立
ws.onopen = () => {
    console.log('连接已建立');
    ws.send('Hello Server');
};

// 收到消息
ws.onmessage = (event) => {
    console.log('收到消息:', event.data);
    const data = JSON.parse(event.data);
    // 处理数据
};

// 连接关闭
ws.onclose = () => {
    console.log('连接已关闭');
    // 尝试重连
    setTimeout(() => {
        // 重新建立连接
    }, 3000);
};

// 连接错误
ws.onerror = (error) => {
    console.error('连接错误:', error);
};

// 发送消息
function sendMessage(msg) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(msg));
    }
}
```

**记忆口诀：**
```
轮询定时请求、长轮询等待响应、WebSocket双向实时
```

---

## 九、核心速记（10分钟快速复习）

### 1. AJAX基础
```
定义：异步JS和XML、不刷新更新
流程：创开发收改页面（创建→打开→发送→接收→改变）
优势：异步、局部刷新、用户体验好
```

### 2. XMLHttpRequest
```
状态：未开头载完（0未送、1已开、2头收、3载中、4完成）
步骤：创（new）开（open）发（send）收（onreadystatechange）
判断：readyState===4 && status===200
```

### 3. Fetch API
```
特点：Promise化、语法简洁、现代化
优势：链式调用、async/await友好
劣势：无进度监控、需额外处理超时
```

### 4. 请求方法
```
GET vs POST：
- 位置：GET显露POST隐藏
- 大小：GET有限POST无限
- 缓存：GET可缓POST不缓
```

### 5. 跨域处理
```
优先级：CORS首选、JSONP兼容、代理万能
预检请求：非简单请求先预检、OPTIONS问服务器
```

### 6. 高级技巧
```
取消：XHR用abort、Fetch用AbortController
超时：XHR原生timeout、Fetch用race或abort
重试：失败重试、指数退避、设置上限
并发：队列控制、达限等待、完成唤醒
缓存：时间戳防缓存、HTTP自动管、内存可控制
```

### 7. 实战封装
```
要点：基础配置加拦截器、超时取消和便捷方法
拦截器：请求拦截添加token、响应拦截处理错误
```

### 8. 实时通信
```
轮询：定时请求、实时性差
长轮询：等待响应、减少请求
WebSocket：双向实时、性能最优
```

---

## 十、TOP 15 高频面试题速答

### Q1: 什么是AJAX？⭐⭐⭐⭐⭐
异步JavaScript和XML，无需刷新页面即可更新部分内容的技术。

### Q2: XMLHttpRequest的readyState有哪些？⭐⭐⭐⭐⭐ 🔥
0未送、1已开、2头收、3载中、4完成（未开头载完）

### Q3: GET和POST的区别？⭐⭐⭐⭐⭐ 🔥
GET数据在URL、有大小限制、可缓存；POST数据在body、无限制、不缓存

### Q4: 如何解决跨域问题？⭐⭐⭐⭐⭐ 🔥
CORS（首选）、JSONP（兼容）、代理服务器、postMessage

### Q5: Fetch和XMLHttpRequest的区别？⭐⭐⭐⭐⭐ 🔥
Fetch是Promise、语法简洁；XHR是回调、功能全面（支持进度）

### Q6: 什么是预检请求？⭐⭐⭐⭐⭐ 🔥
非简单请求前发送OPTIONS请求，检查服务器是否允许

### Q7: 如何取消AJAX请求？⭐⭐⭐⭐
XHR用abort()；Fetch用AbortController

### Q8: 如何实现超时处理？⭐⭐⭐⭐
XHR设置timeout属性；Fetch用Promise.race或AbortController

### Q9: 如何实现请求重试？⭐⭐⭐⭐
循环发送请求，失败后指数退避延迟重试，设置最大重试次数

### Q10: 什么是JSONP？⭐⭐⭐⭐
利用script标签不跨域的特性，动态创建script标签实现跨域

### Q11: 如何实现请求并发控制？⭐⭐⭐⭐
使用队列控制同时请求数，达到上限则等待，有请求完成后唤醒队列

### Q12: 如何处理AJAX缓存？⭐⭐⭐⭐
添加时间戳防止缓存、设置Cache-Control、实现内存缓存

### Q13: 轮询、长轮询、WebSocket的区别？⭐⭐⭐⭐
轮询定时请求、长轮询等待响应、WebSocket双向实时

### Q14: 如何封装通用的AJAX库？⭐⭐⭐⭐⭐
基础配置、请求/响应拦截器、超时处理、错误处理、便捷方法

### Q15: CORS需要哪些响应头？⭐⭐⭐⭐⭐
Access-Control-Allow-Origin、Methods、Headers、Credentials

---

## 十一、答题技巧与模板

### 模板1: 概念类问题
```
1. 定义：简洁说明是什么
2. 特点：列举3-4个核心特点
3. 优势：说明为什么使用它
4. 场景：适用于哪些场景
```

### 模板2: 对比类问题
```
1. 从多个维度对比（表格形式）
2. 说明各自的优缺点
3. 给出推荐使用场景
4. 记忆口诀总结
```

### 模板3: 实现类问题
```
1. 说明实现思路
2. 写出核心代码
3. 解释关键步骤
4. 提及注意事项
```

### 模板4: 解决方案类问题
```
1. 列出多种解决方案
2. 对比各方案优劣
3. 推荐最佳实践
4. 说明适用场景
```

---

## 📖 学习建议

### 重点掌握（必背）⭐⭐⭐⭐⭐
1. XMLHttpRequest的五种状态和使用流程
2. Fetch API vs XMLHttpRequest对比
3. GET vs POST的区别
4. 跨域解决方案（CORS为主）
5. 预检请求的触发条件

### 重要理解（常考）⭐⭐⭐⭐
6. 请求取消、超时、重试机制
7. 请求并发控制
8. 缓存处理策略
9. 通用AJAX库的封装
10. 轮询、长轮询、WebSocket

### 加分项（选学）⭐⭐⭐
11. 请求拦截器的实现
12. 错误处理和重试策略
13. 实时通信的最佳实践

---

**最后更新**: 2025-09-30
**难度等级**: ⭐⭐⭐⭐⭐（必背）
**面试频率**: 极高（约70%的面试会涉及）