<script setup lang="ts">
import type { EventSession } from '~/types';
import { format } from 'date-fns';

const route = useRoute();
const { globals } = useAppConfig();

const { event, eventDates } = useEvent();

const sessionFields = [
	'id',
	'session_title',
	'session_type',
	'slug',
	'description',
	'start_at',
	'end_at',
	'recording',
	'location',
	{
		speakers: [
			{
				speakers_id: ['id', 'first_name', 'last_name', 'job_title', 'bio', 'avatar', 'company_logo'],
			},
		],
	},
];

const [sessionResponse, otherSessionsResponse] = await Promise.all([
	useApi<EventSession>(`/api/events/sessions`, {
		params: {
			filter: {
				slug: {
					_eq: route.params.session,
				},
			},
			fields: sessionFields,
		},
		// @ts-ignore
		transform: (data) => data[0],
	}),
	useApi<EventSession[]>(`/api/events/sessions`, {
		params: {
			limit: 3,
			sort: ['sort'],
			filter: {
				_and: [
					{
						slug: {
							_neq: route.params.session,
						},
					},
				],
			},
			fields: sessionFields,
		},
	}),
]);

const { data: session, error: sessionError } = sessionResponse;
const { data: sessions, error: sessionsError } = otherSessionsResponse;

if (sessionError.value) {
	throw createError({
		statusCode: 404,
		fatal: true,
		message: 'Session not found.',
	});
}

const getTime = (date: string | null | undefined) => {
	if (!date) return '';

	const time = format(new Date(date), 'hh:mm a');

	return time;
};

const getTimeZone = (date: string | null | undefined) => {
	if (!date) return '';

	const timeZone = format(new Date(date), 'zzzz');

	return timeZone;
};

useSeoMeta({
	title: unref(session)?.session_title || '',
	ogTitle: unref(session)?.session_title || '',
});

defineOgImageComponent('OgImageTicket', {
	title: unref(event)?.title,
	headline: unref(event)?.tagline,

	// Use the date of the session as the date for the ogImage instead of event date
	date: format(unref(session)?.start_at, 'EEE MMM do, yyyy'),
	name: unref(session)?.session_title,
	logo: unref(event)?.logo,
});
</script>
<template>
	<div id="page" class="mt-12">
		<NavigationEventHeader />
		<BlockContainer>
			<UButton to="/" icon="i-material-symbols-arrow-back" label="Go Back" color="gray" size="xs" variant="ghost" />
			<VVideo
				v-if="session?.recording"
				:url="session?.recording"
				class="mt-8 overflow-hidden rounded-xl border border-gray-700 bg-white/10 p-2 backdrop-blur sm:p-4"
			/>
			<!-- Content -->
			<div class="mt-8">
				<TypographyHeadline v-if="session?.session_title" :content="session?.session_title" size="lg" as="h1" />
				<UBadge v-if="session?.session_type" :label="session?.session_type" size="lg" variant="soft" class="mt-4" />
				<TypographyProse v-if="session?.description" :content="session?.description" class="mt-4" />
			</div>
			<UDivider class="mt-8" />
			<template v-if="!session || !session.recording || Date.now() >= new Date(session?.end_at).getTime()">
				<div class="mt-8 flex flex-col gap-8 lg:flex-row">
					<div class="w-full max-w-xs">
						<TypographyTitle>{{ format(session?.start_at, 'EEEE MMM do, yyyy') }}</TypographyTitle>
						<p>
							{{ getTime(session?.start_at) + ' - ' + getTime(session?.end_at) + ' ' + getTimeZone(session?.start_at) }}
						</p>
						<div v-if="session?.location">
							<VText class="mt-4" size="xs" text-color="light">Location</VText>
							<UButton
								v-if="isUrl(session?.location)"
								:to="session?.location"
								class="mt-2"
								variant="outline"
								target="_blank"
							>
								{{ session?.location }}
							</UButton>
							<p v-else class="mt-2">{{ session?.location }}</p>
						</div>
					</div>
					<CountdownTimer v-if="session?.start_at" :date="session?.start_at" class="w-full" />
				</div>
				<UDivider class="mt-8" />
			</template>
			<!-- Speakers -->
			<div class="mt-8">
				<template v-if="session?.speakers?.length">
					<p class="mt-4 font-mono text-sm uppercase text-gray-300">Speakers</p>
					<div class="mt-2 grid gap-6 lg:grid-cols-3">
						<div v-for="{ speakers_id: speaker } in session.speakers" :key="speaker.id" class="flex items-center gap-4">
							<NuxtImg
								:src="speaker.avatar"
								width="50"
								height="50"
								class="h-16 w-16 rounded-xl border border-gray-700"
								:modifiers="{
									transforms: [['grayscale', true]],
								}"
								format="auto"
								loading="lazy"
							/>
							<div>
								<p class="text-sm font-medium">{{ speaker.first_name + ' ' + speaker.last_name }}</p>
								<p class="text-sm text-gray-300">{{ speaker.job_title }}</p>
							</div>
						</div>
					</div>
				</template>
			</div>
			<UDivider class="mt-8" />
			<!-- Other Sessions -->
			<template v-if="sessions && sessions.length > 0">
				<TypographyHeadline :content="`Other Sessions`" size="md" as="h2" class="mt-8" />
				<div class="relative ml-2 mt-4 w-full border-l border-gray-700 pl-6">
					<!-- Decorative Circles -->
					<div class="absolute -left-2 -top-4 mt-4 h-4 w-4 rounded-full border border-gray-700 bg-gray-900" />
					<div class="absolute -bottom-4 -left-2 mt-4 h-4 w-4 rounded-full border border-gray-700 bg-gray-900" />
					<div
						v-for="item in sessions"
						:key="item.id"
						class="relative mb-6 gap-8 rounded-xl border border-b border-gray-700 bg-white/5 p-6 transition duration-300"
					>
						<div>
							<NuxtLink
								class="group items-baseline gap-3 font-display text-xl font-bold sm:inline-flex sm:flex-wrap"
								:to="`/sessions/${item.slug}`"
							>
								<p class="text-primary group-hover:text-white">{{ item.session_title }}</p>
								<UBadge
									v-if="item.session_type"
									:label="item.session_type"
									variant="soft"
									color="gray"
									size="xs"
									as="span"
								/>
							</NuxtLink>
							<TypographyProse
								v-if="item.description"
								:content="item.description"
								size="sm"
								class="mt-2 text-gray-300"
							/>
						</div>
						<template v-if="item.speakers?.length">
							<p class="mt-4 font-mono text-sm uppercase text-gray-300">Speakers</p>
							<div class="mt-2 grid gap-6 lg:grid-cols-3">
								<div
									v-for="{ speakers_id: speaker } in item.speakers"
									:key="speaker.id"
									class="flex items-center gap-4"
								>
									<NuxtImg
										:src="speaker.avatar"
										width="50"
										height="50"
										class="h-16 w-16 rounded-xl border border-gray-700"
										:modifiers="{
											transforms: [['grayscale', true]],
										}"
										format="auto"
										loading="lazy"
									/>
									<div>
										<p class="text-sm font-medium">{{ speaker.first_name + ' ' + speaker.last_name }}</p>
										<p class="text-sm text-gray-300">{{ speaker.job_title }}</p>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
			</template>
		</BlockContainer>
	</div>
</template>
