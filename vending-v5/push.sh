#!/bin/bash
basepath=$(cd `dirname $0`; pwd)
cd  $basepath
git add .
remark=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "korea：${remark}"
# git pull origin dev
git push origin dev
echo "---END---"
