/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
	Validator.prototype.validatephone = function( val ){
		var result = false;

		if ( new RegExp( this.config.phone.pattern ).test( val ) ) {
			result = val;
		}

		return result;
	};

}( Validator, jQuery, this ));
