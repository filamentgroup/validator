:warning: This project is archived and the repository is no longer maintained. 

# Validator

[![Filament Group](http://filamentgroup.com/images/fg-logo-positive-sm-crop.png) ](http://www.filamentgroup.com/)

A small validation library.

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


## Build

To get all of the validation library, just run `grunt` from your
commandline. If you would like to specify which validator extensions
you'd like in your build, just use the `--validators` argument. Example:
`grunt --validators="birthday zip email"`

## Demo
Check the [demo](http://filamentgroup.github.io/validator/examples/)

## Tests
Run the [tests](http://filamentgroup.github.io/validator/test/)
