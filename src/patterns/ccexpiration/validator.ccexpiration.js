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
		var validator = this.data.config.validator,
			result = false;

		if ( new RegExp( validator.ccexpiration.pattern ).test( value ) ) {
			result = true;
		}

		return result;
	};

}( Validator, jQuery, this ));
