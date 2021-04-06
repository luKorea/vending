#!/bin/bash
baseball=$(cd $(dirname $0) || exit; pwd)
cd  "$baseball" || exit
npm install
npm run dev
echo -e "\033[31m --- The Project Start --- \033[0m"
