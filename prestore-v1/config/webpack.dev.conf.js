//引入webpack-merge插件进行合并
const merge = require('webpack-merge');
//引入webpack.base.conf.js文件
const base = require('./webpack.base.conf');
//引入webpack
const webpack = require('webpack');
// 引入 os
const os = require('os');
// 获取地址
function getNetworkIp() {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    console.log(needHost);
    return needHost;
}
//进行合并，将webpack.base.conf.js中的配置合并到这
module.exports = merge(base, {
    //模块参数
    mode: 'development',
    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        port: "8889", //设置默认监听端口，如果省略，默认为"8080"
        inline: false, //实时刷新
        historyApiFallback: true, //不跳转
        host: getNetworkIp(),
        //代理转发接口
        proxy: {
            //把/api/t转发到target，但是转发的是http://xxx/api/t
            //不要/api,用pathRewrite
            '/fk/api': {
                target: 'http://172.16.90.74:8093', //(跨域的地址)
                // target: 'http://119.29.104.217:8086', //(跨域的地址)
                changeOrigin: false,
                pathRewrite: {
                    '^/fk/api': ''
                }
            },
        }
    },
    //启用source-map方便调试
    devtool: 'source-map',
    plugins: [
        //定义全局变量
        new webpack.DefinePlugin({
            //这里必须要解析成字符串进行判断，不然将会被识别为一个变量
            DEV: JSON.stringify('dev')
        })
    ]
});