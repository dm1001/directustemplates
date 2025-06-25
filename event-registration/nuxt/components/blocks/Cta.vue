<script setup lang="ts">
import type { BlockButtonGroup, BlockCta } from '~/types';

defineProps<{
	data: BlockCta;
}>();
</script>
<template>
	<BlockContainer>
		<div
			class="grid gap-8"
			:class="{
				'grid-cols-1': !data.image,
				'grid-cols-1 md:grid-cols-2': data.image,
			}"
		>
			<div v-if="data.image" class="rounded-xl border border-gray-700 bg-white/5 p-4">
				<NuxtImg
					v-if="safeRelationId(data.image)"
					:src="safeRelationId(data.image) as string"
					alt=""
					class="max-h-96 w-full overflow-hidden rounded-lg object-cover"
					width="600"
					format="auto"
					loading="lazy"
				/>
			</div>

			<div class="flex min-h-72 flex-col items-center justify-center rounded-xl border border-gray-700 bg-white/5 p-4">
				<div>
					<TypographyTitle v-if="data?.title">{{ data.title }}</TypographyTitle>
					<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" class="mt-2" />
					<TypographyProse v-if="data.content" :content="data.content" class="mt-4" />
					<BlocksButtonGroup
						v-if="data.button_group"
						:data="data.button_group as BlockButtonGroup"
						class="relative mt-8"
					/>
				</div>
			</div>
		</div>
	</BlockContainer>
</template>
