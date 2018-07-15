var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: {
        main: './main.js',
        worker: './reducers/worker.js'
    },
    output: { 
        path: __dirname,
        filename: './dist/[name].bundle.js' 
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
