<script setup lang="ts">
const { event, eventDates, fetchEventLandingPage } = useEvent();
await fetchEventLandingPage();

useSeoMeta({
	titleTemplate: `%s`,
	title: unref(event)?.title,
	description: () => unref(event)?.description,
	ogTitle: unref(event)?.title,
	ogDescription: () => unref(event)?.description,
});

defineOgImageComponent('OgImageTicket', {
	title: unref(event)?.title,
	headline: unref(event)?.tagline,
	date: unref(eventDates),
	name: 'Join us!',
	logo: unref(event)?.logo,
});
</script>
<template>
	<div id="page">
		<NavigationEventHeader />
		<PageBuilder v-if="event && event.landing_page" :blocks="event.landing_page" />
	</div>
</template>
