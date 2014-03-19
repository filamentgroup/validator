/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, data, w ){
	"use strict";

	var Validator = function( element, opts ){
		if( !element ){
			throw new Error( "Element passed into Validator is not valid" );
		}
		opts = opts || {};
		opts.validatorClass = opts.validatorClass || "invalid";
		opts.applyElement = opts.applyElement && opts.applyElement.length ? opts.applyElement : element;
		opts.data = opts.data || data;

		this.opts = opts;
		this.element = element;
		this.data = opts.data;

		var $element = $( this.element );
		this.type = $element.attr( "data-validate" );
		this.required = $element.attr( "required" ) !== null;
	};

	Validator.prototype.validate = function(){
		var value = this.element.value,
			result = this._isValid( value );

		$( this.element )[ result ? "removeClass" : "addClass" ]( "invalid" );
		return result;
	};


	Validator.prototype.hasValue = function() {
		var $t = $( this.element ),
			type = $t.attr( 'type' ),
			name,
			count = 0;

		if( type === 'radio' || type === 'checkbox' ) {
			name = $t.attr( 'name' );
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
				result = method( value ); 
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

}( jQuery, this.data, this ));
