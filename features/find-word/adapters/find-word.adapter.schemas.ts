import { z } from 'zod';
import { TranslatedEntrySchema } from '../../shared/validation/zod-schemas/translated-entry.schema';

export const findWordInputSchema = z.object({
	word: z.string({
		required_error: 'word field is required',
		invalid_type_error: 'word value must be a string',
	}),
	lang: z.string({
		required_error: 'lang field is required',
		invalid_type_error: 'lang value must be a string',
	}),
});
