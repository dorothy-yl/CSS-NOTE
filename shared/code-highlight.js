/**
 * 代码高亮和复制功能
 * 适用于所有教学演示页面
 */

// 代码高亮格式化函数
function highlightCode(code, language = 'auto') {
    // 保存原始代码用于复制
    const originalCode = code;

    // HTML标签
    code = code.replace(/(&lt;\/?[\w\s="':\-\/\.]+&gt;)/g, '<span class="code-tag">$1</span>');

    // HTML属性
    code = code.replace(/(\w+)=["']([^"']+)["']/g, '<span class="code-attribute">$1</span>=<span class="code-string">"$2"</span>');

    // 注释
    code = code.replace(/(\/\/[^\n]*)/g, '<span class="code-comment">$1</span>');
    code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
    code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="code-comment">$1</span>');
    code = code.replace(/(#[^\n]*)/g, '<span class="code-comment">$1</span>'); // Python/Shell注释

    // JavaScript/通用关键字
    const jsKeywords = [
        'function', 'const', 'let', 'var', 'if', 'else', 'return', 'for', 'while',
        'new', 'this', 'typeof', 'instanceof', 'true', 'false', 'null', 'undefined',
        'class', 'extends', 'import', 'export', 'from', 'async', 'await', 'try',
        'catch', 'throw', 'switch', 'case', 'default', 'break', 'continue', 'do',
        'static', 'get', 'set', 'super', 'yield', 'of', 'in', 'delete', 'void'
    ];

    // CSS属性关键字
    const cssProperties = [
        'display', 'position', 'width', 'height', 'margin', 'padding', 'border',
        'background', 'color', 'font', 'text', 'flex', 'grid', 'transform',
        'transition', 'animation', 'overflow', 'z-index', 'opacity', 'cursor'
    ];

    // 根据语言应用不同的高亮规则
    if (language === 'css' || code.includes('{') && code.includes('}') && code.includes(':')) {
        // CSS选择器
        code = code.replace(/([.#]?[\w-]+)\s*{/g, '<span class="code-selector">$1</span> {');

        // CSS属性
        cssProperties.forEach(prop => {
            const regex = new RegExp(`\\b(${prop}[\\w-]*?)\\s*:`, 'g');
            code = code.replace(regex, '<span class="code-property">$1</span>:');
        });

        // CSS值
        code = code.replace(/:\s*([^;}\n]+)/g, ': <span class="code-value">$1</span>');
    }

    // JavaScript关键字
    jsKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        code = code.replace(regex, '<span class="code-keyword">$1</span>');
    });

    // 字符串（单引号和双引号）
    code = code.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="code-string">$&</span>');

    // 数字
    code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');

    // 函数名
    code = code.replace(/(\w+)(?=\()/g, '<span class="code-function">$1</span>');

    // 对象属性
    code = code.replace(/\.(\w+)/g, '.<span class="code-property">$1</span>');

    // 变量（$开头的）
    code = code.replace(/(\$\w+)/g, '<span class="code-variable">$1</span>');

    // 操作符
    code = code.replace(/([+\-*/%=<>!&|^~?:])/g, '<span class="code-operator">$1</span>');

    return code;
}

// 检测代码语言
function detectLanguage(code) {
    if (code.includes('function') || code.includes('const') || code.includes('var')) {
        return 'javascript';
    } else if (code.includes('{') && code.includes('}') && code.includes(':') && code.includes(';')) {
        return 'css';
    } else if (code.includes('<') && code.includes('>')) {
        return 'html';
    }
    return 'auto';
}

// 添加行号
function addLineNumbers(codeElement) {
    const lines = codeElement.innerHTML.split('\n');
    if (lines.length > 1) {
        codeElement.classList.add('line-numbers');
        codeElement.innerHTML = lines.map(line => `<span>${line}</span>`).join('\n');
    }
}

// 复制代码函数
function copyCode(button, code) {
    // 清理代码（移除HTML标签）
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = code;
    const cleanCode = tempDiv.textContent || tempDiv.innerText || '';

    navigator.clipboard.writeText(cleanCode).then(() => {
        // 更改按钮文本和样式
        const originalText = button.textContent;
        button.textContent = '已复制！';
        button.classList.add('copied');

        // 2秒后恢复
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = cleanCode;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        button.textContent = '已复制！';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = '复制';
            button.classList.remove('copied');
        }, 2000);
    });
}

// 初始化代码高亮
function initCodeHighlight() {
    // 选择所有代码块
    const codeBlocks = document.querySelectorAll('.code-demo, .demo-code, pre code, .code-block, .code-example, pre');

    codeBlocks.forEach((block, index) => {
        // 跳过已处理的代码块
        if (block.dataset.highlighted === 'true') return;

        // 获取原始内容
        let originalContent = block.innerHTML;

        // 检测语言
        const language = block.dataset.language || detectLanguage(originalContent);

        // 应用语法高亮
        if (!originalContent.includes('<span class="code-')) {
            block.innerHTML = highlightCode(originalContent, language);
        }

        // 添加行号（可选）
        if (block.dataset.lineNumbers === 'true' || block.classList.contains('line-numbers')) {
            addLineNumbers(block);
        }

        // 添加复制按钮
        if (!block.querySelector('.copy-btn')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '复制';
            copyBtn.setAttribute('data-code-index', index);

            // 保存原始代码文本
            const codeText = block.textContent || block.innerText;

            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                copyCode(this, originalContent);
            });

            block.appendChild(copyBtn);
        }

        // 设置语言标签
        if (language !== 'auto' && !block.dataset.language) {
            block.dataset.language = language.toUpperCase() + ' ';
        }

        // 标记为已处理
        block.dataset.highlighted = 'true';
    });
}

// 格式化代码（美化缩进）
function formatCode(code) {
    let formatted = code;
    let indent = 0;
    const lines = formatted.split('\n');
    const formattedLines = [];

    lines.forEach(line => {
        const trimmed = line.trim();

        // 减少缩进
        if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
            indent = Math.max(0, indent - 1);
        }

        // 添加缩进
        formattedLines.push('  '.repeat(indent) + trimmed);

        // 增加缩进
        if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
            indent++;
        }
    });

    return formattedLines.join('\n');
}

// 主题切换支持
function toggleCodeTheme(theme = 'dark') {
    const codeBlocks = document.querySelectorAll('.code-demo, .demo-code, pre, .code-block');
    codeBlocks.forEach(block => {
        if (theme === 'light') {
            block.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
            block.style.color = '#1e293b';
        } else {
            block.style.background = 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
            block.style.color = '#e2e8f0';
        }
    });
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeHighlight);
} else {
    initCodeHighlight();
}

// 监听动态添加的代码块
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            setTimeout(initCodeHighlight, 100);
        }
    });
});

// 开始观察
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 导出函数供外部使用
window.CodeHighlight = {
    init: initCodeHighlight,
    highlight: highlightCode,
    copy: copyCode,
    format: formatCode,
    toggleTheme: toggleCodeTheme,
    addLineNumbers: addLineNumbers
};