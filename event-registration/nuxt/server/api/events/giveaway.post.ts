import type { Query } from '@directus/sdk';
import { directusServer, readItems } from '~/server/utils/directus-server';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { password } = body;

	if (!password || password !== 'password') {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		});
	}

	try {
		const ticketPool: any[] = [];

		const tickets = await directusServer.request(
			readItems('event_tickets', {
				fields: [
					'id',
					'slug',
					{
						referred_by: ['id', 'slug'],
					},
				],
				filter: {
					_and: [{ is_disqualified: { _neq: true } }],
				},

				limit: -1,
				deep: {
					referred_by: {
						_filter: {
							is_disqualified: { _neq: true },
						},
					},
				},
			}),
		);

		// For each ticket in the tickets array, we'll add them to the ticket pool. If the ticket has a referred_by, we'll add a extra ticket to the pool for the person who referred them.
		tickets.forEach((ticket) => {
			if (ticket.referred_by) {
				ticketPool.push(ticket.referred_by);
			}

			ticketPool.push({
				id: ticket.id,
				slug: ticket.slug,
			});
		});

		return { tickets: ticketPool };
	} catch (error) {
		return { error };
	}
});
