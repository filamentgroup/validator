# Validator

Description

## Getting Started
Download the [development version][max].

[max]: https://github.com/filamentgroup/validator/blob/gh-pages/dist/validator.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/validator.js"></script>
<script src="dist/validator.init.js"></script>
<script src="dist/validator.config.js"></script>
<script>
jQuery(function($) {
	$( document ).bind( "enhance", function(){
		$( "body" ).addClass( "enhanced" );
	});

	$( document ).trigger( "enhance" );
});
</script>
```

### Required Validation

Add the `required` attribute to your input. Works with `<input type="text">` (et al), `<input type="checkbox">`, `<input type="radio">`, `<select>`, and `<textarea>`.

### Format Validation

Add the `data-validate` attribute with a validator key. Valid keys include: `birthday` (MM DD), `ccexpiration` (YYYY MM), `credit`, `email`, `length` (min, max using characters, selected options in a select, checked checkboxes, radios, words in a text input), `numeric`, `password`, `passwordconfirm`, `phone`, and `zip`.

### Custom Messages



## Demo
Check the [demo](http://filamentgroup.github.io/validator/examples/)

## Tests
Run the [tests](http://filamentgroup.github.io/validator/test/)

## Release History
v0.1.0 - First release