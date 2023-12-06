import { z } from 'zod';

export const recordSoundOutputSchema = z.string({
	required_error: 'text field is required',
	invalid_type_error: 'text value must be a string',
});
