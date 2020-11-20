const webpack = require('webpack');
//入口配置 ssdsd
var entry = {
        orderIndex: './js/orderIndex.js',
        placeOrder: './js/placeOrder.js',
        orderList:'./js/orderList.js'
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
];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}