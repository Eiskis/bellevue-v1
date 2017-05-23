
// Aliases usable in codebase when doing imports and resolving URLs. From project root.

module.exports = {

	// src root
	// NOTE: prefer the other aliases over
	'@': 'src',

	// The base configuration (alias is mostly for the client)
	// NOTE: for client-side code it would be better to use a JS utility that reads configuration (merging values from multiple sources) instead of using these raw values in application code
	'@config': 'src/config.base.js',

	// Vendor code and utilities
	'@util': 'src/util',
	'@services': 'src/services',

	// Assets
	'@assets': 'src/assets',
	'@fonts': 'src/fonts',
	'@svg': 'src/svg',

	// Application code
	'@components': 'src/components',
	'@directives': 'src/vue/directives',
	'@mixins': 'src/vue/mixins',
	'@plugins': 'src/vue/plugins',
	'@models': 'src/models',

	// State management
	'@store': 'src/store',

	// Global styles
	// NOTE: we could split this further
	'@styles': 'src/styles'

};
