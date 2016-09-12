var React          = require('react'),
	ReactDOM       = require('react-dom'),
	HeaderCell     = require('./include/header'),   // header头部
	NavCell        = require('./include/nav'),      // nav部分
	MessageNavCell = require('./include/message-nav'),  // messageNav部分
	BannerCell     = require('./include/banner'),
	DownloadApp = require('./include/download-app'),  // downloadApp下载部分
	MainFun = require('mainFun');  // 公共方法
	require("../css/style.scss");  // 样式引入

var MessageHtml = React.createClass({
	componentDidMount: function(){  // 这里需要注意，对dom进行操作，以及公共绑定的事件，要在componentDidMount里调用，因为这个时候dom才被真是插入
		//var mainFun  = new MainFun();  // 调用公共方法
	},
	render: function(){
		return (
			<div>
				<HeaderCell />
				<NavCell />
				<MessageNavCell />
				<BannerCell />
				<DownloadApp href="" />
			</div>
		);
	}
});
ReactDOM.render(
	<MessageHtml />,
	document.getElementById('content-cell')
);