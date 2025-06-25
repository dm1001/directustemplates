<script setup lang="ts">
const { globals } = useAppConfig();
const { eventDates } = useEvent();
</script>
<template>
	<div
		class="dark relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white antialiased transition duration-150"
	>
		<div class="flex-1 sm:flex sm:min-h-screen">
			<!-- Left Side -->
			<div class="min-h flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div class="mx-auto w-full max-w-sm lg:w-96">
					<NuxtLink to="/" class="inline-flex">
						<Logo class="h-12" />
					</NuxtLink>
					<TypographyTitle v-if="eventDates" class="mb-12 mt-4">
						{{ eventDates }}
					</TypographyTitle>
					<slot name="left" />
				</div>
			</div>

			<!-- Right Side -->
			<div
				class="relative mt-12 flex flex-1 flex-col justify-center border-t border-gray-700 px-4 sm:mt-0 sm:border-l sm:border-t-0 lg:px-8"
			>
				<NuxtImg
					v-if="globals?.ticket_pages_background"
					:src="globals?.ticket_pages_background"
					alt="placeholder"
					class="absolute inset-0 h-full w-full object-cover opacity-50"
				/>

				<slot name="right" />
			</div>
		</div>
	</div>
</template>
