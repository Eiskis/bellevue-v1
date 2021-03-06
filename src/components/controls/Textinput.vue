
<script>

	// This input is used by passing the value attribute with `.sync` modifier
	// Internally this translates to two-way use of `value` property
	// State of the input is kept track of internally, and the result is $emitted to parent scope
	// http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events

	import { debounce } from 'lodash';
	import { composeClassnames, trimWhitespace } from '@util';

	export default {
		name: 'textinput',

		props: [

			// Two-way bound
			'value',

			// Normal props
			'name',
			'clear',
			'maxlength',
			'placeholder',
			'sanitize',
			'type',
			'disabled'

		],

		data: function () {
			return {
				isPristine: true,
				isFocused: false,
				ownValue: this.value
			};
		},

		computed: {

			maxlengthValue: function () {
				return (this.maxlength ? this.maxlength : '');
			},

			isEmpty: function () {
				return !this.ownValue || !this.ownValue.length ? true : false;
			},

			classes: function () {
				return composeClassnames({

					// From props
					clearable: this.clear ? true : false,
					disabled: this.disabled ? true : false,
					enabled: !this.disabled ? true : false,

					// Self-controlled with value in class name
					multiline: (this.type === 'multiline'),

					// Self-controlled booleans
					empty: this.isEmpty,
					focused: this.isFocused,
					pristine: this.isPristine

				}, 'view-textinput');
			}

		},

		methods: {

			sanitizeValue: function (value) {
				if (this.sanitize) {
					return trimWhitespace('' + value);
				}
				return '' + value;
			},

			onClear: function () {
				this.ownValue = '';
			},

			onFocus: function () {
				this.isFocused = true;
			},

			onFocusOut: function () {
				this.isFocused = false;
			},

			pullChange: function () {
				var newValue = '' + this.value;
				if (this.ownValue !== newValue) {
					this.ownValue = newValue;
				}
				return this;
			},

			emitChange: function () {
				var newValue = '' + this.ownValue;

				if (this.value !== newValue) {

					this.$emit('update:value', this.sanitizeValue(newValue));

					if (this.isPristine) {
						this.isPristine = false;
					}

				}

				return this;
			}

		},

		// More complex setup for 2-way binding that includes throttling
		// FIXME: would still be cleaner in writable computed
		watch: {

			value: 'pullChange',

			ownValue: debounce(function () {
				this.emitChange();
			}, 50)

		}

	};

</script>

<template>

	<span class="view-textinput" :class="classes">

		<!-- Clear button -->
		<custom-transition name="scale-fade">
			<span
				v-if="clear && !isEmpty"
				class="view-textinput-clear"
				@click="onClear">
					<icon asset="cross"></icon>
				</span>
		</custom-transition>

		<!-- Textarea for multiline input -->
		<textarea
			v-if="type === 'multiline'"
			v-model.trim="ownValue"
			:name="name"
			:maxlength="maxlengthValue"
			:placeholder="placeholder"
			:disabled="disabled"
			@focus="onFocus"
			@focusout="onFocusOut"></textarea>

		<!-- Vue does not support dynamic type :( -->
		<input
			v-else-if="type === 'email'"
			v-model.trim="ownValue"
			type="email"
			:name="name"
			:maxlength="maxlengthValue"
			:placeholder="placeholder"
			:disabled="disabled"
			@focus="onFocus"
			@focusout="onFocusOut">

		<!-- Vue does not support dynamic type :( -->
		<input
			v-else-if="type === 'password'"
			v-model.trim="ownValue"
			type="password"
			:name="name"
			:maxlength="maxlengthValue"
			:placeholder="placeholder"
			:disabled="disabled"
			@focus="onFocus"
			@focusout="onFocusOut">

		<input
			v-else
			v-model.trim="ownValue"
			type="text"
			:name="name"
			:maxlength="maxlengthValue"
			:placeholder="placeholder"
			:disabled="disabled"
			@focus="onFocus"
			@focusout="onFocusOut">

	</span>

</template>

<style lang="scss">
	@import '~@shared-styles';

	.view-textinput {
		$border-width: 1px;

		@include border-box;
		position: relative;
		display: inline-block;
		@include overflow-hidden;
		@include radius;
		@include shadow-transparent;

		// Default width
		width: 12em;
		border-width: $border-width;

		vertical-align: middle;
		border-color: $color-dark-translucent;
		background-color: $color-white;
		@include background-clip-padding-box;

		@include transition-slow;
		@include transition-properties-common;

		input,
		textarea {
			@include border-box;
			position: relative;
			z-index: 0;

			display: block;
			width: 100%;
			@include cursor-inherit;

			padding-top: $pad-vertical - $border-width;
			padding-bottom: $pad-vertical - $border-width;
			@include pad-loose-horizontal;

			// &:active {
			// 	border-color: $color-lightgrey;
			// }

		}

	}

	.view-textinput-enabled {
		@include cursor-pointer;
	}

	.view-textinput-clear {
		@include cursor-pointer;

		position: absolute;
		right: 0;
		z-index: 1;
		display: block;
		width: 2.4em;
		height: 100%;

		.view-icon {
			padding: $pad-vertical / 2;

			color: $color-white;
			background-color: $color-dark;
			@include radius-round;

			// Position the visible icon part visually center and adjust transform origin accordingly
			@include keep-full-center;
			transform: scale(1) translate3d(-50%, -50%, 0);
			@include transform-origin-top-left;

			@include transition-slow;
			@include transition-properties-common;
		}

		&:active {
			.view-icon {
				transform: scale($scale-verysmall) translate3d(-50%, -50%, 0);
				@include transition-fast;
			}
		}

	}



	// Clearable state

	.view-textinput-clearable {
		&.view-textinput-not-empty {
			input,
			textarea {
				padding-right: 2.4em;
			}
		}
	}



	// States

	.view-textinput-not-focused {
		&:hover {
			border-color: $color-grey;
			@include transition-fast;
		}
	}

	.view-textinput-focused {
		@include cursor-default;
		@include transition-fast;

		border-color: $color-dark;
		@include shadow;

		.view-textinput-clear {
			@include transition-fast;
		}

	}

</style>
