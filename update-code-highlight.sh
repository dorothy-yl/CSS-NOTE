#!/bin/bash

# 更新所有教学演示文件的代码高亮

echo "🎨 开始更新代码高亮样式..."

# 需要更新的文件列表
files=(
    "css教学演示/flex布局教学.html"
    "css教学演示/CSS盒子模型教学.html"
    "HTML教学演示/index.html"
    "HTML教学演示/04-清除浮动.html"
    "HTML教学演示/02-块级元素与内联元素.html"
    "HTML教学演示/06-事件委托教学.html"
    "HTML教学演示/01-语义化标签.html"
    "HTML教学演示/03-伪类与伪元素.html"
    "js教学演示/事件机制教学.html"
    "js教学演示/闭包应用场景教学.html"
)

# 基础路径
base_path="/Users/aricredemption/Projects/CSS-NOTE"

# 处理每个文件
for file in "${files[@]}"; do
    full_path="$base_path/$file"

    if [ -f "$full_path" ]; then
        echo "📝 处理文件: $file"

        # 备份原文件
        cp "$full_path" "$full_path.backup"

        # 检查是否已经包含代码高亮
        if ! grep -q "code-highlight.css" "$full_path"; then
            # 在</head>前插入CSS和JS引用
            sed -i '' '/<\/head>/i\
    <!-- 代码高亮样式 -->\
    <link rel="stylesheet" href="../shared/code-highlight.css">\
' "$full_path"
        fi

        if ! grep -q "code-highlight.js" "$full_path"; then
            # 在</body>前插入JS引用
            sed -i '' '/<\/body>/i\
    <!-- 代码高亮脚本 -->\
    <script src="../shared/code-highlight.js"></script>\
' "$full_path"
        fi

        echo "✅ 完成: $file"
    else
        echo "❌ 文件不存在: $full_path"
    fi
done

echo "🎉 所有文件更新完成！"