import type { Schema } from '~/types/schema';
import {
	createDirectus,
	readItem,
	readItems,
	readSingleton,
	rest,
	createItem,
	updateItem,
	staticToken,
} from '@directus/sdk';

const directusUrl = process.env.DIRECTUS_URL as string;

const directusServer = createDirectus<Schema>(directusUrl)
	.with(rest())
	.with(staticToken(process.env.DIRECTUS_SERVER_TOKEN as string));

export { directusServer, readItem, readItems, readSingleton, createItem, updateItem };
