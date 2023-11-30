import { z } from 'zod';

export const generateInfoInputSchema = z.string({
	required_error: 'prompt field is required',
	invalid_type_error: 'prompt value must be a string',
});
