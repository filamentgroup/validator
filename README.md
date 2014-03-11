# Validator

Description

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/filamentgroup/validator/master/dist/validator.min.js
[max]: https://raw.github.com/filamentgroup/validator/master/dist/validator.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/validator.min.js"></script>
<script>
jQuery(function($) {
	$( document ).bind( "enhance", function(){
		$( "body" ).addClass( "enhanced" );
	});

	$( document ).trigger( "enhance" );
});
</script>
```

## Demo
Check the demo [here](http://filamentgroup.github.io/validator/)

## Release History
v0.1.0 - First release