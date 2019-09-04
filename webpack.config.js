const path = require('path');

module.exports = {
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
        ],
    },
};
