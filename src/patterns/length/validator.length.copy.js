/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"length": {
			"message": {
				"minlength": "Needs to be at least {0} characters.",
				"maxlength": "Needs to be less than or equal to {0} characters."
			}
		}
	});

}( Validator, jQuery ));