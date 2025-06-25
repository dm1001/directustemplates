import type { Query } from '@directus/sdk';
import { directusServer, readItems } from '~/server/utils/directus-server';

// We're using cached event handlers to reduce the number of requests to the Directus API. This is useful for data that doesn't change often like the events themselves.
export default defineCachedEventHandler(async (event) => {
	const params = getQuery(event);

	try {
		const events = await directusServer.request(readItems('events', params as any));
		return events;
	} catch (error) {
		return { error };
	}
}, {
    maxAge: 60 // 1 minute
});
