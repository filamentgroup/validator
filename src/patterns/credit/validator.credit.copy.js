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
		"credit" : {
			"placeholder": "0000 0000 0000 0000",
			"message": "Not a valid credit card number.",
			"visa": {
				"message": "Visa cards should have 16 digits."
			},
			"mastercard": {
				"message": "Mastercards should have 16 digits."
			},
			"discover": {
				"message": "Discover cards should have 16 digits."
			},
			"amex": {
				"message": "American Express cards should have 15 digits."
			}
		},
		"ccexpiration": {
			"placeholder": "YYYY MM"
		},
		"cvv" : {
			"message" : "Security code requires a valid card credit card number.",
			"visa": {
				"message": "Visa cards should have a 3 digit security code."
			},
			"mastercard": {
				"message": "Mastercards should have a 3 digit security code."
			},
			"discover": {
				"message": "Discover cards should have a 3 digit security code."
			},
			"amex": {
				"message": "American Express cards should have a 4 digit security code."
			}
		}
	});

}( Validator, jQuery ));