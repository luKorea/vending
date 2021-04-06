#!/bin/bash
baseball=$(cd $(dirname $0) || exit; pwd)
cd  "$baseball" || exit
npm install
npm run dev
echo "success"
