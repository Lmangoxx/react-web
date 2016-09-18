const React    = require('react');
const ReactDOM = require('react-dom');
const FooterCell = React.createClass({
		render: function(){
			return (
				<div className="copyright-text">©2014-2016 呱呱学车版权所有</div>
			);
		}
});

module.exports = FooterCell;