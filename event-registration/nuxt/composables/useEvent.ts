import type { Event } from '~/types/';
import { format } from 'date-fns';

export default function useEvent() {
	const event: Ref<Event | null> = useState('event', () => null);

	async function fetchEvent(slug?: string) {
		const filter = slug ? { slug: { _eq: slug } } : undefined;

		const { data, error } = await useApi<Event>(`/api/events`, {
			params: {
				filter,
				sort: ['-start_at'],
				fields: ['id', 'title', 'description', 'slug', 'start_at', 'end_at', 'logo', 'thumbnail', 'tagline'],
				limit: 1,
			},
			// @ts-ignore
			transform: (data) => data[0],
		});

		if (!data.value || error.value) {
			throw createError({
				statusCode: 404,
				fatal: true,
				message: 'Event not found.',
			});
		}

		event.value = data.value;
	}

	async function fetchEventLandingPage(slug?: string) {
		const filter = slug ? { slug: { _eq: slug } } : undefined;

		const { data, error } = await useApi<Event>(`/api/events`, {
			params: {
				filter,
				sort: ['-start_at'],
				// This rather long fields array is used to fetch all the data we need for the event page and nothing more. The Directus REST API functions like a GraphQL API in that you can query nested relational fields in a single request.
				fields: [
					'id',
					'title',
					'description',
					'slug',
					'start_at',
					'end_at',
					'logo',
					'thumbnail',
					'tagline',
					{
						sessions: [
							'id',
							'session_title',
							'session_type',
							'slug',
							'start_at',
							'end_at',
							'description',
							'location',
							{
								speakers: [
									{
										speakers_id: ['id', 'first_name', 'last_name', 'job_title', 'bio', 'avatar', 'company_logo'],
									},
								],
							},
						],
						// Be sure to check the Directus docs on how to query many-to-any relationships like what is used for the landing_page field.
						// https://docs.directus.io/reference/query.html#many-to-any-union-types
						landing_page: [
							'id',
							'collection',
							{
								item: [
									'title',
									'content',
									'headline',
									'background',
									'faqs',
									'image',
									{
										button_group: [
											'alignment',
											{
												buttons: ['label', 'url', 'variant', 'open_in_new_window'],
											},
										],
										cards: [
											'id',
											'card_type',
											'width',
											'title',
											'description',
											'url',
											'badge',
											'video_url',
											{
												image: ['id', 'title', 'description'],
											},
										],
									},
								],
							},
						],
					},
				],
				limit: 1,
				// The deep parameter allows us to set query parameters of nested relational fields.
				// In this case, we want to filter out any landing_page blocks that have the hide_block field set to true.
				deep: {
					landing_page: {
						_filter: {
							hide_block: {
								_neq: true,
							},
						},
					},
				},
			},
			// @ts-ignore
			transform: (data) => data[0],
		});

		if (!data.value || error.value) {
			throw createError({
				statusCode: 404,
				fatal: true,
				message: 'Event not found.',
			});
		}

		event.value = data.value;
	}

	const eventDates = computed(() => {
		if (!unref(event) || !unref(event)?.start_at) return '';

		const startDate = new Date(unref(event)?.start_at ?? '');
		const startFormatted = format(startDate, 'MMMM do');

		if (!unref(event)?.end_at) {
			return startFormatted;
		}

		const endDate = new Date(unref(event)?.end_at ?? '');
		const endFormatted = format(endDate, 'MMMM do');

		return `${startFormatted} - ${endFormatted}`;
	});

	return {
		fetchEvent,
		fetchEventLandingPage,
		event,
		eventDates,
	};
}
