# HTTP 面试题精简版

## 🔥 核心必背知识点

### 1. HTTP vs HTTPS ⭐⭐⭐⭐⭐

**口诀：端口明密、速度快慢、证书有无**

| 对比项 | HTTP | HTTPS |
|--------|------|-------|
| 端口 | 80 | 443 |
| 安全性 | 明文传输 | SSL/TLS加密 |
| 证书 | 不需要 | 需要CA证书 |
| 速度 | 较快 | 较慢（加密解密） |
| SEO | 无优势 | 搜索引擎优先 |

**核心公式：HTTPS = HTTP + SSL/TLS**

---

### 2. GET vs POST ⭐⭐⭐⭐⭐

**口诀：参数位置、幂等性、缓存性**

| 区别点 | GET | POST |
|--------|-----|------|
| 参数位置 | URL中 | 请求体中 |
| 幂等性 | 幂等 | 非幂等 |
| 可缓存 | 可缓存 | 不可缓存 |
| 安全性 | 参数暴露 | 相对安全 |
| 使用场景 | 查询数据 | 提交数据 |

```javascript
// GET - 查询
GET /api/users?page=1&size=10

// POST - 创建
POST /api/users
Body: {"name": "张三", "age": 25}
```

---

### 3. HTTPS 握手过程 ⭐⭐⭐⭐⭐

**口诀：客户请求、服务证书、客户生成、双向加密**

1. **客户端请求**建立HTTPS连接（Client Hello）
2. **服务器返回证书**（包含公钥）
3. **客户端验证证书**，生成对称密钥
4. **客户端用公钥加密**对称密钥发送
5. **服务器用私钥解密**获得对称密钥
6. **双方使用对称密钥**加密通信

---

### 4. HTTP 状态码 ⭐⭐⭐⭐⭐

**口诀：1信息2成功3重定向4客户5服务**

**2xx 成功：**
- `200 OK` - 请求成功
- `201 Created` - 创建成功
- `204 No Content` - 成功但无返回内容

**3xx 重定向：**
- `301 Moved Permanently` - 永久重定向
- `302 Found` - 临时重定向
- `304 Not Modified` - 资源未修改（缓存）

**4xx 客户端错误：**
- `400 Bad Request` - 请求语法错误
- `401 Unauthorized` - 未认证
- `403 Forbidden` - 无权限
- `404 Not Found` - 资源不存在

**5xx 服务器错误：**
- `500 Internal Server Error` - 服务器内部错误
- `502 Bad Gateway` - 网关错误
- `503 Service Unavailable` - 服务不可用

---

### 5. 301 vs 302 vs 304 ⭐⭐⭐⭐

**口诀：永久临时、缓存不缓、SEO转移**

| 对比项 | 301 | 302 | 304 |
|--------|-----|-----|-----|
| 含义 | 永久重定向 | 临时重定向 | 资源未修改 |
| 缓存 | 浏览器会缓存 | 不缓存 | 协商缓存 |
| SEO权重 | 会转移 | 不转移 | 不适用 |
| 使用场景 | 域名更换 | 临时维护 | 缓存验证 |

---

### 6. HTTP 请求方法 ⭐⭐⭐⭐

**口诀：GET查POST提、PUT全PATCH部、DELETE删**

| 方法 | 幂等性 | 安全性 | 可缓存 | 使用场景 |
|------|--------|--------|--------|----------|
| GET | 是 | 是 | 是 | 查询数据 |
| POST | 否 | 否 | 否 | 创建资源 |
| PUT | 是 | 否 | 否 | 完整更新 |
| PATCH | 否 | 否 | 否 | 部分更新 |
| DELETE | 是 | 否 | 否 | 删除资源 |

**幂等性：** 多次执行同一操作，结果保持一致

---

### 7. HTTP 版本演进 ⭐⭐⭐⭐⭐

**口诀：1.0短连、1.1长连、2多路、3基UDP**

| 特性 | HTTP/1.0 | HTTP/1.1 | HTTP/2 | HTTP/3 |
|------|---------|---------|--------|--------|
| 连接方式 | 短连接 | 长连接 | 多路复用 | QUIC(UDP) |
| 队头阻塞 | 有 | 有 | HTTP层无 | 完全解决 |
| 协议格式 | 文本 | 文本 | 二进制分帧 | 二进制 |
| 头部压缩 | 无 | 无 | HPACK | QPACK |
| 服务器推送 | 不支持 | 不支持 | 支持 | 支持 |

---

### 8. HTTP/2 多路复用 ⭐⭐⭐⭐⭐（高频）

**口诀：一连多流、帧交错、流ID重组**

**核心原理：**
1. **将HTTP消息分解为帧（Frame）** - 最小通信单位
2. **帧标识所属的流（Stream）** - 每个流有唯一ID
3. **帧可以交错发送** - 不同流的帧混合传输
4. **接收端根据流ID重组** - 保证消息完整性

**优势：**
- ✅ 解决HTTP层队头阻塞
- ✅ 减少TCP连接（6个→1个）
- ✅ 提高带宽利用率
- ✅ 降低延迟

