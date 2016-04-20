/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
/* global CreditableCardType:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"credit": [
			{
				"id": "mastercard",
				"regex": CreditableCardType.TYPES.MASTERCARD,
				"fullRegex": "^5[1-5]\\d{14}$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "visa",
				"regex": CreditableCardType.TYPES.VISA,
				"fullRegex": "^4\\d{15}$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "discover",
				"regex": CreditableCardType.TYPES.DISCOVER,
				"fullRegex": "^6(011\\d{12}|5\\d{14})$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "amex",
				"regex": CreditableCardType.TYPES.AMEX,
				"fullRegex": "^3[47]\\d{13}$",
				"maxlength": "15",
				"cvvlength": 4
			}
		]
	});

}( Validator, jQuery ));