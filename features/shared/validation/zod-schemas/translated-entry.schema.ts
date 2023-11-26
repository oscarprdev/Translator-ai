import { z } from 'zod';
import { TranslationSchema } from './translations.schema';

export const TranslatedEntrySchema = {
	kind: z.string({
		required_error: 'kind field is required',
		invalid_type_error: 'kind value must be a string',
	}),
	word: z.string({
		required_error: 'word field is required',
		invalid_type_error: 'word value must be a string',
	}),
	synonyms: z.array(
		z.string({
			required_error: 'synonyms field is required',
			invalid_type_error: 'synonyms values must be a string',
		})
	),
	antonyms: z.array(
		z.string({
			required_error: 'antonyms field is required',
			invalid_type_error: 'antonyms values must be a string',
		})
	),
	definition: z.string({
		required_error: 'definition field is required',
		invalid_type_error: 'definition value must be a string',
	}),
	uses: z.string({
		required_error: 'uses field is required',
		invalid_type_error: 'uses values must be a string',
	}),
	examples: z.array(
		z.string({
			required_error: 'examples field is required',
			invalid_type_error: 'examples values must be a string',
		})
	),
	translations: z.array(TranslationSchema),
};
