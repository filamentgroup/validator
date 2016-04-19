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
		"zip" : {
			"pattern" : "^\\d{5}(-?\\d{4})?$"
		}
	});

}( Validator, jQuery ));