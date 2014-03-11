/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
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

	Validator.prototype.validatecredit = function( value ){
		var number = value.replace( /\s/g , '').replace( /-/g, ''),
			result = false,
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

}( this.Validator, this.jQuery, this ));