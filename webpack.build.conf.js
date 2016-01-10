'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/LGUIReact.js',
    output: {
        path: './dist',
        library: 'LGUIReact',
        libraryTarget: 'commonjs2',
        filename: 'lagouui.react.js'
    },
    externals: [
        'react',
        'classnames',
        'babel-polyfill',
        'font-awesome/css/font-awesome.css'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: [
                'es3ify',
                'babel?{presets:["es2015", "stage-0", "react"]}'
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                'style',
                'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                'autoprefixer?{browsers:["> 5%", "ie 9"]}'
            ),
            exclude: /node_modules/
        }]
    },
    plugins: [
        new ExtractTextPlugin('lagouui.react.css')
    ]
};
