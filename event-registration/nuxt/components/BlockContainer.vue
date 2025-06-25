<script setup lang="ts">
interface BlockContainerProps {
	fullWidth?: boolean;
	as?: 'section' | 'div';
}

withDefaults(defineProps<BlockContainerProps>(), {
	fullWidth: false,
	as: 'section',
});
</script>
<template>
	<component :is="as" :class="['mx-auto py-8', !fullWidth ? 'max-w-6xl px-6 lg:px-16 lg:py-16' : '']">
		<slot />
	</component>
</template>
