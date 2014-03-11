/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
(function( Validator, $, window, undefined ) {
	Validator.prototype.validatezip = function( number ){
		// TODO move the data.validator reference to parameter of the constructor
		var validator = this.data.config.validator,
			result = false;

		if ( new RegExp( validator.zip.pattern ).test( number ) ) {
			result = number;
		}

		return result;
	};
}( this.Validator, this.jQuery, this ));