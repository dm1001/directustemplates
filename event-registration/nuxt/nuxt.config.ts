export default defineNuxtConfig({
	// https://nuxt.com/docs/api/configuration/nuxt-config

	routeRules: {
		// Stale while revalidate for landing page and session pages.
		'/': {
			swr: true,
			cache: {
				maxAge: 60 * 5, // 5 minutes
			},
		},
        '/sessions/**': {
            swr: true,
            cache: {
                maxAge: 60 * 5, // 5 minutes
            },
        },
		// Proxy Directus assets to protect the Directus URL and leverage the Nuxt / edge caching.
		'/assets/**': {
			proxy: `${process.env.DIRECTUS_URL}/assets/**` || 'http://localhost:8055/assets/**',
			cache: {
				maxAge: 60 * 60 * 24 * 7, // 1 week
			},
		},
	},

	modules: [
		'@nuxt/devtools',
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxt/fonts',
		'@vueuse/nuxt',
		'@formkit/auto-animate/nuxt',
		'nuxt-og-image',
	],

	experimental: {
        // Support for server components and component islands
		componentIslands: true,
	},

	future: {
		compatibilityVersion: 4,
	},

	runtimeConfig: {
		// Everything in the public object is exposed to the client side, so don't put any secrets here
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
		},
		// Directus URL and Server Token are only exposed to the server
		directusUrl: process.env.DIRECTUS_URL,
		directusServerToken: process.env.DIRECTUS_SERVER_TOKEN,
	},

	// Nuxt DevTools - https://devtools.nuxtjs.org/
	devtools: { enabled: true },


	// Image Configuration - https://image.nuxt.com/providers/directus
	image: {
		provider: 'directus',
		directus: {
			baseURL: '/assets/',
			modifiers: {
				format: 'auto',
			},
		},
	},

	// OG Image Configuration - https://nuxtseo.com/og-image/guides/custom-fonts
    // You need to explictly define the fonts you want to use in your OG images here. Fonts used in your app (ie your /tailwind.config.ts) are not automatically included.
	ogImage: {
		fonts: ['Bricolage+Grotesque:400', 'Bricolage+Grotesque:600'],
	},
    // Needed for the og-image module to work correctly
	site: {
		url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
	},

});
