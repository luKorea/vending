let arr = [1,2,3,4,5,6,7,8,9,9,9,9,9];

// 生成随机ID
let randomId = Math.random().toString(32).substring(2);

// 去重随机排序
let sortArr = [...new Set(arr)].sort(item => Math.random() - 0.5)

// 获取随机布尔值
let randomBoolean = Math.random() >= 0.5;

// 生成一个随机的十六进制代码
let randomColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');

// 多变量分配
let [str, numbers, bool] = ['ABV',20, false];
console.log(str, numbers, bool);
