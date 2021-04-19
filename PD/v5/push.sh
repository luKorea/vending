#!/bin/bash
baseball=$(
  cd $(dirname $0) || exit
  pwd
)
cd "$baseball" || exit
# npm run build
git add .
remark=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "zzf ${remark}"
# git pull origin dev
git push origin dev
echo -e "\033[31m ---The Project Success Build And Push--- \033[0m"
