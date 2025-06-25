<script setup lang="ts">
import type { BlockFaqs } from '~/types';

const props = defineProps<{
	data: BlockFaqs;
}>();

const faqs = computed(() => {
	return props.data?.faqs?.map((item) => {
		return {
			label: item?.title,
			content: item?.answer,
		};
	});
});
</script>

<template>
	<BlockContainer>
		<TypographyTitle v-if="data.title">{{ data.title }}</TypographyTitle>
		<TypographyHeadline v-if="data.headline" :content="data.headline" size="lg" />

		<div class="mt-6 w-full">
			<UAccordion
				v-if="faqs"
				:items="faqs as []"
				:ui="{
					wrapper: 'space-y-4',
					container: 'border border-gray-700 text-left bg-white/5 rounded-xl p-4 flex justify-between',
				}"
			>
				<template #default="{ item, index, open }">
					<button
						:key="index"
						class="flex items-center justify-between text-left"
						:class="{
							'border-b border-gray-700 pb-3': open,
						}"
					>
						<span class="w-full font-display text-sm font-medium text-gray-900 dark:text-white md:text-lg">
							{{ item.label }}
						</span>
						<UIcon
							name="i-material-symbols-chevron-right-rounded"
							class="text-primary h-8 w-8 fill-current transition duration-150"
							:class="[open ? 'rotate-90' : '']"
						/>
					</button>
				</template>
				<template #item="{ item, open }">
					<div v-show="open" class="relative pt-2">
						<TypographyProse :content="item.content" />
					</div>
				</template>
			</UAccordion>
		</div>
	</BlockContainer>
</template>
