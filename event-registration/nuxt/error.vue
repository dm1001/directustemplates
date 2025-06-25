<script setup lang="ts">
const { globals } = useAppConfig();

useSeoMeta({
	title: '404',
});
</script>

<template>
	<NuxtLayout>
		<NuxtLoadingIndicator
			color="repeating-linear-gradient(to right,#5c3de6
    0%,#ED99D1 100%)"
		/>
		<div id="page">
			<NavigationEventHeader />
			<BlocksHero :data="globals.error_page" />
		</div>
		<UNotifications class="dark" />
	</NuxtLayout>
</template>
