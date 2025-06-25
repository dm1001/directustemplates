<script setup lang="ts">
import type { BlockType, EventLandingPageBlocks } from '~/types';

const componentMap: Record<BlockType, any> = {
	block_hero: resolveComponent('BlocksHero'),
	block_faqs: resolveComponent('BlocksFaqs'),
	block_cta: resolveComponent('BlocksCta'),
	block_speakers: resolveComponent('BlocksSpeakers'),
	block_schedule: resolveComponent('BlocksSchedule'),
	block_cardgroup: resolveComponent('BlocksCardgroup'),
	block_countdown: resolveComponent('BlocksCountdown'),
	block_button: resolveComponent('UButton'),
	block_button_group: resolveComponent('BlocksButtonGroup'),
	block_card: resolveComponent('BlocksCard'),
};

const props = defineProps<{
	blocks: EventLandingPageBlocks[];
}>();
</script>
<template>
	<div id="content" class="mx-auto">
		<template v-for="block in blocks" :key="block.id">
			<component
				:is="componentMap[block.collection as BlockType]"
				v-if="block && block.collection"
				:data="block.item"
			/>
		</template>
	</div>
</template>
