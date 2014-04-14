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
				"characters": {
					"singular": {
						"minlength": "Needs to be at least one character.",
						"maxlength": "Needs to be less than or equal to one character."
					},
					"plural": {
						"minlength": "Needs to be at least {0} characters.",
						"maxlength": "Needs to be less than or equal to {0} characters."
					}
				},
				"options": {
					"singular": {
						"minlength": "Select at least one option.",
						"maxlength": "Select less than or equal to one option."
					},
					"plural": {
						"minlength": "Select at least {0} options.",
						"maxlength": "Select less than or equal to {0} options."
					}
				},
				"words": {
					"singular": {
						"minlength": "Needs to be at least one word.",
						"maxlength": "Needs to be less than or equal to one word."
					},
					"plural": {
						"minlength": "Needs to be at least {0} words.",
						"maxlength": "Needs to be less than or equal to {0} words."
					}
				}
			}
		}
	});

}( Validator, jQuery ));