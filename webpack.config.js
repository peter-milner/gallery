require('webpack');
const path = require('path');
const config = {
	context: __dirname,
	entry: {
        'index': path.join(__dirname, 'app', 'static', 'js', 'index.js')
    },
	output: {
		path: path.join(__dirname, 'app', 'static', 'dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js', '.css',],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)?/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader',],
			},
		],
	},
	watchOptions: {
		poll: true,
		ignored: /node_modules/,
	},
};
module.exports = config;
