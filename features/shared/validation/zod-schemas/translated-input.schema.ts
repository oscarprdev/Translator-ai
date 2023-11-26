import { z } from 'zod';

const TranslatedInputSchema = z.object({
	original: z.string({
		required_error: 'original field is required',
		invalid_type_error: 'original value must be a string',
	}),
	langInput: z.string({
		required_error: 'langInput field is required',
		invalid_type_error: 'langInput value must be a string',
	}),
	langOutput: z.string({
		required_error: 'langOutput field is required',
		invalid_type_error: 'langOutput value must be a string',
	}),
});

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
