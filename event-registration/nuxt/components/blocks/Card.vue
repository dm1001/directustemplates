<script setup lang="ts">
import type { BlockCard, File } from '~/types';

const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps<{
	card: BlockCard;
}>();

const showModal = ref(false);

const as = computed(() => {
	return props.card.card_type === 'video' ? 'button' : NuxtLink;
});

const attrs = computed(() => {
	if (props.card.card_type === 'video') {
		return {
			onClick: () => {
				showModal.value = true;
			},
		};
	}

	return {
		to: props.card.url,
		target: '_blank',
	};
});
</script>
<template>
	<div class="relative">
		<component :is="as" class="group text-left" v-bind="attrs">
			<div
				class="relative overflow-hidden rounded-xl border border-gray-700 bg-white/10 p-2 shadow transition duration-150"
			>
				<NuxtImg
					v-if="safeRelationId(card.image)"
					:src="safeRelationId(card.image)"
					:alt="card.title ?? ''"
					class="relative w-full rounded-lg object-cover transition duration-150 group-hover:brightness-125"
					width="400"
					format="auto"
					loading="lazy"
				/>
				<div v-if="card.card_type === 'video'" class="absolute inset-0 flex items-center justify-center">
					<UIcon
						name="i-material-symbols-play-arrow-rounded"
						size="xl"
						class="bg-primary-600/75 group-hover:bg-primary-500/75 h-12 w-12 rounded-full p-2 text-white transition duration-150"
					/>
				</div>
			</div>
			<UBadge v-if="card.badge" :label="card.badge" variant="soft" class="absolute left-4 top-4 font-mono" />
			<p
				class="group-hover:text-primary ml-2 mt-4 text-balance font-display text-lg font-bold leading-tight underline-offset-2 transition duration-150"
			>
				{{ card.title }}
			</p>
			<p class="ml-2 mt-2 line-clamp-2 text-sm text-gray-400">{{ card.description }}</p>
		</component>
		<UModal
			v-if="card.card_type === 'video'"
			v-model="showModal"
			:title="card.title"
			:src="card.url"
			:ui="{
				width: 'sm:max-w-4xl',
				background: 'transparent bg-white/0 dark:transparent',
				overlay: {
					background: 'bg-gray-900/80',
				},
			}"
		>
			<div>
				<UButton icon="i-material-symbols-close" class="absolute right-0 top-0 -mt-12" @click="showModal = false" />
				<VVideo
					v-if="card.video_url"
					:url="card.video_url"
					class="overflow-hidden rounded-xl border border-gray-700 bg-white/10 p-4 backdrop-blur"
				/>
			</div>
		</UModal>
	</div>
</template>
