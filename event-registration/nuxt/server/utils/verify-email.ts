const baseUrl = 'https://api.neverbounce.com/v4';
const apiKey = process.env.NEVERBOUNCE_API_KEY;

async function verifyEmail(email: string) {
	try {
		const response = await $fetch(`${baseUrl}/single/check?key=${apiKey}&email=${email}`, { method: 'POST' });
		return response;
	} catch (error) {
		return error;
	}
}

export { verifyEmail };
