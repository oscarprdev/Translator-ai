import { z } from 'zod';

export const generateSoundInputSchema = z.string({
	required_error: 'content field is required',
	invalid_type_error: 'content value must be a string',
});
