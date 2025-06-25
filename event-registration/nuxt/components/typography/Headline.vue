<script setup lang="ts">
interface HeadlineProps {
	content: string;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'title';
	subdued?: boolean;
}

withDefaults(defineProps<HeadlineProps>(), {
	as: 'h2',
	size: 'md',
});
</script>
<template>
	<component
		:is="as"
		:class="[
			{
				'text-xl': size === 'xs',
				'text-2xl': size === 'sm',
				'text-2xl md:text-3xl': size === 'md',
				'text-3xl md:text-4xl': size === 'lg',
				'text-2xl md:text-5xl': size === 'xl',
				'xs:text-5xl text-4xl md:text-7xl': size === 'title',
			},
			{
				'text-gray-500 dark:text-gray-300': subdued,
				'dark:text-white': !subdued,
			},
			'color-em text-balance font-display font-extrabold leading-snug tracking-tight',
		]"
	>
		<span v-html="content" />
	</component>
</template>

<style>
.color-em {
	em {
		@apply text-primary not-italic;
	}
}
</style>
