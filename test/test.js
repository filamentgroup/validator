/*global module:true*/
/*global test:true*/
/*global equal:true*/
/*global jQuery:true*/
/*global ok:true*/
/*global console:true*/
(function( w, $ ) {
	"use strict";

	module( "Constructor", {
		setup: function() {
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.validator = $( "[data-validate=credit]" ).data( "validator" );
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

	module( "Events", {
		setup: function() {
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.validatorPhone = $( "[data-validate=phone]" ).data( "validator" );
			this.validatorZip = $( "[data-validate=zip]" ).data( "validator" );
		},
		teardown: function() {
			this.validatorPhone = null;
			this.validatorZip = null;
		}
	});

	test( "Required should show error", function() {
		ok( this.validatorPhone.$element.is( "[required]" ), "Element is required." );
		this.validatorPhone.element.value = "";
		this.validatorPhone.$element.trigger( "blur" );
		ok( this.validatorPhone.$element.is( ".invalid" ), "Has invalid class." );
		ok( this.validatorPhone.$element.prev().filter( '.error-msg' ).length, "Error message is shown." );

		this.validatorPhone.element.value = "617 482 7120";
		this.validatorPhone.$element.trigger( "blur" );
		ok( !this.validatorPhone.$element.is( ".invalid" ), "Invalid class removed after value added." );
		ok( !this.validatorPhone.$element.prev().filter( '.error-msg' ).length, "Error message was removed." );
	});

	test( "Not required should not show error", function() {
		ok( !this.validatorZip.$element.is( "[required]" ), "Element is not required." );
		this.validatorZip.element.value = "";
		this.validatorZip.$element.trigger( "blur" );
		ok( !this.validatorZip.$element.is( ".invalid" ), "Does not have the invalid class." );

		this.validatorZip.element.value = "ddd";
		this.validatorZip.$element.trigger( "blur" );
		ok( this.validatorZip.$element.is( ".invalid" ), "Has the invalid class with an invalid value." );

		this.validatorZip.element.value = "02111";
		this.validatorZip.$element.trigger( "blur" );
		ok( !this.validatorZip.$element.is( ".invalid" ), "Invalid class with a valid value." );
	});

	module( "Payment", {
		setup: function() {
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.credit = $( "[data-validate=credit]" ).data( "validator" );
			this.cvv = $( "[data-validate=cvv]" ).data( "validator" );
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
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.validator = $( "[data-validate=birthday]" ).data( "validator" );
			this.ccExpiration = $( "[data-validate=ccexpiration]" ).data( "validator" );
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
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.validatorPW = $( "#password1" ).data( "validator" );
			this.validatorPW2 = $( "#password2" ).data( "validator" );
			this.validatorPWConf = $( "[data-validate=passwordconfirm]" ).data( "validator" );
		},
		teardown: function() {
			this.validatorPW = null;
			this.validatorPW2 = null;
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

		ok( !this.validatorPWConf.validatepasswordconfirm( pw ), "The passwords should not match, selected the wrong password field to compare" );
	});

	test( "valid password should confirm, selects the right password field", function(){
		var pw = "Vali1dator";
		ok( this.validatorPW2.validatepassword( pw ), "This is a valid password" );
		[this.validatorPW2.element, this.validatorPWConf.element ].forEach( function( el ){
			el.value = pw;
		});

		ok( this.validatorPWConf.validatepasswordconfirm( pw ), "The passwords should match" );
	});

	module( "Lengths", {
		setup: function() {
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.validatorMinlength = $( "[data-validate=length][minlength]" ).data( "validator" );
			this.validatorMaxlength = $( "[data-validate=length][maxlength]" ).data( "validator" );
			this.validatorMinlengthWords = $( "[data-validate=length][minlength][data-words]" ).data( "validator" );
			this.validatorMaxlengthWords = $( "[data-validate=length][maxlength][data-words]" ).data( "validator" );
		},
		teardown: function() {
			this.validatorMinlength = null;
			this.validatorMaxlength = null;
			this.validatorMinlengthWords = null;
			this.validatorMaxlengthWords = null;
		}
	});

	test( "minlength", function(){
		ok( !this.validatorMinlength.validatelength( "22" ), "Should fail, requires 3 characters" );
		ok( this.validatorMinlength.validatelength( "2244" ), "Should pass, requires 3 characters" );
	});

	test( "maxlength", function(){
		ok( !this.validatorMaxlength.validatelength( "2244" ), "Should fail, is more than 3 characters" );
		ok( this.validatorMaxlength.validatelength( "22" ), "Should pass, is less than 3 characters" );
	});

	test( "minlength words", function(){
		ok( !this.validatorMinlengthWords.validatelength( "Two words" ), "Should fail, requires 2 words" );
		ok( this.validatorMinlengthWords.validatelength( "This is three" ), "Should pass, requires 3 words" );
	});

	test( "maxlength", function(){
		ok( !this.validatorMaxlengthWords.validatelength( "This is four words" ), "Should fail, is more than 3 words" );
		ok( this.validatorMaxlengthWords.validatelength( "Two words" ), "Should pass, is less than 3 words" );
	});

	module( "Other", {
		setup: function() {
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.validatorEmail = $( "[data-validate=email]" ).data( "validator" );
			this.validatorNumeric = $( "[data-validate=numeric]" ).data( "validator" );
			this.validatorZip = $( "[data-validate=zip]" ).data( "validator" );
			this.validatorPhone = $( "[data-validate=phone]" ).data( "validator" );
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

	module( "required select", {
		setup: function(){
			$( "#qunit-fixture" ).trigger( "enhance" );
			this.validatorSelect = $( "#select1" ).data( "validator" );
		}
	});

	test( "select", function(){
		ok( this.validatorSelect.$element.is( "[required]" ), "Element is required." );
		console.log( this.validatorSelect.element.className );
		this.validatorSelect.element.selectedIndex = -1;
		this.validatorSelect.$element.trigger( "blur" );
		ok( this.validatorSelect.$element.is( ".invalid" ), "Has invalid class." );
		console.log( this.validatorSelect.element.className );
		ok( this.validatorSelect.$element.prev().filter( '.error-msg' ).length, "Error message is shown." );
	});


})( window, jQuery );
