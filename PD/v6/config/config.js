const webpack = require('webpack');
//入口配置 ssdsd
var entry = {
    index: './js/index/index.js',
    login: './js/login/login.js',
    home: './js/home/home.js',
    merchantsList: './js/merchants/merchantsList.js',
    orderList: './js/order/orderList.js',
    memberList: './js/memberList/memberList.js',
    roleManagement:'./js/roleManagement/roleManagement.js',
}
//页面配置
var htmlConfig = [
    {
        name: "index",
    },
    {
        name: "home",
    },
    {
        name: "login",
    },
    {
        name: "merchantsList",
    },
    {
        name: "orderList",
    },
    {
        name: 'memberList'
    },
    {
        name: "roleManagement",
    },
];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}