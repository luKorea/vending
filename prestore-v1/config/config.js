const webpack = require('webpack');
//入口配置 ssdsd
var entry = {
        index: './js/index/index.js',
        login:'./js/login/login.js',
        merchantsList:'./js/merchants/merchantsList.js'
    }
    //页面配置
var htmlConfig = [
    {
        name: "index",
    },
    {
        name: "login",
    },
    {
        name: "merchantsList",
    },
];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}