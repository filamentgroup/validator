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
		"zip" : {
			"placeholder": "00000",
			"message" : "ZIP Code should be 5 digits."
		}
	});

}( Validator, jQuery ));