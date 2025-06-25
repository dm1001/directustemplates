<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		title: string;
		headline: string;
		date: string;
		name: string;
		logo?: string;
	}>(),
	{
		title: '',
		headline: '',
		date: '',
		name: '',
	},
);
</script>

<template>
	<div class="flex h-full w-full bg-gray-900" :style="{ padding: '30px 45px' }">
		<svg
			width="1200"
			height="600"
			viewBox="0 0 1200 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute -left-1 top-0 h-[600px] w-[1200px] bg-red-500"
		>
			<g filter="url(#filter0_d_1_2)">
				<rect x="0" width="1200" height="600" fill="url(#paint0_linear_1_2)" />
			</g>
			<defs>
				<filter
					id="filter0_d_1_2"
					x="0"
					y="0"
					width="1200"
					height="600"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape" />
				</filter>
				<linearGradient
					id="paint0_linear_1_2"
					x1="553.425"
					y1="589.355"
					x2="1211.94"
					y2="20.6411"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#09090b" />
					<stop offset="0.452143" stop-color="#18181b" />
					<stop offset="0.648192" stop-color="#27272a" />
					<stop offset="0.846437" stop-color="#3F3F46" />
					<stop offset="1" stop-color="#47533B" />
				</linearGradient>
			</defs>
		</svg>
		<div v-if="title" class="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
			<!-- Repeat the event title over and over again -->
			<p class="overflow-visible text-[48px] font-black uppercase text-white opacity-20">
				{{ [...Array(50)].map(() => title).join(' ') }}
			</p>
		</div>

		<div class="ml-1/2 flex flex-col justify-end">
			<div class="relative z-10 mx-auto flex flex-col overflow-hidden rounded-xl">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 712 1123" class="text-lime-800" height="800">
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M37 0C16.566 0 0 16.566 0 37v1049c0 20.43 16.566 37 37 37h638c20.435 0 37-16.57 37-37V37c0-20.434-16.565-37-37-37H37Zm257 33a9 9 0 0 0-9 9 9 9 0 0 0 9 9h124a9 9 0 0 0 9-9 9 9 0 0 0-9-9H294Z"
						clip-rule="evenodd"
					/>
				</svg>

				<div class="absolute inset-0 z-10 flex h-full w-full flex-col p-8 py-24">
					<NuxtImg v-if="logo" :src="logo" class="max-h-[72px] w-[300px] object-contain" />
					<Logo v-else class="max-h-[72px] w-[300px] object-contain" />
					<p class="mt-4 font-display text-2xl text-white">{{ headline }}</p>
					<p class="mt-4 font-mono text-3xl font-bold uppercase text-lime-300">{{ date }}</p>
					<p class="mt-8 font-display text-4xl text-white">{{ name }}</p>
				</div>
				er
			</div>
		</div>
	</div>
</template>
