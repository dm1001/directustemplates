<script setup lang="ts">
import type { EventSpeakers } from '~/types';

const props = defineProps<{
	speaker: EventSpeakers;
}>();
</script>
<template>
	<div class="relative">
		<div class="rounded-xl border border-gray-700 bg-white/5 p-4">
			<div class="group relative overflow-hidden rounded-lg">
				<NuxtImg
					v-if="speaker.avatar"
					:src="speaker.avatar as string"
					:modifiers="{
						transforms: [['greyscale', 'true']],
					}"
					width="300"
					height="300"
					class="relative w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-100"
					format="auto"
					loading="lazy"
				/>
				<div class="group-hover:bg-primary absolute inset-0 h-full w-full mix-blend-multiply transition duration-300" />
			</div>
		</div>
		<div class="mt-4 flex gap-4 rounded-xl border border-gray-700 bg-white/5 p-4">
			<div class="w-full">
				<p class="text-primary font-display font-bold sm:text-lg">{{ speaker.first_name + ' ' + speaker.last_name }}</p>
				<p class="mt-2 text-balance font-mono text-xs text-gray-300 sm:text-sm">{{ speaker.job_title }}</p>
			</div>

			<NuxtImg
				v-if="speaker.company_logo"
				class="h-16 w-20 overflow-hidden rounded-lg border border-gray-700 bg-white object-contain p-2"
				:src="speaker.company_logo as string"
				width="150"
				format="auto"
				loading="lazy"
			/>
		</div>
	</div>
</template>
