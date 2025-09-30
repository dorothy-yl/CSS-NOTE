# AJAX 经典面试题

## 1. 什么是 AJAX？它的全称是什么？

**答案：**
- AJAX 全称是 Asynchronous JavaScript And XML（异步 JavaScript 和 XML）
- 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术
- 通过在后台与服务器进行少量数据交换，使网页应用能够快速地更新页面内容

## 2. AJAX 的工作原理是什么？

**答案：**
1. 创建 XMLHttpRequest 对象
2. 通过 XMLHttpRequest 对象向服务器发送异步请求
3. 服务器处理请求并返回数据
4. JavaScript 接收服务器响应的数据
5. 使用 JavaScript 和 DOM 更新页面内容

## 3. 如何创建一个原生的 AJAX 请求？

**答案：**
```javascript
// 1. 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 2. 设置请求方法和 URL
xhr.open('GET', 'https://api.example.com/data', true);

// 3. 设置响应类型
xhr.responseType = 'json';

// 4. 设置回调函数
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('成功:', xhr.response);
        } else {
            console.error('请求失败');
        }
    }
};

// 5. 发送请求
xhr.send();
```

## 4. XMLHttpRequest 的 readyState 有哪些状态？

**答案：**
- **0 (UNSENT)**: 代理被创建，但尚未调用 open() 方法
- **1 (OPENED)**: open() 方法已经被调用
- **2 (HEADERS_RECEIVED)**: send() 方法已经被调用，并且头部和状态已经可获得
- **3 (LOADING)**: 下载中，responseText 属性已经包含部分数据
- **4 (DONE)**: 下载操作已完成

## 5. GET 和 POST 请求的区别？

**答案：**

| 特性 | GET | POST |
|------|-----|------|
| 数据位置 | URL 参数中 | 请求体中 |
| 数据大小 | 有限制（2KB左右） | 理论上无限制 |
| 安全性 | 较低，数据暴露在 URL 中 | 较高，数据在请求体中 |
| 缓存 | 可被缓存 | 不会被缓存 |
| 历史记录 | 保留在历史记录中 | 不保留 |
| 书签 | 可收藏为书签 | 不可收藏 |
| 幂等性 | 幂等 | 非幂等 |

## 6. 如何处理 AJAX 跨域问题？

**答案：**

### 1) CORS（跨域资源共享）
```javascript
// 服务器端设置响应头
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

### 2) JSONP
```javascript
function jsonp(url, callback) {
    const script = document.createElement('script');
    window.jsonpCallback = callback;
    script.src = `${url}?callback=jsonpCallback`;
    document.body.appendChild(script);
}
```

### 3) 代理服务器
- 使用 nginx 反向代理
- 使用 Node.js 中间件代理

### 4) postMessage
```javascript
// 发送消息
window.postMessage(data, 'http://example.com');

// 接收消息
window.addEventListener('message', function(e) {
    if (e.origin === 'http://example.com') {
        console.log(e.data);
    }
});
```

## 7. 什么是 JSONP？它的原理和限制是什么？

**答案：**

**原理：**
- 利用 `<script>` 标签没有跨域限制的特性
- 通过动态创建 script 标签，将回调函数名传给服务器
- 服务器返回回调函数的调用，并传入数据

**限制：**
- 只支持 GET 请求
- 安全性较差，容易受到 XSS 攻击
- 需要服务器端配合
- 错误处理困难

## 8. 如何取消一个 AJAX 请求？

**答案：**

### XMLHttpRequest
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data');
xhr.send();

// 取消请求
xhr.abort();
```

### Fetch API 使用 AbortController
```javascript
const controller = new AbortController();

fetch('/api/data', {
    signal: controller.signal
})
.then(response => response.json())
.catch(err => {
    if (err.name === 'AbortError') {
        console.log('请求被取消');
    }
});

// 取消请求
controller.abort();
```

## 9. Fetch API 和 XMLHttpRequest 的区别？

**答案：**

