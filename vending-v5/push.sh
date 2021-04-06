#!/bin/bash
baseball=$(cd $(dirname $0) || exit; pwd)
cd  "$baseball" || exit
git add .
remark=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "korea ${remark}"
# git pull origin dev
git push origin dev
echo "---END---"
