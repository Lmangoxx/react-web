var React    = require('react');
var ReactDOM = require('react-dom');
require("../css/style.scss");



// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

// var server = new webpackDevServer(webpack(compiler), {
//   hot: true
// }).listen(8080);

var HeaderCell = React.createClass({
	render: function(){
		return (
			<div className="header-cell">
				这是热更新文件啊
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
