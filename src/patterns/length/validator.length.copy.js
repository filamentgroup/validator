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
				"minlengthselect": "Please select at least {0} options.",
				"maxlength": "Needs to be less than or equal to {0} characters.",
				"maxlengthselect": "Please select less than or equal to {0} options."
			}
		}
	});

}( Validator, jQuery ));