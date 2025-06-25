<script setup lang="ts">
const { globals } = useAppConfig();

useSeoMeta({
	title: `Login`,
});
</script>
<template>
	<NuxtLayout name="ticket">
		<template #left>
			<TypographyHeadline
				v-if="globals.login_page.headline"
				:content="globals.login_page.headline"
				size="md"
				as="h2"
				class="mt-4 max-w-md"
			/>
			<TypographyProse v-if="globals.login_page.content" class="mt-4" :content="globals.login_page.content" />
			<!-- Login Form -->
			<FormsLogin />
			<UDivider class="mt-4" />
			<div class="mt-4 flex items-center justify-center">
				<span class="text-sm text-gray-400">Didn't receive the confirmation code?</span>
				<UButton variant="link" to="/auth/reset" class="flex-shrink-0">Resend Code</UButton>
			</div>
			<div class="mt-4 flex items-center justify-center">
				<span class="text-sm text-gray-400">Not registered?</span>
				<UButton variant="link" to="/tickets" class="flex-shrink-0">Register</UButton>
			</div>
		</template>
		<template #right>
			<div class="z-10 mx-auto mt-12 max-w-xl rounded-xl border border-gray-700 bg-white/10 p-8 backdrop-blur">
				<TypographyTitle v-if="globals.login_page.callout.title">
					{{ globals.login_page.callout.title }}
				</TypographyTitle>
				<TypographyProse
					v-if="globals.login_page.callout.content"
					class="mt-4"
					:content="globals.login_page.callout.content"
				/>
			</div>
		</template>
	</NuxtLayout>
</template>
