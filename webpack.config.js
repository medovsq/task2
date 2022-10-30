const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const LodashWebPackPlugin = require('lodash-webpack-plugin');

const config = {
    entry: {
        main: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
        new LodashWebPackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', {"runtime": "automatic"}]
                        ],
                    plugins: ['lodash']
                },
                exclude: /node_modules/,
                resolve: {extensions: ['.js', '.jsx']},
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                exclude: /node_modules/
            },
            // @TODO js rule
            // @TODO css rule
        ],
    },
    devServer: {
        port: 8000,
        open: true,
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
    }
    // @TODO optimizations
    // @TODO lodash treeshaking
    // @TODO chunk for lodash
    // @TODO chunk for runtime
    // @TODO fallback for crypto
};

module.exports = config;
