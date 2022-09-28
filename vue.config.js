module.exports = {
    pwa: {
        iconPaths: {
            favicon32: 'favicon1.ico',
            favicon16: 'favicon1.ico',
            appleTouchIcon: 'favicon1.ico',
            maskIcon: 'favicon1.ico',
            msTileImage: 'favicon1.ico',
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