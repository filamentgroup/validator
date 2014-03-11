/*
 * validator plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, data, w ){
	"use strict";

	var Validator = function( element, opts ){
		if( !element ){
			throw new Error( "Element passed into Validator is not valid" );
		}
		opts = opts || {};
		opts.validatorClass = opts.validatorClass || "invalid";
		opts.applyElement = opts.applyElement && opts.applyElement.length ? opts.applyElement : element;
		opts.data = opts.data || data;

		this.opts = opts;
		this.element = element;
		this.data = opts.data;

		var $element = $( this.element );
		this.type = $element.attr( "data-validate" );
		this.required = $element.attr( "required" ) !== null;

		var $contain = $element.closest( "[data-validate-group]" );
		this.grouptype = $contain.length ? $contain.attr( "data-validate-group" ) : false;
	};

	// TODO use extend to save bytes on "prototype"
	Validator.prototype.validate = function(){
		var value = this.element.value,
			hasValue = this.hasValue(),
			result = this._isValid( value ),
			$el = $( this.opts.applyElement ),
			$input = $( this.element ),
			cfg,
			copy,
			showMessageBelow = $el.next().length < $el.prev().length,
			$listview = $el.closest( '.listview,.error-anchor' ).last(),
			previousTitle,
			type = this.grouptype || this.type,
			msg = $listview.siblings().filter( '[data-validate-message="' + type + '"]' ),
			pageErrors = $listview.siblings().filter( '.errors' ),
			hasPageErrors = pageErrors.length;

		$el[ result ? "removeClass" : "addClass" ]( this.opts.validatorClass );

		// valid
		if( result ) {
			previousTitle = $input.attr( 'data-title' );
			if( previousTitle ) {
				$input.attr( 'title', previousTitle );
				$input.removeAttr( 'data-title' );
			}
		}

		if( $listview.length && ( !hasPageErrors || result ) ) {
			msg.transEnd( function(){
				msg.remove();
			});

			pageErrors.transEnd( function(){
				pageErrors.remove();
			});
		}

		// invalid, has a type (necessary for grabbing the correct message from data), and the error message isn't already showing
		if( !result && hasValue && type ) {
			cfg = this.data.config.validator[ type ];
			copy = this.data.copy.validator[ type ];

			var message = this[ 'message' + type ] ? this[ 'message' + type ]( value ) : copy.message,
				$error;

			// show page-level message

			// TODO trigger event instead??
			if ( this.grouptype && message && !hasPageErrors ) {
				$error = $( sb.controller.render( "_form-error", {
					error: {
						type: this.grouptype,
						message: message
					}
				}));

				if( $listview.length ) {
					$listview.before( $error );
				}
				return;
			}

			// or show field-specific messages
			if ( !this.grouptype && message ) {
				$error = $( sb.controller.render( "_form-inline-error", {
					type: type,
					message: message
				}));

				previousTitle = $input.attr( 'title' );
				if( previousTitle ) {
					$input.attr( 'data-title', previousTitle );
				}

				$input.attr( 'title', message );

				if( $listview.length ) {
					$listview[ showMessageBelow ? 'after' : 'before' ]( $error );
				}
			}
		}

		return result;
	};

	Validator.prototype.hasValue = function() {
		var $t = $( this.element ),
			type = $t.attr( 'type' ),
			name,
			count = 0;

		if( type === 'radio' || type === 'checkbox' ) {
			name = $t.attr( 'name' );
			$( '[name="' + name + '"]' ).each(function() {
				if( this.checked ) {
					count++;
				}
			});

			return count > 0;
		} else {
			return !!this.element.value;
		}
	};

	Validator.prototype._isValid = function( value ) {
		var result = false,
			hasValue = this.hasValue();

		if( hasValue ) {
			result = this.type ? this[ 'validate' + this.type ]( value ) : true;
		} else {
			result = !this.required;
		}

		return result;
	};


	(w.componentNamespace = w.componentNamespace || w.Validator = Validator;

}( jQuery, this.data, this ));
