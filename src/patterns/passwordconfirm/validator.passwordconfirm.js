/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatepasswordconfirm = function( val ){
		var $form = this.$element.closest( "form" ),
			passwords = $form.find( "[data-validate=password]" ),
			result = false,
			pw;

		if( passwords.length !== 1 ) {
			passwords = $form.find( "[data-passwordconfirm]");
		}

		if( passwords.length ){
			pw = passwords[0].value;
			if( pw === val ){
				result = val;
			}
		}

		return result;
	};

}( Validator, jQuery, this ));
