import { updateItem } from '@directus/sdk';
import { directusServer } from '~/server/utils/directus-server';
import { sendToSlack } from '~/server/utils/slack';
import jwt from 'jsonwebtoken';
import type { Token } from '~/types';

const ogPattern = '__og-image__/image';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const {
		public: { siteUrl },
	} = config;

	try {
		// Get the body and the cookies from the event
		const body = await readBody(event);
		const cookies = parseCookies(event);

		// Check the number of avatars generated for the ticket id
		const token = await jwt.verify(cookies.session_token, process.env.JWT_SECRET as string);

		if (!token) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			});
		}

		const { people_id, ticket_id } = token as Token;

		if (!token || !people_id || !ticket_id) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			});
		}

		delete body.loading;

		const person = await directusServer.request(
			updateItem('people', people_id, body, {
				fields: [
					'id',
					'first_name',
					'last_name',
					'email',
					'job_title',
					'country',
					'website',
					'avatar',

					{
						tickets: ['id', 'slug'],
					},
				],
			}),
		);
		// Rest of Nuxt server route

		// Purge the cache for the OG image
		if (person.tickets?.length) {
			$fetch(`${siteUrl}/${ogPattern}/t/${person.tickets[0].slug}/og.png?purge`);
			$fetch(`${siteUrl}/${ogPattern}/tickets/${person.tickets[0].id}/og.png?purge`);
		}

		return person;
	} catch (error) {
		return error;
	}
});
