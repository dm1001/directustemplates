<script setup lang="ts">
import type { People } from '~/types';
import { loginFormSchema } from '~/types';

const route = useRoute();
const toast = useToast();
const { loading, registrant } = usePerson();

const formEl = ref(null);

const loginForm = reactive({
	email: (route.query.email as string) ?? '',
	confirmation_code: (route.query.confirmation_code as string) ?? '',
});

async function login({ email, confirmation_code }: { email: string; confirmation_code: string }) {
	loading.value = true;

	try {
		const data: any = await $fetch('/api/auth/login', {
			method: 'POST',
			body: {
				email,
				confirmation_code,
			},
		});

		registrant.value = data as People;

		toast.add({
			title: 'Login successful',
			description: 'Welcome back!',
			color: 'green',
			icon: 'i-material-symbols-check-circle',
		});

		if (data.tickets) {
			await navigateTo(`/tickets/${data.tickets[0].id}`);
		}
	} catch (error: any) {
		toast.add({
			title: 'Error logging in.',
			description: error.data.message,
			color: 'rose',
			icon: 'i-material-symbols-warning-rounded',
			actions: [
				{
					label: 'Resend Code',
					click: () => {
						return navigateTo('/auth/reset');
					},
				},
			],
		});
	} finally {
		loading.value = false;
	}
}
</script>
<template>
	<UForm ref="formEl" class="mt-8 grid gap-4" :schema="loginFormSchema" :state="loginForm" @submit="login(loginForm)">
		<UFormGroup label="Work Email" class="" size="lg" name="email" required>
			<UInput v-model="loginForm.email" placeholder="Your work email" />
		</UFormGroup>
		<UFormGroup label="Confirmation Code" class="" size="lg" name="confirmation_code" required>
			<UInput v-model="loginForm.confirmation_code" placeholder="Your confrimation code" />
		</UFormGroup>
		<UButton :loading type="submit" size="lg" class="sm:" block trailing-icon="i-material-symbols-arrow-forward">
			Login
		</UButton>
	</UForm>
</template>
