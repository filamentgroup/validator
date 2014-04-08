/*global module:true*/
/*global test:true*/
/*global equal:true*/
(function( w ) {
	"use strict";
	var doc = w.document;
	var Validator = w.Validator;

	module( "constructor", {
		setup: function() {
			this.validator = new Validator( doc.querySelector( "[data-validate=credit]" ) );
		},
		teardown: function() {
			this.validator = null;
		}
	});

	test( "type", function() {
		equal( this.validator.type, "credit" );
	});

	test( "element", function() {
		equal( this.validator.$element.attr( 'data-validate' ), "credit");
	});

	module( "Payment", {
		setup: function() {
			this.credit = new Validator( doc.querySelector( "[data-validate=credit]" ) );
			this.cvv = new Validator( doc.querySelector( "[data-validate=cvv]" ) );
		},
		teardown: function() {
			this.credit = null;
			this.cvv = null;
		}
	});

	test( "credit", function(){
		ok( this.credit.validatecredit( "5444 0000 0000 0000" ) );
		ok( this.credit.validatecredit( "5444000000000000" ) );
		ok( this.credit.validatecredit( "5444-0000-0000-0000" ) );
		ok( !this.credit.validatecredit( "5444-0000-0000-000" ) );
		ok( this.credit.validatecredit( "4147 0000 0000 0000" ) );
		ok( this.credit.validatecredit( "4147000000000000" ) );
		ok( this.credit.validatecredit( "4147-0000-0000-0000" ) );
		ok( this.credit.validatecredit( "3797 000000 00000" ) );
		ok( this.credit.validatecredit( "3797-000000-00000" ) );
		ok( this.credit.validatecredit( "379700000000000" ) );
		ok( !this.credit.validatecredit( "37970000000000" ) );
	});

	test( "CVV", function(){
		this.credit.element.value = "5444 0000 0000 0000";
		ok( this.cvv.validatecvv( "744" ) );
		ok( !this.cvv.validatecvv( "7444" ) );
		this.credit.element.value = "4147000000000000";
		ok( this.cvv.validatecvv( "744" ) );
		ok( !this.cvv.validatecvv( "7444" ) );
		this.credit.element.value = "379700000000000";
		ok( this.cvv.validatecvv( "7442" ) );
		ok( !this.cvv.validatecvv( "744" ) );
	});

	module( "Dates", {
		setup: function() {
			this.validator = new Validator( doc.querySelector( "[data-validate=birthday]" ) );
			this.ccExpiration = new Validator( doc.querySelector( "[data-validate=ccexpiration]" ) );
		},
		teardown: function() {
			this.validator = null;
			this.ccExpiration = null;
		}
	});

	test( "birthday", function(){
		// 31 days: 1, 3, 5, 7, 8, 10, 12
		// 30 days: 4, 6, 9, 11
		// 29 days: 2
		ok( this.validator.validatebirthday( "01 31" ) );
		ok( !this.validator.validatebirthday( "01 32" ) );
		ok( this.validator.validatebirthday( "02 29" ) );
		ok( !this.validator.validatebirthday( "02 30" ) );
		ok( this.validator.validatebirthday( "03 31" ) );
		ok( this.validator.validatebirthday( "04 30" ) );
		ok( !this.validator.validatebirthday( "04 31" ) );
		ok( this.validator.validatebirthday( "05 31" ) );
		ok( this.validator.validatebirthday( "06 30" ) );
		ok( !this.validator.validatebirthday( "06 31" ) );
		ok( this.validator.validatebirthday( "07 31" ) );
		ok( this.validator.validatebirthday( "08 31" ) );
		ok( this.validator.validatebirthday( "09 30" ) );
		ok( !this.validator.validatebirthday( "09 31" ) );
		ok( this.validator.validatebirthday( "10 31" ) );
		ok( this.validator.validatebirthday( "11 30" ) );
		ok( !this.validator.validatebirthday( "11 31" ) );
		ok( this.validator.validatebirthday( "12 31" ) );
	});

	test( "Credit Card Expiration", function(){
		ok( this.ccExpiration.validateccexpiration( "2014 05" ) );

		// TODO The cc expiration regex doesn’t handle invalid months
		// ok( !this.ccExpiration.validateccexpiration( "2014 13" ) );

		ok( !this.ccExpiration.validateccexpiration( "2014055" ) );
	});

	module( "Other", {
		setup: function() {
			// this.validatorZip = new Validator( doc.querySelector( "[data-validate=zip]" ) );
			// this.validatorPW = new Validator( doc.querySelector( "[data-validate=password]" ) );
			// this.validatorPWConf = new Validator( doc.querySelector( "[data-validate=passwordconfirm]" ) );
			// this.validatorphone = new Validator( doc.querySelector( "[data-validate=phone]" ) );
			this.validatorEmail = new Validator( doc.querySelector( "[data-validate=email]" ) );
			this.validatorNumeric = new Validator( doc.querySelector( "[data-validate=numeric]" ) );
		},
		teardown: function() {
			this.validatorEmail = null;
			this.validatorNumeric = null;
		}
	});


	test( "email", function(){
		ok( this.validatorEmail.validateemail( "foo@bar.com" ) );
		ok( this.validatorEmail.validateemail( "foo+filament@bar.com" ) );
		ok( !this.validatorEmail.validateemail( "fo bar@bar.com" ) );
		ok( !this.validatorEmail.validateemail( "fobarbar.com" ) );
		ok( !this.validatorEmail.validateemail( "fobarba@rcom" ) );
		ok( this.validatorEmail.validateemail( "admin@12.43.58.785" ) );
	});

	test( "numeric", function(){
		ok( this.validatorNumeric.validatenumeric( "4" ) );
		ok( !this.validatorNumeric.validatenumeric( "dddddd" ) );
	});
})( window );
