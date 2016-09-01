var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');   //公共代码自动抽离出来
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
    //页面入口文件配置
    entry: {
        main : './js/main.js'
    },
    //入口文件输出配置
    output: {
        path: './src/js',
        filename: '[name].min.js'
    },
    module: {
        //加载器配置
        loaders: [
        	// CSS,LESS单独打包
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader','postcss-loader') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader?sourceMap','postcss-loader') },
            //{ test: /\.scss$/, loader: "style-loader!css-loader!sass-loader?sourceMap" },   //使用sass-loader前必须安装npm install node-sass --save-dev
            //{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.js$/, loader: "jsx-loader" }
            //{ test: /\.css$/, ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    postcss:[autoprefixer({browsers:['last 2 versions']})],
    //'!autoprefixer-loader?{"browsers": ["last 2 version", "> 10%", "> 5% in US", "ie 8", "ie 7"]}
    resolve: {
    	root: [  //添加默认搜索路径
	      	path.join(__dirname, "src/")
	    ],
    	extensions: ['', '.js', '.json', '.scss'],
	    alias: {
	      	//jquery: "lib/bower_components/jquery-1.11.1.min.js",
	      	//let_it_snow: "js/lib/jquery.let_it_snow.js"
	    }
	},
	//插件项
    plugins: [
    	commonsPlugin,
    	new ExtractTextPlugin('[name].css', {allChunks: true}),
    ]
};