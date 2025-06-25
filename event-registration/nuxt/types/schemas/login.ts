import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	confirmation_code: z.string().min(6, 'Please enter a valid confirmation code.'),
});

export type LoginForm = z.infer<typeof loginFormSchema>;
