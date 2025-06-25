<script setup lang="ts">
const props = defineProps<{
	ticketUrl: string;
}>();

const { globals } = useAppConfig();
const toast = useToast();

const { event } = useEvent();

function copyToClipboard(source: string) {
	const { copy } = useClipboard({ source: props.ticketUrl });
	copy();

	toast.add({
		title: 'Copied to clipboard',
		description: 'You can now share your ticket with others.',
		color: 'green',
		icon: 'i-material-symbols-check-rounded',
	});
}
</script>
<template>
	<div>
		<TypographyTitle v-if="globals.ticket_page?.share?.title">{{ globals.ticket_page?.share?.title }}</TypographyTitle>
		<UButtonGroup class="mt-4 w-full" :ui="{ rounded: 'rounded-xl' }">
			<UInput :value="ticketUrl" disabled aria-readonly size="lg" class="w-full" />
			<UButton
				icon="i-material-symbols-content-copy-outline"
				color="gray"
				label="Copy URL"
				class="flex-shrink-0"
				@click="copyToClipboard(ticketUrl)"
			/>
		</UButtonGroup>
		<div class="mt-4 flex flex-wrap items-center gap-4">
			<UButton
				icon="ri:twitter-x-line"
				color="gray"
				size="lg"
				label="X"
				target="_blank"
				:to="`https://x.com/share?url=${ticketUrl}&text=${event.title}`"
			/>
			<UButton
				icon="i-mdi-linkedin"
				color="gray"
				size="lg"
				label="LinkedIn"
				target="_blank"
				:to="`https://www.linkedin.com/sharing/share-offsite/?url=${ticketUrl}`"
			/>
			<UButton
				icon="ri:reddit-line"
				color="gray"
				size="lg"
				label="Reddit"
				target="_blank"
				:to="`https://www.reddit.com/submit?url=${ticketUrl}&title=${event.title}`"
			/>
		</div>
	</div>
</template>
