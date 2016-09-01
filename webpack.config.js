var webpack           = require('webpack');
var path              = require('path');
var commonsPlugin     = new webpack.optimize.CommonsChunkPlugin('common.js');   //公共代码自动抽离出来
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css文件单独抽离出来
var precss            = require('precss');  //css3自动补全前缀依赖的npm
var autoprefixer      = require('autoprefixer');  //css3自动补全前缀依赖的npm

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
        	// CSS,SASS单独打包
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader?pack=cleaner') },
            //使用sass-loader前必须安装node-sass:SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass --save-dev
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader?sourceMap!postcss-loader?pack=cleaner') }, 
			{ test: /\.js$/, loader: "jsx-loader" }
        ]
    },
    postcss: function(){
        return {
            defaults: [precss, autoprefixer],
            cleaner:  [autoprefixer({ browsers: ['last 2 versions','Firefox < 20','ie 8','> 1%'] })]
        };
    },
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
    	new ExtractTextPlugin('../css/[name].css', {allChunks: true}),  //css单独抽离出来打包(路径是相对于output里的path路径)
        new webpack.optimize.UglifyJsPlugin({  //css,js文件压缩
            compress: {
                warnings: false
            }
        })
    ]
};