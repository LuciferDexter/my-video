const webpack = require("webpack");
module.exports = {
    devServer: {
        port: 8090, // 端口号
        open: false, //配置是否自动启动浏览器
        https: false,// https:{type:Boolean}是否启用https
        proxy: {
            // 代理
            "/test": {
                target: "https://www.baidu.com",
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/test": ""
                }
            },
            // 代理
            "/api": {
                target: "https://api.guangsuapi.com/api.php/provide/vod/",
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
        },
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
            }),
        ],
    },
}