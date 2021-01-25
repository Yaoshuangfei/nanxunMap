module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'dist',
    assetsDir: 'assets',
    productionSourceMap: false,
    filenameHashing: false,
    lintOnSave: false,
    runtimeCompiler: true,
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(args => {
                args.compilerOptions.whitespace = 'preserve';
            });
        // config.resolve.symlinks(true);
    },
    devServer: {
        watchOptions: {
            ignored: ['node_modules'],
            aggregateTimeout: 300,
            poll: 1500
        },
        open: true,
        host: '0.0.0.0',
        port: 9090,
        https: false,
        hotOnly: true,
        // overlay: {
        //     warnings: false,
        //     errors: false
        // },
        /* 使用代理 */
        proxy: {
            '/api': {
                target: 'https://nanxun.zjtoprs.com/',
                changeOrigin: true
            },
            '/mock': {
                target: 'http://39.107.54.214:3000/mock/20/iwater/', // mock地址
                changeOrigin: true,
                pathRewrite: { '^/mock': '' }
            }
        }
    },
    configureWebpack: {
        externals: {
            'AMap': 'AMap'
        }
    }
}