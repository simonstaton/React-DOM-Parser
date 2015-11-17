var React = require('react');

/** @jsx React.DOM */
var parserJsx = {

	modules: {},

	constructorClass: React.createClass({
		render: function(){
			var Component = (function(self){
					return new Function("return ("+parserJsx.modules[self.props.component]+")")();
				})(this);
			return (
				<Component ref="module" {...this.props.props} children={this.props.children} />
			)
		}
	});

}

module.exports = parserJsx;