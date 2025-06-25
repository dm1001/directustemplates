<script setup lang="ts">
import type { Event, EventSpeakers, EventSessionSpeaker, EventSession } from '~/types/content';

const props = defineProps<{
	data: {
		title: string;
		headline: string;
	};
}>();

const event = useState<Event>('event');

const speakers = computed(() => {
	// Loop through events.sessions array and the session.speakers array to get a deduped list of speakers
	const speakers: EventSpeakers[] = [];

	if (!unref(event).sessions) {
		return speakers;
	}

	event.value.sessions.forEach((session: EventSession) => {
		session.speakers.forEach((speaker: EventSessionSpeaker) => {
			if (!speakers.find((s) => s.id === (speaker.speakers_id as EventSpeakers).id)) {
				speakers.push(speaker.speakers_id as EventSpeakers);
			}
		});
	});

	// Put the speakers in alphabetical order by last_name
	speakers.sort((a: EventSpeakers, b: EventSpeakers) => {
		if (!a.last_name || !b.last_name) {
			return -1;
		}

		if (a.last_name < b.last_name) {
			return -1;
		}

		if (a.last_name > b.last_name) {
			return 1;
		}

		return 0;
	});

	return speakers;
});
</script>

<template>
	<BlockContainer>
		<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
		<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" as="h2" />
		<div class="mt-8 grid gap-12 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
			<BlocksSpeakerCard v-for="speaker in speakers" :key="speaker.id" :speaker="speaker" />
		</div>
	</BlockContainer>
</template>
