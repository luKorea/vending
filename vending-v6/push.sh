#!/bin/bash
baseball=$(
  cd $(dirname $0) || exit
  pwd
)
cd "$baseball" || exit
remark=$(date +"%Y-%m-%d %H:%M:%S")
read -p 'Please input the modified content of this version': note
pnpm run build
git add .
git commit -m "${note} ${remark}"
git pull origin dev
git push origin dev
# git push github dev
