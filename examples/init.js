// DOM-ready auto-init of plugins.
// Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
(function( $ ){
	$( function(){
		$( document ).bind( "enhance", function(){
			$( "body" ).addClass( "enhanced" );
		});

		$( document ).trigger( "enhance" );
	});
}( jQuery ));