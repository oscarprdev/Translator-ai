import { z } from 'zod';

export const TranslationSchema = z.object({
	lang: z.string({
		required_error: 'lang field is required',
		invalid_type_error: 'lang value must be a string',
	}),
	translation: z.string({
		required_error: 'translation field is required',
		invalid_type_error: 'translation value must be a string',
	}),
});
