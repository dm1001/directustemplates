import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { registrationFormSchema } from '~/types';
import { directusServer } from '~/server/utils/directus-server';
import { generateCode } from '~/server/utils/confirmation-code';
import { verifyEmail } from '~/server/utils/verify-email';
import { sendToSlack } from '~/server/utils/slack';
import { slugify } from '~/utils/strings';

// Extend the registration form schema to include the event_id
const registerBody = registrationFormSchema.extend({
	event_id: z.string().uuid({
		message: 'Event ID is required',
	}),
});

export default defineEventHandler(async (event) => {
	try {
		const config = useRuntimeConfig();

		// Get the body and the cookies from the event
		const body = await readBody(event);
		const cookies = parseCookies(event);

		// Get the client IP address from the event (in case we want to store it in the database for rate limiting or if there's potential abuse)
		const clientIP = event.node.req.headers['x-forwarded-for'];

		// Use zod to validate the body
		const result = registerBody.safeParse(body);

		if (!result.success) {
			throw createError({
				statusCode: 422,
				statusMessage: result.error.errors.map((error) => error.message).join(','),
				data: {
					errors: result.error.errors,
				},
			});
		}

		const { first_name, last_name, email, event_id } = result.data;

		// Check if the email already exists and make sure the slug is unique
		const normalizedEmail = email.toLowerCase();

		let slug = slugify(`${generateCode(6)} ${first_name} ${last_name}`);

		const emailExists = await directusServer.request(
			readItems('people', {
				filter: {
					_or: [{ email: { _eq: normalizedEmail } }, { tickets: { slug: { _eq: slug } } }],
				},
				fields: [
					'email',
					{
						tickets: ['slug'],
					},
				],
			}),
		);

		// Check if the email already exists
		const isEmailTaken = emailExists.find((person) => person.email === normalizedEmail);

		// If it does, redirect to the login page
		if (isEmailTaken) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Email already exists. Redirecting to login. Please sign in using your confirmation code.',
				data: {
					redirect: '/auth/login?email=' + normalizedEmail,
					errors: [
						{
							path: ['email'],
							message: 'Email already exists. ',
						},
					],
				},
			});
		}

		// If the slug already exists, append a number to the end of it.
		const isSlugTaken = emailExists.find((person) => person.tickets?.some((ticket) => ticket.slug === slug));

		if (isSlugTaken) {
			const slugCount = emailExists.filter((person) =>
				person.tickets?.some((ticket) => ticket.slug?.startsWith(slug as string)),
			).length;

			slug = `${slug}-${slugCount}`;
		}

		// If there's no existing user and a NEVERBOUNCE_API_KEY exists, verify the email address with NeverBounce
		if (process.env.NEVERBOUNCE_API_KEY) {
			const emailInfo: any = await verifyEmail(email.toLowerCase());

			if (emailInfo.result === 'disposable') {
				throw createError({
					statusCode: 409,
					message: 'That email address is disposable. Please use your work email.',
					data: {
						errors: [
							{
								path: ['email'],
								message: 'Please use a valid email address.',
							},
						],
					},
				});
			}

			if (emailInfo.result === 'invalid') {
				throw createError({
					statusCode: 409,
					message: 'That email address is invalid. Please try again with a valid email.',
					data: {
						suggestion: emailInfo.suggested_correction,
						errors: [
							{
								path: ['email'],
								message: 'Please use a valid email address.',
							},
						],
					},
				});
			}
		}

		// Create the `people` item with a random `confirmation_code`
		const person = await directusServer.request(
			createItem(
				'people',
				{
					first_name,
					last_name,
					confirmation_code: generateCode(6),
					email: normalizedEmail,
					ip_address: clientIP,
					tickets: {
						//@ts-expect-error
						create: [{ slug, referred_by: cookies.referral_ticket_id, event_id }],
					},
				},
				{
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
						{
							tickets: ['id', 'slug'],
						},
					],
				},
			),
		);

		if (!person) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Error creating person',
			});
		}

		// Create a JWT token with the people id and the ticket
		const token = jwt.sign(
			{
				people_id: person.id,
				ticket_id: person.tickets ? person.tickets[0].id : undefined,
			},
			process.env.JWT_SECRET as string,
			{
				expiresIn: process.env.JWT_EXPIRES_IN || '60d',
			},
		);

		setCookie(event, 'session_token', token);

		// Send the registrant to Slack if the webhook URL is set
		if (config.slackWebhookUrl) {
			sendToSlack(person);
		}

		// Return the person
		return {
			id: person.id,
			first_name: person.first_name,
			last_name: person.last_name,
			email: person.email,
			tickets: person.tickets,
		};
	} catch (error) {
		return error;
	}
});
