import { z } from 'zod';
import { TranslatedEntrySchema } from './translated-entry.schema';

const CreateTranslatedEntryInputSchema = z.object({
	...TranslatedEntrySchema,
});

const CreateTranslatedEntryResponseSchema = z.object({
	id: z.string().uuid({ message: 'Invalid UUID' }),
	...TranslatedEntrySchema,
});

export { CreateTranslatedEntryInputSchema, CreateTranslatedEntryResponseSchema };