```javascript
// HTTP/1.1 - 串行请求（队头阻塞）
请求1 → 响应1 → 请求2 → 响应2
❌ 响应1慢会阻塞响应2

// HTTP/2 - 并行请求（多路复用）
请求1、请求2、请求3 → 响应交错返回
✅ 请求同时进行，互不阻塞
```

**注意：** 只解决了HTTP层队头阻塞，TCP层仍存在

---

### 9. HTTP 缓存策略 ⭐⭐⭐⭐⭐

**口诀：强制协商、时间标识**

| 对比项 | 强缓存 | 协商缓存 |
|--------|--------|----------|
| 是否发请求 | 不发请求 | 发请求验证 |
| 状态码 | 200 (from cache) | 304 Not Modified |
| 相关头部 | Cache-Control、Expires | Last-Modified、ETag |
| 性能 | 最快 | 较快 |

**强缓存：**
```javascript
// Cache-Control（优先级更高）
res.setHeader('Cache-Control', 'max-age=3600'); // 1小时

// Expires（绝对时间）
res.setHeader('Expires', 'Wed, 21 Oct 2025 07:28:00 GMT');
```

**协商缓存：**
```javascript
// Last-Modified / If-Modified-Since（基于时间）
res.setHeader('Last-Modified', 'Wed, 21 Oct 2024 07:28:00 GMT');

// ETag / If-None-Match（基于内容哈希）
const etag = crypto.createHash('md5').update(content).digest('hex');
res.setHeader('ETag', etag);
```

**缓存流程：**
```
请求资源 → 检查强缓存 → 有效？
  ↓ 是                    ↓ 否
使用缓存          发送请求（带验证信息）
(200 from cache)          ↓
                    服务器验证
                    ↓        ↓
                 未修改    已修改
                 304      200+新数据
```

---

### 10. 跨域解决方案 ⭐⭐⭐⭐⭐

**口诀：CORS首选、JSONP兼容、代理转发**

**跨域条件：** 协议、域名、端口任一不同

| 方案 | 优点 | 缺点 | 支持方法 |
|------|------|------|----------|
| CORS | 官方标准 | 需服务器支持 | 所有HTTP方法 |
| JSONP | 兼容老浏览器 | 只支持GET | 仅GET |
| 代理 | 简单安全 | 增加服务器负担 | 所有方法 |
| Nginx反向代理 | 高性能 | 需运维配置 | 所有方法 |

**1. CORS（推荐）：**
```javascript
// 服务器端设置
res.setHeader('Access-Control-Allow-Origin', 'https://example.com');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Credentials', 'true');

// 处理预检请求
if (req.method === 'OPTIONS') {
  return res.sendStatus(200);
}
```

**2. 开发环境代理：**
```javascript
// Vite配置
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
```

---

### 11. XSS vs CSRF ⭐⭐⭐⭐

**XSS（跨站脚本攻击）：**
- 注入恶意脚本到页面
- 窃取Cookie、Session等

**防范措施：**
```javascript
// 1. 输出编码
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// 2. CSP响应头
res.setHeader('Content-Security-Policy', "default-src 'self'");

// 3. HttpOnly Cookie
res.cookie('session', sessionId, { httpOnly: true });
```

**CSRF（跨站请求伪造）：**
- 利用用户身份发送非预期请求

**防范措施：**
```javascript
// 1. CSRF Token
res.render('form', { csrfToken: req.csrfToken() });

// 2. SameSite Cookie
res.cookie('session', sessionId, { sameSite: 'strict' });

// 3. 验证Referer
if (req.headers.referer !== 'https://trusted.com') {
  return res.status(403).send('Forbidden');
}
```

---

### 12. HTTP 性能优化 ⭐⭐⭐⭐⭐

**减少请求数量：**
- 资源合并（CSS/JS合并）
- 雪碧图
- 懒加载
- 内联小资源

**减少请求大小：**
- Gzip/Brotli压缩
- 图片优化（WebP）
- 代码压缩
- Tree Shaking

**利用缓存：**
- 强缓存：Cache-Control
- 协商缓存：ETag/Last-Modified
- Service Worker
- CDN缓存

**其他优化：**
```javascript
// 1. 预加载
<link rel="preload" href="style.css" as="style">
<link rel="prefetch" href="next-page.js">
<link rel="dns-prefetch" href="//api.example.com">
<link rel="preconnect" href="//cdn.example.com">

// 2. 启用Keep-Alive
res.setHeader('Connection', 'keep-alive');

// 3. 使用HTTP/2
```

---

### 13. 常见请求/响应头 ⭐⭐⭐⭐

**请求头：**
- `Host` - 请求的主机名
- `User-Agent` - 客户端信息
- `Accept` - 可接受的内容类型
- `Authorization` - 认证信息
- `Cookie` - 客户端Cookie
- `Content-Type` - 请求体类型
- `Referer` - 请求来源
- `Origin` - 请求源（CORS）

