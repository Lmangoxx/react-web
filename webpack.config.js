var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');  //css文件单独抽离出来
var precss            = require('precss');  //css3自动补全前缀依赖的npm
var autoprefixer      = require('autoprefixer');  //css3自动补全前缀依赖的npm
var env               = process.env.WEBPACK_ENV;
var outputFileName;

var config  = {
    //页面入口文件配置
    entry: {
        main : [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8888',
            './js/main.js'
            ]
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, './src/js'),
        publicPath: './',
        filename: '[name].min.js'
    },
    module: {
        //加载器配置
        loaders: [
        	// CSS,SASS单独打包
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style','css!postcss?pack=cleaner') },
            //使用sass-loader前必须安装node-sass:SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass --save-dev
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style','css!sass?sourceMap!postcss?pack=cleaner') }, 
			//{ test: /\.js$/, loader: "jsx" }
            //{ test: /\.js$/, loader: "babel-loader?presets[]=es2015", query: { presets: ['react']} }
            { test: /\.js$/, loader: "babel", query: { presets: ['react']} },
            { test:/\.(png)|(jpg)|(gif)$/, loader: "url?limit=10000" }
        ]
    },
    postcss: function(){
        return {
            defaults: [precss, autoprefixer],
            cleaner:  [autoprefixer({ browsers: ['last 2 versions','Firefox < 20','ie 8','> 1%'] })]
        };
    },
    resolve: {
    	root: [  //添加默认搜索路径
	      	path.join(__dirname, "js")
	    ],
    	extensions: ['', '.js', '.json', '.scss'],
	    alias: {
	      	jquery: "lib/jquery-1.7.2.min.js",
            slider: "lib/slider-1.0.js",
            swiper: "lib/swiper.3.3.1.min.js",
            mainFun: "lib/mainFun.js"
	      	//let_it_snow: "js/lib/jquery.let_it_snow.js"
	    }
	},
	//插件项
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热更新
    	new webpack.optimize.CommonsChunkPlugin('common.js'),  //js公共代码抽离
    	new ExtractTextPlugin("../css/[name].min.css", {allChunks: true})  //css单独抽离出来打包(路径是相对于output里的path路径)
    ]
};


if(env === "production"){  // 生产环境下压缩
    var uglify = new webpack.optimize.UglifyJsPlugin({  //css,js文件压缩
        compressor: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
        }
    });
    config.plugins.push(uglify);
}

module.exports = config;