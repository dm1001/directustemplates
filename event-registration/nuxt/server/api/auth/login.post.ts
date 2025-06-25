import { verifyHash } from '@directus/sdk';
import jwt from 'jsonwebtoken';
import type { People } from '~/types';
import { loginFormSchema } from '~/types';

import { directusServer } from '~/server/utils/directus-server';

export default defineEventHandler(async (event) => {
	try {
		// Get the body  from the event
		const body = await readBody(event);

		// Use zod to validate the body
		const result = loginFormSchema.safeParse(body);

		if (!result.success) {
			throw createError({
				statusCode: 422,
				statusMessage: result.error.errors.map((error) => error.message).join(','),
				data: {
					errors: result.error.errors,
				},
			});
		}

		const { confirmation_code, email } = result.data;

		// Check if the email already exists
		const normalizedEmail = email.toLowerCase();

		const existingPersons = await directusServer.request(
			readItems('people', {
				filter: {
					email: { _eq: normalizedEmail },
				},
				fields: [
					'id',
					'first_name',
					'last_name',
					'email',
					'job_title',
					'website',
					'country',
					'avatar',
					'avatar_traits',
					'confirmation_code',
					{
						tickets: ['id', 'slug'],
					},
				],
			}),
		);

		// If it does, redirect to the login page
		if (!existingPersons || existingPersons.length === 0) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Incorrect email or confirmation code.',
			});
		}

		const person = existingPersons[0];

		// Get the hashed confirmation code
		const hashedConfirmationCode = existingPersons[0].confirmation_code as string;

		// Verify the confirmation code
		const isCodeCorrect = await directusServer.request(verifyHash(confirmation_code, hashedConfirmationCode));

		if (!isCodeCorrect) {
			throw createError({
				statusCode: 500,
				statusMessage:
					'Incorrect email or confirmation code. If you do not have a confirmation code, please request a new one.',
			});
		}

		// Create a JWT token with the people id and the ticket
		const token = jwt.sign(
			{
				people_id: person.id,
				ticket_id: person.tickets ? person.tickets[0].id : null,
			},
			process.env.JWT_SECRET as string,
			{
				expiresIn: process.env.JWT_EXPIRES_IN || '60d',
			},
		);

		setCookie(event, 'session_token', token);

		// Return the person
		return {
			id: person.id,
			first_name: person.first_name,
			last_name: person.last_name,
			email: person.email,
			job_title: person.job_title,
			website: person.website,
			country: person.country,
			avatar: person.avatar,
			avatar_traits: person.avatar_traits,
			tickets: person.tickets,
		} as People;
	} catch (error) {
		return error;
	}
});
