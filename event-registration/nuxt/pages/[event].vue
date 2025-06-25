<script setup lang="ts">
const route = useRoute();
const { event, fetchEventLandingPage } = useEvent();
await fetchEventLandingPage(route.params.event as string);
</script>
<template>
	<div id="page">
		<NavigationEventHeader />
		<PageBuilder v-if="event && event.landing_page" :blocks="event.landing_page" />
	</div>
</template>
