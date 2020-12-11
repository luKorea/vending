const webpack = require('webpack');
//入口配置 ssdsd
var entry = {
        orderIndex: './js/orderIndex.js',
        placeOrder: './js/placeOrder.js',
        orderList:'./js/orderList.js',
        codeLogin:'./js/codeLogin.js',
        operation:'./js/operation.js'
    }
    //页面配置
var htmlConfig = [
    {
        name: "orderIndex",
    },
    {
        name: "placeOrder",
    },
    {
        name: "orderList",
    },
    {
        name: "codeLogin",
    },
    {
        name: "operation",
    },
];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}