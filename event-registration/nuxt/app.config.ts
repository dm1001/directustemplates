export default defineAppConfig({
	ui: {
		primary: 'lime',
		gray: 'zinc',
		icons: {
			dynamic: true,
		},
		notifications: {
			// Show toasts at the top right of the screen
			position: 'top-0 bottom-auto',
		},
		button: {
			rounded: 'rounded-xl',
			base: 'disabled:opacity-75 disabled:cursor-not-allowed',
		},
		badge: {
			font: 'font-display font-semibold uppercase',
			rounded: 'rounded-full',
		},
		formGroup: {
			label: {
				base: 'font-mono ',
			},
			size: {
				xl: 'text-lg',
			},
		},
	},
});
