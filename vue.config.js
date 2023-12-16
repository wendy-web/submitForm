module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://ttxl-test.y1b.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
