/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, w ){
	"use strict";

	var Validator = function( element, opts ){
		if( !element ){
			throw new Error( "Element passed into Validator is not valid" );
		}
		opts = opts || {};
		opts.validatorClass = opts.validatorClass || "invalid";
		opts.$applyElement = opts.applyElement && opts.applyElement.length ? opts.applyElement : element;

		this.opts = opts;
		this.element = element;
		this.$element = $( element );

		this.type = this.$element.attr( "data-validate" );
		this.required = this.$element.attr( "required" ) !== null;
	};

	Validator.prototype.config = {};

	Validator.prototype.copy = {};

	Validator.prototype.validate = function(){
		var value = this.element.value,
			result = this._isValid( value );

		this.opts.$applyElement[ result ? "removeClass" : "addClass" ]( "invalid" );
		return result;
	};

	Validator.prototype.hasValue = function() {
		var type = this.$element.attr( 'type' ),
			name,
			count = 0;

		if( type === 'radio' || type === 'checkbox' ) {
			name = this.$element.attr( 'name' );
			$( '[name="' + name + '"]' ).each(function() {
				if( this.checked ) {
					count++;
				}
			});

			return count > 0;
		} else {
			return !!this.element.value;
		}
	};

	Validator.prototype._isValid = function( value ) {
		var result = false,
			hasValue = this.hasValue(),
			method = this[ 'validate' + this.type ];

		if( hasValue ) {
			if( !this.type ){
				result = true;
			}
			else if( this.type && method ){
				result = method.call( this, value );
			}
			else {
				result = new RegExp( this.type ).test( value );
			}
		} else {
			result = !this.required;
		}

		return result;
	};


	w.Validator = Validator;

}( jQuery, this ));
