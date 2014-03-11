/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype._findCvvField = function() {
		return $( this.element ).closest( "form" ).find( "[data-validate=cvv]" );
	};
	Validator.prototype.validatecvv = function( number ){
		if( isNaN( parseInt( number, 10 ) ) || parseInt( number, 10 ) < 0 ){
			return;
		}

		var cc = this._findCreditField(),
			result = false,
			card = this._getCreditType( cc[ 0 ].value );

		if( card && card.id ){
			result = number.toString().length === parseInt( card.cvvlength, 10 );
		}

		return result;
	};

	Validator.prototype.messagecvv = function( number ){
		var copy = this.data.copy.validator,
			cc = this._findCreditField(),
			card = this._getCreditType( cc[ 0 ].value );

		return card && copy.cvv[ card.id ].message || copy.cvv.message;
	};

}( this.Validator, this.jQuery, this ));