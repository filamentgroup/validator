/*! validator - v0.1.0 - 2014-04-10
* https://github.com/filamentgroup/validator
* Copyright (c) 2014 Filament Group; Licensed MIT */
(function( $, w ){
	"use strict";

	var Validator = function( element, opts ){
		if( !element ){
			throw new Error( "Element passed into Validator is not valid" );
		}
		opts = opts || {};
		opts.validatorClass = opts.validatorClass || "invalid";
		opts.$applyElement = $( opts.applyElement && opts.applyElement.length ? opts.applyElement : element );

		this.opts = opts;
		this.element = element;
		this.$element = $( element );

		this.type = this.$element.attr( "data-validate" );
		this.required = this.$element.is( "[required]" );
	};

	Validator.prototype.config = {};

	Validator.prototype.copy = {};

	Validator.prototype.validate = function(){
		var value = this.getValue(),
			result = this._isValid( value ),
			$error;

		this.opts.$applyElement[ result ? "removeClass" : "addClass" ]( "invalid" );

		$error = this.getErrorMessageElement();
		if( !result ) {
			$error.html( this.getErrorMessage( value ) );
		} else {
			$error.remove();
		}
		return result;
	};

	Validator.prototype.getValue = function() {
		var type = this.$element.attr( 'type' ),
			name,
			count = 0;

		if( type === 'radio' || type === 'checkbox' ) {
			name = this.$element.attr( 'name' );
			$( '[name="' + name + '"]' ).each(function() {
				if( this.checked ) {
					count++;
				}
			});

			return count;
		}

		return this.element.value;
	};

	Validator.prototype._isValid = function( value ) {
		var result = false,
			method = this[ 'validate' + this.type ];

		if( value ) {
			if( !this.type ){
				result = true;
			} else if( this.type && method ){
				result = method.call( this, value );
			}
		} else {
			result = !this.required;
		}

		return result;
	};

	Validator.prototype.getErrorMessageElement = function() {
		var $el = this.opts.$applyElement,
			$prev = $el.prev( '.error-msg' );

		return $prev.length ? $prev : $( '<div>' ).addClass( 'error-msg' ).insertBefore( $el );
	};

	Validator.prototype.getErrorMessage = function( value ) {
		var type = value && this.type || ( this.required ? 'required' : '' );
		return this[ 'message' + this.type ] ? this[ 'message' + this.type ]( value ) : this.copy[ type ].message;
	};

	w.Validator = Validator;

}( jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"birthday": {
			"pattern" : "^(0[1-9]|1[0-2])[ -\\/]?(0[1-9]|[12][0-9])|(0[469]|11)[ -\\/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[ -\\/]?(0[1-9]|[12][0-9]|3[01])$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"birthday": {
			"placeholder": "MM DD",
			"message" : "Birthday should be a two digit month and two digit day."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatebirthday = function( val ){
		var result = false;

		if ( new RegExp( this.config.birthday.pattern ).test( val ) ) {
			result = val;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"ccexpiration" : {
			"pattern" : "^[0-9]{4}[ -\\/\\.]?[0-9]{2}$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"ccexpiration": {
			"placeholder": "YYYY MM"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validateccexpiration = function( value ){
		var result = false;

		if ( new RegExp( this.config.ccexpiration.pattern ).test( value ) ) {
			result = true;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"credit": [
			{
				"id": "mastercard",
				"regex": "^5[1-5]",
				"fullRegex": "^5[1-5]\\d{14}$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "visa",
				"regex": "^4",
				"fullRegex": "^4\\d{15}$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "discover",
				"regex": "^6(011|5)",
				"fullRegex": "^6(011\\d{12}|5\\d{14})$",
				"maxlength": "16",
				"cvvlength": 3
			},
			{
				"id": "amex",
				"regex": "^3[47]",
				"fullRegex": "^3[47]\\d{13}$",
				"maxlength": "15",
				"cvvlength": 4
			}
		]
	});

}( Validator, jQuery ));
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
			"message" : "Security Codes require a valid card credit card number.",
			"placeholder": "3–4 Digits",
			"visa": {
				"placeholder": "3 Digits",
				"message": "Visa cards should have a 3 digit security code."
			},
			"mastercard": {
				"placeholder": "3 Digits",
				"message": "Mastercards should have a 3 digit security code."
			},
			"discover": {
				"placeholder": "3 Digits",
				"message": "Discover cards should have a 3 digit security code."
			},
			"amex": {
				"placeholder": "4 Digits",
				"message": "American Express cards should have a 4 digit security code."
			}
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype._getCreditType = function( value ) {
		var card,
			cards = this.config.credit;

		for ( var i = 0; i < cards.length; i++ ) {
			card = cards[ i ];

			if ( new RegExp( card.regex ).test( value ) ) {
				return card;
			}
		}
	};

	Validator.prototype._findCreditField = function() {
		return this.$element.closest( "form" ).find( "[data-validate=credit]" );
	};

	Validator.prototype._findCvvField = function() {
		return this.$element.closest( "form" ).find( "[data-validate=cvv]" );
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

	Validator.prototype.messagecvv = function(){
		var cc = this._findCreditField(),
			card = this._getCreditType( cc[ 0 ].value );

		return card && this.copy.cvv[ card.id ].message || this.copy.cvv.message;
	};

	Validator.prototype.validatecredit = function( value ){
		var number = value.replace( /\s/g , '').replace( /-/g, ''),
			card = this._getCreditType( number ),
			cvv = card && this.copy.cvv;

		if( card && cvv ) {
			this._findCvvField().attr( 'placeholder', cvv[ card.id ].placeholder );
		}

		return card && new RegExp( card.fullRegex ).test( number ) || false;
	};

	Validator.prototype.messagecredit = function( value ) {
		var card = this._getCreditType( value );

		return card && this.copy.credit[ card.id ].message || this.copy.credit.message;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"email" : {
			"pattern" : "^\\S+@\\S+\\.\\S+$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"email" : {
			"message" : "Incorrect e-mail format."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validateemail = function( address ){
		var result = false;

		if ( new RegExp( this.config.email.pattern ).test( address ) ) {
			result = address;
		}

		return result;
	};
}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"numeric": {
			"pattern": "[0-9]+"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"numeric": {
			"message": "Needs to be a number."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatenumeric = function( value ){
		var result = false;

		if ( new RegExp( this.config.numeric.pattern ).test( value ) ) {
			result = true;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.copy, {
    "password" : {
      "message" : "Passwords must contain at least 6 characters with an uppercase letter, a lowercase letter, and a number."
    }
  });

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatepassword = function( val ){
		// TODO move functions out to methods
		var result = false,
			isCorrectLength = function( pw ){
				if( typeof pw === "string" && pw.length > 5 && pw.length < 16 ){
					return true;
				}
			},
			hasNumber = function( pw ){
				if( typeof pw === "string" && pw.match( /\d/ ) ){
					return true;
				}
			},
			hasLowerCase = function( pw ){
				if( typeof pw === "string" && pw.match( /[a-z]/ ) ){
					return true;
				}
			},
			hasUpperCase = function( pw ){
				if( typeof pw === "string" && pw.match( /[A-Z]/ ) ){
					return true;
				}
			};

			if( isCorrectLength( val ) && hasUpperCase( val ) && hasLowerCase( val ) && hasNumber( val ) ){
				result = val;
			}

		return result;
	};


}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.copy, {
    "passwordconfirm" : {
      "message" : "Passwords must match."
    }
  });

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

	Validator.prototype.validatepasswordconfirm = function( val ){
		var passwords = this.$element.closest( "form" ).find( "[data-validate=password]" ),
			result = false,
			pw;

		if( passwords.length ){
			pw = passwords[0].value;
			if( pw === val ){
				result = val;
			}
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"phone" : {
			"pattern" : "^[\\(]?[0-9]{3}[\\)]?[ -]?[0-9]{3}[ -]?[0-9]{4}$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"phone" : {
			"placeholder": "206 555 0123",
			"message" : "Phone numbers should have 10 digits."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
	Validator.prototype.validatephone = function( val ){
		var result = false;

		if ( new RegExp( this.config.phone.pattern ).test( val ) ) {
			result = val;
		}

		return result;
	};

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.copy, {
    "required" : {
      "message" : "This is required."
    }
  });

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.config, {
		"zip" : {
			"pattern" : "^\\d{5}(-\\d{4})?$"
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
	$.extend( Validator.prototype.copy, {
		"zip" : {
			"placeholder": "00000",
			"message" : "ZIP Code should be 5 digits."
		}
	});

}( Validator, jQuery ));
/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
	Validator.prototype.validatezip = function( number ){
		// TODO move the data.validator reference to parameter of the constructor
		var result = false;

		if ( new RegExp( this.config.zip.pattern ).test( number ) ) {
			result = number;
		}

		return result;
	};
}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( $, window, undefined ) {

	var pluginName = "validator",
		dataKey = pluginName,
		formSubmitErrorEventName = 'error.validator',
		initSelector = "[required],[data-validate]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var $el = $( this );

			if( $el.data( dataKey ) ) {
				return;
			}

			var validator = new Validator( this, {
				applyElement: $el.closest( "label" )
			});

			$el.data( dataKey, validator );

			$el.bind( "blur", function() {
				validator.validate();
			});

			$el.closest( "form" ).bind( "submit", function( e ){
				if( !validator.validate() ){
					if( !e.isDefaultPrevented() ) {
						$( this ).trigger( formSubmitErrorEventName );
					}
					e.preventDefault();
				}
			});
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, this ));
