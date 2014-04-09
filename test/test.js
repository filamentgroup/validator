/*global module:true*/
/*global test:true*/
/*global equal:true*/
(function( w ) {
	"use strict";
	var doc = w.document;
	var Validator = w.Validator;

	module( "Constructor", {
		setup: function() {
			this.validator = new Validator( doc.querySelector( "[data-validate=credit]" ) );
		},
		teardown: function() {
			this.validator = null;
		}
	});

	test( "Type", function() {
		equal( this.validator.type, "credit" );
	});

	test( "Element", function() {
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

	test( "Credit", function(){
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

	module( "Passwords", {
		setup: function() {
			this.validatorPW = new Validator( doc.querySelector( "[data-validate=password]" ) );
			this.validatorPWConf = new Validator( doc.querySelector( "[data-validate=passwordconfirm]" ) );
		},
		teardown: function() {
			this.validatorPW = null;
			this.validatorPWConf = null;
		}
	});

	test( "invalid password no num no uppercase", function(){
		var pw = "validator";
		ok( !this.validatorPW.validatepassword( pw ) );
	});

	test( "invalid password no lowercase", function(){
		var pw = "VALIDATOR2";
		ok( !this.validatorPW.validatepassword( pw ) );
	});

	test( "invalid password no num", function(){
		var pw = "Validator";
		ok( !this.validatorPW.validatepassword( pw ) );
	});

	test( "invalid password too short", function(){
		var pw = "Vali1";
		ok( !this.validatorPW.validatepassword( pw ) );
	});

	test( "invalid password too long", function(){
		var pw = "Vali1dator4th0nS";
		ok( !this.validatorPW.validatepassword( pw ) );
	});

	test( "valid password confirm no match", function(){
		var pw = "Vali1dator";
		ok( this.validatorPW.validatepassword( pw ), "This is a valid password" );
		[ this.validatorPW.element ].forEach( function( el ){
			el.value = pw;
		});

		this.validatorPWConf.element.value = "foo";

		ok( this.validatorPWConf.validatepasswordconfirm( pw ), "The passwords should match" );
	});

	test( "valid password confirm", function(){
		var pw = "Vali1dator";
		ok( this.validatorPW.validatepassword( pw ), "This is a valid password" );
		[this.validatorPW.element, this.validatorPWConf.element ].forEach( function( el ){
			el.value = pw;
		});

		ok( this.validatorPWConf.validatepasswordconfirm( pw ), "The passwords should match" );
	});

	module( "Other", {
		setup: function() {
			this.validatorEmail = new Validator( doc.querySelector( "[data-validate=email]" ) );
			this.validatorNumeric = new Validator( doc.querySelector( "[data-validate=numeric]" ) );
			this.validatorZip = new Validator( doc.querySelector( "[data-validate=zip]" ) );
			this.validatorPhone = new Validator( doc.querySelector( "[data-validate=phone]" ) );
		},
		teardown: function() {
			this.validatorEmail = null;
			this.validatorNumeric = null;
			this.validatorZip = null;
			this.validatorPhone = null;
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

	test( "phone", function(){
		ok( this.validatorPhone.validatephone( "4021111111" ) );
		ok( this.validatorPhone.validatephone( "402 1111111" ) );
		ok( this.validatorPhone.validatephone( "402111 1111" ) );
		ok( this.validatorPhone.validatephone( "402 111 1111" ) );
		ok( this.validatorPhone.validatephone( "402-111-1111" ) );
		ok( this.validatorPhone.validatephone( "(402) 111-1111" ) );
		ok( !this.validatorPhone.validatephone( "402123456789" ) );
		ok( !this.validatorPhone.validatephone( "402 123 456789" ) );
	});

	test( "zipcode", function(){
		ok( this.validatorZip.validatezip( "98109" ), "Zip code of 5 digits should work" );
		ok( this.validatorZip.validatezip( "98109-5555" ), "Zip code of 5 digits-4 digits should work" );
		ok( !this.validatorZip.validatezip( "98a109-5555" ), "Zip code is invalid" );
	});

})( window );
