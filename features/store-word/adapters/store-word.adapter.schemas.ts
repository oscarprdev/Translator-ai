import { z } from 'zod';
import { TranslatedEntrySchema } from '../../shared/validation/zod-schemas/translated-entry.schema';

export const storeWordInputSchema = z.object(TranslatedEntrySchema);

export const storeWordOutputSchema = z.object({
	id: z.string().uuid({ message: 'Invalid UUID' }),
	...TranslatedEntrySchema,
});
