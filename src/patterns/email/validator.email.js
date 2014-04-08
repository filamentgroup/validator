/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validateemail = function( address ){
		var result = false;

		if ( new RegExp( this.config.email.pattern ).test( address ) ) {
			result = address;
		}

		return result;
	};
}( Validator, jQuery, this ));
