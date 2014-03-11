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

	