**响应头：**
- `Content-Type` - 响应内容类型
- `Set-Cookie` - 设置Cookie
- `Location` - 重定向地址
- `Cache-Control` - 缓存策略
- `ETag` - 资源标识
- `Last-Modified` - 最后修改时间
- `Access-Control-*` - CORS相关

**Content-Type常见类型：**
```javascript
'application/json'                    // JSON数据
'application/x-www-form-urlencoded'   // 表单默认
'multipart/form-data'                 // 文件上传
'text/html'                           // HTML
'image/jpeg'                          // 图片
```

---

### 14. HTTP 长连接 vs 短连接 ⭐⭐⭐⭐

**短连接（HTTP/1.0默认）：**
- 每个请求都新建TCP连接
- 请求完成后立即关闭
- 开销大

**长连接（HTTP/1.1默认）：**
- 复用TCP连接
- `Connection: keep-alive`
- 减少握手开销

```javascript
// Nginx配置
keepalive_timeout 65;
keepalive_requests 100;
```

---

### 15. RTT 时间计算 ⭐⭐⭐⭐

**10个资源，每个RTT=100ms，计算总时长：**

| 版本 | TCP连接数 | 总时长 | 说明 |
|------|----------|--------|------|
| HTTP/1.0 | 10个 | 800ms | 短连接，每请求一个连接 |
| HTTP/1.1 | 6个 | 500ms | 持久连接，最多6并发 |
| HTTP/2 | 1个 | 400ms | 多路复用 |
| HTTP/3 | 0个 | 200ms | QUIC，0-RTT |

**计算过程（HTTP/1.1）：**
```
建立6个连接: (TCP握手1RTT + TLS握手2RTT) × 100ms = 300ms
第一批6个资源: 1RTT × 100ms = 100ms
第二批4个资源: 1RTT × 100ms = 100ms
总时长 = 300ms + 100ms + 100ms = 500ms
```

---

## 🎯 快速记忆表

| 知识点 | 核心口诀 | 重要级别 |
|--------|----------|----------|
| HTTP vs HTTPS | 端口明密、速度快慢、证书有无 | ⭐⭐⭐⭐⭐ |
| GET vs POST | 参数位置、幂等性、缓存性 | ⭐⭐⭐⭐⭐ |
| HTTPS握手 | 客户请求、服务证书、客户生成、双向加密 | ⭐⭐⭐⭐⭐ |
| 状态码 | 1信息2成功3重定向4客户5服务 | ⭐⭐⭐⭐⭐ |
| 301 vs 302 | 永久临时、缓存不缓、SEO转移 | ⭐⭐⭐⭐ |
| 请求方法 | GET查POST提、PUT全PATCH部、DELETE删 | ⭐⭐⭐⭐ |
| HTTP版本 | 1.0短连、1.1长连、2多路、3基UDP | ⭐⭐⭐⭐⭐ |
| 多路复用 | 一连多流、帧交错、流ID重组 | ⭐⭐⭐⭐⭐ |
| HTTP缓存 | 强制协商、时间标识 | ⭐⭐⭐⭐⭐ |
| 跨域方案 | CORS首选、JSONP兼容、代理转发 | ⭐⭐⭐⭐⭐ |

---

## 📋 高频面试题 TOP 10

1. **HTTP和HTTPS的区别？**
   - 端口80 vs 443、明文 vs 加密、无证书 vs CA证书

2. **GET和POST的区别？**
   - 参数位置、幂等性、缓存性

3. **HTTP状态码有哪些？**
   - 2xx成功、3xx重定向、4xx客户端错误、5xx服务器错误

4. **强缓存和协商缓存的区别？**
   - 强缓存不发请求，协商缓存发请求验证返回304

5. **跨域如何解决？**
   - CORS、JSONP、代理、Nginx反向代理

6. **HTTP/1.1和HTTP/2的区别？**
   - 长连接 vs 多路复用、文本 vs 二进制、无压缩 vs HPACK

7. **HTTP/2多路复用原理？**
   - 一个连接多个流、帧交错发送、流ID重组

8. **HTTPS握手过程？**
   - 客户请求、服务证书、客户生成密钥、双向加密

9. **什么是幂等性？**
   - 多次执行同一操作结果一致，GET/PUT/DELETE幂等

10. **如何防范XSS和CSRF？**
    - XSS：输出编码、CSP、HttpOnly；CSRF：Token、SameSite

---

## ⚠️ 易错点提醒

1. **HTTP/2多路复用** - 只解决HTTP层队头阻塞，TCP层仍存在
2. **强缓存状态码** - 是200 from cache，不是304
3. **POST安全性** - 只是参数不在URL，仍需HTTPS加密
4. **DELETE幂等性** - 是幂等的（删除后再删除结果一样）
5. **CORS简单请求** - 不需要OPTIONS预检，复杂请求才需要
6. **跨域限制** - 只有浏览器有限制，服务器间通信无跨域
7. **304缓存** - 是协商缓存，不是强缓存
8. **HTTP/3基于UDP** - 不代表不可靠，QUIC在应用层保证可靠性
