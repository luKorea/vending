const webpack = require('webpack');
//入口配置 ssdsd
var entry = {
        index: './js/index/index.js',
        homePage:'./js/index/homePage.js',
        machine:'./js/stores/machine.js',
        login:'./js/login/login.js',
        memberList:'./js/userManagement/memberList.js',
        roleManagement:'./js/userManagement/roleManagement.js',
        customGoods:'./js/goods/cuntomGoods.js',
        customCategory:'./js/goods/customCategory.js',
        goodsMaterial:'./js/goods/goodsMaterial.js',
        merchantsList:'./js/merchants/merchantsList.js',
        merchantsAcconuts:'./js/accounts/merchantsAcconuts.js',
        order:'./js/order/order.js',
        fodder:'./js/advertising/fodder.js',
        release:'./js/advertising/release.js',
        myInformation:'./js/my/myInformation.js',
        notice:'./js/notice/notice.js',
        //移动端版本
        M_login:'./js/mobile/login/login.js'
    }
    //页面配置
var htmlConfig = [
    {
        name: "index",
    },
    
    {
        name:'homePage'
    },
    {
        name:'machine'
    },
    {
        name: "login",
    },
    {
        name: "memberList",
    },
    {
        name: "roleManagement",
    },
    {
        name: "customGoods",
    },
    {
        name: "customCategory",
    },
    {
        name: "goodsMaterial",
    },
    {
        name: "merchantsList",
    },
    {
        name: "merchantsAcconuts",
    },
    {
        name: "order",
    },
    {
        name: "fodder",
    },
    {
        name: "release",
    },
    {
        name: "myInformation",
    },
    {
        name: "notice",
    },
    //移动端部分
    {
        name: "M_login",
    },
];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}