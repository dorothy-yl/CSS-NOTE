#!/usr/bin/env python3
import os
import re

# 基础路径
base_path = "/Users/aricredemption/Projects/CSS-NOTE"

# 需要更新的文件列表
files_to_update = [
    "css教学演示/CSS盒子模型教学.html",
    "HTML教学演示/index.html",
    "HTML教学演示/04-清除浮动.html",
    "HTML教学演示/02-块级元素与内联元素.html",
    "HTML教学演示/06-事件委托教学.html",
    "HTML教学演示/01-语义化标签.html",
    "HTML教学演示/03-伪类与伪元素.html",
    "js教学演示/事件机制教学.html",
    "js教学演示/闭包应用场景教学.html"
]

def update_file(filepath):
    """更新单个文件，添加代码高亮支持"""
    full_path = os.path.join(base_path, filepath)

    if not os.path.exists(full_path):
        print(f"❌ 文件不存在: {filepath}")
        return False

    # 读取文件内容
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 备份原文件
    backup_path = full_path + '.backup'
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)

    modified = False

    # 检查是否已包含代码高亮CSS
    if 'code-highlight.css' not in content:
        # 在</head>前插入CSS引用
        css_link = '    <!-- 代码高亮样式 -->\n    <link rel="stylesheet" href="../shared/code-highlight.css">\n'

        # 查找</head>标签
        head_pattern = r'(</head>)'
        if re.search(head_pattern, content):
            content = re.sub(head_pattern, css_link + r'\1', content)
            modified = True
            print(f"  ✅ 添加了CSS引用")

    # 检查是否已包含代码高亮JS
    if 'code-highlight.js' not in content:
        # 在</body>前插入JS引用
        js_script = '    <!-- 代码高亮脚本 -->\n    <script src="../shared/code-highlight.js"></script>\n'

        # 查找</body>标签
        body_pattern = r'(</body>)'
        if re.search(body_pattern, content):
            content = re.sub(body_pattern, js_script + r'\1', content)
            modified = True
            print(f"  ✅ 添加了JS引用")

    # 保存修改后的文件
    if modified:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 完成更新: {filepath}")
    else:
        print(f"ℹ️  已经包含代码高亮: {filepath}")

    return True

def main():
    print("🎨 开始批量更新代码高亮...")
    print("-" * 50)

    success_count = 0

    for file in files_to_update:
        print(f"\n📝 处理文件: {file}")
        if update_file(file):
            success_count += 1

    print("\n" + "=" * 50)
    print(f"🎉 更新完成！成功更新 {success_count}/{len(files_to_update)} 个文件")

if __name__ == "__main__":
    main()