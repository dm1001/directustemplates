<script setup lang="ts">
const parallaxEl = ref<HTMLElement | null>(null);

const { tilt, roll, source } = useParallax(parallaxEl);

const badgeStyle = computed(() => ({
	transform: `rotateX(${roll.value * 40}deg) rotateY(${tilt.value * 40}deg)`,
}));
</script>
<template>
	<div
		ref="parallaxEl"
		:style="{
			perspective: '500px',
		}"
	>
		<div :style="badgeStyle">
			<slot />
		</div>
	</div>
</template>
