var React = require("react");
var classnames = require("classnames");

/* This stuff is required to make more-or-less 'isolated' styles for each component
 * work. It's all a bit hacky, but it doesn't seem that there's really any better
 * solution for this in React. Just make sure to always define this kind of require
 * for a component. Mind that the class that is defined in test-component.scss refers
 * to the same class that is defined below in the `classnames` call.
 */
require("../styles/test-component.scss")

var classes = classnames("test-component", {
	// no conditional classes yet - docs at https://www.npmjs.com/package/classnames
});

module.exports = React.createClass({
	render: function() {
		return (
			<p className={classes}>
				Hello world!
			</p>
		)
	}
})