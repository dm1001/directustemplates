import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	darkMode: 'class',
	content: [],
	theme: {
		extend: {
			colors: {},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
				display: ['Bricolage Grotesque', ...defaultTheme.fontFamily.serif],
				mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
			},
		},
	},

	variants: {
		extend: {},
	},
} satisfies Config;
