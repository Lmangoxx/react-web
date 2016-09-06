var React    = require('react');
var ReactDOM = require('react-dom');
// var webpack  = require('webpack');
// var webpackDevServer = require('webpack-dev-server');
// var config   = require("../webpack.config.js");
// var compiler = webpack(config);
require("../css/style.scss");

document.body.innerHTML = "123";

// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

// var server = new webpackDevServer(webpack(compiler), {
//   hot: true
// }).listen(8080);

var HeaderCell = React.createClass({
	render: function(){
		return (
			<div className="header-cell">
				react文件s0ssssasdfasd
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
