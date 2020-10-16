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
        message:'./js/notice/message.js',
        paySet:'./js/merchants/paySet.js',
        payType:'./js/merchants/payType.js',
        remote:'./js/stores/remote.js',
        pickupCode:'./js/marketing/pickupCode.js',
        salesManager:'./js/merchants/salesManager.js',
        mailOrder:'./js/order/mailOrder.js',
        //移动端版本
        M_login:'./js/mobile/login/login.js',
        M_my:'./js/mobile/my/my.js',
        M_managementCenter:'./js/mobile/my/managementCenter.js',
        M_machine:'./js/mobile/machine/machine.js',
        M_machine:'./js/mobile/machine/machine.js',
        M_machineChild:'./js/mobile/machine/machineChild.js',//移动端售货机子页面
        // M_machine
        // 移动端商品模块
        M_class:'./js/mobile/goods/class.js'
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
        name: "message",
    },
    {
        name: "paySet",
    },
    {
        name: "payType",
    },
    {
        name: "remote",
    },
    {
        name: "pickupCode",
    },  
    {
        name: "salesManager",
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
    {
        name: "M_class",
    },
    {
        name: "mailOrder",
    },
];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}