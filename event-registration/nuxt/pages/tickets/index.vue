<script setup lang="ts">
const { globals } = useAppConfig();

const { event, eventDates } = useEvent();
const { isLoggedIn, ticketId } = usePerson();

if (isLoggedIn.value && ticketId.value) {
	await navigateTo(`/tickets/${ticketId.value}`);
}

const registrationPage = computed(() => {
	return unref(globals).registration_page;
});

useSeoMeta({
	title: `Register`,
});
</script>
<template>
	<NuxtLayout name="ticket">
		<template #left>
			<TypographyHeadline
				v-if="registrationPage.headline"
				:content="registrationPage.headline"
				size="md"
				as="h2"
				class="mt-4 max-w-md"
			/>
			<TypographyProse v-if="registrationPage.content" class="mt-4" :content="registrationPage.content" />

			<!-- Registration Form -->
			<FormsRegistration />

			<UDivider class="mt-4" />

			<p class="mt-4 text-center text-xs text-gray-400">
				By registering you agree to our
				<NuxtLink to="/terms" class="underline hover:text-gray-200">terms and conditions.</NuxtLink>
			</p>

			<div class="mt-4 flex items-center justify-center">
				<span class="text-sm text-gray-400">Already registered?</span>
				<UButton variant="link" to="/auth/login" class="flex-shrink-0">Sign In</UButton>
			</div>
		</template>
		<template #right>
			<!-- Badge -->
			<div
				class="relative z-10 mx-auto -mt-16 max-w-xl rounded-xl border border-gray-700 bg-white/10 p-8 backdrop-blur sm:mt-0"
			>
				<Parallax>
					<Badge :tagline="event?.tagline" :event-dates="eventDates" name="You Are Awesome" />
				</Parallax>
			</div>

			<!-- Callout -->
			<div class="z-10 mx-auto mt-12 max-w-xl rounded-xl border border-gray-700 bg-white/10 p-8 backdrop-blur">
				<TypographyTitle class="">{{ registrationPage.callout.title }}</TypographyTitle>
				<TypographyProse class="mt-4" :content="registrationPage.callout.content" />
			</div>
		</template>
	</NuxtLayout>
</template>