| 特性 | Fetch API | XMLHttpRequest |
|------|-----------|----------------|
| 返回值 | Promise | 回调函数 |
| 语法 | 更简洁现代 | 较为复杂 |
| 错误处理 | 只在网络错误时 reject | 可以处理 HTTP 错误状态 |
| 请求取消 | 使用 AbortController | 使用 abort() 方法 |
| 进度监控 | 不支持上传进度 | 支持上传/下载进度 |
| 超时设置 | 需要配合 AbortController | 原生支持 timeout |
| Cookie | 默认不发送 | 默认发送 |

## 10. 如何实现 AJAX 请求的超时处理？

**答案：**

### XMLHttpRequest
```javascript
const xhr = new XMLHttpRequest();
xhr.timeout = 5000; // 5秒超时
xhr.ontimeout = function() {
    console.error('请求超时');
};
xhr.open('GET', '/api/data');
xhr.send();
```

### Fetch API
```javascript
function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('请求超时')), timeout)
        )
    ]);
}
```

## 11. 如何实现 AJAX 请求的重试机制？

**答案：**
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
            if (i === retries - 1) {
                throw error;
            }
            // 延迟后重试
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
    }
}
```

## 12. 如何实现 AJAX 请求的并发控制？

**答案：**
```javascript
class RequestQueue {
    constructor(maxConcurrent = 5) {
        this.maxConcurrent = maxConcurrent;
        this.running = 0;
        this.queue = [];
    }

    async add(promiseCreator) {
        if (this.running >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }

        this.running++;
        try {
            const result = await promiseCreator();
            return result;
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                const resolve = this.queue.shift();
                resolve();
            }
        }
    }
}

// 使用示例
const queue = new RequestQueue(3);
const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];

const promises = urls.map(url =>
    queue.add(() => fetch(url))
);
```

## 13. 如何处理 AJAX 请求的缓存？

**答案：**

### 1) 添加时间戳防止缓存
```javascript
const url = `/api/data?t=${Date.now()}`;
```

### 2) 设置请求头
```javascript
fetch('/api/data', {
    headers: {
        'Cache-Control': 'no-cache'
    }
});
```

### 3) 实现内存缓存
```javascript
class AjaxCache {
    constructor() {
        this.cache = new Map();
    }

    async request(url, options = {}) {
        const key = `${url}_${JSON.stringify(options)}`;

        if (this.cache.has(key)) {
            return this.cache.get(key);
        }

        const response = await fetch(url, options);
        const data = await response.json();

        this.cache.set(key, data);
        setTimeout(() => this.cache.delete(key), 60000); // 1分钟后过期

        return data;
    }
}
```

## 14. 什么是预检请求（Preflight Request）？

**答案：**
- 预检请求是浏览器在发送跨域请求前，先发送一个 OPTIONS 请求到服务器
- 用于检查服务器是否允许该实际请求

**触发条件：**
- 使用了 PUT、DELETE 等方法
- Content-Type 不是 application/x-www-form-urlencoded、multipart/form-data、text/plain
- 请求设置了自定义头部

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
```

## 15. 如何封装一个通用的 AJAX 请求函数？

**答案：**
```javascript
class Ajax {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.timeout = 10000;
        this.headers = {
            'Content-Type': 'application/json'
        };
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
        const options = {
            method,
            headers: { ...this.headers, ...headers }
        };

        // 处理请求体
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(fullUrl, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

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
api.get('/users', { page: 1 })
   .then(data => console.log(data))
   .catch(error => console.error(error));
```

## 16. 什么是 AJAX 轮询、长轮询和 WebSocket？

**答案：**

### 轮询（Polling）
```javascript
function polling() {
    setInterval(async () => {
        const data = await fetch('/api/data');
        console.log(data);
    }, 5000);
}
```

### 长轮询（Long Polling）
```javascript
async function longPolling() {
    while (true) {
        try {
            const response = await fetch('/api/data', {
                timeout: 60000 // 60秒超时
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
```

### WebSocket
```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('连接已建立');
    ws.send('Hello Server');
};

ws.onmessage = (event) => {
    console.log('收到消息:', event.data);
};

ws.onclose = () => {
    console.log('连接已关闭');
};
```

**对比：**
- **轮询**：定时发送请求，实时性差，服务器压力大
- **长轮询**：服务器有数据才返回，减少无效请求
- **WebSocket**：全双工通信，实时性最好，性能最优