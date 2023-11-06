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

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:mtgd106/mtgd106.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd ../

rm -rf dist

echo 按任意键继续

read -n 1
