const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/view/index.js',
    output: {
        path: path.join(__dirname, '/dist/view'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.[s]?css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.ExternalsPlugin('commonjs', [
            'electron',
        ]),
    ],
    watch: false,
};
