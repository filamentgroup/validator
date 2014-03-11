/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatebirthday = function( val ){
		var validator = this.data.config.validator,
			result = false;

		if ( new RegExp( validator.birthday.pattern ).test( val ) ) {
			result = val;
		}

		return result;
	};

}( this.Validator, this.jQuery, this ));