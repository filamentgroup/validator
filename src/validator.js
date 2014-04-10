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
		opts.$applyElement = $( opts.applyElement && opts.applyElement.length ? opts.applyElement : element );

		this.opts = opts;
		this.element = element;
		this.$element = $( element );

		this.type = this.$element.attr( "data-validate" );
		this.required = this.$element.is( "[required]" );
	};

	Validator.prototype.config = {};

	Validator.prototype.copy = {};

	Validator.prototype.validate = function(){
		var value = this.getValue(),
			result = this._isValid( value ),
			$error;

		this.opts.$applyElement[ result ? "removeClass" : "addClass" ]( "invalid" );

		$error = this.getErrorMessageElement();
		if( !result ) {
			$error.html( this.getErrorMessage( value ) );
		} else {
			$error.remove();
		}
		return result;
	};

	Validator.prototype.getValue = function() {
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

			return count;
		}

		return this.element.value;
	};

	Validator.prototype._isValid = function( value ) {
		var result = false,
			method = this[ 'validate' + this.type ];

		if( value ) {
			if( !this.type ){
				result = true;
			} else if( this.type && method ){
				result = method.call( this, value );
			}
		} else {
			result = !this.required;
		}

		return result;
	};

	Validator.prototype.getErrorMessageElement = function() {
		var $el = this.opts.$applyElement,
			$prev = $el.prev( '.error-msg' );

		return $prev.length ? $prev : $( '<div>' ).addClass( 'error-msg' ).insertBefore( $el );
	};

	Validator.prototype.getErrorMessage = function( value ) {
		var type = value && this.type || ( this.required ? 'required' : '' );
		return this[ 'message' + this.type ] ? this[ 'message' + this.type ]( value ) : this.copy[ type ].message;
	};

	w.Validator = Validator;

}( jQuery, this ));
