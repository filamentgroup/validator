Validator.prototype.validateemail = function( address ){
		var validator = this.data.config.validator,
			result = false;

		if ( new RegExp( validator.email.pattern ).test( address ) ) {
			result = address;
		}

		return result;
	};