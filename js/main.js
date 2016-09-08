var React    = require('react');
var ReactDOM = require('react-dom');
require("../css/style.scss");

var HeaderCell = React.createClass({
	render: function(){
		return (
			<div className="header-cell">
				这是热更新文件啊Javascript
			</div>
		);
	}
});

ReactDOM.render(
	<HeaderCell />,
	document.getElementById('content-cell')
);

// if(module.hot)
//     module.hot.accept();
