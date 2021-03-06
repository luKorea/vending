const webpack = require('webpack');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin'); //生成html模板
const extractTextPlugin = require('extract-text-webpack-plugin'); //分离css从js里
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除打包的
const CopyWebpackPlugin = require('copy-webpack-plugin');
var configReq = require('./config.js');

var config = {
    entry: configReq.entry,
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            //处理es6
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            //对js里引入css，提取到js里
            {
                test: /\.(css|scss|sass)$/,
                use: extractTextPlugin.extract({
                    fallback: [{
                        loader: "style-loader",

                    }],
                    publicPath: '../', //设置css的图片路径
                    use: [{
                        loader: "css-loader",
                    }, {
                        loader: "sass-loader",
                    }]
                })
            },
            //压缩图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: './image/' //打包后的图片放到img文件夹下
                    }
                }]
            },
            //打包html的图片
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new CleanWebpackPlugin(),
        new extractTextPlugin("css/[name]-[hash].css"), //提取CSS行内样式，转化为link引入
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../assets'),
            to: './assets'
        }])
    ],
    optimization: {
        minimizer: [],
        //打包公共模块
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    minSize: 0, //表示提取公共部分最小的大小
                    name: 'commons' //提取出来的文件命名
                }
            }
        }
    }
};
module.exports = config;
//生成模版文件
configReq.htmlConfig.forEach((val, i) => {
    console.log(val)
    if(val.name.indexOf('M_')>-1){
        var hcoging = {
            template: "./html/mobile/" + val.name + ".html", //new 一个这个插件的实例，并传入相关的参数
            filename: val.name + ".html",
            chunks: [val.name, "commons"],
            inject: true,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                removeAttributeQuotes: true, //removeAttrubuteQuotes是去掉属性的双引号。
                collapseWhitespace: false //删除空白符与换行符
            }
        }
    }else{
        var hcoging = {
            template: "./html/" + val.name + ".html", //new 一个这个插件的实例，并传入相关的参数
            filename: val.name + ".html",
            chunks: [val.name, "commons"],
            inject: true,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                removeAttributeQuotes: true, //removeAttrubuteQuotes是去掉属性的双引号。
                collapseWhitespace: false //删除空白符与换行符
            }
        }
    }

    config.plugins.push(new htmlPlugin(hcoging));
})


