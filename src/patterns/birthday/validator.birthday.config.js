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
    "birthday": {
      "pattern" : "^(0[1-9]|1[0-2])[ -\\/]?(0[1-9]|[12][0-9])|(0[469]|11)[ -\\/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[ -\\/]?(0[1-9]|[12][0-9]|3[01])$"
    }
  });

}( Validator, jQuery ));