<script setup lang="ts">
import type { BlockButtonGroup, BlockButton } from '~/types';

defineProps<{
	data: BlockButtonGroup;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}>();
</script>
<template>
	<div :class="`flex flex-wrap justify-${data.alignment} gap-4`">
		<UButton
			v-for="button in data.buttons as BlockButton[]"
			:key="button.id"
			:to="button.url"
			:variant="button?.variant"
			:label="button?.label ?? undefined"
			:target="button?.open_in_new_window ? '_blank' : undefined"
			size="xl"
			trailing-icon="material-symbols:arrow-forward-rounded"
		/>
	</div>
</template>
