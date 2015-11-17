'use strict';

var ReactDOM = require('react-dom'),
	parserJsx = require('parser.jsx');
	
/** @jsx React.DOM */
module.exports = {

	registry: [],

	getByNode: function(node){
		var result;
		for(var i=0;i<this.registry.length;i++){
			if(ReactDOM.findDOMNode(this.registry[i]) === node){
				result = this.registry[i];
				break;
			}
		}
		return result;
	},

	register: function(module, constructor){
		if(typeof module == 'object'){
			for(var key in module){
				parserJsx.modules[key] = module[key];
			}
		} else if (typeof module == 'string') {
			parserJsx.modules[module] = constructor;
		}
	},

	parse: function(scope){

		function parseObjectFromString(stringOpts){
			/* jshint ignore:start */
			return new Function("return ({"+stringOpts+"})")();
			/* jshint ignore:end */
		};

		var declarations = scope.querySelectorAll('[data-react-component]');
		for(var i=0;i<declarations.length;i++){

			var node = declarations[i],
				props = parseObjectFromString(node.getAttribute('data-react-props') || ''),
				component = node.getAttribute('data-react-component'),
				Component = ReactDOM.render(<parserJsx.constructorClass component={component} props={props}><div dangerouslySetInnerHTML={{__html: node.innerHTML}} /></parserJsx.constructorClass>, node);
			
			this.registry.push(Component.refs.module);

			node.setAttribute('data-react-props', null);
			node.setAttribute('data-react-component', null);

		}

	}
}

