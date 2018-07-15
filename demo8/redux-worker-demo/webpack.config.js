var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: {
        lib: './src/reduxWorker.js'
    },
    output: {
        library: 'ReduxWorker',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};
