import type { People, EventTickets } from '~/types/';

export default function usePerson() {
	const registrant = useState<People | null>('registrant', () => null);
	const toast = useToast();

	const loading = ref(false);

	const isLoggedIn = computed(() => !!registrant.value);

	const ticketId = computed(() =>
		registrant.value?.tickets ? (registrant.value?.tickets[0] as EventTickets)?.id : '',
	);

	const ticketSlug = computed(() =>
		registrant.value?.tickets ? (registrant.value?.tickets[0] as EventTickets)?.slug : '',
	);

	// Functions
	async function fetchPerson() {
		try {
			const { data } = await useApi<People>('/api/auth/me');
			registrant.value = data.value ?? null;
		} catch (error: any) {
			toast.add({
				title: 'Error fetching person',
				description: error.data.message,
				color: 'rose',
				icon: 'i-material-symbols-warning-rounded',
			});
		}
	}

	async function logout() {
		try {
			await $fetch('/api/auth/logout');

			registrant.value = null;

			toast.add({
				title: 'Logged out',
				description: 'You have been logged out.',
				color: 'green',
				icon: 'i-material-symbols-check-circle',
			});

			await navigateTo('/');
		} catch (error: any) {
			toast.add({
				title: 'Error logging out',
				description: error.data.message,
				color: 'rose',
				icon: 'i-material-symbols-warning-rounded',
			});
		}
	}

	async function updatePerson(payload: Partial<People>, options: { redirect?: string }) {
		loading.value = true;

		try {
			const response = await $fetch('/api/person', {
				method: 'POST',
				body: payload,
			});

			toast.add({
				title: 'Ticket successfully updated',
				color: 'green',
				icon: 'i-material-symbols-check-circle',
			});
		} catch (error: any) {
			toast.add({
				title: 'Error updating ticket',
				description: error.data.message,
				color: 'rose',
				icon: 'i-material-symbols-warning-rounded',
			});
		} finally {
			fetchPerson();
			loading.value = false;

			if (options?.redirect) {
				await navigateTo(options.redirect);
			}
		}
	}

	return {
		registrant,
		logout,
		loading,
		isLoggedIn,
		fetchPerson,
		updatePerson,
		ticketId,
		ticketSlug,
	};
}
