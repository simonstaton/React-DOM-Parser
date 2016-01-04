var React = require('react'),
	ReactDOM = require('react-dom'),
	parser;

/** @jsx React.DOM */
module.exports = parser = {

	registry: [],

	callbacks: [],

	modules: {},

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

	onParseComplete: function(callback){
		this.callbacks.push(callback);
	},

	register: function(module, constructor){
		if(typeof module == 'object'){
			for(var key in module){
				parser.modules[key] = module[key];
			}
		} else if (typeof module == 'string') {
			parser.modules[module] = constructor;
		}
	},

	ParserConstructor: React.createClass({
		render: function(){
			this.props.props.children = this.props.children;
			this.props.props.ref = "module";
			return React.createElement(parser.modules[this.props.component], this.props.props)
		}
	}),

	parse: function(scope){

		function parseObjectFromString(stringOpts){
			/* jshint ignore:start */
			return new Function("return ({"+stringOpts+"})")();
			/* jshint ignore:end */
		}

		var Constructor = this.ParserConstructor,
			Declarations = scope.querySelectorAll('[data-react-component]');

		for(var i=0;i<Declarations.length;i++){

			var node = Declarations[i],
				props = parseObjectFromString(node.getAttribute('data-react-props') || ''),
				component = node.getAttribute('data-react-component'),
				placeholder = React.createElement(Constructor, {component: component, props: props}, React.createElement("div", {dangerouslySetInnerHTML: { __html: node.innerHTML }}));

			var Component = ReactDOM.render(placeholder, node);
			this.registry.push(Component.refs.module);
			
			node.setAttribute('data-react-props', null);
			node.setAttribute('data-react-component', null);

		}
		
		for(var i=0;i<this.callbacks.length;i++){
			this.callbacks[i]();
		}

		this.callbacks = [];

	}

};