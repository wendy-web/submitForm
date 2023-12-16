// 引入等比适配插件
const px2rem = require('postcss-px2rem')
    // 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    // remUnit: 14 代表 1rem = 14px; 所以当你一个14px值时，它会自动转成 (14px/14)rem
    remUnit: 3
})
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    lintOnSave: true,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
            postcss: {
                plugins: [postcss],
            },
        },
    }
}
