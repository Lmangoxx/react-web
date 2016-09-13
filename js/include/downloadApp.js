var React    = require('react'),
	ReactDOM = require('react-dom'),
	MainFun  = require('mainFun');

var DownloadApp = React.createClass({
	getInitialState: function(){
		if(!navigator.userAgent.match("GGXUECHE")){
			return {
				display : "block"
			}
		}else{
			return {
				display : "none"
			}
		}
	},
	componentDidMount: function(){
		var mainFun = new MainFun();
	},
	render: function(){
		var href = this.props.href ? this.props.href : "http://a.app.qq.com/o/simple.jsp?pkgname=com.ecar.student";
		return (
			<div className="download-app display-box" id="userAgent" style={{display:this.state.display}}>
		        <i className="icon-guanbi" id="close" data-dome={"userAgent"}></i>
		        <a className="info box-flex" href={ href }>
		        	<img src={"./images/gg-app-btn.png"} alt={"呱呱学车app下载"} />
		        </a>
		    </div>
		);
	}
});
module.exports = DownloadApp;