import { z } from 'zod';

export const translateWordInputSchema = z.string({
	required_error: 'prompt field is required',
	invalid_type_error: 'prompt value must be a string',
});

export const translateWordOutputSchema = z.object({
	from: z.string({
		required_error: 'from field is required',
		invalid_type_error: 'from value must be a string',
	}),
	to: z.string({
		required_error: 'to field is required',
		invalid_type_error: 'to value must be a string',
	}),
});
