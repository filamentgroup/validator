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
		"phone" : {
			"pattern" : "^[\\(]?[0-9]{3}[\\)]?[ -]?[0-9]{3}[ -]?[0-9]{4}$"
		}
	});

}( Validator, jQuery ));