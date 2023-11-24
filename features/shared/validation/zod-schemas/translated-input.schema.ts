import { z } from 'zod';

const TranslatedInputSchema = z.string();
const TranslatedOutputSchema = z.object({
	original: z.string({
		required_error: 'original field is required',
		invalid_type_error: 'original value must be a string',
	}),
	translated: z.string({
		required_error: 'translated field is required',
		invalid_type_error: 'translated value must be a string',
	}),
});

export { TranslatedInputSchema, TranslatedOutputSchema };
