<script setup lang="ts">
import ConfettiExplosion from 'vue-confetti-explosion';
import type { EventTickets, People } from '~/types';
const { event, eventDates } = useEvent();
const toast = useToast();

const loading = ref(false);
const isTicketsLoaded = ref(false);

const tickets: Ref<EventTickets[]> = ref([]);
const password = ref('');
const currentWinner: Ref<EventTickets | null> = ref(null);
const showConfetti = ref(false);

async function fetchTickets() {
	loading.value = true;

	try {
		const data = await $fetch<{ tickets: EventTickets[] }>('/api/events/giveaway', {
			method: 'POST',
			body: {
				password: password.value,
			},
		});

		tickets.value = data.tickets;
		isTicketsLoaded.value = true;
	} catch (error: any) {
		toast.add({
			title: 'Error fetching tickets',
			description: error.data.message,
			color: 'rose',
			icon: 'i-material-symbols-warning-rounded',
		});
	} finally {
		loading.value = false;
	}
}

async function loadWinningTicket(ticketId: string) {
	loading.value = true;

	try {
		const data = await $fetch<EventTickets>(`/api/tickets/${ticketId}`, {});

		currentWinner.value = data;
		showConfetti.value = true;

		setTimeout(() => {
			showConfetti.value = false;
		}, 3000);
	} catch (error: any) {
		toast.add({
			title: 'Error fetching ticket',
			description: error.data.message,
			color: 'rose',
			icon: 'i-material-symbols-warning-rounded',
		});
	} finally {
		loading.value = false;
	}
}

useSeoMeta({
	title: `Giveaway`,
	ogTitle: `Giveaway`,
});
</script>
<template>
	<NuxtLayout name="ticket">
		<template #left>
			<div class="relative z-10 w-full max-w-xl">
				<UButton
					to="/"
					icon="i-material-symbols-arrow-back"
					label="Back to Event"
					color="gray"
					size="xs"
					variant="ghost"
				/>

				<TypographyHeadline content="Giveaway <em>Winners</em>" size="md" as="h3" class="mt-4" />
				<VText size="xs" text-color="light" class="mt-2">Let's see who won the giveaway!</VText>
				<UForm
					v-if="!isTicketsLoaded"
					:state="{ password }"
					class="mt-8 grid w-full max-w-lg grid-cols-2 gap-4"
					@submit="fetchTickets"
				>
					<VText size="xs" text-color="light" class="col-span-2">
						Start the giveaway by entering the password below.
					</VText>
					<UFormGroup label="Password" class="col-span-2" size="lg" required>
						<UInput v-model="password" placeholder="Enter password" required type="password" />
					</UFormGroup>
					<UButton
						type="submit"
						class="col-span-2 justify-center"
						trailing-icon="i-material-symbols-save-outline"
						size="xl"
						block
					>
						Start Giveaway
					</UButton>
				</UForm>
				<section v-if="isTicketsLoaded" class="relative">
					<SlotMachine :tickets="tickets" name-field="slug" class="mt-8" @winner="loadWinningTicket" />
				</section>
			</div>
		</template>

		<template #right>
			<!-- Badge -->
			<div
				v-if="currentWinner"
				class="relative z-10 mx-auto max-w-xl rounded-xl border border-gray-700 bg-white/10 p-8 backdrop-blur"
			>
				<Parallax>
					<Badge
						:tagline="event?.tagline as string"
						:event-dates="eventDates"
						:name="userName(currentWinner?.people_id as People)"
						:country="(currentWinner?.people_id as People)?.country as string"
					/>
				</Parallax>
			</div>
			<!-- Confetti Explosion -->
			<div v-if="showConfetti" class="fixed left-1/2 top-1/2 z-50 mx-auto overflow-visible">
				<ConfettiExplosion
					class="relative"
					:particle-count="250"
					:force="1"
					:duration="3000"
					:colors="[
						'rgb(var(--color-primary-800) / 1)',
						'rgb(var(--color-primary-200) / 1)',
						'rgb(var(--color-primary-500) / 1)',
					]"
				/>
			</div>
		</template>
	</NuxtLayout>
</template>
