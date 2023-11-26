import { z } from 'zod';

export const TranslationSchema = z.object({
	language: z.string({
		required_error: 'language field is required',
		invalid_type_error: 'language value must be a string',
	}),
	translation: z.string({
		required_error: 'translation field is required',
		invalid_type_error: 'translation value must be a string',
	}),
});
