/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validateccexpiration = function( value ){
		var result = false;

		if ( new RegExp( this.config.ccexpiration.pattern ).test( value ) ) {
			result = true;
		}

		return result;
	};

}( Validator, jQuery, this ));
