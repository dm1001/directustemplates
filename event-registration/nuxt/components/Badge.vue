<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		tagline?: string;
		eventDates?: string;
		name?: string;
		country?: string;
	}>(),
	{
		tagline: '',
		eventDates: '',
		name: '',
		country: '',
	},
);

const badgeEl = ref<HTMLElement | null>(null);
const { elementX, elementY, isOutside } = useMouseInElement(badgeEl);
// Create a glow that follows the mouse within the badge element
const glowStyle = computed(() => {
	return {
		top: `${elementY.value}px`,
		left: `${elementX.value}px`,
	};
});
</script>

<template>
	<div ref="badgeEl" class="relative z-10 mx-auto overflow-hidden rounded-xl">
		<div class="glow overflow-hidden" :style="glowStyle" />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 712 1123"
			class="text-primary-900 h-full w-full rounded-xl shadow-xl"
		>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M37 0C16.566 0 0 16.566 0 37v1049c0 20.43 16.566 37 37 37h638c20.435 0 37-16.57 37-37V37c0-20.434-16.565-37-37-37H37Zm257 33a9 9 0 0 0-9 9 9 9 0 0 0 9 9h124a9 9 0 0 0 9-9 9 9 0 0 0-9-9H294Z"
				clip-rule="evenodd"
			/>
		</svg>
		<div v-if="country" class="absolute -bottom-4 w-full mix-blend-multiply">
			<img
				:src="`https://flagcdn.com/${country.toLowerCase()}.svg`"
				class="w-full opacity-30 mix-blend-multiply grayscale"
			/>
		</div>

		<div class="absolute inset-0 z-10 h-full w-full p-8 py-24">
			<Logo class="w-48" />
			<p class="mt-4 font-display text-sm text-white">{{ tagline }}</p>
			<TypographyTitle class="mt-4">{{ eventDates }}</TypographyTitle>
			<p class="mt-8 font-display text-2xl">{{ name }}</p>
		</div>
	</div>
</template>

<style scoped>
.glow {
	position: absolute;
	z-index: 10;
	transform: translate(-50%, -50%);
	width: 400px;
	height: 400px;
	border-radius: 50%;
	background: rgb(255, 255, 255);
	background: radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 50%);
	pointer-events: none;
	transition: transform 0.1s ease-out;
}
</style>
