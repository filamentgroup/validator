/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatenumeric = function( address ){
		var validator = this.data.config.validator,
			result = false;

		if ( new RegExp( validator.numeric.pattern ).test( address ) ) {
			result = address;
		}

		return result;
	};

}( Validator, jQuery, this ));
