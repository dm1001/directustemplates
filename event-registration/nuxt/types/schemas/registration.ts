import { z } from 'zod';

export const registrationFormSchema = z.object({
	first_name: z.string().min(1, 'First name is required'),
	last_name: z.string().min(1, 'Last name is required'),
	email: z.string().email('Please use a valid email address'),
});

export type RegistrationForm = z.infer<typeof registrationFormSchema>;
