# React-DOM-Parser
A DOM parser for the react.js library, used for instantiating react components declaratively.

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
	
	var parser = require('react-dom-parser');

	var myReactComponent = React.createClass({
		render: function(){
			return ...
		}
	});

	parser.register('my-module', myReactComponent);

	parser.register({
		my-module: myReactComponent
	});

Once modules have been registered you may parse the DOM to instantiate them

	parser.parse(document.getElementsByTagName("BODY")[0]);