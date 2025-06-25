// Generate a random alphanumeric code of a given length
export function generateCode(length: number) {
	const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let code = '';

	for (let i = 0; i < length; i++) {
		const random = Math.floor(Math.random() * charset.length);
		code += charset[random];
	}

	return code;
}
