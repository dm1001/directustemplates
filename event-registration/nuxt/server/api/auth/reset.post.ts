import { directusServer } from '~/server/utils/directus-server';
import { generateCode } from '~/server/utils/confirmation-code';

interface RegisterBody {
	first_name: string;
	last_name: string;
	email: string;
}

export default defineEventHandler(async (event) => {
	try {
		// Get the body and the cookies from the event
		const body = await readBody(event);

		const config = useRuntimeConfig();

		const { email } = body as RegisterBody;

		if (!email) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Email is a required field.',
			});
		}

		// Check if the email already exists
		const normalizedEmail = email.toLowerCase();

		const emailExists = await directusServer.request(
			readItems('people', {
				filter: {
					email: { _eq: normalizedEmail },
				},
			}),
		);

		const newCode = generateCode(6);

		// Update the person's confirmation code
		await directusServer.request(
			updateItem('people', emailExists[0].id, {
				confirmation_code: newCode,
			}),
		);

		// Send the confirmation code to the user's email
		await $fetch(`${config.public.directusUrl}/flows/trigger/ee200502-ca95-45b7-a19d-bb9dfac18304`, {
			method: 'POST',
			body: {
				first_name: emailExists ? emailExists[0].first_name : undefined,
				email: normalizedEmail,
				confirmation_code: newCode,
			},
		});

		// Return the success message
		return {
			message: 'Confirmation code sent to your email.',
		};
	} catch (error) {
		return error;
	}
});
