import {
	defineNuxtModule,
	useLogger,
} from '@nuxt/kit';
import { defu } from 'defu';
import { createDirectus, rest, staticToken, readSingleton } from '@directus/sdk';

import type { Schema, Globals } from '../../types';

const log = useLogger();

export default defineNuxtModule({
	meta: {
		name: 'directus-events-registration',
		configKey: 'directus',
		compatibility: {
			nuxt: '^3.0.0',
		},
	},

	async setup(moduleOptions, nuxt) {
		log.start('Loading Directus - Event Registration Module');

		const directusUrl = nuxt.options.runtimeConfig.directusUrl as string;

		if (!directusUrl) {
			log.warn(`Please make sure to set directusUrl in runtimeConfig`);
		}

		// ** Build Logic **
		const directus = createDirectus<Schema>(directusUrl)
			.with(rest())
			.with(staticToken(process.env.DIRECTUS_SERVER_TOKEN as string));

		// Add Globals
		const globals = await directus.request<Omit<Globals, 'id' | 'url'>>(readSingleton('event_globals'));
		nuxt.options.appConfig.globals = defu(nuxt.options.appConfig.globals, globals);
		log.success('Globals loaded into appConfig.');

		// If Slack integration is enabled, add the Slack webhook URL to the runtime config
		if (globals.send_registrations_to_slack && globals.slack_webhook_url) {
			nuxt.options.runtimeConfig.slackWebhookUrl = globals.slack_webhook_url;

			log.success(
				'Slack integration enabled. slackWebhookUrl loaded into runtimeConfig. Registrations will be sent to Slack.',
			);
		}

		log.success(`Directus - Event Registration Module Loaded`);
	},
});
