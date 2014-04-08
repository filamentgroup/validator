/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"credit": [
			{
				"id": "mastercard",
				"regex": "^5[1-5]",
				"fullRegex": "^5[1-5]\\d{14}$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "visa",
				"regex": "^4",
				"fullRegex": "^4\\d{15}$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "discover",
				"regex": "^6(011|5)",
				"fullRegex": "^6(011\\d{12}|5\\d{14})$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "amex",
				"regex": "^3[47]",
				"fullRegex": "^3[47]\\d{13}$",
				"maxlength": "15",
				"cvvlength": 4
			}
		]
	});

}( Validator, jQuery ));