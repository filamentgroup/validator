/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

/* global Validator:true */
/* global jQuery:true */
(function( $, window, undefined ) {

	var pluginName = "validator",
		dataKey = pluginName,
		formSubmitErrorEventName = 'error.validator',
		initSelector = "[required],[data-validate]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var $el = $( this );

			if( $el.data( dataKey ) ) {
				return;
			}

			var validator = new Validator( this, {
				applyElement: $el.closest( "label" )
			});

			$el.data( dataKey, validator );

			$el.bind( "blur", function() {
				validator.validate();
			});

			$el.closest( "form" ).bind( "submit", function( e ){
				if( !validator.validate() ){
					if( !e.isDefaultPrevented() ) {
						$( this ).trigger( formSubmitErrorEventName );
					}
					e.preventDefault();
				}
			});
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, this ));
