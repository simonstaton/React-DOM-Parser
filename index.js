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

	parse: function($scope){

		function parseObjectFromString(stringOpts){
			/* jshint ignore:start */
			return new Function("return ({"+stringOpts+"})")();
			/* jshint ignore:end */
		};

		_.each($scope.find('[data-react-component]'), _.bind(function(node){
			var $el = $(node),
				props = parseObjectFromString($el.data('react-props') || ''),
				component = $el.data('react-component'),
				Component = ReactDOM.render(<parserJsx.constructorClass component={component} props={props}><div dangerouslySetInnerHTML={{__html: node.innerHTML}} /></parserJsx.constructorClass>, node);
			this.registry.push(Component.refs.module);
			$el.attr('data-react-props', null);
			$el.attr('data-react-component', null);
		}, this));

	}
}

