<script setup lang="ts">
import type { BlockHero, BlockButtonGroup } from '~/types';

defineProps<{
	data: BlockHero;
}>();
</script>
<template>
	<BlockContainer class="relative gap-12 border-b border-gray-700" full-width>
		<NuxtImg
			v-if="data.background"
			:src="data.background"
			:alt="data.title"
			class="absolute inset-0 flex h-full w-full object-cover opacity-10"
		/>
		<div class="relative z-10 my-48 space-y-4 px-8 text-center md:col-span-2">
			<Logo class="mx-auto mb-12 h-12 w-full" />
			<TypographyTitle v-if="data.title">
				{{ data.title }}
			</TypographyTitle>
			<TypographyHeadline
				v-if="data.headline"
				:content="data.headline"
				size="lg"
				as="h1"
				class="text-shadow mx-auto max-w-2xl"
			/>
			<TypographyProse
				v-if="data.content"
				:content="data.content"
				size="lg"
				class="text-shadow mx-auto max-w-2xl text-balance text-white"
			/>
			<BlocksButtonGroup v-if="data.button_group" :data="data.button_group as BlockButtonGroup" size="xl" />
		</div>
	</BlockContainer>
</template>

<style>
.text-shadow {
	text-shadow: rgba(0, 0, 0, 50%) 0px 0px 10px;
}
</style>
