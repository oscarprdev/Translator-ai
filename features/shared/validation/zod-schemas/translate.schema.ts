import { z } from 'zod';
import { TranslatedEntrySchema } from './translated-entry.schema';

const TranslateEntryInputSchema = z.string({
	required_error: 'prompt field is required',
	invalid_type_error: 'prompt value must be a string',
});

const TranslateEntryOutputSchema = z.object({
	...TranslatedEntrySchema,
});

export { TranslateEntryInputSchema, TranslateEntryOutputSchema };
