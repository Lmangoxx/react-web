var React = require('react');
var ReactDOM = require('react-dom');
require("../css/style.scss");

let HeaderCell = React.createClass({
	render: function(){
		return (
			<div className="header-cell">
				react文件
			</div>
		);
	}
});

ReactDOM.render(
	<HeaderCell />,
	document.body
);
