<script setup lang="ts">
const { globals } = useAppConfig();
const image = useImage();
// We're fetching information about the event here in app.vue so that it's available to all components.
const { fetchEvent, event } = useEvent();
await fetchEvent();

useHead({
	meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
	link: [{ rel: 'icon', href: globals.favicon ? image(globals.favicon) : '/defaul-favicon.ico' }],
	htmlAttrs: {
		lang: 'en',
	},
});

useSeoMeta({
	titleTemplate: `%s - ${unref(event)?.title}`,
	description: () => unref(event)?.description,
	ogTitle: unref(event)?.title,
	ogDescription: () => unref(event)?.description,
});
</script>

<template>
	<NuxtLayout>
		<NuxtLoadingIndicator
			color="repeating-linear-gradient(to right,rgb(var(--color-primary-500) / 1) , rgb(var(--color-primary-300) / 1)"
		/>
		<NuxtPage />
		<UNotifications class="dark" />
	</NuxtLayout>
</template>

<style>
html {
	scroll-behavior: smooth;
}
</style>
