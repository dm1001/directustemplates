<script setup lang="ts">
import type { People, EventTickets } from '~/types';

const { globals } = useAppConfig();
const route = useRoute();
const image = useImage();
const config = useRuntimeConfig();
const referralId = useCookie('referral_ticket_id');

const {
	public: { siteUrl },
} = config;

const { isLoggedIn, ticketId, ticketSlug, logout, registrant } = usePerson();
const { event, eventDates } = useEvent();

const { data: ticket } = await useApi<EventTickets>(`/api/tickets/${route.params.ticket}`, {});

if (!ticket || !event) {
	throw createError({
		statusCode: 404,
		fatal: true,
		message: 'Ticket not found.',
	});
}

// Set the referral cookie
if (!isLoggedIn.value) {
	referralId.value = unref(ticket)?.id;
}

// Generate page content using micromustache
const ticketPage = computed(() => {
	const data = {
		ticket: unref(ticket),
		person: unref(ticket)?.people_id,
		event: unref(event),
	};

	return JSON.parse(renderTemplate(JSON.stringify(globals.ticket_page), data));
});

// Computed props
const ticketUrl = computed(() => `${siteUrl}/t/${unref(ticket)?.slug ?? unref(ticket)?.id}`);

const isRegistrantTicket = computed(() => {
	return isLoggedIn.value && (ticketId.value === route.params.ticket || ticketSlug.value === route.params.ticket);
});

const person = computed(() => unref(ticket)?.people_id as People);

const entryCount = computed(() => unref(ticket)?.referred_tickets_count || 0);

// Metadata
useSeoMeta({
	title: `Join ${unref(person).first_name} at ${unref(event)?.title}`,
	ogTitle: `Join ${unref(person).first_name} at ${unref(event)?.title}`,
});

definePageMeta({
	// Using alias allows us to shorten the URL
	alias: '/t/:ticket',
});

defineOgImageComponent('OgImageTicket', {
	title: unref(event)?.title,
	headline: unref(event)?.tagline,
	date: unref(eventDates),
	name: userName(unref(ticket)?.people_id as People),
	logo: unref(event)?.logo,
});
</script>
<template>
	<NuxtLayout name="ticket">
		<template #left>
			<div v-if="isRegistrantTicket">
				<TypographyHeadline :content="ticketPage.logged_in.headline" size="md" as="h3" class="mt-4" />
				<TypographyProse size="sm" class="mt-4" :content="ticketPage.logged_in.content" />

				<div class="mt-8 flex flex-col gap-4 sm:flex-row">
					<div>
						<UButton label="Customize Badge" to="/tickets/customize" icon="i-material-symbols-edit-outline" size="lg" />
					</div>
					<div>
						<UButton
							label="View Schedule"
							to="/#schedule"
							variant="ghost"
							size="lg"
							trailing-icon="i-material-symbols-arrow-forward"
						/>
					</div>
				</div>
			</div>
			<div v-else>
				<TypographyHeadline :content="ticketPage.logged_out.headline" size="md" as="h1" class="mt-4 max-w-md" />
				<TypographyProse :content="ticketPage.logged_out.content" class="mt-4" />
				<UButton
					label="Register Now"
					to="/tickets"
					class="mt-4"
					block
					size="xl"
					trailing-icon="i-material-symbols-arrow-forward"
				/>
			</div>
			<UDivider class="mt-8" />
			<template v-if="isRegistrantTicket">
				<TicketShare :ticket-url="ticketUrl" class="mt-8" />
				<UDivider class="mt-8" />
			</template>
			<!-- Details and Logout -->
			<div v-if="isRegistrantTicket" class="mt-4">
				<div class="flex gap-2">
					<UAvatar
						v-if="registrant?.avatar"
						:src="
							image(registrant?.avatar as string, {
								width: 72,
								format: 'auto',
							})
						"
						:alt="registrant?.first_name"
						size="lg"
						class="ring-1 ring-gray-700"
					/>
					<div>
						<p class="font-mono font-semibold text-gray-300">
							{{ registrant?.first_name + ' ' + registrant?.last_name }}
						</p>
						<p class="font-mono text-gray-300">{{ registrant?.email }}</p>
					</div>
				</div>
				<UButton
					label="Logout"
					variant="link"
					size="lg"
					:padded="false"
					icon="i-material-symbols-logout"
					class="mt-4"
					@click="logout"
				/>
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
						:name="userName(ticket?.people_id as People)"
						:country="(ticket?.people_id as People)?.country as string"
					/>
				</Parallax>
			</div>

			<!-- Referral -->
			<div class="z-10 mx-auto mt-12 max-w-xl rounded-xl border border-gray-700 bg-white/10 p-8 backdrop-blur">
				<TypographyHeadline
					:content="isRegistrantTicket ? ticketPage.logged_in.meter.title : ticketPage.logged_out.meter.title"
					size="md"
					class="text-center"
				/>
				<UMeter :value="entryCount" :max="entryCount < 10 ? 10 : entryCount + 2" class="mt-4" size="xl">
					<template #indicator="{ percent }">
						<div
							:style="{
								width: `${percent}%`,
							}"
							class="flex w-full justify-end"
						>
							<p class="w-12 rounded-xl bg-white p-2 text-center font-mono font-bold text-gray-900">
								{{ percent / 10 }}
							</p>
						</div>
					</template>
				</UMeter>
				<TypographyProse
					:content="isRegistrantTicket ? ticketPage.logged_in.meter.content : ticketPage.logged_out.meter.content"
					class="mt-4"
				/>
			</div>
		</template>
	</NuxtLayout>
</template>
