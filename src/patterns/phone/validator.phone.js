Validator.prototype.validatephone = function( val ){
		var validator = this.data.config.validator,
			result = false;

		if ( new RegExp( validator.phone.pattern ).test( val ) ) {
			result = val;
		}

		return result;
	};