<script setup lang="ts">
interface TitleProps {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
}

withDefaults(defineProps<TitleProps>(), {
	as: 'h2',
});
</script>
<template>
	<component :is="as" class="text-primary font-mono font-medium uppercase tracking-wider">
		<slot />
	</component>
</template>
