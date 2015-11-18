# React-DOM-Parser
A DOM parser for the react.js library, used for instantiating react components declaratively in your html.

This tool is to be used with a bundler such as browserfy but can be adpated for other use cases.

## Installation
	npm install react-dom-parser --save-dev

## Example

html declaration

	<div data-react-component="my-module" data-react-props="
		name: 'simon staton',
		data: {
			age: 23
		}
	"></div>

Before instantiating a react component you must first register it in the parsers registry.
	
	// Require parser
	var parser = require('react-dom-parser');

	// An example react component
	var myReactComponent = React.createClass({
		render: function(){
			return ...
		}
	});

	// Register individually
	parser.register('my-module', myReactComponent);

	// Register multiples
	parser.register({
		'my-module': myReactComponent
	});

Once modules have been registered you may parse the DOM or any other DOM element to instantiate them

	parser.parse(document.getElementsByTagName("BODY")[0]);