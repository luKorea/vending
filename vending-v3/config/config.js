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
        paySet:'./js/merchants/paySet.js',
        payType:'./js/merchants/payType.js',
        //移动端版本
        M_login:'./js/mobile/login/login.js',
        M_my:'./js/mobile/my/my.js',
        M_managementCenter:'./js/mobile/my/managementCenter.js',
        M_machine:'./js/mobile/machine/machine.js',
        M_machine:'./js/mobile/machine/machine.js',
        M_machineChild:'./js/mobile/machine/machineChild.js',//移动端售货机子页面
        // M_machine
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
    {
        name: "paySet",
    },
    {
        name: "payType",
    },
    //移动端部分
    {
        name: "M_login",
    },
    {
        name: "M_my",
    },
    {
        name: "M_footerNav",
    },
    {
        name: "M_managementCenter",
    },
    {
        name: "M_machine",
    },
    {
        name: "M_machineChild",
    },
];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}