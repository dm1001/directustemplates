<script setup lang="ts">
const props = defineProps<{
	date: string;
	label?: string;
	stop?: boolean;
}>();

const timerStarted = ref(false);
const now = ref(Math.trunc(new Date().getTime() / 1000));
const date = ref(Math.trunc(new Date(props.date).getTime() / 1000));
const diff = ref(date.value - now.value);
let interval: ReturnType<typeof setInterval>;

const seconds = computed(() => Math.trunc(diff.value) % 60);
const minutes = computed(() => Math.trunc(diff.value / 60) % 60);
const hours = computed(() => Math.trunc(diff.value / 60 / 60) % 24);
const days = computed(() => Math.trunc(diff.value / 60 / 60 / 24));

const timerUnits = computed(() => {
	return [
		{ label: 'days', value: days.value },
		{ label: 'hours', value: hours.value },
		{ label: 'minutes', value: minutes.value },
		{ label: 'seconds', value: seconds.value },
	];
});

const twoDigits = (value: number) => {
	return value.toString().padStart(2, '0');
};

watch(now, () => {
	diff.value = date.value - now.value;

	if (diff.value <= 0 || props.stop) {
		diff.value = 0;
		clearInterval(interval);
	}
});

onMounted(() => {
	if (!props.date) {
		throw new Error("Missing props 'date'");
	}

	if (!date.value) {
		throw new Error("Invalid props value, correct the 'date'");
	}

	timerStarted.value = true;

	interval = setInterval(() => {
		now.value = Math.trunc(new Date().getTime() / 1000);
	}, 1000);
});

onUnmounted(() => {
	clearInterval(interval);
});
</script>

<template>
	<!-- Timer -->
	<div class="relative grid w-full grid-cols-2 gap-4 md:grid-cols-4">
		<template v-if="timerStarted">
			<div v-for="item in timerUnits" :key="item.label" class="timer-unit min-w-32 text-center">
				<div class="rounded-xl border border-gray-700 bg-white/10 p-6 shadow">
					<p class="rounded-lg font-display text-5xl font-bold text-white lg:text-6xl">
						{{ twoDigits(item.value) }}
					</p>
				</div>
				<p class="mt-2 font-mono font-medium uppercase text-gray-300">{{ item.label }}</p>
			</div>
		</template>
	</div>
</template>
