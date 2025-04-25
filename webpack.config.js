const path = require('path');

module.exports = {
    entry: {
        login: './client/login.jsx',
        browser: './client/browser.jsx',
        maker: './client/maker.jsx',
        myQuizzes: './client/myQuizzes.jsx',
        player: './client/player.jsx',
        premium: './client/premium.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};