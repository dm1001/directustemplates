<script setup lang="ts">
import type { Event, BlockCountdown } from '~/types/content';

const props = defineProps<{
	data: BlockCountdown;
}>();

const event = useState<Event>('event');
</script>

<template>
	<BlockContainer>
		<TypographyTitle v-if="data.title" class="relatize text-center">{{ data.title }}</TypographyTitle>

		<TypographyHeadline
			v-if="data.headline"
			:content="data.headline"
			size="lg"
			as="h2"
			class="relative mt-4 text-center"
		/>

		<CountdownTimer v-if="event.start_at" :date="event.start_at" class="relative mx-auto mt-8 max-w-xs md:max-w-2xl" />
	</BlockContainer>
</template>
