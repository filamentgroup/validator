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
    "birthday": {
      "placeholder": "MM DD",
      "message" : "Birthday should be a two digit month and two digit day."
    }
  });

}( Validator, jQuery ));