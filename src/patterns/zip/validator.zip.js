/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
	Validator.prototype.validatezip = function( number ){
		// TODO move the data.validator reference to parameter of the constructor
		var result = false;

		if ( new RegExp( this.config.zip.pattern ).test( number ) ) {
			result = number;
		}

		return result;
	};
}( Validator, jQuery, this ));
