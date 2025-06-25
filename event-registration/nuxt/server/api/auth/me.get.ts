import jwt from 'jsonwebtoken';

import { directusServer } from '~/server/utils/directus-server';

import type { Token } from '~/types';

export default defineEventHandler(async (event) => {
	try {
		// Get the cookies from the event
		const cookies = parseCookies(event);

		const token = await jwt.verify(cookies.session_token, process.env.JWT_SECRET as string);

		if (!token) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			});
		}

		const { people_id } = token as Token;

		const person = await directusServer.request(
			readItem('people', people_id, {
				fields: [
					'id',
					'first_name',
					'last_name',
					'email',
					'job_title',
					'website',
					'country',
					'avatar',
					'avatar_traits',
					{
						tickets: ['id', 'slug'],
					},
				],
			}),
		);

		if (!person) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Error fetching person',
			});
		}

		return {
			id: person.id,
			first_name: person.first_name,
			last_name: person.last_name,
			email: person.email,
			job_title: person.job_title,
			website: person.website,
			country: person.country,
			avatar: person.avatar,
			avatar_traits: person.avatar_traits,
			tickets: person.tickets,
		};
	} catch (error) {
		return error;
	}
});
