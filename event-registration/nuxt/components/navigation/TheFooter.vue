<script setup lang="ts">
// The globals are loaded during the build process to avoid unnecessary API requests.
// See /modules/events/index.ts
const { globals } = useAppConfig();
</script>
<template>
	<footer
		class="relative border-t border-gray-200 bg-gray-900 py-8 dark:border-gray-700"
		aria-labelledby="footer-heading"
	>
		<!-- Top -->
		<div class="mx-auto max-w-6xl px-6 py-8 lg:px-16">
			<!-- Navigation -->
			<nav class="mt-8 grid items-end gap-8 pb-8 md:grid-cols-2 xl:col-span-2 xl:mt-0">
				<!-- Left -->
				<div class="">
					<NuxtLink href="/" class="inline-flex">
						<NuxtImg v-if="globals.footer_logo" :src="globals.footer_logo" alt="footer logo" class="h-8" />
						<Logo v-else class="h-8 dark:text-white" />
					</NuxtLink>
					<VText v-if="globals.footer_tagline" text-color="light" class="mt-2" size="xs">
						{{ globals.footer_tagline }}
					</VText>
				</div>

				<!-- Right -->

				<ul role="list" class="grid gap-2 md:grid-cols-2">
					<li v-for="item in globals.footer_links" :key="item.id">
						<NuxtLink
							:to="item.url"
							class="dark:hover:text-primary font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200"
							:target="item.open_in_new_window ? '_blank' : '_self'"
						>
							{{ item.label }}
						</NuxtLink>
					</li>
				</ul>
			</nav>

			<!-- Bottom -->
			<nav class="border-t border-t-gray-700 pt-4 md:flex md:items-start md:justify-between">
				<div class="flex items-center space-x-6 md:order-last md:mb-0">
					<NuxtLink
						v-for="link in globals.social_links"
						:key="link.url"
						:href="link.url"
						class="h-6 w-6 text-white"
						target="_blank"
					>
						<span class="sr-only">{{ link.service }}</span>
						<Icon class="h-8 w-8 text-gray-300 hover:opacity-75" :name="`mdi:${link.service}`" />
					</NuxtLink>
				</div>
				<div class="mt-8 md:mt-0">
					<span class="mt-2 text-gray-600 dark:text-gray-400">
						Copyright © 1988 - {{ new Date().getFullYear() }}
						<NuxtLink href="/" class="hover:text-primary mx-2" rel="noopener noreferrer">Monospace Inc.</NuxtLink>
						All rights reserved.
					</span>
					<!-- You're free to remove this footer if you want. But we'd appreciate it if you keep the credits. -->
					<span class="mt-2 block text-gray-600 dark:text-gray-400">
						<Icon name="heroicons:bolt" class="text-primary h-4 w-4" />
						Site powered by
						<NuxtLink
							href="https://www.directus.io?ref=directus_event_registration_footer"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-primary border-b dark:border-b-gray-700"
						>
							Directus
						</NuxtLink>
						and
						<NuxtLink
							href="https://www.nuxt.com?ref=directus_event_registration_footer"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-primary border-b dark:border-b-gray-700"
						>
							Nuxt
						</NuxtLink>
						.
					</span>
				</div>
			</nav>
		</div>
	</footer>
</template>
