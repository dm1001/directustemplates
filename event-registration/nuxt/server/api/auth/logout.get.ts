export default defineEventHandler(async (event) => {
	try {
		// Remove the 'session_token' and 'referral_ticket_id' cookies
		deleteCookie(event, 'session_token');
		deleteCookie(event, 'referral_ticket_id');

		// Return a success message
		return {
			status: 'success',
			message: 'Logged out successfully',
		};
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'An error occurred while logging out.',
		});
	}
});
