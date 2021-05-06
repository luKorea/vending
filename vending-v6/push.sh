#!/bin/bash
baseball=$(
  cd $(dirname $0) || exit
  pwd
)
cd "$baseball" || exit
pnpm run build
remark=$(date +"%Y-%m-%d %H:%M:%S")
read -p 'Please input the modified content of this version': note
git add .
git commit -m "${note} ${remark}"
git pull origin dev
git push origin dev
git push github dev
