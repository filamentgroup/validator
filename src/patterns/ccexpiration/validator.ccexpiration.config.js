/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $ ) {
  $.extend( Validator.prototype.config, {
    "ccexpiration" : {
      "pattern" : "^[0-9]{4}[ -\\/\\.]?[0-9]{2}$"
    }
  });

}( Validator, jQuery ));