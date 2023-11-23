import { ZodSchema } from 'zod';

export interface ZodValidation {
	validate<T>(schema: ZodSchema, input: T): T;
}

export class DefaultZodValidation {
	validate<T>(schema: ZodSchema, input: T): T {
		try {
			return schema.parse(input);
		} catch (error: any) {
			throw new Error(error.issues[0].message);
		}
	}
}
