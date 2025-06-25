<script setup lang="ts">
import type { Event, People } from '~/types';
import { registrationFormSchema } from '~/types';

const toast = useToast();
const route = useRoute();

const { event } = useEvent();
const { registrant, isLoggedIn, ticketId } = usePerson();

if (isLoggedIn.value && ticketId.value) {
	await navigateTo(`/tickets/${ticketId.value}`);
}

const formEl: Ref<HTMLElement | null> = ref(null);

const registrationForm = reactive({
	first_name: (route.query.first_name as string) ?? '',
	last_name: (route.query.last_name as string) ?? '',
	email: (route.query.email as string) ?? '',
});

const loading = ref(false);

async function register() {
	loading.value = true;

	try {
		const data = await $fetch('/api/auth/register', {
			method: 'POST',
			body: {
				email: registrationForm.email,
				first_name: registrationForm.first_name,
				last_name: registrationForm.last_name,
				event_id: unref(event)?.id,
			},
		});

		registrant.value = data as People;

		toast.add({
			title: 'Registration successful',
			description: 'You have been registered successfully',
			color: 'green',
			icon: 'i-material-symbols-check-rounded',
		});

		await navigateTo(`/tickets/customize`);
	} catch (error: any) {
		// If there's a validation error, show it to the user using the UForm setErrors method
		if (error.data.data?.errors) {
			// @ts-ignore
			formEl.value?.setErrors(
				error.data.data.errors.map((err: any) => ({ path: err.path.join(''), message: err.message })),
			);
		}

		if (error.data?.data?.redirect) {
			await navigateTo(error.data.data.redirect);
		}

		// If there's a misspelled email suggestion, show it to the user
		const suggestion = error.data.data?.suggestion;

		const actions = suggestion
			? [
					{
						label: 'Apply Suggestion',
						click: () => {
							registrationForm.email = suggestion;
						},
					},
				]
			: [];

		const message = suggestion ? `Did you mean: ${suggestion}?` : error.data.message;

		toast.add({
			title: 'Error registering for the event.',
			description: message,
			color: 'rose',
			icon: 'i-material-symbols-warning-rounded',
			actions,
		});
	} finally {
		loading.value = false;
	}
}
</script>
<template>
	<!-- Registration Form -->
	<UForm
		ref="formEl"
		class="mt-8 grid grid-cols-2 gap-4"
		:schema="registrationFormSchema"
		:state="registrationForm"
		@submit="register"
	>
		<UFormGroup label="First Name" size="lg" name="first_name" required>
			<UInput v-model="registrationForm.first_name" placeholder="First Name" autofocus />
		</UFormGroup>
		<UFormGroup label="Last Name" size="lg" name="last_name" required>
			<UInput v-model="registrationForm.last_name" placeholder="Last Name" />
		</UFormGroup>
		<UFormGroup label="Work Email" class="col-span-2" size="lg" name="email" required>
			<UInput v-model="registrationForm.email" placeholder="Email" />
		</UFormGroup>
		<UButton :loading type="submit" size="lg" class="col-span-2" block trailing-icon="i-material-symbols-arrow-forward">
			Register
		</UButton>
	</UForm>
</template>
