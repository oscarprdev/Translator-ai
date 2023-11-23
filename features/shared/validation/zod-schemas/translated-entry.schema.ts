import { z } from 'zod';

export const TranslatedEntrySchema = {
	kind: z.string({
		required_error: 'kind field is required',
		invalid_type_error: 'kind value must be a string',
	}),
	original: z.string({
		required_error: 'original field is required',
		invalid_type_error: 'original value must be a string',
	}),
	translated: z.string({
		required_error: 'translated field is required',
		invalid_type_error: 'translated value must be a string',
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
	hint: z.string({
		required_error: 'hint field is required',
		invalid_type_error: 'hint values must be a string',
	}),
	example: z.array(
		z.string({
			required_error: 'examples field is required',
			invalid_type_error: 'examples values must be a string',
		})
	),
};
