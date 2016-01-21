'use strict';

var React = require("react"); // apparently the babel-loader is broken and will not add this by itself
var ReactDOM = require("react-dom");
var TestComponent = require("./components/jsx/test-component");

require("detect-dom-ready")(function() {
	console.log(document.getElementById("test-component"))

	ReactDOM.render(
		<TestComponent/>,
		document.getElementById("test-component")
	);
})