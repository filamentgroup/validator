/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validateminlength = function( val ){
    var result = false,
        pattern = "^[0-9]{"+ this.$element.attr( "minlength" ) +"}$";

    if ( new RegExp( pattern ).test( val ) ) {
      result = val;
    }

    return result;
  };

}( Validator, jQuery, this ));