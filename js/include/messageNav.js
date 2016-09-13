var React    = require('react');
var ReactDOM = require('react-dom');
var MessageNavCell = React.createClass({
	render: function(){
		return (
			<ul className="m-information-cell fff mir-cell-top mir-cell-bottom display-box">
				<li className="choose mir-cell-left box-flex"><a href={""}>
					<i className="icon-jiuzhengonglvesshixin"></i>
					<p>学车攻略</p>
				</a></li>
				<li className="mir-cell-left box-flex"><a href={""}>
					<i className="icon-icon1"></i>
					<p>汽车头条</p>
				</a></li>
				<li className="mir-cell-left box-flex"><a href={""}>
					<i className="icon-anquan"></i>
					<p>安全驾驶</p>
				</a></li>
				<li className="mir-cell-left box-flex"><a href={""}>
					<i className="icon-shipin"></i>
					<p>汽车视频</p>
				</a></li>
			</ul>
		);
	}
});

module.exports = MessageNavCell;