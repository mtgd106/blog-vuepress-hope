#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd src/.vuepress/dist

git init

git add -A

time=$(date "+%Y.%m.%d-%H:%M:%S")

git commit -m $time

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push git@github.com:mtgd106/mtgd106.github.io.git master

echo 按任意键继续

read -n 1