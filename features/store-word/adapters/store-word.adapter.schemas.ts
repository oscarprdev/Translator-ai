import { z } from 'zod';
import { TranslatedEntrySchema } from '../../shared/validation/zod-schemas/translated-entry.schema';

export const storeWordInputSchema = z.object(TranslatedEntrySchema);
