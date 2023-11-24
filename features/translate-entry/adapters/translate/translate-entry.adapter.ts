import { TranslatedEntry } from '@prisma/client';
import { ZodValidation } from '../../../shared/validation/zod-validation';
import { TranslateEntryPorts } from '../../application/translate/translate-entry.ports';
import { TranslateEntryInfra } from '../../infra/translate-entry.infra';
import { TranslateEntryInputSchema, TranslateEntryOutputSchema } from '../../../shared/validation/zod-schemas/translate.schema';

export class TranslateEntryAdapter implements TranslateEntryPorts {
	constructor(private readonly infra: TranslateEntryInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(TranslateEntryInputSchema, input);
	}

	private validateOutput(input: Omit<TranslatedEntry, 'id'>) {
		return this.zod.validate<Omit<TranslatedEntry, 'id'>>(TranslateEntryOutputSchema, input);
	}

	async translate({ prompt }: TranslateEntryPorts.TranslateInput): Promise<TranslateEntryPorts.TranslateEntryOutput> {
		const validInput = this.validateInput(prompt);
		const response = await this.infra.translate(validInput);

		return {
			data: this.validateOutput(response),
		};
	}
}
