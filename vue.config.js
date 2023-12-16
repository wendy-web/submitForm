module.exports = {
    publicPath: '/',
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
    }
}
