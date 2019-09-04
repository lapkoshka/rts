const path = require('path');

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
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    watch: false,
};
