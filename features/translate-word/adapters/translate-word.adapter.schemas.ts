import { z } from 'zod';

export const translateWordInputSchema = z.string({
	required_error: 'prompt field is required',
	invalid_type_error: 'prompt value must be a string',
});
