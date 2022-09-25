module.exports = {
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico',
        },
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    configureWebpack: {
        devtool: 'source-map',
        // optimization: {
        //     splitChunks: {
        //         chunks: 'all'
        //     }
        // }
    },
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         // mutate config for production...
    //     } else {
    //         // mutate for development...
    //
    //     }
    // },
    publicPath: '/',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        // historyApiFallback: {
        //     index: '/index.html'
        // }
        historyApiFallback: true
    }
};