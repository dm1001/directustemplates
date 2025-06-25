<script setup lang="ts">
const { event, error, fetchEventLandingPage } = useEvent();

await fetchEventLandingPage();

if (!event || error.value) {
	throw createError({
		statusCode: 404,
		fatal: true,
		message: 'Event not found.',
	});
}
</script>
<template>
	<div id="page">
		<VVideo
			url="https://www.youtube.com/embed/okQJLnCT2gI?si=QBjoBMdgQX0fBc0L"
			class="overflow-hidden rounded-xl border border-gray-700 bg-white/10 p-4 backdrop-blur"
		/>
	</div>
</template>
