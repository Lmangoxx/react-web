var React      = require('react');
var ReactDOM   = require('react-dom');
var HeaderCell = require('./header');
var NavCell = require('./nav');
require("../css/style.scss");

var MessageHtml = React.createClass({
	render: function(){
		return (
			<div>
				<HeaderCell />
				<NavCell />
				ss
			</div>
		);
	}
});

ReactDOM.render(
	<MessageHtml />,
	document.getElementById('content-cell')
);