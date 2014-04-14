/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype._getValueLength = function( value ){
		if( this.$element.is( "[data-words]" ) ) {
			return value.match(/[^\s]+/g).length;
		}

		return value.length;
	};

	Validator.prototype._getMaxLength = function(){
		return this.$element.attr( "maxlength" ) || this.$element.attr( "data-maxlength" );
	};

	Validator.prototype.validatelength = function( value ){
		var result = false,
			min = this.$element.attr( "minlength" ),
			max = this._getMaxLength(),
			len = this._getValueLength( value );

		if( ( !min || len >= min ) && ( !max || len <= max ) ) {
			result = true;
		}

		return result;
	};

	Validator.prototype.messagelength = function( value, msg ){
		var min = this.$element.attr( "minlength" ),
			max = this._getMaxLength(),
			len = this._getValueLength( value ),
			msgType;

		if( this._isSelect() || this._isCheckboxRadio() ) {
			msgType = msg.options;
		} else if( this.$element.is( "[data-words]" ) ) {
			msgType = msg.words;
		} else {
			msgType = msg.characters;
		}

		if( min && len < min ) {
			return ( ( min !== 1 ? msgType.plural.minlength : msgType.singular.minlength ) || msg ).replace( /\{\d\}/g, min );
		} else if( max && len > max ) {
			return ( ( max !== 1 ? msgType.plural.maxlength : msgType.singular.maxlength ) || msg ).replace( /\{\d\}/g, max );
		}
	};

}( Validator, jQuery, this ));
