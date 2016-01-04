'use strict';

module.exports = {
    entry: './example/entry.jsx',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [
                    'react-hot',
                    'es3ify',
                    'babel?{presets:["es2015", "stage-0", "react"]}'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    'react-hot',
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'autoprefixer?{browsers:["> 5%", "ie 9"]}'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: /node_modules/
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    devServer: {
        host: '10.1.194.32',
        contentBase: 'example/'
    }
};
