<script setup lang="ts">
import type { EventTickets } from '~/types';
const props = withDefaults(
	defineProps<{
		tickets: Array<Partial<EventTickets>>;
		nameField?: string;
		shouldRemoveWinner?: boolean;
	}>(),
	{
		nameField: 'slug',
		shouldRemoveWinner: true,
	},
);
const emit = defineEmits(['winner']);

const reel = ref<HTMLElement | null>(null);

const maxReelItems = ref<number>(props.tickets.length ?? 30);
const nameList = ref<string[]>([]);
const havePreviousWinner = ref<boolean>(false);
const currentWinner = ref<string | null>(null);

const updateNameList = (newNames: Array<{ [key: string]: any }>, nameField = 'slug') => {
	nameList.value = newNames.map((nameObj) => nameObj[nameField]);
};

updateNameList(props.tickets, props.nameField);

const shuffleNames = (array: string[]) => {
	const keys = Object.keys(array) as unknown[] as number[];
	const result = [];

	for (let k = 0, n = keys.length; k < array.length && n > 0; k += 1) {
		const i = (Math.random() * n) | 0;
		const key = keys[i];
		result.push(array[key as number]);
		n -= 1;
		const tmp = keys[n];
		keys[n] = key as any;
		keys[i] = tmp as any;
	}

	return result;
};

const startSpin = async () => {
	if (!nameList.value.length) {
		console.error('Name List is empty. Cannot start spinning.');
		return false;
	}

	if (reel.value) {
		// Clear existing reel items
		while (reel.value.firstChild) {
			reel.value.removeChild(reel.value.firstChild);
		}

		let randomNames = shuffleNames(nameList.value);

		// Ensure that the winner is at the end
		const winner = randomNames[randomNames.length - 1];
		randomNames = randomNames.slice(0, maxReelItems.value - 1);
		randomNames.push(winner as string);

		const fragment = document.createDocumentFragment();

		randomNames.forEach((name) => {
			const newReelItem = document.createElement('div');
			newReelItem.innerHTML = name as string;
			fragment.appendChild(newReelItem);
		});

		reel.value.appendChild(fragment);

		console.info('Displayed items: ', randomNames);
		console.info('Winner: ', winner);

		if (props.shouldRemoveWinner) {
			nameList.value.splice(
				nameList.value.findIndex((name) => name === winner),
				1,
			);
		}

		console.info('Remaining: ', nameList.value);

		// Create the animation after the items are appended
		const animationDuration = maxReelItems.value * 100; // Speed up the animation

		const reelAnimation = reel.value.animate(
			[
				{ transform: 'none', filter: 'blur(0)' },
				{ filter: 'blur(1px)', offset: 0.5 },
				{ transform: `translateY(-${(maxReelItems.value - 1) * (1 * 28) + 28}px)`, filter: 'blur(0)' },
			],
			{
				duration: animationDuration,
				easing: 'ease-in-out',
				iterations: 1,
			},
		);

		const animationPromise = new Promise((resolve) => {
			reelAnimation.onfinish = resolve;
		});

		reelAnimation.play();

		await animationPromise;

		reelAnimation.finish();

		currentWinner.value = winner as string;

		// Ensure only the last item (winner) remains visible
		while (reel.value.children.length > 1) {
			reel.value.removeChild(reel.value.firstChild!);
		}

		havePreviousWinner.value = true;

		return true;
	}

	return false;
};

// Watch currentWinner for changes
watch(currentWinner, (newWinner) => {
	if (newWinner) {
		emit('winner', newWinner);
	}
});
</script>

<template>
	<div class="main">
		<div class="relative z-10 w-full text-center">
			<div
				class="bg-primary-900 border-primary-800 relative z-10 mx-auto h-[8rem] w-full max-w-5xl rounded-xl border p-4 shadow-lg"
			>
				<div class="border-primary-700 relative h-full w-full overflow-hidden rounded-lg border bg-white shadow-inner">
					<!-- Shadows for the slot machine effect -->
					<div class="absolute bottom-0 left-0 h-1/3 w-full rounded-b-lg bg-gradient-to-b from-white/10 to-black/30" />
					<div class="absolute left-0 top-0 h-1/3 w-full rounded-t-lg bg-gradient-to-t from-white/10 to-black/30" />
					<!-- Reel items will be appended here by the spin method -->
					<div
						id="reel"
						ref="reel"
						class="reel text-primary-600 w-full p-8 font-mono text-lg font-semibold text-black"
					/>
				</div>
			</div>
		</div>
		<UButton class="mt-8" size="xl" block @click="startSpin">Draw</UButton>
	</div>
</template>
