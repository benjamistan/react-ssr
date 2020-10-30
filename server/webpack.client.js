const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    // Inform webpack that we're building a bundle
    // for Node.js rather than for the browser
    target: 'node',

    // Tell webpack the root file of our
    // server application
    entry: './src/client/client.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};

module.exports = merge(baseConfig, config);