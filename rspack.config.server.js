// @ts-check

/** @type {import('@rspack/cli').Configuration} */
const config = {
    entry: {
        index: './src/server/index.ts',
    },
    target: 'node',
    output: {
        path: './dist/server',
    },
    externals: {
        'buffer': 'commonjs buffer',
        'utf-8-validate': 'commonjs utf-8-validate',
        'zlib': 'commonjs zlib',
        'http': 'commonjs http',
        'https': 'commonjs https',
        'stream': 'commonjs stream',
        'url': 'commonjs url',
        'crypto': 'commonjs crypto',
        'bufferutil': 'commonjs bufferutil',
        'util': 'commonjs util',
        'tls': 'commonjs tls',
        'net': 'commonjs net',
        'fs': 'commonjs fs',
        'path': 'commonjs path',
        'os': 'commonjs os',
        'querystring': 'commonjs querystring',
        'async_hooks': 'commonjs async_hooks',
        'timers': 'commonjs timers',
    },
    devServer: {
        port: 8080,
        hot: true,
        historyApiFallback: true,
    },
};

module.exports = config;