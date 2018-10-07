var path = require('path');
var awt = require('awesome-typescript-loader');

var typescriptLoader = {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
};

module.exports = [
    {
        entry: './src/index.ts',
        target: 'web',
        node: { fs: 'empty' },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules'],
            plugins: [new awt.TsConfigPathsPlugin()],
        },
        module: {
            loaders: [typescriptLoader],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname),
        },
    },
];