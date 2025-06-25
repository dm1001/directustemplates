<script setup lang="ts">
const { registrant } = usePerson();
const { eventDates } = useEvent();

const scrollY = ref(0);

onMounted(() => {
	window.addEventListener('scroll', () => {
		scrollY.value = window.scrollY;
	});
});

onUnmounted(() => {
	window.removeEventListener('scroll', () => {
		scrollY.value = window.scrollY;
	});
});
</script>

<template>
	<header
		class="fixed top-0 z-50 -mb-px w-full border-b transition-all duration-300"
		:class="[scrollY > 60 ? 'border-gray-700 bg-gray-900/60 backdrop-blur' : 'border-transparent']"
	>
		<nav class="mx-auto flex max-w-7xl items-center justify-between p-4 text-white lg:px-8" aria-label="Global">
			<div class="hidden flex-1 md:flex">
				<p v-if="eventDates" class="font-mono uppercase">{{ eventDates }}</p>
			</div>
			<NuxtLink to="/" class="-m-1.5 max-w-xs p-1.5">
				<Logo class="h-5 md:h-6" />
			</NuxtLink>
			<div class="flex flex-1 flex-wrap justify-end gap-2">
				<UButton color="primary" trailing-icon="i-material-symbols-arrow-forward" to="tickets">
					{{ registrant ? 'My Ticket' : 'Register' }}
				</UButton>
			</div>
		</nav>
	</header>
</template>
