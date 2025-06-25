<script setup lang="ts">
import type { People } from '~/types';
const { globals } = useAppConfig();

const { event, eventDates } = useEvent();
const { registrant, updatePerson, loading, ticketId } = usePerson();

const form = reactive({
	website: unref(registrant)?.website || '',
	job_title: unref(registrant)?.job_title || '',
	country: unref(registrant)?.country || '',
	avatar: unref(registrant)?.avatar || null,
});

useSeoMeta({
	title: `Customize Your Badge`,
	ogTitle: `Customize Your Badge`,
});

definePageMeta({
	middleware: ['auth'],
});
</script>
<template>
	<NuxtLayout name="ticket">
		<template #left>
			<div class="relative z-10 w-full max-w-xl">
				<UButton
					to="/tickets"
					icon="i-material-symbols-arrow-back"
					label="Back to Ticket"
					color="gray"
					size="xs"
					variant="ghost"
				/>

				<TypographyHeadline :content="globals.customize_page.headline" size="md" as="h3" class="mt-4" />
				<VText size="xs" text-color="light" class="mt-2">
					{{ globals.customize_page.content }}
				</VText>

				<UForm
					class="mt-8 grid w-full max-w-lg grid-cols-2 gap-4"
					:state="form"
					@submit="
						updatePerson(form, {
							redirect: `/tickets/${ticketId}`,
						})
					"
				>
					<UFormGroup label="Company Website" size="lg" class="col-span-2">
						<UInput v-model="form.website" placeholder="https://example.com" />
					</UFormGroup>
					<UFormGroup label="Job Title" size="lg">
						<USelectMenu v-model="form.job_title" :options="jobTitles" searchable />
					</UFormGroup>
					<UFormGroup label="Country" size="lg">
						<USelectMenu
							v-model="form.country"
							:options="countries"
							option-attribute="name"
							value-attribute="code"
							searchable
							clear-search-on-close
							:search-attributes="['name']"
						/>
					</UFormGroup>
					<UButton
						type="submit"
						:loading="loading"
						class="col-span-2 justify-center"
						trailing-icon="i-material-symbols-save-outline"
						size="xl"
						block
					>
						Save Changes
					</UButton>
					<UButton class="col-span-2 justify-center" variant="ghost" :to="`/tickets/${ticketId}`">Cancel</UButton>
				</UForm>
			</div>
		</template>

		<template #right>
			<!-- Badge -->
			<div
				class="relative z-10 mx-auto -mt-16 max-w-xl rounded-xl border border-gray-700 bg-white/10 p-8 backdrop-blur sm:mt-0"
			>
				<Parallax>
					<Badge
						:tagline="event?.tagline as string"
						:event-dates="eventDates"
						:name="userName(registrant as People)"
						:avatar="form.avatar"
						:country="form.country"
					/>
				</Parallax>
			</div>
		</template>
	</NuxtLayout>
</template>
