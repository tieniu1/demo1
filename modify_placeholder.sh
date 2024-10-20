#!/bin/bash

# 遍历所有 .vue 文件
find . -name "*.vue" -type f | while read file; do
  # 使用 sed 修改 el-input 的 placeholder 属性
  sed -i '/<el-input/,/<\/el-input>/s/:placeholder="\([^"]*\)"/:placeholder="`abc(\1)`"/g' "$file"
done

echo "Modification complete."