<script setup lang="ts">
const toast = useToast();
const route = useRoute();

const { globals } = useAppConfig();

const resetForm = reactive({
	email: (route.query.email as string) ?? '',
	confirmation_code: '',
});

const loading = ref(false);

async function reset() {
	loading.value = true;

	try {
		const data = await $fetch('/api/auth/reset', {
			method: 'POST',
			body: {
				email: resetForm.email,
			},
		});

		toast.add({
			title: 'Confirmation code sent',
			description: 'If you have an account, we have sent you a new confirmation code. Please check your email.',
			color: 'green',
			icon: 'i-material-symbols-check-rounded',
			actions: [
				{
					label: 'Back to login',
					click: () => {
						return navigateTo('/auth/login?email=' + resetForm.email);
					},
				},
			],
		});
	} catch (error: any) {
		toast.add({
			title: 'Error sending confirmation code',
			description: error.data.message,
			color: 'rose',
			icon: 'i-material-symbols-warning-rounded',
		});
	} finally {
		loading.value = false;
	}
}

useSeoMeta({
	title: `Reset Confimation Code`,
});
</script>
<template>
	<NuxtLayout name="ticket">
		<template #left>
			<TypographyHeadline
				v-if="globals.reset_page.headline"
				:content="globals.reset_page.headline"
				size="md"
				as="h2"
				class="mt-4 max-w-md"
			/>
			<TypographyProse v-if="globals.reset_page.content" class="mt-4" :content="globals.reset_page.content" />
			<!-- Reset Form -->
			<UForm class="mt-8 grid grid-cols-2 gap-4" :state="resetForm" @submit="reset">
				<UFormGroup label="Work Email" class="col-span-2" size="lg" required>
					<UInput v-model="resetForm.email" placeholder="Your work email" required type="email" />
				</UFormGroup>
				<UButton
					:loading
					type="submit"
					size="lg"
					class="col-span-2"
					block
					trailing-icon="i-material-symbols-arrow-forward"
				>
					Send Confirmation Code
				</UButton>
				<UDivider class="col-span-2" />
				<div class="col-span-2 flex items-center justify-center">
					<span class="text-sm text-gray-400">Found your confirmation code?</span>
					<UButton variant="link" to="/auth/login" class="flex-shrink-0">Login</UButton>
				</div>
				<div class="col-span-2 flex items-center justify-center">
					<span class="text-sm text-gray-400">Need to register?</span>
					<UButton variant="link" to="/tickets" class="flex-shrink-0">Register</UButton>
				</div>
			</UForm>
		</template>
		<template #right>
			<div class="z-10 mx-auto mt-12 max-w-xl rounded-xl border border-gray-700 bg-white/10 p-8 backdrop-blur">
				<TypographyTitle v-if="globals.reset_page.callout.title">
					{{ globals.reset_page.callout.title }}
				</TypographyTitle>
				<TypographyProse
					v-if="globals.reset_page.callout.content"
					class="mt-4"
					:content="globals.reset_page.callout.content"
				/>
			</div>
		</template>
	</NuxtLayout>
</template>
