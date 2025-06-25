import jwt from 'jsonwebtoken';
import { directusServer, readItems } from '~/server/utils/directus-server';
import { isValidUUID } from '~/server/utils/uuid';
import type { Token } from '~/types';

export default defineEventHandler(async (event) => {
	const ticket = event.context?.params?.ticket;
	const cookies = parseCookies(event);

	if (!ticket) {
		return { error: 'Either the ticket_id or slug is required' };
	}

	const token = (await jwt.verify(cookies.session_token, process.env.JWT_SECRET as string)) as Token;

	if (!token) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		});
	}

	const isUUID = isValidUUID(ticket);

	const filter = isUUID ? { id: { _eq: ticket } } : { slug: { _eq: ticket } };

	try {
		// Get the ticket by the id or slug
		const tickets = await directusServer.request(
			readItems('event_tickets', {
				filter,
				fields: [
					'id',
					{
						// @ts-expect-error
						avatars: ['id', 'directus_files_id'],
					},
				],
			}),
		);

		if (!ticket.length) {
			return { error: 'Ticket not found' };
		}

		return tickets[0].avatars;
	} catch (error) {
		return { error };
	}
});
