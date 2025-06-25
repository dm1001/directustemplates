<script setup lang="ts">
import type { BlockCardgroup } from '~/types';

defineProps<{
	data: BlockCardgroup;
}>();
</script>
<template>
	<BlockContainer>
		<div class="relative border-b border-gray-700 pb-4 md:col-span-2">
			<TypographyTitle v-if="data.title" class="font-mono">
				{{ data.title }}
			</TypographyTitle>
			<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" as="h2" />
			<!-- Decorative Circles -->
			<div class="absolute -bottom-2 left-0 mt-4 h-4 w-4 rounded-full border border-gray-700 bg-gray-900" />
			<div class="absolute -bottom-2 right-0 mt-4 h-4 w-4 rounded-full border border-gray-700 bg-gray-900" />
		</div>
		<div class="relative grid w-full gap-8 pt-8 sm:grid-cols-2 md:grid-cols-3">
			<BlocksCard v-for="card in data.cards" :key="card.id" :card="card" class="relative z-10" />
		</div>
	</BlockContainer>
</template>
