/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype._getCreditType = function( value ) {
		var card,
			cards = this.data.config.credit;

		for ( var i = 0; i < cards.length; i++ ) {
			card = cards[ i ];

			if ( new RegExp( card.regex ).test( value ) ) {
				return card;
			}
		}
	};

	Validator.prototype._findCreditField = function() {
		return $( this.element ).closest( "form" ).find( "[data-validate=credit]" );
	};

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

	Validator.prototype.messagecvv = function( ){
		var copy = this.data.copy.validator,
			cc = this._findCreditField(),
			card = this._getCreditType( cc[ 0 ].value );

		return card && copy.cvv[ card.id ].message || copy.cvv.message;
	};

	Validator.prototype.validatecredit = function( value ){
		var number = value.replace( /\s/g , '').replace( /-/g, ''),
			card = this._getCreditType( number ),
			cvv = card && this.data.copy.validator.cvv;

		if( card && cvv ) {
			this._findCvvField().attr( 'placeholder', cvv[ card.id ].placeholder );
		}

		return card && new RegExp( card.fullRegex ).test( number ) || false;
	};

	Validator.prototype.messagecredit = function( value ) {
		var copy = this.data.copy.validator,
			card = this._getCreditType( value );

		return card && copy.credit[ card.id ].message || copy.credit.message;
	};

}( Validator, jQuery, this ));
