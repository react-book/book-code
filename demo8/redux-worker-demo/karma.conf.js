module.exports = function(config) {
	config.set({
		browsers: [ 'PhantomJS' ],

		files: [
			{ 
				pattern: './spec/test-context.js',
				watched: false
			}
		],

		frameworks: [ 'jasmine' ],

		preprocessors: {
			'spec/test-context.js': [ 'webpack' ]
		},

		reporters: [ 'mocha' ],

		webpack: {
			module: {
				loaders: [
					{ 
						test: /\.js/,
						exclude: /node_modules/,
						loader: 'babel-loader' 
					}
				]
			},

			watch: true
		},

		webpackServer: {
			noInfo: true
		}
	});
};