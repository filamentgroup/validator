/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validateminlength = function( value ){
		var result = false,
			min = this.$element.attr( "data-minlength" );

		if( !min || value.toString().length >= min ) {
			result = true;
		}

		return result;
	};

	Validator.prototype.messageminlength = function( value, msg ){
		var min = this.$element.attr( "data-minlength" );

		return msg.replace( /\{0\}/g, min );
	};

}( Validator, jQuery, this ));
