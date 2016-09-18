const React    = require('react');
const ReactDOM = require('react-dom');
const NavCell = React.createClass({
		render: function(){
			return (
				<div className="m-nav-cell fff">
					<a href={""}>驾校</a>
					<i className="m-nav-line"></i>
					<a className="main-color" href={""}>资讯</a>
				</div>
			);
		}
});

module.exports = NavCell;