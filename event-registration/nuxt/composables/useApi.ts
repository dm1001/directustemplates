import type { UseFetchOptions } from 'nuxt/app';
import { queryToParams } from '@directus/sdk';
import { defu } from 'defu';
import { stringify } from 'qs';

/*
This is a custom composable that extends the useFetch composable from Nuxt.
*/
export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
	const defaults: UseFetchOptions<T> = {
		// Adding a custom onRequest hook to convert the params object support nested objects like when using the Directus SDK
		onRequest({ options }) {
			if (options.params) {
				const { fields, ...rest } = options.params;
				const fieldParams = queryToParams({ fields });
				const convertedOptions = new URLSearchParams(stringify(rest));
				options.params = { ...Object.fromEntries(convertedOptions), ...fieldParams };
			}
		},
	};

	const params = defu(options, defaults);

	return useFetch(url, params);
}
