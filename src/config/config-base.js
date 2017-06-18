
// This is our custom project configuration
// Any configuration items that you expect people to be aware of and edit should be included here.
// Webpack config files will import these settings where appropriate so devs don't have to touch the actual files and potentially cause errors.

// NOTE: tooling will break if we use ES6 export here, so let's stick to module.exports
module.exports = {

	// You can disable compiling app icons here, per environment, to speed up compilation
	// NOTE: it's better to leave these be and only disable these on local config
	// FIXME: this does not yet work
	// FIXME: local unversioned config is not yet implemented either
	// https://github.com/Eiskis/bellevue/issues/6
	// compileAppIcons: {
	// 	dev: true,
	// 	prod: true,
	// 	test: true
	// },

	// Localisation
	defaultLocale: 'es',
	fallbackLocale: 'en',

	// Link to native iOS app's App Store page
	appStore: {
		appId: '',
		affiliate: '',
		appArgument: ''
	},

	// Will be used in base HTML templating
	meta: {
		title: 'My app',
		description: 'Description text for this app',

		// https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/
		themeColor: '#00baf8',

		// https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
		iosStatusBarStyle: 'default'

	},

	// Format detection meta tag for iOS
	// https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
	formatDetection: {
		'telephone': 'yes'
	},

	// Viewport control for mobile devices
	// https://developer.mozilla.org/en/docs/Mozilla/Mobile/Viewport_meta_tag
	// https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html
	// NOTE: keys must be in kebab-case
	viewport: {
		'width': 'device-width',
		'height': null,
		'initial-scale': 1,
		'minimum-scale': null,
		'maximum-scale': 1,
		'user-scalable': 'no'
	},

	// List of URLs to add a prefetch meta tag for
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
	prefetch: [],

	// See docs at https://router.vuejs.org/en/api/options.html
	router: {

		// 'hash': extra hash characters in URLs, no server configuration needed for routing to work
		// 'history': no extra characters in URLs, but requires server configuration
		mode: 'hash',

		// Class names used by <router-link>
		// NOTE: these should conform to our class naming conventions
		linkActiveClass: 'is-active',
		linkExactActiveClass: 'is-exact-active'

	},

	// Enable some meta tags that optimize the mobile experience
	mobile: true,
	defaultTouchHighlight: false,

	// Webpack will generate app icons for all platforms based on this
	// FIXME: no support for platform-specific source files yet
	appIconSourceFile: 'app-icon/app-icon.png',

	// https://github.com/declandewet/vue-meta#options
	metaInfo: {

		// the component option name that vue-meta looks for meta info on.
		keyName: 'metaInfo',

		// the attribute name vue-meta adds to the tags it observes
		attribute: 'data-vue-meta',

		// the attribute name that lets vue-meta know that meta info has already been server-rendered
		ssrAttribute: 'data-vue-meta-server-rendered',

		// the property name that vue-meta uses to determine whether to overwrite or append a tag
		tagIDKeyName: 'vmid'

	},

	// Set the root component and where to inject it
	rootComponentName: 'app',
	rootComponentParentSelector: '#app',

	// This filename will be used for the sprite file that is generated from source SVG files
	svgSpritePath: 'sprite.svg',

	// SVGO plugins and plugin configuration options to use (in addition/instead of the defaults)
	svgo: {
		removeTitle: true,
		convertColors: {
			names2hex: true,
			rgb2hex: true,
			shorthex: true,
			shortname: true,

			// Convert this color code in fills/strokes/etc. to currentColor (used to generate mono-capable assets)
			// NOTE: must be exact, case-sensitive match before any other conversions
			// Assets must be authored with this in mind
			// https://github.com/svg/svgo/blob/master/plugins/_collections.js#L2527
			// https://github.com/svg/svgo/blob/master/plugins/convertColors.js#L61
			currentColor: '#FF00FF'

		}
	}

};
