/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatelength = function( value ){
		var result = false,
			min = this.$element.attr( "minlength" ),
			max = this.$element.attr( "maxlength" );

		if( ( !min || value.length >= min ) && ( !max || value.length <= max ) ) {
			result = true;
		}

		return result;
	};

	Validator.prototype.messagelength = function( value, msg ){
		var min = this.$element.attr( "minlength" ),
			max = this.$element.attr( "maxlength" ),
			useSelect = this._isSelect() || this._isCheckboxRadio();

		if( min && value.length < min ) {
			return ( useSelect ? msg.minlengthselect : msg.minlength ).replace( /\{\d\}/g, min );
		} else if( max && value.length > max ) {
			return ( useSelect ? msg.maxlengthselect : msg.maxlength ).replace( /\{\d\}/g, max );
		}
	};

}( Validator, jQuery, this ));
