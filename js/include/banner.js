var React    = require('react'),
	ReactDOM = require('react-dom'),
	MainFun  = require('mainFun'),  // 公共方法
	Slider   = require('slider');
var mainFun = new MainFun();
var BannerCell = React.createClass({
	componentDidMount: function(){
		var bannerParam = {   //定义banner部分ajax参数
	        url : "http://www.ggxueche.com/main/article/page",
	        data : {
	                  columnId : 1450000023,
	                  recommend : 1,
	                  currentPage : 0
	               },
	        success : function(data){
	                if(data.articles.length > 0){
	                    new Slider({
	                        "dom" : document.getElementById('mir-cell-banner'),
	                        "dataList" : data.articles,
	                        "auto" : true,
	                        "autoTime" : 3000
	                    });
	                }else{
	                    mainFun.msg("暂时没有数据");
	                }     
	        }
	    };
		var mainFun  = new MainFun();  // 调用公共方法
		mainFun.getJSON(bannerParam);   //执行banner加载
	},
	render: function(){
		var default_css = {
			width : "100%",
			height : "210px",
			backgroundImage : "url(../images/gg-default.jpg)",
			backgroundColor : "#efefef",
			backgroundPosition : "center center",
			backgroundRepeat : "no-repeat"
		};
		return (
			<div className="mir-cell-banner" id="mir-cell-banner">
	            <div style={default_css}></div>
	        </div>
		);
	}
});
module.exports = BannerCell;