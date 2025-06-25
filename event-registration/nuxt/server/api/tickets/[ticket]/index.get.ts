import { directusServer, readItems } from '~/server/utils/directus-server';
import { isValidUUID } from '~/server/utils/uuid';

export default defineEventHandler(async (event) => {
	const ticket = event.context?.params?.ticket;

	if (!ticket) {
		return { error: 'Either the ticket_id or slug is required' };
	}

	const isUUID = isValidUUID(ticket);

	const filter = isUUID ? { id: { _eq: ticket } } : { slug: { _eq: ticket } };

	try {
		// Get the ticket by the id or slug
		const ticketRequest = directusServer.request(
			readItems('event_tickets', {
				filter,
				fields: [
					'id',
					'slug',
					{
						people_id: ['first_name', 'last_name', 'website', 'country', 'avatar'],
					},
				],
			}),
		);

		// Count the number of other tickets that have been referred by this ticket
		const aggregateFilter = isUUID ? { referred_by: { _eq: ticket } } : { referred_by: { slug: { _eq: ticket } } };

		const referredTicketRequest = directusServer.request(
			readItems('event_tickets', {
				filter: aggregateFilter,
				aggregate: { count: '*' },
			}),
		);

		const [tickets, referredTickets] = await Promise.all([ticketRequest, referredTicketRequest]);

		if (!tickets.length) {
			return { error: 'Ticket not found' };
		}

		// Show at least 1 referred ticket because they signed up themselves
		//@ts-ignore
		const count = parseInt(referredTickets[0].count) + 1;

		return {
			...tickets[0],
			referred_tickets_count: count,
		};
	} catch (error) {
		return { error };
	}
});
