import { z } from 'zod';
import { TranslatedEntrySchema } from './translated-entry.schema';

const DescribeTranslatedEntryInputSchema = z.string();

const DescribeTranslatedEntryResponseSchema = z.object({
	id: z.string().uuid({ message: 'Invalid UUID' }),
	...TranslatedEntrySchema,
});

export { DescribeTranslatedEntryInputSchema, DescribeTranslatedEntryResponseSchema };
