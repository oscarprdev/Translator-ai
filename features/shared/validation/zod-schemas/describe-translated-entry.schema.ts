import { z } from 'zod';
import { TranslatedEntrySchema } from './translated-entry.schema';

const DescribeTranslatedEntryInputSchema = z.object({
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

const DescribeTranslatedEntryResponseSchema = z.object({
	id: z.string().uuid({ message: 'Invalid UUID' }),
	...TranslatedEntrySchema,
});

export { DescribeTranslatedEntryInputSchema, DescribeTranslatedEntryResponseSchema };
