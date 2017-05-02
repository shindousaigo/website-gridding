var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");
var webpackCleanupPlugin = require('webpack-cleanup-plugin')
var config = require('./config.js')

var resolve = {
    extensions: ['', '.js', '.css'],
}
var loaders = [
    { test: /\.ts$/, loader: 'ts-loader' },
    { test: /\.html$/, loader: "html-loader" },
    {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url-loader',
        query: {
            limit: 1,
            name: 'images/[hash:8].[ext]'
        }
    },
    {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader"
    },
    {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
    },
    {
        test: /\.css$/,
        loader: extractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader", {
            publicPath: "../"
        })
    }
];
var plugins = [
    new extractTextPlugin(
        "css/style.css", {
            allChunks: true
        }
    ),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: false,
            warnings: false
        },
        output: {
            screw_ie8: false,
            comments: false
        },
        mangle: {
            screw_ie8: false,
        },
    })
];


var output = {
    path: './build/' + config.path,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    // publicPath: "http://on56b65dl.bkt.clouddn.com/"
}

for (let key in config.html) {
    let chunks = []
    config.html[key].forEach(function(e) {
        chunks.push(e)
    }, this);
    plugins.push(new htmlWebpackPlugin({
        template: "./examples/" + config.path + '/' + key + '.html',
        inject: false,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: chunks
    }))
}

switch (process.env.npm_lifecycle_event) {
    case "release":
        plugins.push(new webpackCleanupPlugin())
        var devServer = {
            contentBase: output.path,
            port: 8888
        }
        break;
    default:
        var devServer = {
            contentBase: "./src/" + config.path,
            port: 8080
        }
        break;
}

module.exports = {
    entry: config.entry,
    output: output,
    resolve: resolve,
    plugins: plugins,
    module: {
        loaders: loaders
    },
    postcss: function() {
        return [
            require('autoprefixer'),
            require('postcss-simple-vars'),
            require('postcss-ant'),
            require('postcss-media-minmax'),
        ];
    },
    devServer: devServer
};