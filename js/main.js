var React    = require('react');
var ReactDOM = require('react-dom');
require("../css/style.scss");

var HeaderCell = React.createClass({
	render: function(){
		return (
			<div className="m-header-cell display-box">
				<div className="m-h-icon">
					<a className="m-h-city" href={""}>北京<em className="icon-aui-icon-down"></em></a>
				</div>
				<div className="m-h-title box-flex"><img src={"./images/header-logo.png"} height="25" width="91" alt={""} /></div>
				<div className="m-h-icon">
					<a href={""}><em className="icon-kefu-copy"></em>客服</a>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<HeaderCell />,
	document.getElementById('content-cell')
);