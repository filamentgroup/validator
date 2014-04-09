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
		"phone" : {
			"placeholder": "206 555 0123",
			"message" : "Phone numbers should have 10 digits."
		}
	});

}( Validator, jQuery ));