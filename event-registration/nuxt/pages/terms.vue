<script setup lang="ts">
const { globals } = useAppConfig();
const { event, eventDates } = useEvent();

// SEO Meta
useSeoMeta({
	title: 'Terms and Conditions',
	ogTitle: 'Terms and Conditions',
});

defineOgImageComponent('OgImageTicket', {
	title: unref(event)?.title,
	headline: unref(event)?.tagline,
	date: unref(eventDates),
	name: 'Terms and Conditions',
	logo: unref(event)?.logo,
});
</script>
<template>
	<div id="page">
		<NavigationEventHeader />
		<BlocksHero v-if="globals.terms_page" :data="globals.terms_page" />
		<section class="mx-auto max-w-3xl px-6 lg:px-16 lg:py-20">
			<TypographyProse :content="globals.terms_page_content" />
		</section>
	</div>
</template>
