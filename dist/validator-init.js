/*! validator - v2.0.6 - 2016-04-25
* https://github.com/filamentgroup/validator
* Copyright (c) 2016 Filament Group; Licensed MIT */
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
				applyElement: $el.parents().filter( "input, textarea, label, .custom-select, [data-validator-anchor]" ).last()
			});

			$el.data( dataKey, validator );

			$el.bind( "blur", function() {
				validator.validate();
				//if( this.checkValidity ) {
				//	this.checkValidity();
				//}
			});

			//$el.bind( "invalid", function() {
			//	if( !( this.validity && this.validity.patternMismatch ) ) {
			//		validator.invalidate();
			//	}
			//});

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
