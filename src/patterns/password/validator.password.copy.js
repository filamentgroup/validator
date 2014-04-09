/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.copy, {
    "password" : {
      "message" : "Passwords must contain at least 6 characters with an uppercase letter, a lowercase letter, and a number."
    }
  });

}( Validator, jQuery ));