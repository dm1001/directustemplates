<script setup lang="ts">
import { google } from 'calendar-link';
import type { EventSession, Event, BlockSchedule } from '~/types/content';

const props = defineProps<{
	data: BlockSchedule;
}>();

const event = useState<Event>('event');

function formatEvent(session: EventSession) {
	const calEvent = {
		title: `[${unref(event).title}] ${session.session_title}`,
		start: session.start_at ? new Date(session.start_at) : undefined,
		end: session.end_at ? new Date(session.end_at) : undefined,
		description: session.description,
		location: session.location,
	};

	// @ts-ignore
	return google(calEvent);
}

const groupedSessions = computed(() => {
	// Group all the event sessions by the start_at date of the event. Return an array of objects sorted by start_at date.
	const grouped = event.value.sessions.reduce((acc, session) => {
		const date = new Date(session.start_at).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		if (!acc[date]) {
			acc[date] = [];
		}

		acc[date].push(session);

		acc[date].sort(
			(a: EventSession, b: EventSession) =>
				new Date(a.start_at as any).getTime() - new Date(b.start_at as any).getTime(),
		);

		return acc;
	}, {});

	const sorted = Object.entries(grouped).sort((a, b) => {
		const dateA = new Date(a[0]);
		const dateB = new Date(b[0]);
		return dateA.getTime() - dateB.getTime();
	});

	return Object.fromEntries(sorted) as {
		[key: string]: EventSession[];
	};
});

const getTime = (date: string | null | undefined) => {
	if (!date) return '';

	const time = new Date(date).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

	return time;
};

const getTimeZone = (date: string | null | undefined) => {
	if (!date) return '';

	// Return just the timezone string from the date
	return new Date(date).toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2];
};
</script>

<template>
	<BlockContainer id="schedule">
		<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
		<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" as="h2" />
		<section v-for="(day, dayKey) in groupedSessions" :key="dayKey" class="mt-12">
			<TypographyTitle as="h3" class="text-gray-200">{{ dayKey }}</TypographyTitle>
			<div class="relative ml-2 mt-2 w-full border-l border-gray-700 pl-6">
				<!-- Decorative Circles -->
				<div class="absolute -left-2 -top-4 mt-4 h-4 w-4 rounded-full border border-gray-700 bg-gray-900" />
				<div class="absolute -bottom-4 -left-2 mt-4 h-4 w-4 rounded-full border border-gray-700 bg-gray-900" />
				<!-- Sessions -->
				<div
					v-for="session in day"
					:key="session.id"
					class="relative mb-6 gap-8 rounded-xl border border-b border-gray-700 bg-white/5 p-6 transition duration-300"
				>
					<div>
						<NuxtLink
							class="group items-baseline gap-3 font-display text-xl font-bold sm:inline-flex sm:flex-wrap"
							:to="`/sessions/${session.slug}`"
						>
							<p class="text-primary group-hover:text-white">{{ session.session_title }}</p>
							<p class="font-mono text-sm">
								{{ getTime(session.start_at) + ' - ' + getTime(session.end_at) + ' ' + getTimeZone(session.start_at) }}
							</p>
							<UBadge
								v-if="session.session_type"
								:label="session.session_type"
								variant="soft"
								color="gray"
								size="xs"
								as="span"
							/>
						</NuxtLink>

						<TypographyProse
							v-if="session.description"
							:content="session.description"
							size="sm"
							class="mt-2 line-clamp-2 text-gray-300"
						/>

						<UButton
							:to="formatEvent(session)"
							label="Add to Calendar"
							variant="link"
							class="mt-4"
							target="_blank"
							color="white"
							icon="i-material-symbols-calendar-add-on"
							:padded="false"
						/>
					</div>
					<template v-if="session.speakers?.length">
						<p class="mt-4 font-mono text-sm uppercase text-gray-300">Speakers</p>
						<div class="mt-2 grid gap-6 lg:grid-cols-3">
							<div
								v-for="{ speakers_id: speaker } in session.speakers"
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
		</section>
	</BlockContainer>
</template>
